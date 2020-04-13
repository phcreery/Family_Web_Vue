<template>
  <div>
      <div :class="{playlist}">
        <div id="scroll-target" class="overflow-y-auto">
        <v-list>
          <v-subheader>MUSIC</v-subheader>
          <v-list-item-group >
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
        </div>
      </div>
  </div>
</template>

<script>
import MusicService from '@/services/MusicService'
import MusicBar from './MusicBar'
import {Howl, Howler} from 'howler'

export default {
  data () {
    return {
      playlist: [],
      playing: false,
      selectedTrack: null,
      item: 1,
      currentTrackr: null
    }
  },
  components: {
    MusicBar
  },
  methods: {
    selectTrack (track) {
      // this.$root.$emit('selectTrack', track)
      // this.$store.commit('setMusicSelectedTrack', track)
      this.$data.selectedTrack = track
    },
    playTrack () {
      // this.$store.commit('setMusicSelectIndex', this.$data.selectedTrack)
      this.$root.$emit('playTrack', this.$data.selectedTrack)
    },
    pauseTrack () {
      this.$data.currentTrackr = this.currentTrack
      this.$data.currentTrackr.howl.pause()
      // this.$data.playing = false
    },
    stopTrack () {
      this.currentTrack.howl.stop()
      // this.$data.playing = false
    }

  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
  },
  created: async function () {
    const list = await MusicService.getlist()
    const baseURL = await MusicService.getBaseURL()
    this.$data.playlist = list.data
    // console.log(this.$data)
    this.$data.playlist.forEach((track) => {
      // console.log(track)
      let file = track.name.replace(/ /g, '%20')
      // console.log('src: ' + baseURL + `${file}`)
      track.howl = new Howl({
        src: [baseURL + `${file}`]
      })
    })
    this.$store.commit('setMusicPlaylist', this.$data.playlist)
    this.$store.commit('stopLoading')
  },
  mounted: function () {
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
        return this.$store.state.music.Playlist[this.$store.state.music.PlaylistPlayingIndex]
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    }

  },
  watch: {

  }
}
</script>

<style scoped>
  .selected {
    background-color:  rgb(214, 214, 214) !important;
    font-size: 1.5rem;
  }
  .playlist {
    overflow: auto
  }
</style>
