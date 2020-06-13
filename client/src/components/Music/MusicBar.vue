<template>

  <v-footer app inset padless>
  <div class="MFooter">
      <v-toolbar height="8" top>
        <v-progress-linear top absolute height="8" v-model="trackProgress" @click="updateSeek($event)" >
        </v-progress-linear>
      </v-toolbar>
      <v-toolbar flat height=90>
        <v-row justify="space-between">

<v-col v-if="!($store.state.toggleSidebar && $vuetify.breakpoint.smAndDown)" cols="auto" xs="2" sm="2" md="auto" >
        <v-card flat>
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              size="50"
              color="grey"
            >
              <v-icon dark>mdi-music</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="this.$vuetify.breakpoint.lgAndUp" class="headline">{{ trackInfo.artist }}</v-list-item-title>
              <v-list-item-title v-if="this.$vuetify.breakpoint.lgAndUp">{{ trackInfo.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
</v-col>

<v-col >
  <v-row >

        <!-- <v-col > -->
        <!-- <v-card flat class="mx-auto" style="position: fixed;" v-bind:style="{ left: $vuetify.breakpoint.smAndUp ? '30%' : '40%' }"> -->
        <v-card flat class="mx-auto" >
          <v-btn v-if="this.$vuetify.breakpoint.smAndUp" fab text small color="secondary" @click="skipTrack('prev')" class="ma-3">
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <!-- <v-btn fab small color="secondary" @click="stopTrack" class="ma-3">
            <v-icon>stop</v-icon>
          </v-btn> -->
          <v-btn fab color="primary" @click="playTrack()" class="ma-3">
            <v-icon large>{{ playIcon }}</v-icon>
          </v-btn>
          <!-- <v-btn fab small color="secondary " @click="pauseTrack" class="ma-3">
            <v-icon>pause</v-icon>
          </v-btn> -->
          <v-btn v-if="this.$vuetify.breakpoint.smAndUp" fab text small color="secondary" @click="skipTrack('next')" class="ma-3">
            <v-icon>skip_next</v-icon>
          </v-btn>
        </v-card>
        <!-- </v-col > -->

        </v-row>
  </v-col>

  <v-col cols="auto" sm="2" md="4" lg="auto" v-if="this.$vuetify.breakpoint.smAndUp">
    <v-row justify="end">
        <!-- <v-toolbar app flat style="position: fixed; right: 0%; width: 20%"> -->
          <!-- <v-toolbar  > -->
            <v-card flat>
              <v-card-title>
          <v-btn text icon @click="toggleMute" >
            <template v-if="!this.$data.muted">
              <v-icon v-if="this.$data.volume >= 0.5">volume_up</v-icon>
              <v-icon v-else-if="this.$data.volume > 0">volume_down</v-icon>
              <v-icon v-else>volume_mute</v-icon>
            </template>
            <v-icon v-show="this.$data.muted">volume_off</v-icon>
          </v-btn>
          <!-- <v-col v-if="this.$vuetify.breakpoint.lgAndUp" cols="4"> -->
          <v-slider style="width: 100px;" v-if="this.$vuetify.breakpoint.lgAndUp" v-model="volume" hide-details @input="updateVolume(volume)" max="1" step="0.1" >
            </v-slider>
          <!-- </v-col> -->
          
          <v-subheader v-if="this.$vuetify.breakpoint.mdAndUp">{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</v-subheader>
          <!-- <v-subheader v-else>1</v-subheader> -->
          </v-card-title>
          </v-card>
        <!-- </v-toolbar> -->
        </v-row>
</v-col>

</v-row>

      </v-toolbar>

        </div>
        </v-footer>

</template>

<script>
import {Howler} from 'howler'
import { MusicEventBus } from '@/services/MusicService'
export default {
  props: {
    loop: Boolean,
    shuffle: Boolean
    // trackInfo: Object
  },
  data () {
    return {
      volume: 0.8,
      muted: false,
      hover: true,
      progress: 0,
      trackInfo: '',
      isplaying: false
    }
  },
  computed: {
    trackProgress: {
      set: function (event) {
        console.log(event)
        this.updateSeek(event)
      },
      get: function () {
        // console.log(this.progress * 100)
        return this.$data.progress * 100
      }
    },
    playIcon () {
      return (this.isplaying ? 'pause' : 'play_arrow')
    }
  },
  created: function () {
    Howler.volume(this.volume)
  },
  mounted: function () {
    MusicEventBus.$on('updateprogress', (progress) => { this.$data.progress = progress })
    MusicEventBus.$on('updatetrackinfo', (payload) => { this.$data.trackInfo = payload })
    MusicEventBus.$on('updatetrackplaystate', (payload) => { this.$data.isplaying = payload })
  },
  methods: {
    playTrack (index) {
      // this.$emit('playtrack', index)
      MusicEventBus.$emit('playtrack', index)
      this.isplaying = true
    },
    pauseTrack () {
      // this.$emit('pausetrack')
      MusicEventBus.$emit('pausetrack')
      this.isplaying = false
    },
    stopTrack () {
      // this.$emit('stoptrack')
      MusicEventBus.$emit('stoptrack')
      this.isplaying = false
    },
    skipTrack (direction) {
      // this.$emit('skiptrack', direction)
      MusicEventBus.$emit('skiptrack', direction)
      this.isplaying = true
    },
    updateVolume (volume) {
      Howler.volume(volume)
    },
    toggleMute () {
      Howler.mute(!this.muted)
      this.muted = !this.muted
    },
    toggleLoop () {
      // this.$emit('toggleloop', !this.loop)
      MusicEventBus.$emit('toggleloop', !this.loop)
    },
    toggleShuffle () {
      // this.$emit('toggleshuffle', !this.shuffle)
      MusicEventBus.$emit('toggleshuffle', !this.shuffle)
    },
    updateSeek (event) {
      console.log(event)
      // let el = document.querySelector('.progress-linear__bar')
      // let mousePos = event.offsetX
      // let elWidth = el.clientWidth
      let percents = event
      // this.$emit('updateseek', percents)
      MusicEventBus.$emit('updateseek', percents)
    }
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
  }
}

</script>

<style scoped>

  .MFooter {
    /* position: fixed; */
    /* position: absolute; */
    /* height: 225px; */
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;

  }

  .progress {
    height: 4;
  }
  .progresshover {
    height: 40;
  }
</style>
