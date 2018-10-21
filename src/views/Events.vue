<template>
  <v-container class="events">
      <EventList moreButton="false" number="20" />
      <!-- <router-link class="secondary-content" :to = "{name: 'EventInfo', params: {event_id: event.event_id}}">
            <v-icon>home</v-icon>
      </router-link> -->
  </v-container>
</template>

<script>
import db from '../components/firebaseInit'
import EventList from '../components/EventList'
export default {
  name: 'events',
  components: {
    EventList
  }
}
</script>
<style>
  .events {
    padding-top: 50px;
  }
</style>
<!-- // <script>
// import db from 'firebaseInit'
// <style>
// .eventList {
//   margin-top: 55px;
// }
// </style> -->
