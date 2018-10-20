<template>
  <v-container>
    <h2>Upcoming Events</h2>
    <EventList />
  </v-container>
</template>

<script>
import EventList from '../components/EventList'

export default {
  components: {
    EventList
  }
}
</script>
