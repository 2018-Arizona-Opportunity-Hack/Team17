<template>
  <v-container class="loginCard">
    <v-card>
      <v-card-title primary-title>
        <v-container>
          <h3 class="headline loginHeader mb-0">Login</h3>
          <h4 class>Don't have an account? <a href="\signup">Signup</a></h4>
          <br>
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
  padding-bottom: 10px;
}
.loginCard {
  margin-top: 85px;
}
</style>
