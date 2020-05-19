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
        <h3 style="text-indent: 50px;">/{{ currentURLpath }}</h3>
        <v-spacer></v-spacer>
        <v-card max-width="300px" flat>
          <v-text-field
            clearable
            prepend-icon="search"
            placeholder="Search"
            v-model="searchString"
            @input="$refs.folders.searchList(searchString)"
          ></v-text-field>
        </v-card>
      </v-subheader>
    <!-- </v-toolbar> -->
      <!-- <v-divider :inset="false"></v-divider> -->
      <v-subheader>Folders</v-subheader>

      <explorer v-if="browse === true" ref="folders" v-on:select="SelectFolderIndex" v-on:Delete="DeleteIndexDialog" v-on:Add="CreateDialog" :list="folderlist" :title="'File Browser'" :itemoptions="this.folderoptions" />

      <!-- <v-divider :inset="true"></v-divider> -->
      <v-subheader>Files</v-subheader>

      <explorer v-if="browse === true" ref="files" v-on:select="SelectFileIndex" v-on:Delete="DeleteIndexDialog" v-on:Add="CreateDialog" :list="filelist" :title="'File Browser'" :itemoptions="this.folderoptions" />
      <!-- <explorer v-if="browse === true" v-on:select="SelectIndex" v-on:Delete="DeleteIndexDialog" v-on:Add="CreateDialog" :list="folderlist" :title="'File Browser'" :itemoptions="this.folderoptions" :searchString="null"/> -->

    </v-container>
  </div>
</template>

<script>
import FileService from '@/services/FileService'
import Explorer from './Explorer'
export default {
  components: {
    Explorer
  },
  data () {
    return {
      browse: true,
      currentDir: '',
      searchString: null,
      filelist: [],
      folderlist: [],
      folderoptions: [
        'Share',
        'Rename',
        'Delete'
      ]
    }
  },
  beforeCreate: function () {
  },
  created: async function () {
    this.refresh()
    // console.log('browsing:', this.$route.params.pathMatch)
  },
  mounted () {
  },
  methods: {
    async refresh () {
      this.$store.commit('startLoading')
      const list = await FileService.getfolderlist(this.currentURLpath)
      this.folderlist = list.data.folders
      this.filelist = list.data.files
      console.log(this.folderlist, this.filelist)
      this.$store.commit('stopLoading')
    },
    SelectFolderIndex (index) {
      var dir = this.folderlist[index].name
      if (typeof this.$route.params.pathMatch !== 'undefined') {
        dir = this.$route.params.pathMatch + '/' + dir
      }
      this.$router.push({ path: '/files/' + dir })
      // console.log('browsing:', this.$route.params.pathMatch)
      this.refresh()
    },
    SelectFileIndex (index) {
      console.log(this.filelist[index].name)
    },
    DeleteIndexDialog () {

    },
    CreateDialog () {

    }
  },
  computed: {
    currentURLpath () {
      if (typeof this.$route.params.pathMatch !== 'undefined') {
        return this.$route.params.pathMatch
      } else {
        return ''
      }
    }
  },
  watch: {
    '$route' () {
      this.refresh()
    }
  }
}
</script>

<style scoped>
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
