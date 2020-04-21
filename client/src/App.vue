<template>
  <div id="app">
    <v-app id="inspire">
      <PageHeader app />
      <PageDrawer app />
      
        <v-content>
          <!-- have to use v-app for vuetify instead of just div -->
            <router-view />

        </v-content>

        <!-- <MusicBar></MusicBar> -->
        <!-- <v-footer dark app inset>
          <span class="white--text">Made by the Creery Boys</span>
        </v-footer> -->
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageDrawer from '@/components/Drawer.vue'
// import MusicBar from '@/components//MusicBar'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageDrawer
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}

.danger-alert {
  color: red;
}

::-webkit-scrollbar {display:none;}
</style>
