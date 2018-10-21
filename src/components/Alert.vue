<template>
  <v-dialog
    :max-width="290"
  >
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['title', 'message'],
}
</script>