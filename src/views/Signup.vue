<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        <v-container>
          <h3 class="headline signupHeader mb-0">Signup</h3>
          <SignupForm />
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import SignupForm from '../components/SignupForm'
export default {
  components: {
    SignupForm
  }
}
</script>

<style>
.signupHeader {
  padding-bottom: 35px;
}
</style>