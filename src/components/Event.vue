<template>
  <v-card-text>
    <v-list-tile>
      <v-list-tile-action>
        <v-icon v-if="signedUp" color="light-green accent-4">how_to_reg</v-icon>
        <v-icon v-if="!signedUp" color="grey lighted-1">how_to_reg</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ date }}</v-list-tile-sub-title>
        <v-list-tile-sub-title>{{ volunteersNeeded }} Volunteers Needed</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-card-text>
</template>

<script>
export default {
  props: ['name', 'date', 'volunteersNeeded', 'signedUp'],
  data: function () {
    return {
      signedUp: "red",
      iconColor: null
    }
  },
  mounted: function () {
    this.signedUp = signedUp
  },
}
</script>