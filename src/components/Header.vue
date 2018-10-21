<template>
  <v-toolbar fixed>
    <v-toolbar-title>Uro</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Home</v-btn>
      <v-btn flat>Events</v-btn>
      <!-- <v-btn flat>Admin</v-btn> -->
      <v-btn flat>Login</v-btn>
      <v-menu offset-y>
        <v-btn slot="activator" flat>Alexander</v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click=""
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- <v-btn flat>Logout</v-btn>
      <v-btn flat>John Smith</v-btn> -->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
  data: () => ({
    items: [
      { title: 'Admin' },
      { title: 'Settings' },
      { title: 'IDK' },
      { title: 'Log out' }
    ]
  })
}
</script>
