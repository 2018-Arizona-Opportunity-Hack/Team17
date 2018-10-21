<template>

  <v-container id="NewEvent">
    <v-card>
      <v-container>
          <h3>Make a New Event</h3>

          <v-flex xs36 sm36 md18>
            <v-text-field
              label="Name"
              v-model="name"
              placeholder="Dog Shelter"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs36 sm36 md18>
            <v-text-field
              label="organization"
              v-model="organization"
              placeholder="Some ORG"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs36 sm36 md18>
            <v-text-field
              label="Address"
              v-model="address"
              placeholder="2870 North Jade Pl."
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs36 sm36 md18>
            <v-text-field
              label="Zipcode"
              v-model="zipcode"
              placeholder="85287"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs36 sm36 md18>
            <v-text-field
              label="Volunteers Needed"
              v-model="volNeeded"
              placeholder="13"
              box
            ></v-text-field>
          </v-flex>
          <div class="row">
          <v-btn v-on:click="newEvent()" color="success">Create</v-btn>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
    import db from '../components/firebaseInit'
    import uuidv1 from 'uuid/v1'
    export default {
      name: 'Admin',
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
            if(this.name == null || this.volNeeded == null || this.position == null || this.address == null || this.zipcode == null|| this.organization == null) {
              alert("Please fill in all the fields");
              return;
            }
            db.collection('events').add({
            event_id: uuidv1(),
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
<style>
  #NewEvent {
    padding-top: 100px;
  }
</style>
