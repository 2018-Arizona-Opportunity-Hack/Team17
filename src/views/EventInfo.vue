<template>
  <div id="EventInfo">
    <v-container>
      <v-card style="padding: 30px">
        <h1 style="padding: 10px">{{name}}</h1>
        <p>event ID#: {{event_id}}</p><br>
        <p>description: {{description}}</p><br>
        <p>address: {{address}}</p><br>
        <p>zipcode: {{zipcode}}</p><br>
        <p>Volunteers: {{volNeeded}}</p><br>
        <!-- <button @click="deleteevent" class="btn red">Delete</button> -->
        <v-card-actions>
          <v-btn to="/Events" style="margin-right: 20px" class="btn grey lighten-2">Back</v-btn>
          <!-- modal start -->
          <div class="text-xs-center">
            <v-dialog
              v-model="dialog"
              width="500"
            >
            <v-btn v-if="isLoggedIn" slot="activator" @click="fetchUser()" class="btn blue lighten-2">Sign up</v-btn>
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  Sign Up for {{ name }}!
                </v-card-title>

                <v-card-text>
                  <p>We just need a few things!</p>
                  <v-flex xs36 sm18 md18>
                    <v-text-field
                      v-model="userName"
                      label="Name"
                      placeholder="John Smith"
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs36 sm18 md18>
                    <v-text-field
                      v-model="userPhone"
                      label="Phone Number"
                      placeholder="4805466622"
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs36 sm18 md18>
                    <v-text-field
                      v-model="userZip"
                      label="Zipcode"
                      placeholder="73827"
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs36 sm18 md18>
                    <v-text-field
                      v-model="userAddress"
                      label="Address"
                      placeholder="2736 North Cider Ln"
                      box
                    ></v-text-field>
                  </v-flex>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="signUp()"
                  >
                    Put me in coach
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- modal end -->
        </v-card-actions>

      </v-card>
    </v-container>

  </div>
</template>

<script>
import db from '../components/firebaseInit';
import firebase from 'firebase';
export default {
  name: 'EventInfo',
  data() {
    return {
      dialog: false,
      isLoggedIn: null,
      event_id: null,
      name: null,
      dept: null,
      position: null,
      currentUser: null,
      userAddress: null,
      userShowedup: null,
      userID: null,
      userZip: null,
      userPhone: null,
      userAdmin: null,
      userName: null
    };
  },
  created: function () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection('events')
      .where('event_id', '==', to.params.event_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.event_id = doc.data().event_id;
            vm.name = doc.data().name;
            vm.description = doc.data().description;
            vm.address = doc.data().address;
            vm.zipcode = doc.data().zipcode;
            vm.volNeeded = doc.data().volNeeded;
            vm.date = doc.data().date;
            vm.organization = doc.date().date;
          });
        });
      });
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      db
        .collection('events')
        .where('event_id', '==', this.$route.params.event_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.event_id = doc.data().event_id;
            this.name = doc.data().name;
            this.description = doc.data().description;
            this.address = doc.data().address;
            this.zipcode = doc.data().zipcode;
            this.volNeeded = doc.data().volNeeded;
            this.date = doc.data().date;
            this.organization = doc.data().date;
          });
        });
    },
    fetchUser() {
      db
        .collection('volunteers')
        .where('email', '==', this.currentUser)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(querySnapshot)
            this.userAddress = doc.data().address;
            this.userZip = doc.data().zip;
            this.userID = doc.data().volunteer_id;
            this.userPhone = doc.data().phone;
            if(!doc.data().admin) {
              this.userAdmin = false;
            }
          })
        })

    },
    signUp() {
      console.log(this.currentUser)
      db.collection('volunteers').where('email', '==', this.currentUser).get().then((querySnapshot) => {
        console.log("entered")
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log("snapshot")
          doc.ref.update({
            email: this.currentUser,
            volunteer_id: this.userID,
            address: this.userAddress,
            name: this.userName,
            zip: this.userZip,
            admin: this.userAdmin,
            phone: this.userPhone
          })
          .then(() => {
            // db.collection('volunteer_event').
            alert("Signed up!");
            this.$router.push({name: 'Home'});
          });
        })
      })
    }
    // deleteEvent() {
    //     db
    //       .collection('e')
    //       .where('event_id', '==', this.$route.params.event_id)
    //       .get()
    //       .then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //           doc.ref.delete();
    //           this.$router.push('/');
    //         });
    //       });
    //   }
    // }
  }
};
</script>
<style>
  #EventInfo {
    padding-top: 100px;
  }
</style>
