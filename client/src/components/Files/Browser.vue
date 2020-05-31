<template>
  <div>
    <v-container
      fluid
      style="height: 100%; overflow-y: scroll; position: absolute;"
    >
    <!-- <v-toolbar> -->
      <v-subheader>
        <v-btn class="mx-2" style="position: absolute; left: 10px;" icon @click="$router.go(-1)">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
        <h3 style="text-indent: 50px;">{{ currentURLpathPretty }}</h3>
        <v-spacer></v-spacer>
        <v-card max-width="300px" flat>
          <v-text-field
            clearable
            prepend-icon="search"
            placeholder="Search"
            v-model="searchString"
            @input="$refs.folders.searchList(searchString); $refs.files.searchList(searchString)"
          ></v-text-field>
        </v-card>
      </v-subheader>
    <!-- </v-toolbar> -->
      <!-- <v-divider :inset="false"></v-divider> -->
      <v-subheader>Folders</v-subheader>

      <explorer v-if="browse === true" ref="folders" v-on:select="SelectFolderIndex" v-on:Delete="DeleteFolderIndexDialog" v-on:Add="CreateDialog" :list="folderlist" :itemoptions="this.folderoptions" />

      <!-- <v-divider :inset="true"></v-divider> -->
      <v-subheader>Files</v-subheader>

      <explorer v-if="browse === true" ref="files" v-on:select="SelectFileIndex"  v-on:Add="CreateDialog" :list="filelist" :itemoptions="this.folderoptions" />
      <!-- <explorer v-if="browse === true" v-on:select="SelectIndex" v-on:Delete="DeleteIndexDialog" v-on:Add="CreateDialog" :list="folderlist" :title="'File Browser'" :itemoptions="this.folderoptions" :searchString="null"/> -->

      <confirm-delete :dialog="deleteFolderDialog" v-on:Delete="DeleteFolderIndex" v-on:Cancel="deleteFolderDialog = false" />
      <!-- <confirm-delete :dialog="deleteDialog" v-on:Delete="DeleteFileIndex" v-on:Cancel="deleteFileDialog = false" /> -->
      <confirm-create :dialog="createDialog" :msg="createErrorMessage" v-on:Confirmed="CreateCatalog" v-on:Cancel="createMessage = null; createDialog = false" />

      <Myupload :dialog="uploadDialog" v-on:Confirmed="SubmitFiles" v-on:Cancel="uploadDialog = false" :dmessage="uploaderrmessage" />
<!--
      <v-btn color="primary" fab class="v-btn--example" @click="CreateDialog()">
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->

      <v-speed-dial
      v-model="fab"
      class="v-btn--example"
      direction="top"
      ransition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="primary"
        @click="CreateDialog()"
      >
        <v-icon>mdi-folder-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="uploadDialog = true"
      >
        <v-icon>mdi-file-upload</v-icon>
      </v-btn>
    </v-speed-dial>

    </v-container>
  </div>
</template>

<script>
import FileService from '@/services/FileService'
import Explorer from './Explorer'
import ConfirmDelete from '../ConfirmDelete'
import ConfirmCreate from '../ConfirmCreate'
import Myupload from '@/components/Upload'
import VideoService from '@/services/VideoService'

// const FormData = require('form-data')

