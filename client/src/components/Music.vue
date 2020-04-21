<template>
  <div>
    <div :class="{playlist}" >

      <v-list>
        <v-subheader>MUSIC
          <v-spacer></v-spacer>
      <v-card max-width="300px" flat>
        <v-text-field
      clearable
      prepend-icon="search"
      placeholder="Search"
      v-model="searchString"
      @input="searchPlaylist">
      </v-text-field>
      </v-card>

        </v-subheader>
        <v-list-item-group v-model="item">
        <v-list-item
          v-for="(track, index) in playlist"
          :key="track.title"
          v-show="track.display"
          :class="[{selected: track === currentTrack}]"
          @click="selectTrack(track)" @dblclick="playTrack()">
          <v-list-item-action>
            <v-btn icon :block=true small color="secondary" @click="selectTrack(track); playTrack()">
              <v-icon>{{ track == currentTrack && isPlaying(track) ? 'mdi-pause' : 'mdi-play' }}</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title :class="[{selected: track === currentTrack}]">{{ index | numbers }}  {{ track.artist }} - {{ track.title }}</v-list-item-title>
          </v-list-item-content>
          <!-- <v-spacer></v-spacer> -->
          <v-list-item-action>
            <v-list-item-action-text>
              {{ track.duration | minutes }}
            </v-list-item-action-text>
          </v-list-item-action>
          <!-- {{ track.duration | minutes }} -->
        </v-list-item>
        </v-list-item-group>
      </v-list>

    </div>

    <!-- <v-flex> -->
    <MusicBar></MusicBar>
    <!-- </v-flex> -->

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
      item: 0,
      index: 0,
      playing: false,
      loop: false,
      shuffle: false,
      seek: 0,
      muted: false,
      volume: 1,
      searchString: null
      // sliderProgress: 0
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
      console.log('playtrack: ' + index)
      let selectedTrackIndex = this.$data.playlist.findIndex(track => track === this.$data.selectedTrack)
      console.log('selected: ' + selectedTrackIndex)
      // console.log(typeof index)
      if (typeof index === 'number') {
        this.$data.index = index
        console.log('skipping by number:', index)
      } else if (this.$data.selectedTrack) {
        if (this.$data.selectedTrack !== this.currentTrack) {
          this.stopTrack()
        }
        index = selectedTrackIndex
        console.log('skipping by selectedTrack:', index)
      } else {
        index = this.$data.index
        console.log('skipping by index:', index)
      }
      let track = this.$data.playlist[index].howl

      if (track.playing()) {
        this.pauseTrack()
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
      let percents = event
      let track = this.currentTrack.howl
      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    },
    isPlaying (track) {
      // let track = this.$data.playlist[index].howl
      let trackhowl = track.howl
      if (trackhowl.playing()) {
        return true
      } else {
        return false
      }
    },
    searchPlaylist () {
      // console.log(this.searchString, this.playlist, this.$data.searchString)
      this.playlist.forEach((track) => {
        if (this.$data.searchString) {
          if ((track.hasOwnProperty('title') && track.title.toLowerCase().includes(this.searchString.toLowerCase())) || (track.hasOwnProperty('artist') && track.artist.toLowerCase().includes(this.searchString.toLowerCase()))) {
            track.display = true
          } else {
            track.display = false
          }
        } else if (this.searchString === '' || this.searchString === null) {
          track.display = true
        }
      })
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
    MusicEventBus.$on('updateseek', (seek) => { this.updateSeek(seek) })
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
      MusicEventBus.$emit('updateprogress', this.progress)
      MusicEventBus.$emit('updatetrackinfo', this.getTrackInfo)
    }
  },
  beforeDestroy () {
    console.log('leaving...')
    this.$data.playlist.forEach((track) => {
      track.howl.stop()
      // track.howl.unload()
    })
    // Howler.unload()
  }
}
</script>

<style scoped>
  .selected {
    background-color:  rgb(214, 214, 214) !important;
    font-size: 1.5rem;
  }
  .playlist {
    width: 100%;
  }

</style>
