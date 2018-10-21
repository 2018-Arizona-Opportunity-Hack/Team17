<template>
  <div id="NewEvent">
    <h3>Make a New Event</h3>
    <div class="row">
    <form @submit.prevent="newEvent" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Title of Event</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="organization" required>
          <label>organization</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="address" required>
          <label>address</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="zipcode" required>
          <label>zipcode</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="volNeeded" required>
          <label>Volunteers Needed</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from '../commit/firebaseInit'
    export default {
      name: 'NewEvent',
      data () {
        return {
          event_id: null,
          name: null,
          dept: null,
          position: null,
          organization: null,
          zipcode: null,
          address: null,
          volNeeded: null,

        }
      },
      methods: {
        newEvent () {
          db.collection('events').add({
            // MAKE AN RNG FOR THE EVENT ID FOR THIS ONE
            event_id: this.event_id,
            name: this.name,
            volNeeded: this.volNeeded,
            position: this.position,
            address: this.address,
            zipcode: this.zipcode,
            organization: this.organization
          })
          .then(docRef => {
            console.log('Event added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding Event: ', error)
          })
        }
      }
    }
</script>
