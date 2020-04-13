<template>
  <div class="lister">
    <!-- <v-layout fill-height> -->
      <!-- <v-row no-gutters> -->
        <!-- <v-col> -->
      <div :class="{playlist}" class="overflow-y-auto">
        <!-- <v-card style="position: absolute; max-height: 100%; width: 100%;" class="overflow-y-auto"> -->
        <v-list>
          <v-subheader>MUSIC</v-subheader>
          <v-list-item-group v-model="item">
          <v-list-item
            v-for="(track, index) in playlist"
            :key="track.title"
            v-show="track.display"
            :class="[{selected: track === currentTrack}]"
            @click="selectTrack(track)" @dblclick="playTrack()">
            <v-list-item-action>
              <v-btn icon :block=true small color="secondary" @click="selectTrack(track); playTrack()">
                <v-icon>{{ track == currentTrack ? 'mdi-pause' : 'mdi-play' }}</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title :class="[{selected: track === currentTrack}]">{{ index | numbers }}  {{ track.artist }} - {{ track.title }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            {{ track.duration | minutes }}
          </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- </v-card> -->
      </div>
      <!-- </v-col> -->
      <!-- </v-row> -->
      <!-- <v-row> -->
    <v-flex>
    <MusicBar></MusicBar>
    </v-flex>
    <!-- </v-row> -->
    <!-- </v-layout> -->
  </div>
</template>

<script>
import MusicService, { MusicEventBus } from '@/services/MusicService'
import {Howl, Howler} from 'howler'
import MusicBar from './MusicBar'

export default {
  data () {
    return {
      playlist: [],
      selectedTrack: null,
      item: 1,
      index: 0,
      playing: false,
      loop: false,
      shuffle: false,
      seek: 0,
      muted: false,
      volume: 1,
      sliderProgress: 0
    }
  },
  components: {
    MusicBar
  },
  methods: {
    selectTrack (track) {
      this.$data.selectedTrack = track
    },
    playTrack (index) {
      let selectedTrackIndex = this.$data.playlist.findIndex(track => track === this.$data.selectedTrack)
      console.log(index)
      if (typeof index === 'number') {
        this.$data.index = index
        console.log('skipping by number:', index)
      } else if (this.$data.selectedTrack) {
        if (this.$data.selectedTrack !== this.currentTrack) {
          this.stopTrack()
        }
        console.log('skipping by selectedTrack:', index)
        index = selectedTrackIndex
      } else {
        index = this.$data.index
        console.log('skipping by index:', index)
      }
      let track = this.$data.playlist[index].howl

      if (track.playing()) {
        return
      } else {
        track.play()
      }
      this.$data.selectedTrack = this.$data.playlist[index]
      this.$data.playing = true
      this.$data.index = index
    },
    pauseTrack () {
      this.currentTrack.howl.pause()
      this.$data.playing = false
    },
    stopTrack () {
      this.currentTrack.howl.stop()
      this.$data.playing = false
    },
    skipTrack (direction) {
      let index = 0
      if (direction === 'next') {
        index = this.$data.index + 1
        // console.log(index, this.$data.playlist.length)
        if (index >= this.$data.playlist.length) {
          index = 0
        }
      } else {
        index = this.$data.index - 1
        if (index < 0) {
          index = this.$data.playlist.length - 1
        }
      }
      console.log('skipping to ' + index)
      this.skipTo(index)
    },
    skipTo (index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop()
      }
      console.log('playing ', index)
      this.playTrack(index)
    },
    updateVolume (volume) {
      Howler.volume(volume)
    },
    toggleMute () {
      Howler.mute(!this.muted)
      this.muted = !this.muted
    },
    updateSeek (event) {
      console.log(event)
      // let el = document.querySelector('.progress-linear__bar')
      // let mousePos = event.offsetX
      // let elWidth = el.clientWidth
      let percents = event
      let track = this.currentTrack.howl
      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    },
    setSeek (percents) {
      let track = this.currentTrack.howl
      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    }
  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
    setTimeout(() => {}, 3000)
  },
  created: async function () {
    const list = await MusicService.getlist()
    const baseURL = await MusicService.getBaseURL()
    this.$data.playlist = list.data
    console.log(this.$data)
    this.$data.playlist.forEach((track) => {
      console.log(track)
      let file = track.name.replace(/ /g, '%20')
      console.log('src: ' + baseURL + `${file}`)
      track.howl = new Howl({
        src: [baseURL + `${file}`]
      })
    })
    this.$store.commit('stopLoading')
  },
  mounted: function () {
    MusicEventBus.$on('playtrack', (index) => { this.playTrack(index) })
    MusicEventBus.$on('pausetrack', () => { this.pauseTrack() })
    MusicEventBus.$on('stoptrack', () => { this.stopTrack() })
    MusicEventBus.$on('skiptrack', (direction) => { this.skipTrack(direction) })
    MusicEventBus.$on('updateseek', (seek) => { this.setSeek(seek) })
  },
  filters: {
    numbers: (value) => {
      let number = value + 1
      if (number < 10) {
        return '0' + number + '.'
      }
      return number + '.'
    },
    minutes: (value) => {
      if (!value) return '00:00'
      let min = parseInt(value / 60)
      let sec = parseInt(value % 60)
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      value = min + ':' + sec
      return value
    }
  },
  computed: {
    currentTrack: {
      get () {
        return this.$data.playlist[this.$data.index]
      },
      set (value) {
      }
    },
    progress () {
      if (this.currentTrack.howl.duration() === 0) return 0
      return this.$data.seek / this.currentTrack.howl.duration()
    },
    getTrackInfo () {
      let artist = this.currentTrack.artist
      let title = this.currentTrack.title
      let seek = this.$data.seek
      let duration = this.currentTrack.howl.duration()
      return {
        artist,
        title,
        seek,
        duration
      }
    },
    trackProgress: {
      set: function (event) {
        console.log(event)
        this.updateSeek(event)
      },
      get: function () {
        // console.log(this.progress * 100)
        return this.progress * 100
      }
    }
  },
  watch: {
    playing: function (playing) {
      this.$data.seek = this.currentTrack.howl.seek()
      let updateSeekr
      if (playing) {
        // this.$data.sliderProgress = this.progress * 100
        updateSeekr = setInterval(() => {
          this.$data.seek = this.currentTrack.howl.seek()
        }, 800)
      } else {
        clearInterval(updateSeekr)
      }
    },
    seek: function (val) {
      // this.$store.commit('setMusicprogress', this.progress)
      // console.log('new progress' + this.progress, val)
      MusicEventBus.$emit('updateprogress', this.progress)
      MusicEventBus.$emit('updatetrackinfo', this.getTrackInfo)
    }
  }
}
</script>

<style scoped>
  .selected {
    background-color:  rgb(214, 214, 214) !important;
    font-size: 1.5rem;
  }
  .playlist {
    /* overflow-y: auto */
    position: absolute;
    max-height: calc(100% - 90px);
    width: 100%;
  }
  .lister {
    /* overflow: hidden; */
  }

</style>
