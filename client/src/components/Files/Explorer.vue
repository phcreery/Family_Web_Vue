<template>
<div>

    <v-row align="start" align-content="start" justify="start">
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

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">

            <v-card hover v-on="on">
              <!-- <v-responsive :aspect-ratio="1/1"> -->
              <v-list-item three-line v-on:click="clbk('select', index)">
                <v-list-item-content>
                  <v-list-item-title class="mb-1">{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle
                    v-for="(item, index2) in list[index].info"
                    :key="index2"
                  >{{ index2 }}: {{item}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- <v-spacer></v-spacer> -->
              <v-card-actions style="position: absolute; bottom: 0px; right: 2px">
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
            </v-card>

          </template>
          <span>{{ item.name }}</span>
        </v-tooltip>

      </v-col>
    </v-row>

    <v-btn color="primary" fab class="v-btn--example" @click="clbk('Add', null)">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- </v-card> -->
</div>
  <!-- </v-container> -->
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
    // searchString: {
    //   type: String,
    //   default: function () {
    //     return null
    //   }
    // }
  },
  data () {
    return {
      selecteditem: 0
    //   searchString: null
    }
  },
  mounted () {
    console.log('catalogging: ', this.list)
  },
  methods: {
    clbk (action, index) {
      console.log('clicked: ', action, index)
      this.$emit(action, index)
    },
    searchList (searchString) {
      this.searchString = searchString
      // console.log(this.searchString, this.playlist, this.searchString)
      this.list.forEach((item) => {
        if (this.searchString) {
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
</style>
