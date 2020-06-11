<template>
  <v-navigation-drawer
    v-model="toggleSidebar"
    v-if="$store.state.isUserLoggedIn"
    app
    clipped
    stateless
    >
    <!-- <v-subheader></v-subheader> -->
    <v-list
        dense
      > <!-- add 'nav' to v-list for round buttons -->
      <v-list-item two-line >
            <v-list-item-avatar>
              <!-- <img src="https://randomuser.me/api/portraits/men/81.jpg"> -->
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>{{ $store.state.user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

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
        <v-divider></v-divider>
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
          icon: 'mdi-image-multiple',
          title: 'Pictures',
          href: '/#/pictures'
        },
        {
          icon: 'mdi-video',
          title: 'Videos',
          href: '/#/videos'
        },
        // {
        //   icon: 'mdi-movie-open',
        //   title: 'Movies',
        //   href: '/#/movies'
        // },
        // {
        //   icon: 'mdi-nintendo-game-boy',
        //   title: 'Games',
        //   href: '/#/games'
        // },
        {
          icon: 'mdi-folder',
          title: 'Files',
          href: '/#/files'
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
        //    this.$store.dispatch('toggleSidebar')
        //    this.drawer = !this.drawer
        // }
      }
    }
  }
}
</script>

<style scoped>

</style>
