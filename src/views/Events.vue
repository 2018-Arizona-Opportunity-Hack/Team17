<template>
  <v-container>
    <EventList class="eventList" />
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

<style>
.eventList {
  margin-top: 55px;
}
</style>
