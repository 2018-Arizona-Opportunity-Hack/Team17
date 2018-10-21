<template>
  <v-container style="margin-top: 70px;">
    <v-card style="padding-top: 40px;">
      <v-container>
        <XlsCsvParser :columns="columns" @on-validate="onValidate" />
        <p v-model="results"></p>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import XlsCsvParser from 'vue-xls-csv-parser'
import db from '../components/firebaseInit'
import uuidv1 from 'uuid/v1'

export default {
  components: {
    XlsCsvParser,
  },
  methods: {
  onValidate(results) {
    this.results = JSON.stringify(results, null, 2);
    console.log(JSON.stringify(results, null, 2));
    for(var i=0; i < this.results.length; i++) {
      db
        .collection('volunteers')
        .add({
            name: this.results[i].firstname + " " + this.results[i].lastname,
            volunteer_id: uuidv1(),
            email: this.results[i].email,
            address: this.results[i].address,
            phone: this.results[i].phone,
            zip: this.results[i].zipcode,
            admin: false
        })
      }
    }
  },
  data() {
    return {
      columns: [
          { name: 'Volunteer Status', value: 'volunteer'},
          { name: 'Salutation', value: 'salutation'},
          { name: 'First Name', value: 'firstname' },
          { name: 'Last Name', value: 'lastname' },
          { name: 'Title', value: 'occupation'},
          { name: 'Mailing Street', value: 'address'},
          { name: 'Mailing City', value: 'city'},
          { name: 'Mailing State/Province', value: 'state'},
          { name: 'Mailing Zip/Postal Code', value: 'zipcode'},
          { name: 'Mailing Country', value: 'country'},
          { name: 'Phone', value: 'phone'},
          { name: 'Mobile', value: 'mphone'},
          { name: 'Fax', value: 'fax'},
          { name: 'Email', value: 'email'},
          { name: 'Volunteer Hours', value: 'volunteer_hours'},
          { name: 'First Volunteer Date', value: 'first_volunteer_date'},
          { name: 'Last Volunteer Date', value: 'last_volunteer_date'},
          { name: 'Account Owner', value: 'account_owner'},
          { name: 'Account Name', value: 'account_name'},




          // { name: 'Student lastname', value: 'lastname' },
          // { name: 'Other', value: 'other', isOptional: true },
        ],
      results: null,
    }
  },
}
</script>
