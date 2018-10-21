<template>
  <v-card-text>
    <v-list-tile>
      <v-list-tile-avatar>
        <v-icon v-if="signedUp" color="light-green accent-4">how_to_reg</v-icon>
        <v-icon v-if="!signedUp" color="grey lighted-1">how_to_reg</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title><b>{{ name }}</b></v-list-tile-title>
        <v-list-tile-sub-title>{{ date }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-list-tile-sub-title>Houston, Texas</v-list-tile-sub-title>
        <v-list-tile-sub-title>{{ volunteersNeeded }} Volunteers Needed</v-list-tile-sub-title>
      </v-list-tile-action>
    </v-list-tile>
  </v-card-text>
</template>

<script>
import Alert from './Alert';

export default {
  props: ['name', 'date', 'volunteersNeeded', 'signedUp'],
  components: {
    Alert 
  },
}
</script>