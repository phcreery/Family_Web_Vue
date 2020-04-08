<template>
  <div>
      <div :class="{playlist}">

        <v-list>
          <v-subheader>MUSIC</v-subheader>
          <v-list-item-group v-model="item" >
          <v-list-item
            v-for="(track, index) in playlist"
            :key="track.title"
            v-show="track.display"
            color="secondary">
            <v-list-item-action>
              <v-btn fab dark :block=true small color="primary" @click="playTrack()">
                <v-icon>mdi-play</v-icon>
              </v-btn>
              </v-list-item-action>
            <v-list-item-content @click="selectTrack(track)" @dblclick="playTrack()">
              <v-list-item-title>{{ index | numbers }}  {{ track.artist }} - {{ track.title }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            {{ track.duration | minutes }}
          </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>


        <v-toolbar height="40" top>
          <v-progress-linear top absolute height="40" v-model="trackProgress" @click="updateSeek($event)" >
            <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-toolbar>
        <v-toolbar flat height=90>
          <v-btn text icon @click="toggleMute">
            <template v-if="!this.$data.muted">
              <v-icon v-if="this.$data.volume >= 0.5">volume_up</v-icon>
              <v-icon v-else-if="this.$data.volume > 0">volume_down</v-icon>
              <v-icon v-else>volume_mute</v-icon>
            </template>
            <v-icon v-show="this.$data.muted">volume_off</v-icon>
          </v-btn>
          <v-slider v-model="volume" hide-details @input="updateVolume(volume)" max="1" step="0.1"></v-slider>
          <v-spacer></v-spacer>
          <v-btn outlined fab small color="secondary" @click="skipTrack('prev')" class="ma-3">
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn outlined fab small color="secondary" @click="stopTrack" class="ma-3">
            <v-icon>stop</v-icon>
          </v-btn>
          <v-btn outlined fab color="primary" @click="playTrack()" class="ma-3">
            <v-icon large>play_arrow</v-icon>
          </v-btn>
          <v-btn outlined fab small color="secondary " @click="pauseTrack" class="ma-3">
            <v-icon>pause</v-icon>
          </v-btn>
          <v-btn outlined fab small color="secondary" @click="skipTrack('next')" class="ma-3">
            <v-icon>skip_next</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>

  </div>
</template>

<script>
import MusicService from '@/services/MusicService'
import {Howl, Howler} from 'howler'

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
    }
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
    currentTrack () {
      return this.$data.playlist[this.$data.index]
    },
    progress () {
      if (this.currentTrack.howl.duration() === 0) return 0
      return this.seek / this.currentTrack.howl.duration()
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
    playing (playing) {
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
    }
  }
}
</script>

<style scoped>
  .selected {
    background-color:  orange !important;
  }
  .playlist {
    overflow: auto
  }
</style>
