<template>
  <div id="app">
    <v-app id="inspire">
      <PageDrawer app />
      <PageHeader app />
        <v-content>
          <!-- have to use v-app for vuetify instead of just div -->
            <router-view />

        </v-content>
        <v-footer dark app> <!-- footer in or out of v-content?? -->
          <span class="white--text">Made by the Creery Boys</span>
        </v-footer>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageDrawer from '@/components/Drawer.vue'
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
