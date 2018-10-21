<template>
  <div>
    <v-flex xs36 sm18 md18>
      <v-text-field
        v-model="email"
        label="Email"
        placeholder="JohnSmith@yahoo.edu"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs36 sm36 md18>
      <v-text-field
        v-model="password"
        label="Password"
        placeholder="123eyesonme"
        box
        :append-icon="show ? 'visibility_off' : 'visibility'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
    </v-flex>
    <v-flex xs36 sm36 md18>
      <v-text-field
        v-model="password2"
        label="Confirm Password"
        placeholder="123eyesonme"
        box
        type="password"
      ></v-text-field>
    </v-flex>
    <v-btn v-on:click="register" color="success">Signup</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data () {
    return {
      show: false,
      password: "",
      password2: "",
      email: ""
    }
  },
  methods: {
    register: function(e) {
      if(this.password !== this.password2) {
        alert("Passwords don't match!");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user);
            alert(`Signed up as ${user.user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
}
</script>