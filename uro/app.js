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

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

// timer call for checking if reminder date is nearing
app.post(/[T,t]imer/, (req, res) => {
  const DAYS_BEFORE = 7; // remind volunteers days before the target date
  const DATA_PATH = "";
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
    var data = database.ref(DATA_PATH).once('value').then((snapshot) => {
      var volunteers = data.val()["volunteers"];
      // compute the most reliable volunteers
      var modelVolunteers = [];
      var maxEvents = 0;
      var uuids = []

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
        var qvols = []; // questionable volunteers array
        var shortlist = data.val()["list"];
        var waitlist = data.val()["waitlist"];
        var model = modelVolunteers[Math.floor(Math.random() * modelVolunteers.length)]
        var modelCls = clusters[model];

        for (var i = 0; i < shortlist.length; i++) {
          // if not in the cluster of the model, add to questionables
          var index = uuids.indexOf(shortlist[i]);
          var cls = clusters[index];
          if (modelCls != cls) {
            qvols.append(shortlist[i]);
          }
        }

        // now find alternatives
        // note that all the alternatives aren't the best possible ones; we still
        // want to give volunteers with non-pristine records a chance as well
        numHigh = Math.floor(MAX_HIGH_SAMP * qvols.length);
        numLow = qvols.length - numLow;
        alt = []

        for (var i = 0; i < qvols.length; i++) {
          var index = uuids.indexOf(waitlist[i]);
          var cls = clusters[index];
          if (cls != modelCls && numLow > 0) {
            alt.push(waitlist[i]);
            numLow -= 1;
          } else if (cls == modelCLS && numHigh > 0) {
            alt.push(waitList[i]);
            numhigh -= 1;
          }

          if (numHigh == 0 && numLow == 0) {
            break;
          }
        }

        /* now handle the mailing stage
          here we should send emails to questionable volunteers and await a response.
          a day later we should check if we received an email, and if that email
          is a negative response. If we didn't receive anything or received a
          negative response, then we should reach out to alternative volunteers.
        */

        for (var p in qvols) {
          sendEmail(SENDER, p, event, "reminder");
        }

        var checkBackDate = reminderDate + 3;
        var checkJob = schedule.scheduleJob(checkBackDate, () => {

        });
      });
    });
  });
});



module.exports = app;
