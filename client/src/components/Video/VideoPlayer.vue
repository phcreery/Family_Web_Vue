<template>
  <v-container style="height: 100%; overflow-y: scroll;" fluid> <!-- fill-height -->
<!-- <v-row align="start" no-gutters> -->
  <div>
       <v-subheader>
        <v-btn class="mx-2" style="position: absolute; left: 10px;" icon @click="$router.go(-1)">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
        <h3 style="text-indent: 50px;">{{ directory }}</h3>
        <!-- <v-toolbar-title class="grey--text text--darken-4">{{ directory }}</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-card max-width="300px" flat>
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
      </v-subheader>
      </div>
<!-- </v-row> -->
      <!-- <div style="position: absolute; top: 0px;"> -->

      <!-- <v-layout row justify-left> -->
         <!-- use these on v-row for emergnecy use???   class="grey" style="position: absolute; height: 100%; width: 100%" -->
         <v-row no-gutters align="center" style="height: calc(100% - (150px));">
<v-container fill-height fluid>
      <v-row justify="space-around" align="center" no-gutters>

        <v-col cols="12" md="8" sm="8">
          <v-card class="vidcontainer">
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

        <v-col lg="3" md="8" sm="8">
          <v-card style="margin-top: 10px; margin-bottom: 30px">

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
              @click="uploadDialog = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-layout> -->
    <uupload :dialog="uploadDialog" v-on:Confirmed="SubmitFiles" v-on:Cancel="uploadDialog = false" :dmessage="uploaderrmessage" />
    </v-container>
    </v-row>
  </v-container>
</template>

<script>
import vueplyr from '@/components/Video/vueplyr'
import VideoService from '@/services/VideoService'
import uupload from '@/components/Upload'
// https://github.com/redxtech/vue-plyr/tree/master/src

export default {
  components: {
    vueplyr,
    uupload
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
      searchString: null,
      uploadDialog: false,
      uploaderrmessage: ''
    }
  },
  beforeCreate: function () {
    // this.$store.commit('startLoading')
  },
  created: async function () {
    this.fetchlist()
  },
  mounted () {
    this.player = this.$refs.player.player
    this.player.src = {}
  },
  methods: {
    fetchlist: async function () {
      this.$store.commit('startLoading')
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
    },
    SubmitFiles (files) {
      if (files) {
        let formData = new FormData()

        // files
        for (let file of files) {
          formData.append('files', file, file.name)
        }

        // additional data
        // formData.append('test', 'foo bar')
        this.$store.commit('startLoading')
        VideoService.uploadVideo(this.directory, formData)
          .then(response => {
            console.log('Success!')
            console.log({ response })
            this.uploadDialog = false
            this.uploaderrmessage = ''
            this.$store.commit('stopLoading')
            this.fetchlist()
          })
          .catch(error => {
            console.log('msg ', error.response.data)
            this.uploaderrmessage = error.response.data
            this.$store.commit('stopLoading')
          })
      } else {
        console.log('there are no files.')
        this.uploaderrmessage = 'Need at least 1 file'
      }
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
  .vidcontainer {
    /* margin: 50px auto; */
    /* max-width: 50%; */
    /* max-height: 10%; */
    overflow: hidden;
    margin-top: 10px;
    /* border-radius: 10px; */
    padding: 0px;
  }
</style>
