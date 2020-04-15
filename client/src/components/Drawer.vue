<template>
  <v-navigation-drawer
    v-model="toggleSidebar"
    app
    clipped
    expand-on-hover
    stateless
    >
    <v-list
        dense
      > <!-- add 'nav' to v-list for round buttons -->
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :href="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'home',
          title: 'Home',
          href: '/#/'
        },
        {
          icon: 'mdi-music',
          title: 'Music',
          href: '/#/music'
        },
        {
          icon: 'content_copy',
          title: 'Tasks',
          href: '/'
        },
        {
          icon: 'mdi-music',
          title: 'Playground',
          href: '/#/Playground'
        }
      ]
    }
  },
  computed: {
    toggleSidebar: {
      get () {
        return this.$store.getters['toggleSidebar']
      },
      set (state) {
        // if (state !== this.$store.state.navigation) {
          // this.$store.dispatch('toggleSidebar')
          // this.drawer = !this.drawer
        // }
      }
    }
  }
}
</script>

<style scoped>

</style>
