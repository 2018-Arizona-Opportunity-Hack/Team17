/*
  author: Suhas Vittal
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');
var firebase = require('firebase');
var spawn = require('child_process').spawn;
var Email = require('email-templates');
var Imap = require('imap');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// sends emails to volunteers
function sendEmail(sender, volunteer, event, template) {
  var em = new Email({
    message: {
      from: sender
    },
    // send: true // uncomment if not debugging
    transport: {
      jsonTransport = true
    },
    views: {
      options: {
        extensions: "ejs"
      }
    }
  });

  em.send({
    template: template,
    message: {
      to: volunteer["email"]
    },
    locals: {
      name: volunteer["name"],
      date: event["date"],
      address = event["address"]
    }
  });
}

// get affirmative respondents to email
function getAffirmativeRespondents(fromDate) {
  affRespondents = []
  imap.openBox('INBOX', true, (err, box) => {
    if (err) throw err;
    imap.search(['UNSEEN', ['SINCE', fromDate]], (err, results) => {
      if (err) throw err;
      var f = imap.fetch(results, {bodies: ['FROM', 'BODY']});
      f.on('message', (msg, seqno) => {
        console.log("MESSAGE NO: " + seqno);
        var prefix = "(#" + seqno + ") ";
        var email = "";
        var isNegative = "";
        msg.on('body', (stream, info) => {
          console.log(prefix + body);
          var buffer = "";
          stream.on("data", (chunk) => {
            buffer += chunk.toString('utf8');
          });
          stream.once("end", () => {
            if (info.which == 'BODY') {
              /* parse the message for negatives:
                no
                not or n't
                un-
                apologies
              */
              var regex = RegExp("n[o,\'](?!\')t?|una.*?|apolog.*?", "g");
              isNegative = regex.test(inspect(Imap.parsedHeader(buffer));
            } else {
              email = inspect(Imap.parsedHeader(buffer));
            }
          });
        });
        msg.once('attributes', function(attrs) {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', () => {
          affRespondents.push(email);
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });

  return affRespondents;
}

function retrieveObjectFromAttribute(attrName, attrValue, volunteers) {
  for (var p in volunteers) {
    if (p[attrName] == attrValue) {return p;}
  }
  return 0;
}

// emails clients to find new volunteers
function cycleThroughParticipants(SENDER, startDate, step, targetDate, A, B, wholeList, volunteers) {
  // A is the standing list of questionables, B is the list to choose from,
  // wholeList is the list of all volunteers.
  // startDate is the date to start cycling, step is the number of days to wait before
  // cycling again, and num is the number of times to cycle.
  for (var p in A) {
    sendEmail(SENDER, p["email"], event, "reminder");
  }

  var date = startDate;
  if (date > targetDate) {return;}
  var job = schedule.scheduleJob(date, () => {
    var resp = getAffirmativeRespondents(date - step);
    // connect affirmative respondents back to uuids
    var affUuids = []
    for (var em in resp) {
      affUuids.push(retrieveObjectFromAttribute("email", em, volunteers)["UUID"]);
    }

    var newList = []
    // cross-reference and update
    for (var p in wholeList) {
      if (affUuids.includes(p) || !A.includes(p)) {
        newList.push(p);
      }
    }
    var N = original.length - newList.length;
    // first send emails to top N volunteers on alt
    var C = []
    var k = 0;
    for (var p in B) {
      if (k < N) {
        sendEmail(SENDER, p["email"], event, "request");
      } else {
        C.append(p);
      }
    }

    // update event on firebase
    var id = event["event_id"];
    var newKey = database.ref("/events/" + id + "/list").push().key;
    var update = {};
    update["/list/" + newKey] = newList;
    firebase.database().ref().update(update);

    cycleThroughParticipants(SENDER, date + step, targetDate, B, C, wholeList, volunteers);
  });
}

// timer call for checking if reminder date is nearing, and getting new volunteers
// if this date is close
app.post(/[T,t]imer/, (req, res) => {
  const DAYS_BEFORE = 14; // remind volunteers days before the target date
  const MAX_HIGH_SAMP = 0.7; // only allow 70% of options to be from most reliable
  const SENDER = "suhaskvittal@gmail.com";

  /*
    name, address, zipcode, waitlist, volunteers-needed, description, list
  */

  /*
    This middleware sets up a timer that finds potential alternatives from
    the waitlist to volunteers that may not show up.
  */

  var event = req.body["event"]
  var date = new Date(event["date"]); // the target date

  var reminderDate = date - DAYS_BEFORE;
  var remindJob = schedule.scheduleJob(reminderDate, function() {
    var database = firebase.database();

    var modelVolunteers = [];
    var volunteers = []; // all volunteers
    var uuids = [];
    var qvols = []; // questionable volunteers array
    var alt = []; // alternative volunteers
    var data = database.ref().once('value').then((snapshot) => {
      volunteers = snapshot.val()["volunteers"];
      // compute the most reliable volunteers
      var maxEvents = 0;

      // collect UUIDS as well
      for (var i = 0; i < volunteers.length; i++) {
        var p = volunteers[i];
        var numEvents = p["events"].length;
        uuids.push(p["UUID"]);
        if (numEvents > maxEvents) {
          maxEvents = numEvents;
          modelVolunteers = [i];
        } else if (numEvents == maxEvents) {
          modelVolunteers.push(i);
        } // else do nothing.
      }

      var pythonProcess = spawn("python", ["../python/main.py", data]); // send data to python script
      pythonProcess.stdout.on('data', (clusters) => {
        console.log("clusters:\t" + clusters);
        // find alternatives for questionable volunteers

        var shortlist = snapshot.val()["list"];
        var waitlist = snapshot.val()["waitlist"];
        var model = modelVolunteers[Math.floor(Math.random() * modelVolunteers.length)]
        var modelCls = clusters[model];

        for (var i = 0; i < shortlist.length; i++) {
          // if not in the cluster of the model, add to questionables
          var index = uuids.indexOf(shortlist[i]);
          var cls = clusters[index];
          if (modelCls != cls) {
            qvols.append(retrieveObjectFromAttribute("UUID", shortlist[i], volunteers));
          }
        }

        // now find alternatives
        // note that all the alternatives aren't the best possible ones; we still
        // want to give volunteers with non-pristine records a chance as well
        numHigh = Math.floor(MAX_HIGH_SAMP * qvols.length);
        numLow = qvols.length - numLow;

        for (var i = 0; i < qvols.length; i++) {
          var index = uuids.indexOf(waitlist[i]);
          var cls = clusters[index];
          if (cls != modelCls && numLow > 0) {
            alt.push(retrieveObjectFromAttribute("UUID", waitlist[i], volunteers));
            numLow -= 1;
          } else if (cls == modelCLS && numHigh > 0) {
            alt.push(retrieveObjectFromAttribute("UUID", waitlist[i], volunteers));
            numhigh -= 1;
          }

          if (numHigh == 0 && numLow == 0) {
            break;
          }
        }
      });
    });

    /* now handle the mailing stage
      here we should send emails to questionable volunteers and await a response.
      a day later we should check if we received an email, and if that email
      is a negative response. If we didn't receive anything or received a
      negative response, then we should reach out to alternative volunteers.
    */

    cycleThroughParticipants(SENDER, date - DAYS_BEFORE, 5, date, qvols, alt, event["list"], volunteers);
  });
});

module.exports = app;
