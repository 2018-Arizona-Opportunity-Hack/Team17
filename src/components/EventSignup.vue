<template>
<button @click="loadMyModal"></button>
</template>
<script>
export default {
  methods: {
    loadMyModal() {
      this.$modal.open({
        id: 'my-modal',
        component: import('../componenets/EventInfo.vue'),
        options: {
          destroy: true
        },
        props: {
          whatever
        }
      })
    }
  }
}
</script>
