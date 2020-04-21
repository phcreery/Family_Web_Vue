<template>
  <v-container
    fill-height
    fluid
    app
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="4"
        md="2"
        v-for="k in 12"
        :key="k"
      >
        <v-card hover>

            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
                <!-- <v-list-item-avatar> -->
                    <v-list-item-icon>
                        <v-icon>mdi-folder</v-icon>
                    </v-list-item-icon>
                <!-- </v-list-item-avatar> -->
            </v-list-item>
            <v-card-actions>
                <v-btn text>Button</v-btn>
            </v-card-actions>
         </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {

    }
  },

  methods: {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
