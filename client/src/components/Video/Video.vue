<template>
  <!-- <v-container fill-height fluid> -->
  <div style="height: 100%">
    <catalogr v-if="catalog === true" v-on:select="SelectIndex" v-on:Delete="DeleteIndexDialog" v-on:Add="CreateDialog" :list="this.filelist" :title="'Video Catalog'" :itemoptions="this.videooptions" />
    <!-- this was here if you want video player in a single static url/page. -->
    <!-- <video-player v-else :directory="this.directory"/> -->
    <confirm-delete :dialog="deleteDialog" v-on:Delete="DeleteIndex" v-on:Cancel="deleteDialog = false" />
    <confirm-create :dialog="createDialog" v-on:Confirmed="CreateCatalog" v-on:Cancel="createDialog = false" />
  </div>
  <!-- </v-container> -->
</template>

<script>
// import FileService from '@/services/FileService'
import VideoService from '@/services/VideoService'
import VideoPlayer from './VideoPlayer'
import Catalogr from '../Catalog'
import ConfirmDelete from '../ConfirmDelete'
import ConfirmCreate from '../ConfirmCreate'

// https://github.com/redxtech/vue-plyr/tree/master/src
export default {
  components: {
    VideoPlayer,
    Catalogr,
    ConfirmDelete,
    ConfirmCreate
  },
  data () {
    return {
      catalog: true,
      videolist: [],
      filelist: [],
      directory: null,
      deleteDialog: false,
      deleteDialogIndex: null,
      createDialog: false,
      videooptions: [
        'Share',
        'Rename',
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
    DeleteIndexDialog: function (index) {
      console.log('Deleting: ', this.filelist[index].name)
      this.deleteDialog = true
      this.deleteDialogIndex = index
    },
    DeleteIndex: function () {
      this.deleteDialog = false
      let index = this.deleteDialogIndex
      this.$store.commit('startLoading')
      VideoService.deleteCatalog(this.filelist[index].name).then(function (res) {
        console.log('aye!', res.data)
        if (res.data === 'success') {
          // this.$forceUpdate()
          this.RefreshList()
          this.$store.commit('stopLoading')
        }
      }.bind(this))
    },
    CreateDialog: function () {
      this.createDialog = true
    },
    CreateCatalog: function (name) {
      this.createDialog = false
      this.$store.commit('startLoading')
      console.log('creating: ', name)
      VideoService.createCatalog(name).then(function (res) {
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
