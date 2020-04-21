<template>
  <!-- <div> -->
    <v-container fill-height app fluid>
      <!-- <v-layout row justify-left> -->
         <!-- use these on v-row for emergnecy use???   class="grey" style="position: absolute; height: 100%; width: 100%" -->
      <v-row justify="space-around" align="center" no-gutters>
        <v-col md="3">
          <v-card>
            <v-card-text>
              Videos
            </v-card-text>
            <v-list>
              <v-list-item-group v-model="videoindex" color="primary">
              <v-list-item
                v-for="(video, i) in videolist"
                :key="i"
                @click="selectVideo(video)"
              >
                {{ video.title }}
              </v-list-item>
            </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="container" style="max-height: 80vh">
          <!-- <div>Duration: {{ duration }}</div> -->
          <!-- <div class="container"> -->
              <vueplyr @timeupdate="videoTimeUpdated" :emit="['timeupdate']" ref="player">
                <!-- <div class="plyr__video-embed" id="player"> -->
                <video :src="this.$data.currentVideosrc" style="max-height: 80vh">
                    <!-- <source :src="this.$data.currentVideosrc" type="video/mp4"  /> -->
                </video>
                <!-- </div> -->
              </vueplyr>
              <!-- </div> -->
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-layout> -->
    </v-container>
  <!-- </div> -->
</template>

<script>
import vueplyr from '@/components/Video/vueplyr'
import VideoService from '@/services/VideoService'
// https://github.com/redxtech/vue-plyr/tree/master/src
export default {
  components: {
    vueplyr
  },
  data () {
    return {
      duration: null,
      player: null,
      videolist: [],
      videoindex: 0,
      currentVideosrc: null
    }
  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
    setTimeout(() => {}, 3000)
  },
  created: async function () {
    const list = await VideoService.getlist()
    const baseURL = await VideoService.getBaseURL()
    this.$data.videolist = list.data
    console.log(this.$data)
    this.$data.videolist.forEach((video) => {
      console.log(video)
      let file = video.name.replace(/ /g, '%20')
      console.log('src: ' + baseURL + `${file}`)
      video.src = baseURL + `${file}`
      video.filename = `${file}`
      if (!video.hasOwnProperty('title')) {
        video.title = video.filename
      }
    })
    // console.log(this.$data.videolist[this.$data.video].src)
    this.$store.commit('stopLoading')
  },
  mounted () {
    this.player = this.$refs.player.player
    this.player.src = {}
  },
  methods: {
    videoTimeUpdated: function (event) {
      this.duration = this.player.currentTime
    },
    selectVideo (video) {
      console.log(video.src)
      this.$data.currentVideosrc = video.src
      this.player.restart()
    }
  }
}
</script>

<style scoped>
  .container {
    /* margin: 50px auto; */
    /* max-width: 50%; */
    /* max-height: 10%; */
    overflow: hidden;
    /* border-radius: 10px; */
    padding: 0px;
  }
</style>
