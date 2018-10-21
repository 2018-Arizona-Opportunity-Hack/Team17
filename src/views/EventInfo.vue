<template>
  <!-- <v-container>
    <v-flex xs8>
    <v-btn v-on:click="register" color="success">Signup</v-btn>
    </v-flex>
    <v-flex xs4>
      <p> Requirements <p>
  </v-container> -->
  <div id="view-event">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">description: {{description}}</li>
      <li class="collection-item">name: {{description}}</li>
      <li class="collection-item">zipcode: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>
    <!--I have no idea what the bottom section does; figure it out -->
    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-event', params: { event_id: event_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '../components/firebaseInit';
export default {
  name: 'Events',
  data() {
    return {
      event_id: null,
      name: null,
      description: null.
      zipcode: null,
      volNeed: null
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
            vm.zipcode = doc.data().zipcode;
            vm.volNeed = doc.data().volNeed;
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
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.description = doc.data().description;
            this.zipcode = doc.data().zipcode;
            this.volNeed = doc.data().volNeed;
          });
        });
    }
  }
};
</script>
