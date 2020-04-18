<template>

    <!-- <v-app-bar bottom app fixed height="100px"> -->
      <v-footer app inset padless>
  <div class="MFooter">
      <v-toolbar height="8" top>
        <v-progress-linear top absolute height="8" v-model="trackProgress" @click="updateSeek($event)" >
        </v-progress-linear>
      </v-toolbar>
      <v-toolbar flat height=90>

        <!-- <v-toolbar-title <v-toolbar-title>{{ trackInfo.artist }} - {{ trackInfo.title }}</v-toolbar-title> -->
        <!-- <v-subheader>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</v-subheader> -->
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
              <v-list-item-title class="headline">{{ trackInfo.artist }}</v-list-item-title>
              <v-list-item-title>{{ trackInfo.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>

        <v-card flat class="mx-auto" style="position: fixed; left: 40%;">
          <v-btn fab small color="secondary" @click="skipTrack('prev')" class="ma-3">
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn fab small color="secondary" @click="stopTrack" class="ma-3">
            <v-icon>stop</v-icon>
          </v-btn>
          <v-btn fab color="primary" @click="playTrack()" class="ma-3">
            <v-icon large>play_arrow</v-icon>
          </v-btn>
          <v-btn fab small color="secondary " @click="pauseTrack" class="ma-3">
            <v-icon>pause</v-icon>
          </v-btn>
          <v-btn fab small color="secondary" @click="skipTrack('next')" class="ma-3">
            <v-icon>skip_next</v-icon>
          </v-btn>
        </v-card>

        <v-toolbar app flat style="position: fixed; right: 0%; width: 20%">
          <v-btn text icon @click="toggleMute" >
            <template v-if="!this.$data.muted">
              <v-icon v-if="this.$data.volume >= 0.5">volume_up</v-icon>
              <v-icon v-else-if="this.$data.volume > 0">volume_down</v-icon>
              <v-icon v-else>volume_mute</v-icon>
            </template>
            <v-icon v-show="this.$data.muted">volume_off</v-icon>
          </v-btn>
          <v-slider v-model="volume" hide-details @input="updateVolume(volume)" max="1" step="0.1" >
          </v-slider>
          <v-subheader>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</v-subheader>
        </v-toolbar>

      </v-toolbar>

<!--
      <v-card height="60">
        <v-card-title>
          <h3>{{ trackInfo.artist }} - {{ trackInfo.title }}</h3>
          <v-spacer></v-spacer>
          <h3>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</h3>
        </v-card-title>
      </v-card>
      -->
        </div>
        </v-footer>
      <!-- </v-app-bar> -->

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
      trackInfo: null
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
    }
  },
  created: function () {
    Howler.volume(this.volume)
  },
  mounted: function () {
    MusicEventBus.$on('updateprogress', (progress) => { this.$data.progress = progress })
    MusicEventBus.$on('updatetrackinfo', (payload) => { this.$data.trackInfo = payload })
  },
  methods: {
    playTrack (index) {
      // this.$emit('playtrack', index)
      MusicEventBus.$emit('playtrack', index)
    },
    pauseTrack () {
      // this.$emit('pausetrack')
      MusicEventBus.$emit('pausetrack')
    },
    stopTrack () {
      // this.$emit('stoptrack')
      MusicEventBus.$emit('stoptrack')
    },
    skipTrack (direction) {
      // this.$emit('skiptrack', direction)
      MusicEventBus.$emit('skiptrack', direction)
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
