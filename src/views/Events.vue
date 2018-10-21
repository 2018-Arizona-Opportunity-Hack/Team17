<template>
  <v-container>
    <div id = "Events">
      <h3>Events</h3>
    <EventList class="eventList" />
  </div>
  </v-container>
</template>

<script>
import db from '../components/firebaseInit'
export default {
  name: 'dashboard',
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
          'event_id': doc.id,
          'name': doc.data().name,
          'description':doc.data().description,
          'zipcode':doc.data().zipcode,
          'address':doc.data().address,
        }
        this.events.push(data)
      })
    })
  }
}
</script>
<!-- // <script>
// import db from 'firebaseInit'
// <style>
// .eventList {
//   margin-top: 55px;
// }
// </style> -->
