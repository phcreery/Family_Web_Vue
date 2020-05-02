<template>

  <v-dialog
      v-model="dialog"
      max-width="290"
      persistent
  >
    <v-card>
      <v-container>
    <v-card-title class="headline">Upload</v-card-title>

    <v-file-input show-size counter multiple label="File input" ref="myfile" v-model="files"></v-file-input>
    <label  style="color: red;">{{ this.dmessage }}
      <!-- <input type="file" id="file" ref="file" v-on:change="clbk('handleFileUpload')"/> -->
      <!-- <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/> -->
    </label>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
      text
      @click="clbk('Cancel')"
      >
        Cancel
      </v-btn>

      <v-btn
      color="green darken-1"
      text
      @click="clbk('Confirmed', files); files = null"
      >
        Upload
      </v-btn>
    </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>

</template>

<script>

export default {
  components: {

  },
  props: {
    dialog: Boolean,
    dmessage: {
      type: String,
      default: function () {
        return null
      }
    },
  },
  data () {
    return {
      files: null
    }
  },
  beforeCreate: function () {

  },
  created: async function () {

  },
  mounted () {

  },
  methods: {
    clbk (action, payload) {
      console.log('clicked: ', action, payload)
      this.$emit(action, payload)
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
    // submitFiles () {
    //   this.$emit('submitFiles', this.files)
    // }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped>

</style>
