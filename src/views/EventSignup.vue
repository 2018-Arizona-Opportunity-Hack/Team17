<template>

<modal-item :header="Header" :footer="true">
  <template slot="header">
    <button>×</button>
    <h4>
      <div class="modal-title">TITLE</div>
    </h4>
  </template>

  Body textarea

  <div class="modal-body" slot="body">

  </div>

  <template slot="footer">
    <button class="btn btn-default"></button>
  </template>
</modal-item>
</template>
<script>
import { ModalItem } from 'EventSignup'

export default {
  components: {
    ModalItem
  }
}
</script>
