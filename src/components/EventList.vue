<template>
  <v-container>
    <v-card>
      <div v-for="event in events">
        <Event v-bind:name="event.name" v-bind:date="event.date" v-bind:volunteersNeeded="event.volunteersNeeded" v-bind:signedUp="event.signedUp"/>
        <v-divider></v-divider>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Event from './Event'
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      events: null,
    }
  },
  components: {
    Event 
  },
  mounted: function() {
    this.events = this.getEvents();
  },
  methods: {
    ...mapGetters(["getEvents"]),
  }
}
</script>
