<template>

  <v-container
    fluid
    style="height: 100%; overflow-y: scroll; position: absolute;"
    v-if="list !== null"
  >
  <!-- <v-card height="100%"> -->
    <v-subheader>
      {{ title }}
      <v-spacer></v-spacer>
      <v-card max-width="300px" flat>
        <v-text-field
          clearable
          prepend-icon="search"
          placeholder="Search"
          v-model="searchString"
          @input="searchList">
        </v-text-field>
      </v-card>
    </v-subheader>

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
        v-show="item.display"
      >
        <v-card hover >
          <!-- <v-responsive :aspect-ratio="1/1"> -->
            <v-list-item three-line v-on:click="clbk('select', index)">
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
                <!-- <v-list-item-subtitle> {{list[0].info}} </v-list-item-subtitle> -->
                <v-list-item-subtitle v-for="(item, index2) in list[index].info" :key="index2"> {{ index2 }}: {{item}} </v-list-item-subtitle>
              </v-list-item-content>
              <!-- <v-list-item-avatar> -->
                <v-list-item-icon>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-icon>
              <!-- </v-list-item-avatar> -->
            </v-list-item>
            <!-- <v-spacer></v-spacer> -->
            <v-card-actions style="position: absolute; bottom: 0px; right: 2px">
              <!-- <v-btn text>Options</v-btn> -->
              <v-spacer></v-spacer>

              <v-menu bottom :offset-y="true">
                <template v-slot:activator="{ on }">
                  <!-- <v-tooltip bottom> -->
                    <!-- <template v-slot:activator="{ on: tooltip }"> -->
                      <v-btn icon v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
                    <!-- </template> -->
                    <!-- <span>Im A ToolTip</span> -->
                  <!-- </v-tooltip> -->
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, listindex) in itemoptions"
                    :key="listindex"
                    @click="clbk(item, index)"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-card-actions>
          <!-- </v-responsive> -->
         </v-card>
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      fab
      class="v-btn--example"
      @click="clbk('Add', null)"
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- </v-card> -->

  </v-container>

</template>

<script>

export default {
  props: {
    handoffComponent: String,
    title: String,
    list: {
      type: Array,
      default: function () {
        return null
      }
    },
    itemoptions: {
      type: Array,
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      selecteditem: 0,
      searchString: null
    }
  },
  mounted () {
    // this.clbk(this.callbackDest)
    // console.log(this.handoffComponent)
    console.log('catalogging: ', this.list)
  },
  methods: {
    clbk (action, index) {
      // console.log(cbDesty)
      // console.log(this.handoffComponent)
      // this.$router.push({name: this.handoffComponent, params: {handoffData: 'test title'}})

      console.log('clicked: ', action, index)
      this.$emit(action, index)
    },
    searchList () {
      // console.log(this.searchString, this.playlist, this.$data.searchString)
      this.list.forEach((item) => {
        if (this.$data.searchString) {
          if (item.hasOwnProperty('name') && item.name.toLowerCase().includes(this.searchString.toLowerCase())) {
            item.display = true
          } else {
            item.display = false
          }
        } else if (this.searchString === '' || this.searchString === null) {
          item.display = true
        }
      })
    }
  },
  watch: {
    list: function (val) {
      // console.log('list has changed', this.list, val)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
