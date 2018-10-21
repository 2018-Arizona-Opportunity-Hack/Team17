<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        <v-container>
          <h3 class="headline loginHeader mb-0">Login</h3>
          <LoginForm />
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>

<style>
.loginHeader {
  padding-bottom: 35px;
}
</style>