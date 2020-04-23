<template>
  <v-container
    fluid
    style="height: 100%; overflow-y: scroll; position: absolute;"
    v-if="list !== null"
  >
    <v-row
      align="start"
      align-content="start"
      justify="start"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="(item, index) in list"
        :key="index"
      >
        <v-card hover v-on:click="clbk(index)">

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle> someinfo </v-list-item-subtitle>
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
  props: {
    handoffComponent: String,
    list: {
      type: Array,
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      selecteditem: 0
    }
  },
  mounted () {
    // this.clbk(this.callbackDest)
    // console.log(this.handoffComponent)
    console.log(this.list)
  },
  methods: {
    clbk (index) {
      // console.log(cbDesty)
      // console.log(this.handoffComponent)
      // this.$router.push({name: this.handoffComponent, params: {handoffData: 'test title'}})
      
      console.log('clicked', index)
      this.$emit('select', index)
    }
  },
  watch: {
    list: function (val) {
      console.log('list has changed', this.list, val)
    }
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
