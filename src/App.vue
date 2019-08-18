<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar class="bg-primary text-white" elevated>
          <q-toolbar-title>Podcaststore App</q-toolbar-title>
          <q-btn flat v-if="jwt" label="Logout  " @click="logout()" no-caps  ></q-btn>
          <q-btn flat @click="show_drawer = !show_drawer" round dense icon="menu" ></q-btn>
      </q-toolbar>
    </q-header>
      <q-drawer
          v-if="show_drawer"
          v-model="drawer"
          side="right"
          :width="200"
          :breakpoint="500"
          show-if-above
      >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">

          <q-item clickable @click="viewLogin()">

            <q-item-section avatar>
              <q-icon name="home" ></q-icon>
            </q-item-section>

            <q-item-section>
              Login
            </q-item-section>
          </q-item>
          <q-item clickable @click="viewPodList()">

            <q-item-section avatar>
              <q-icon name="view_list" ></q-icon>
            </q-item-section>

            <q-item-section>
              Podcast List
            </q-item-section>
          </q-item>

          <q-item clickable v-if="jwt !== ''" @click="viewPodCreate()">
            <q-item-section avatar>
              <q-icon name="add_box" ></q-icon>
            </q-item-section>

            <q-item-section>
              Podcast Create
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <PodcastList v-if="views[pod_list_view]" :podcasts="podcasts" :base_url="base_url"/>
      <PodcastCreate :jwt=jwt v-if="views[pod_create_view] && jwt !== '' "/>
      <Login :last_username=last_username v-if="views[login_view]"/>
      <LoginCreate v-if="views[login_new_view]"/>
    </q-page-container>
    <q-footer elevated>
      <q-toolbar>
        <div class="col">
          <q-btn icon="star" label="Podcaststore on GitHub" no-caps @click="visitGitHub()" flat></q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import PodcastList from './components/PodcastList.vue'
import PodcastCreate from './components/PodcastCreate.vue'
import LoginCreate from './components/LoginCreate.vue';
import Login from './components/Login.vue'
import EventBus from './eventBus.js'
import axios from "axios";

export default {
  name: 'LayoutDefault',

  components: {
    PodcastList,
    PodcastCreate,
    Login,
    LoginCreate,
  },
  methods: {
    async getPodcasts() {
      let res = await axios.get(this.podcast_url);
      if (res.status !== 200) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Failed to fetch podcasts. Status code ${res.status}`,
          position: 'center',
          timeout: 2500,
        })
      }
      res.data.results.forEach(x => this.podcasts.push(x));
    },
    logout() {
      this.jwt = '';
      this.last_username = '';
      this.viewLogin();
    },
    viewPodList() {
      this.views = this.views.map(x => false);
      this.views[this.pod_list_view] = true;
    },
    viewPodCreate() {
      this.views = this.views.map(x => false);
      this.views[this.pod_create_view] = true;
    },
    viewLogin() {
      this.views = this.views.map(x => false);
      this.views[this.login_view] = true;
    },
    viewLoginNew() {
      this.views = this.views.map(x => false);
      this.views[this.login_new_view] = true;
    },
    visitGitHub() {
      window.open("https://github.com/viniarck/podcaststore-vuejs", "_blank");
    }
  },

  mounted: function() {
    this.getPodcasts();
    EventBus.$on('JWT_SET', (payload) => {
      this.jwt = payload;
      this.viewPodList();
    })
    EventBus.$on('LOGIN_NEW', (payload) => {
      this.jwt = payload;
      this.viewLoginNew();
    })
    EventBus.$on('LOGIN_CANCEL', (payload) => {
      this.viewLogin();
    })
    EventBus.$on('PODCAST_NEW', (payload) => {
      this.getPodcasts();
    })
    EventBus.$on('LOGIN_USERNAME', (payload) => {
      this.last_username = payload;
    })
  },

  data() {
    return {
      pod_list_view: 0,
      pod_create_view: 1,
      login_view: 2,
      login_new_view: 3,
      views: [false, false, true, false],
      base_url: "http://podcaststore.devdaily.org:4000/v1/",
      podcast_url: "http://podcaststore.devdaily.org:4000/v1/podcast/",
      podcasts: [],
      drawer: true,
      show_drawer: false,
      jwt: "",
      last_username: "",
    }
  }
}
</script>
