<template>
  <div id="EventInfo">
    <v-container>
      <v-card style="padding: 30px">
        <h1>{{name}}</h1>
        <p>event ID#: {{event_id}}</p><br>
        <p>description: {{description}}</p><br>
        <p>address: {{address}}</p><br>
        <p>zipcode: {{zipcode}}</p><br>
        <!-- <button @click="deleteevent" class="btn red">Delete</button> -->
        <v-card-actions>
          <v-btn to="/Events" class="btn grey">Back</v-btn>
          <v-btn :to="{ name: 'EventSignup', params: { event_id: event_id }}" class="btn-floating btn-large red">

            <v-icon>home</v-icon>
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-container>

  </div>
</template>

<script>
import db from '../components/firebaseInit';
export default {
  name: 'EventInfo',
  data() {
    return {
      event_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection('events')
      .where('event_id', '==', to.params.event_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.event_id = doc.data().event_id;
            vm.name = doc.data().name;
            vm.description = doc.data().description;
            vm.address = doc.data().address;
            vm.zipcode = doc.data().zipcode;
            vm.volNeeded = doc.data().volNeeded;
            vm.date = doc.data().date;
            vm.organization = doc.date().date;
          });
        });
      });
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      db
        .collection('events')
        .where('event_id', '==', this.$route.params.event_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.event_id = doc.data().event_id;
            this.name = doc.data().name;
            this.description = doc.data().description;
            this.address = doc.data().address;
            this.zipcode = doc.data().zipcode;
            this.volNeeded = doc.data().volNeeded;
            this.date = doc.data().date;
            this.organization = doc.data().date;
          });
        });
    },
    // deleteEvent() {
    //   if (confirm('Are you sure?')) {
    //     db
    //       .collection('events')
    //       .where('event_id', '==', this.$route.params.event_id)
    //       .get()
    //       .then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //           doc.ref.delete();
    //           this.$router.push('/');
    //         });
    //       });
    //   }
    // }
  }
};
</script>
<style>
  #EventInfo {
    padding-top: 100px;
  }
</style>
