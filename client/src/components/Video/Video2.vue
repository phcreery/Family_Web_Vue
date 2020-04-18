<template>
  <div>
     <!-- <div>Duration: {{ duration }}</div> -->
        <vueplyr @timeupdate="videoTimeUpdated" :emit="['timeupdate']" ref="player">
          <video>
              <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
          </video>
      </vueplyr>
  </div>
</template>

<script>
import vueplyr from '@/components/Video/vueplyr'

export default {
  components: {
    vueplyr
  },
  data () {
    return {
      duration: null,
      player: null
    }
  },
  mounted () {
    this.player = this.$refs.player.player
  },
  methods: {
    videoTimeUpdated: function (event) {
      this.duration = this.player.currentTime
    }
  }
}
</script>
