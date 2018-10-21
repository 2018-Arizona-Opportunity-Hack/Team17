<template>
  <v-toolbar fixed>
    <v-toolbar-title>Uro</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{
        name: 'Home'
      }" exact>Home</v-btn>
      <v-btn flat :to="{
        name: 'Events'
      }" exact>Events</v-btn>
      <!-- <v-btn flat>Admin</v-btn> -->
      <v-btn v-if="!isLoggedIn" :to="{
        name: 'Login'
      }" flat>Login</v-btn>
      <v-btn v-if="!isLoggedIn" :to="{
        name: 'Signup'
      }" flat>Signup</v-btn>
      <v-menu v-if="isLoggedIn" offset-y>
        <v-btn slot="activator" flat>{{ currentUser }}</v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-tile-title v-if="item.title !== 'Log out'" :to="{ name: item.link }">{{ item.title }}</v-list-tile-title>
            <v-list-tile-title v-if="item.title == 'Log out'" v-on:click="logout()">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- <v-btn flat>Logout</v-btn>
      <v-btn flat>John Smith</v-btn> -->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase';
export default {
  data: () => ({
    isLoggedIn: false,
    currentUser: false,
    items: [
      { title: 'Admin', link: "Admin" },
      { title: 'Settings', link: "Settings" },
      { title: 'Log out' }
    ]
  }),
  created: function () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email; 
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
}
</script>
