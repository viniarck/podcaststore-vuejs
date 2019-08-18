<template>
  <div class="podcastitem">
    <div class="row">
      <div class="col">
        <q-card class="mycard">
          <q-select
            filled
            label="podcast"
            v-model="podcast"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            option-value="id"
            option-label="name"
            @filter="filterFn"
          >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          </q-select>
        </q-card>
      </div>
    </div>
      <TrackList :podcast="podcast" :podcast_track_url="podcast_track_url"/>
  </div>
</template>


<script>
import TrackList from './TrackList.vue';
import axios from "axios";
import {Notify} from 'quasar';


export default {
  name: "PodcastList",
  components: {
    TrackList,
  },
  props: {
    podcasts: {},
    base_url: {},
  },
  data () {
    return {
      options: this.podcasts,
      tracks: [],
      podcast: null,
      podcast_track_url: `${this.base_url}track/podcast/`,
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.podcasts.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      })
    }
  },
}
</script>


<style>
.mycard {
  margin: 10px;
  margin-top: 20px;
}
</style>
