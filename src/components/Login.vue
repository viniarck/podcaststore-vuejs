<template>
 <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Username *"
        lazy-rules
        :rules="[
        val => val !== null && val.length > 0 || 'Please type your username',
        val => val !== last_username || 'Please logout first'
        ]"
      ></q-input>

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
        val => val !== null && val.length > 0 || 'Please type your password'
        ]"
      ></q-input>
      <div>
        <q-btn label="Login" type="submit" color="primary"></q-btn>
        <q-btn label="Create a new account" type="reset" color="primary" flat class="q-ml-sm" ></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from './../eventBus.js'

export default {
  name: "Login",
  props: {
    last_username: {},
  },
  data() {
    return {
      username: '',
      password: '',
      jwt: '',
      login_url: "http://podcaststore.devdaily.org:4000/v1/auth/"
    }
  },
  methods: {
    async submitLogin() {
      try {
        let res = await axios.post(this.login_url, {username: this.username, password: this.password}, {headers: {'Content-Type': 'application/json'}});
        if (res.status !== 201) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: `Failed to login. Status code ${res.status}`,
          })
        } else {
          this.jwt = res.data.token;
          EventBus.$emit('JWT_SET', this.jwt);
          EventBus.$emit('LOGIN_USERNAME', this.username);
        }
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Failed to login: ${err.response.data}`,
          position: 'center'
        })
      }
    },
    onSubmit () {
      this.submitLogin();
    },

    onReset () {
      EventBus.$emit('LOGIN_NEW');
    }
  },
}
</script>
