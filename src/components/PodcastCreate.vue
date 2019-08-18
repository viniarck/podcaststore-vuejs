<template>
 <div class="q-pa-md">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="podName"
          label="Podcast name *"
          lazy-rules
          :rules="[ val => val.length < 128 || 'The podcast name should be < 128 chars' ]"
        ></q-input>

        <q-input
          filled
          v-model="title"
          label="Podcast title"
          lazy-rules
          :rules="[
          val => val.length < 128 || 'The podcast title should be < 128 chars'
          ]"
        ></q-input>

        <q-input
          filled
          v-model="start_date"
          label="Podcast start date"
          mask="####-##-##"
          lazy-rules
          :rules="[
          val => val.length < 128 || 'Please type the podcast start date'
          ]"
        ></q-input>

        <div>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" ></q-btn>
        </div>
      </q-form>

    </div>
</template>

<script>
import axios from "axios";
import EventBus from './../eventBus.js'

export default {
  name: "PodcastCreate",
  props: {
    jwt: {},
  },
  data() {
    return {
      podName: "",
      title: "",
      start_date: "",
      login_url: "http://podcaststore.devdaily.org:4000/v1/podcast/"
    }
  },
  methods: {
    async submitPodcast() {
        let payload = {name: this.podName};
        if (this.title !== "") {
          payload.title = this.title;
        }
        if (this.start_date !== "") {
          payload.start_date = this.start_date;
        }
      try {
        let res = await axios.post(this.login_url, payload , {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.jwt}`}});
        if (res.status !== 201) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: `Failed to create a new podcast. Status code ${res.status}`,
            position: 'center',
            timeout: 2500,
          })
        } else {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check',
            type: 'positive',
            message: `Successfully created podcast: ${this.podName}`,
            position: 'center',
            timeout: 2500,
          })
          EventBus.$emit("PODCAST_NEW", "");
          this.onReset();
        }
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Failed to create a podcast: ${JSON.stringify(err.response.data)}`,
          position: 'center',
          timeout: 2500,
        })
      }
    },
    onSubmit() {
      this.submitPodcast();
    },
    onReset() {
      this.podName = "";
      this.title = "";
      this.start_date = "";
    }
  }
}
</script>
