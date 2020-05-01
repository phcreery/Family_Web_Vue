<template>

  <v-dialog
      v-model="dialog"
      max-width="290"
      persistent
  >
    <v-card>
      <v-container>
    <!-- <v-card-title class="headline">Name</v-card-title> -->

    <v-text-field
          v-model="text"
          label="Name"
        ></v-text-field>

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
      @click="clbk('Confirmed', text); text = null"
      >
        Create
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
    dialog: Boolean
  },
  data () {
    return {
      text: null
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
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped>

</style>