export default {
  components: {
    Explorer,
    ConfirmDelete,
    ConfirmCreate,
    Myupload
  },
  data () {
    return {
      fab: false,
      browse: true,
      currentDir: '',
      searchString: null,
      filelist: [],
      folderlist: [],
      folderoptions: [
        'Share',
        'Rename',
        'Delete'
      ],
      deleteFolderDialog: false,
      deleteFolderDialogIndex: null,
      deleteFileDialog: false,
      deleteFileDialogIndex: null,
      createDialog: false,
      createErrorMessage: '',
      uploadDialog: false,
      uploaderrmessage: ''
    }
  },
  beforeCreate: function () {
  },
  created: async function () {
    this.RefreshList()
    // console.log('browsing:', this.$route.params.pathMatch)
  },
  mounted () {
  },
  methods: {
    async RefreshList () {
      this.$store.commit('startLoading')
      const list = await FileService.getfolderlist(this.currentURLpath)
      this.folderlist = list.data.folders
      this.filelist = list.data.files
      console.log(this.folderlist, this.filelist)
      this.$store.commit('stopLoading')
    },
    SelectFolderIndex (index) {
      var dir = this.folderlist[index].name
      dir = this.currentURLpath + dir
      this.$router.push({ path: '/files/' + dir })
      this.RefreshList()
    },
    SelectFileIndex (index) {
      console.log(this.filelist[index].name)
    },
    CreateDialog: function () {
      this.createDialog = true
    },
    CreateCatalog: function (name) {
      // this.createDialog = false
      this.$store.commit('startLoading')
      console.log('creating: ', name)
      FileService.createDir(this.currentURLpath + name).then(function (res) {
        console.log('aye!', res.data)
        if (res.data === 'success') {
          // this.$forceUpdate()
          this.createDialog = false
          this.RefreshList()
          this.$store.commit('stopLoading')
        } else {
          console.log('oh no,', res)
          this.createErrorMessage = res.data
          this.$store.commit('stopLoading')
        }
      }.bind(this)) // .catch((res) => { console.log('bad ugh oh', res) })
    },
    DeleteFolderIndexDialog: function (index) {
      console.log('Deleting: ', this.folderlist[index].name)
      this.deleteFolderDialog = true
      this.deleteFolderDialogIndex = index
    },
    DeleteFolderIndex: function () {
      // this.deleteDialog = false
      let index = this.deleteFolderDialogIndex
      this.$store.commit('startLoading')
      FileService.deleteDir(this.currentURLpath + this.folderlist[index].name).then(function (res) {
        console.log('aye!', res.data)
        if (res.data === 'success') {
          this.deleteFolderDialog = false
          // this.$forceUpdate()
          this.RefreshList()
          this.$store.commit('stopLoading')
        }
      }.bind(this))
    },
    SubmitFiles (files) {
      console.log('Gonna take these files', files, 'to:', this.currentURLpath)
      if (files) {
        let formData = new FormData()

        // files
        for (var file of files) {
          console.log('Appending:', file.name)
          formData.append('files', file, file.name)
          // console.log('Now', file, file.name, formData)
        }
        // console.log('Form submitting:', formData)
        console.log('Form submitting:', formData.get('files'))
        // formData.forEach((value, key) => {
        //   console.log('key %s: value %s', key, value)
        // })

        // additional data
        // formData.append('test', 'foo bar')
        this.$store.commit('startLoading')
        FileService.uploadFile(this.currentURLpath, formData)
          .then(response => {
            console.log('Success!')
            console.log({ response })
            this.uploadDialog = false
            this.uploaderrmessage = ''
            this.$store.commit('stopLoading')
            this.RefreshList()
          })
          .catch(error => {
            console.log('msg ', error.response.data)
            this.uploaderrmessage = error.response.data
            this.$store.commit('stopLoading')
          })
      } else {
        console.log('there are no files.')
        this.uploaderrmessage = 'Need at least 1 file'
      }
    }
  },
  computed: {
    currentURLpath () {
      if (typeof this.$route.params.pathMatch !== 'undefined') {
        return this.$route.params.pathMatch + '/'
      } else {
        return ''
      }
    },
    currentURLpathPretty () {
      if (typeof this.$route.params.pathMatch !== 'undefined') {
        return '/' + this.$route.params.pathMatch
      } else {
        return '/'
      }
    }
  },
  watch: {
    '$route' () {
      this.RefreshList()
    }
  }
}
</script>

<style scoped>
.v-btn--example {
  bottom: 0;
  right: 0;
  position: absolute;
  margin: 16px 16px 16px 16px;
}

::-webkit-scrollbar {
  display:block;
  width: 1em;
  }

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(196, 196, 196);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(104, 104, 104);
}
</style>
