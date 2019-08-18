<template>
  <div class="tracklist">
    <div v-if="tracks.length > 0" class="row">
      <div class="col">
        <q-card class="mycard">
          <div class="q-pa-md">
           <q-table
              grid
              card-class="bg-blue-1 text-black"
              title="Tracks"
              :data="tracks"
              :columns="columns"
              row-key="name"
              :filter="filter"
              hide-header
            >
              <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" ></q-icon>
                  </template>
                </q-input>
              </template>
            </q-table>
          </div>
        </q-card>
      </div>
    </div>
    <div v-if="chart_data.length > 0" class="row">
      <div class="col">
        <q-card class="mychart">
          <TrackBarChart :data="chart_data"/>
        </q-card>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import TrackBarChart from './TrackBarChart';

export default {
  name: "TrackList",
  components: {
    TrackBarChart,
  },
  props : {
    podcast: {},
    podcast_track_url: {},
  },
  data () {
    return {
      tracks: [],
      options: this.tracks,
      filter: '',
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Track Title',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
        },
        { name: 'downloaded', label: 'Downloaded', field: 'downloaded'},
        { name: 'release_date', label: 'Release Date', field: 'release_date'},
        { name: 'duration', label: 'Duration', field: 'duration'},
        { name: 'media_url', label: 'Media URL', field: 'media_url'},
      ],
      chart_data: [],
    }
  },
  methods: {
    resetTracks() {
      this.track = null;
      this.tracks = [];
    },
    async updatePodTracks(id) {
      this.resetTracks();
      let res = await axios.get(`${this.podcast_track_url}${id}/`);
      if (res.status !== 200) {
        alert("Failed to fetch tracks from API");
      }
      res.data.results.forEach(x => this.tracks.push(x));
    },
    async updatePodTracksChart(id){
      this.chart_data = [];
      let res = await axios.get(`${this.podcast_track_url}${id}/monthly_download_stats/`);
      if (res.status !== 200) {
        alert("Failed to fetch tracks from API");
      }
      const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      months.forEach(x => this.chart_data.push(res.data[x]));
    },
  },
  watch : {
    podcast: function(newv, oldv){
      this.updatePodTracks(newv.id);
      this.updatePodTracksChart(newv.id);
    },
  }
}
</script>


<style>
.mychart {
  margin: 10px;
}
</style>
