<template>
  <v-card :class="{playlist}">
    <v-list>
      <v-subheader>MUSIC</v-subheader>
      <v-list-item-group v-model="item" >
      <v-list-item
        v-for="(track, index) in playlist"
        :key="track.title"
        v-show="track.display"
        color="orange">
        <v-list-item-content @click="selectTrack(track)">
          <v-list-item-title>{{ index | numbers }}  {{ track.artist }} - {{ track.title }}</v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        {{ track.duration | minutes }}
      </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-toolbar flat height=90>
      <v-spacer></v-spacer>
      <v-btn outline fab small color="secondary" @click="skipTrack('prev')" class="ma-3">
        <v-icon>skip_previous</v-icon>
      </v-btn>
      <v-btn outline fab small color="secondary" @click="stopTrack" class="ma-3">
        <v-icon>stop</v-icon>
      </v-btn>
      <v-btn outline fab color="primary" @click="playTrack()" class="ma-3">
        <v-icon large>play_arrow</v-icon>
      </v-btn>
      <v-btn outline fab small color="secondary " @click="pauseTrack" class="ma-3">
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn outline fab small color="secondary" @click="skipTrack('next')" class="ma-3">
        <v-icon>skip_next</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
</template>

<script>
import MusicService from '@/services/MusicService'
// import {Howl, Howler} from 'howler'
export default {
  data () {
    return {
      playlist: [],
      selectedTrack: null,
      item: 1
    }
  },
  created: async function () {
    const list = await MusicService.getlist()
    const baseURL = await MusicService.getBaseURL()
    this.$data.playlist = list.data
    console.log(this.$data)
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
  methods: {
    selectTrack (track) {
      this.$data.selectedTrack = track
    },
    playTrack (index) {
      let selectedTrackIndex = this.$data.playlist.findIndex(track => track === this.$data.selectedTrack)

      if (typeof index === 'number') {
        index = this.$data.index
      } else if (this.$data.selectedTrack) {
        if (this.$data.selectedTrack != this.$data.currentTrack) {
          this.stop()
        }
        index = selectedTrackIndex
      } else {
        index = this.$data.index
      }
      
      let track = this.playlist[index].howl

      if (track.playing()) {
        return
      } else {
        track.play()
      }
      
      this.selectedTrack = this.playlist[index]
      this.playing = true
      this.index = index
    },
    pause () {
      this.currentTrack.howl.pause()
      this.playing = false
    },
    stop () {
      this.currentTrack.howl.stop()
      this.playing = false
    },
    skipTrack (direction) {
      let index = 0
      if (direction === "next") {
        index = this.index + 1
        if (index >= this.playlist.length) {
          index = 0
        }
      } else {
        index = this.index - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
      }
    
      this.skipTo(index)
    },
    skipTo (index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop()
      }
    
      this.play(index)
    }
  },
  computed: {
    currentTrack () {
      return this.playlist[this.index]
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
