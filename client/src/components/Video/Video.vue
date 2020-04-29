<template>
    <v-container fill-height app fluid>
        <catalogr v-if="catalog === true" v-on:select="SelectIndex" v-on:Delete="DeleteIndex" :list="this.filelist" :title="'Video Catalog'" :itemoptions="this.videooptions" />
        <!-- this was here if you want video player in a single static url/page. -->
        <!-- <video-player v-else :directory="this.directory"/> -->
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
      directory: null,
      videooptions: [
        'Delete'
      ]
    }
  },
  beforeCreate: function () {
    this.$store.commit('startLoading')
  },
  created: async function () {
    await this.RefreshList()
    this.$store.commit('stopLoading')
  },
  mounted () {

  },
  methods: {
    RefreshList: async function () {
      let list = await VideoService.getfolderlist()
      this.filelist = list.data
      console.log('filelist', this.filelist)
    },
    SelectIndex: function (index) {
      console.log(index, this.filelist[index].name)
      this.directory = this.filelist[index].name
      console.log('handing off to video player: ', this.directory)
      // this.catalog = false

      // this.$router.push({path: '/videos/' + this.directory})
      this.$router.push({ name: 'videoplayer', params: { id: this.directory } })
    },
    DeleteIndex: function (index) {
      console.log('Deleting: ', this.filelist[index].name)
      this.$store.commit('startLoading')
      VideoService.deleteCatalog(this.filelist[index].name).then(function (res) {
        console.log('aye!', res.data)
        if (res.data === 'success') {
          // this.$forceUpdate()
          this.RefreshList()
          this.$store.commit('stopLoading')
        }
      }.bind(this))
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
