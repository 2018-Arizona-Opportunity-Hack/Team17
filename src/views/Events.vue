<template>
  <v-container>
      <div id = "events">
        <ul class = "collection with-header">
          <li class="collection-header"><h4>Events</h4></li>
          <li v-for="event in events" v-bind:key="event.id"
          class="collection-item">
          <div class= "chip">{{events.volNeeded}}</div>
            {{event.event_id}}:{{event.name}}
      <router-link class="secondary-content" :to = "{name: 'EventInfo', params: {event_id: event.event_id}}">
            <v-icon>home</v-icon>
      </router-link>
        </li>
        </ul>
      </div>
  </v-container>
</template>

<script>
import db from '../components/firebaseInit'
export default {
  name: 'events',
  data () {
    return {
      events: []
    }
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
  }
}
</script>
<style>
  #events {
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
