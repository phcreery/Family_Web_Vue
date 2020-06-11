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
        sm="8"
        md="4"
      >
        <v-card :elevation="10">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <!-- <v-card-title>Login</v-card-title> -->
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="person"
                type="email"
                v-model="email"
              />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
                @keydown.enter="login"
              />
            </v-form>

            <div class="danger-alert" v-html="error"></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  created () {
    console.log('env:', process.env)
  },

  methods: {
    async login () {
      try {
        this.$store.commit('startLoading')
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.commit('stopLoading')
        if (response.data.user) {
          this.$router.push({ name: 'root' })
        }
      } catch (error) {
        console.log(JSON.stringify(error))
        this.error = error.response.data.error
        this.$store.commit('stopLoading')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
