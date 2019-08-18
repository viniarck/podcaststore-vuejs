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
          :rules="[ val => val !== null && val.length > 0 || 'Please type your username']"
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

        <q-input
          filled
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[
          val => val !== null && val.length > 0 || 'Please type your e-mail',
          val => /\S+@\S+\.\S+/.test(val) || 'Please type a valid e-mail',
          ]"
        ></q-input>

        <q-input
          filled
          v-model="name"
          label="First name "
          lazy-rules
          :rules="[
          val => val.length < 128 || 'Your name should be < 128 chars'
          ]"
        ></q-input>

        <q-input
          filled
          v-model="last_name"
          label="Last name "
          lazy-rules
          :rules="[
          val => val.length < 128 || 'Your name should be < 128 chars'
          ]"
        ></q-input>

        <div>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
          <q-btn label="Reset" type="reset" color="primary" class="q-ml-sm" ></q-btn>
          <q-btn label="Cancel" color="primary" class="q-ml-sm" @click="onCancel()" ></q-btn>
        </div>
      </q-form>

    </div>
</template>

<script>
import axios from "axios";
import EventBus from './../eventBus.js'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      name: "",
      last_name: "",
      login_url: "http://podcaststore.devdaily.org:4000/v1/identify/",
    }
  },
  methods: {
    async submitLogin() {
        let payload = {username: this.username, password: this.password, email: this.email};
        if (this.name !== "") {
          payload.first_name = this.name;
        }
        if (this.last_name !== "") {
          payload.last_name = this.last_name;
        }
      try {
        let res = await axios.post(this.login_url, payload , {headers: {'Content-Type': 'application/json'}});
        if (res.status !== 201) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: `Failed to create a login. Status code ${res.status}`,
          })
        } else {
          EventBus.$emit('JWT_SET', res.data.token);
        }
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Failed to create a login: ${JSON.stringify(err.response.data)}`,
          position: 'center'
        })
      }
    },
    onSubmit () {
      this.submitLogin();
    },
    onCancel () {
      EventBus.$emit("LOGIN_CANCEL", "");
    },
    onReset () {
      this.username = "";
      this.password = "";
      this.email = "";
      this.name = "";
      this.last_name = "";
    }
  }
}
</script>
