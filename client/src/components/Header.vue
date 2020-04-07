<template>
  <!-- or v-app-bar or v-toolbar   (app) needed for attributing?? -->
  <v-app-bar app fixed color="primary" dark>
    <v-app-bar-nav-icon @click="drawerState" />
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'root'})" >
        Creery.org
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn text @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        text
        @click="navigateTo({name: 'login'})"
        v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
      <v-btn
        text
        @click="navigateTo({name: 'register'})"
        v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
      <v-btn
        text
        @click="logout"
        v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    },
    drawerState () {
      this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
