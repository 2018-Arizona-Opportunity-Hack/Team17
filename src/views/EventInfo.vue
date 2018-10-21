<template>
  <div id="EventInfo">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">event ID#: {{event_id}} </li>
      <li class="collection-item">description: {{description}}</li>
      <li class="collection-item">address: {{address}}</li>
      <li class="collection-item">zipcode: {{zipcode}}</li>

    </ul>
    <router-link to="/Events" class="btn grey">Back</router-link>
    <!-- <button @click="deleteevent" class="btn red">Delete</button> -->

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'EventSignup', params: { event_id: event_id }}" class="btn-floating btn-large red">
        <v-icon>home</v-icon>
      </router-link>
    </div>
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
