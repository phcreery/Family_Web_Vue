<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
      persistent
  >
    <v-card>
    <v-card-title class="headline">Are you sure?</v-card-title>

    <v-card-text>
      There is no turning back if you confirm.
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
      text
      @click="clbk('Cancel')"
      >
        Cancel
      </v-btn>

      <v-btn
      color="red darken-1"
      text
      @click="clbk('Delete')"
      >
        Delete
      </v-btn>
    </v-card-actions>
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

    }
  },
  beforeCreate: function () {

  },
  created: async function () {

  },
  mounted () {

  },
  methods: {
    clbk (action) {
      console.log('clicked: ', action)
      this.$emit(action)
    },
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped>

</style>
