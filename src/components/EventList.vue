<template>
  <v-container>
    <v-card>
      <!-- <router-link class="secondary-content" :to = "{name: 'EventInfo', params: {event_id: event.event_id}}">
            <v-icon>home</v-icon>
      </router-link> -->
      <div @click="goTo(event.event_id, 'EventInfo')" v-for="event in events.slice(0, number)">
        <Event  :key="event.event_id" v-bind:name="event.name" v-bind:date="event.date" v-bind:volunteersNeeded="event.volNeeded" v-bind:address="event.address"/>
        <v-divider></v-divider>
      </div>
    </v-card>
    <v-btn v-if="moreButton == true" class="more" block color="grey" dark>More</v-btn>
  </v-container>
</template>

<script>
import Event from './Event'
import db from './firebaseInit';
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      events: [],
    }
  },
  components: {
    Event
  },
  created () {
    db.collection('events').get().then
    (querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'event_id': doc.data().event_id,
          'name': doc.data().name,
          'description':doc.data().description,
          'zipcode':doc.data().zipcode,
          'address':doc.data().address,
          'volNeeded':doc.data().volNeeded,
        }
        this.events.push(data)
      })
    })
  },
  props: ['number', 'moreButton'],
  methods: {
    ...mapGetters(["getEvents"]),
    goTo(event, rName) {
      this.$router.push({name: rName, params: {event_id: event}})
    }
  }
}
</script>
