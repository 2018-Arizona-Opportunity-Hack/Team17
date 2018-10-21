

<template>
<div>
  <img src = "../assets/home.png" class = "homepage">
  <v-container>
    <h2 style = "text-align: center"> WHAT WE DO</h2>
    <p class ="statement"> "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum."</p>
  </v-container>
  <v-container>
  <h2>Upcoming Events</h2>
    <EventList />
    </v-container>
</div>
</template>

<script>
import EventList from '../components/EventList'

export default {
  components: {
    EventList
  }
}
</script>

<style>
.homepage {
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 50%;
   padding-top: 80px;
}
.statement {
  font-size: 20px;
}


</style>
