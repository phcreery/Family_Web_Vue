<template>
  <!-- <div> -->
    <v-container fill-height app fluid>
      <!-- <v-layout row justify-left> -->
         <!-- use these on v-row for emergnecy use???   class="grey" style="position: absolute; height: 100%; width: 100%" -->
      <v-row justify="start" align="center" no-gutters>
        <v-col cols="12" md="8">
    <v-card flex class="container">
     <!-- <div>Duration: {{ duration }}</div> -->
     <!-- <div class="container"> -->
        <vueplyr @timeupdate="videoTimeUpdated" :emit="['timeupdate']" ref="player">
          <!-- <div class="plyr__video-embed" id="player"> -->
          <video id="player">
              <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
          </video>
          <!-- </div> -->
        </vueplyr>
        <!-- </div> -->
    </v-card>
    </v-col>
    <v-col md="4">
      <v-card>
        <v-card-text>
          asdf
        </v-card-text>
      </v-card>
    </v-col>
    </v-row>
    <!-- </v-layout> -->
    </v-container>
  <!-- </div> -->
</template>

<script>
import vueplyr from '@/components/Video/vueplyr'
// https://github.com/redxtech/vue-plyr/tree/master/src
export default {
  components: {
    vueplyr
  },
  data () {
    return {
      duration: null,
      player: null
    }
  },
  mounted () {
    this.player = this.$refs.player.player
  },
  methods: {
    videoTimeUpdated: function (event) {
      this.duration = this.player.currentTime
    }
  }
}
</script>

<style scoped>
  .container {
    /* margin: 50px auto; */
    /* max-width: 50%; */
    overflow: hidden;
    /* border-radius: 10px; */
    padding: 0px;
  }
</style>
