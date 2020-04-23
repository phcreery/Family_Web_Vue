<template>
    <v-container fill-height app fluid>
        <catalogr v-if="catalog === true" v-on:select="SelectIndex" :list="this.filelist" />
        <video-player v-else :directory="this.directory"/>
    </v-container>
</template>

<script>
// import FileService from '@/services/FileService'
import VideoService from '@/services/VideoService'
import VideoPlayer from './VideoPlayer'
import Catalogr from '../Catalog'

// https://github.com/redxtech/vue-plyr/tree/master/src
export default {
  components: {
    VideoPlayer,
    Catalogr
  },
  data () {
    return {
      catalog: true,
      videolist: [],
      filelist: [],
      directory: null
    }
  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
  },
  created: async function () {
    let list = await VideoService.getfolderlist()
    this.filelist = list.data
    console.log('filelist', this.filelist)
    this.$store.commit('stopLoading')
  },
  mounted () {

  },
  methods: {
    SelectIndex: function (index) {
      console.log(index, this.filelist[index].name)
      this.directory = this.filelist[index].name
      console.log('handing off to video player: ', this.directory)
      this.catalog = false
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
