<template>
  <!-- <div style="height: 80%"> -->
    <!-- <v-card height="100%"> -->

    <v-container fill-height app fluid>

      <!-- <v-layout row justify-left> -->
         <!-- use these on v-row for emergnecy use???   class="grey" style="position: absolute; height: 100%; width: 100%" -->
      <v-row justify="space-around" align="center" no-gutters>
        <v-col md="3">
          <v-card>

            <v-toolbar color="white" flat>
              <v-btn icon light @click="$router.go(-1)">
                <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
              </v-btn>

              <v-toolbar-title class="grey--text text--darken-4">{{ directory }}</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card max-width="150px" flat>
                <v-text-field
                  clearable
                  hide-details
                  dense
                  prepend-icon="search"
                  placeholder="Search"
                  v-model="searchString"
                  @input="searchList">
                </v-text-field>
              </v-card>
            </v-toolbar>

            <v-list v-if="!videolist.length == 0">
              <v-list-item-group v-model="videoindex" color="primary">
                <v-list-item
                  v-for="(video, i) in videolist"
                  :key="i"
                  @click="selectVideo(video)"
                  v-show="video.display"
                >
                  {{ video.title }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list v-else-if="!isLoading">
              <v-list-item>
                No files
              </v-list-item>
            </v-list>
            <v-btn
                color="primary"
                dark
                absolute
                bottom
                right
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="container">
          <!-- <div>Duration: {{ duration }}</div> -->
          <!-- <div class="container"> -->
              <vueplyr @timeupdate="videoTimeUpdated" :emit="['timeupdate', 'enterfullscreen', 'exitfullscreen']" @enterfullscreen="enterFullScreen" @exitfullscreen="exitFullScreen" ref="player">
                <!-- <div class="plyr__video-embed" id="player"> -->
                <video :src="this.$data.currentVideosrc" :style="[this.isFullscreen ? {'max-height': '100vh'} : {'max-height': '80vh'}]">
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
  <!-- </v-card> -->
</template>

<script>
import vueplyr from '@/components/Video/vueplyr'
import VideoService from '@/services/VideoService'
// https://github.com/redxtech/vue-plyr/tree/master/src

export default {
  components: {
    vueplyr
  },
  props: {
    // videolist: Array
    // directory: String
  },
  data () {
    return {
      duration: null,
      player: '',
      videolist: [],
      videoindex: null,
      currentVideosrc: null,
      isFullscreen: false,
      directory: '',
      searchString: null
    }
  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
  },
  created: async function () {
    this.directory = this.$route.params.id
    console.log('getting list for: ', this.directory)
    const list = await VideoService.getlist(this.directory)
    const baseURL = await VideoService.getBaseURL(this.directory)
    this.$data.videolist = list.data
    // console.log(this.$data)
    this.$data.videolist.forEach((video) => {
      // console.log(video)
      let file = video.name.replace(/ /g, '%20')
      // console.log('src: ' + baseURL + `${file}`)
      video.src = baseURL + `${file}`
      video.filename = `${file}`
      if (!video.hasOwnProperty('title')) {
        video.title = video.filename
      }
    })
    console.log('created videolist: ', this.$data.videolist, !this.$data.videolist.length === 0)
    this.$store.commit('stopLoading')
  },
  mounted () {
    this.player = this.$refs.player.player
    this.player.src = {}
  },
  methods: {
    fetchlist: async function () {
    },
    searchList () {
      // console.log(this.searchString, this.playlist, this.$data.searchString)
      this.videolist.forEach((item) => {
        if (this.$data.searchString) {
          if ((item.hasOwnProperty('title') && item.title.toLowerCase().includes(this.searchString.toLowerCase())) || (item.hasOwnProperty('name') && item.name.toLowerCase().includes(this.searchString.toLowerCase()))) {
            item.display = true
          } else {
            item.display = false
          }
        } else if (this.searchString === '' || this.searchString === null) {
          item.display = true
        }
      })
    },
    videoTimeUpdated: function (event) {
      this.duration = this.player.currentTime
    },
    selectVideo (video) {
      console.log('selected: ', video.src)
      this.$data.currentVideosrc = video.src
      this.player.restart()
    },
    enterFullScreen (event) {
      console.log('fullscreened' + event)
      this.isFullscreen = true
    },
    exitFullScreen (event) {
      console.log('fullscreened' + event)
      this.isFullscreen = false
    }
  },
  computed: {
    // title: function () {
    //  return this.$route.params.id
    // },
    isLoading: function () {
      return this.$store.getters['isLoading']
    }
  },
  watch: {
    directory: function (val) {
      console.log('got new dir!')
      // this.fetchlist()
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
