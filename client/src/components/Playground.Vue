<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="myDialogVisible = true"
    >
      asdf
    </v-btn>
    <music-bar :dialogVisible="myDialogVisible" @close="myDialogClose">
    </music-bar>
  </div>
</template>

<script>
import MusicBar from '@/components/MusicBar.vue'
export default {
  data () {
    return {
      myDialogVisible: false
    }
  },
  components: {
    MusicBar
  },
  methods: {
    myDialogClose () {
      this.$data.myDialogVisible = false
      // other code
    }
  }
}
</script>
