<template>
  <v-container
    fluid
    style="height: 100%; overflow-y: scroll; position: absolute;"
  >
    <v-row
      align="end"
      align-content="end"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="k in 120"
        :key="k"
      >
        <v-card hover>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Folder Name</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-avatar> -->
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
            <!-- </v-list-item-avatar> -->
          </v-list-item>
          <v-card-actions>
            <!-- <v-btn text>Options</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
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
