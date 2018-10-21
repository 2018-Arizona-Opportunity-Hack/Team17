<template>
  <div id="EventSignup">
    <h3>Volunteer Signup</h3>
    <div class="row">
    <form @submit.prevent="saveEvent" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="event_id" required>
          <label>Event ID#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="zipcode" required>
          <label>zipcode</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/Events" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from '../components/firebaseInit'
    export default {
      name: 'Signup',
      data () {
        return {
          event_id: null,
          name: null,
          zipcode: null
        }
      },
      methods: {
        saveEvent () {
          db.collection('events').add({
            event_id: this.events,
            name: this.name,
            zipcode: this.zipcode,
          })
          db.collection('volunteers').add({
            event_id: this.events,
            name: this.name,
            zipcode: this.zipcode,
          })
          .then(docRef => {
            console.log('Volunteer added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding event: ', error)
          })
        }
      }
    }
</script>
<style>
  #EventSignup {
    padding-top: 100px;
  }
</style>
