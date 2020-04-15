import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    toggleSidebar: false,
    isLoading: false,

    music: {
      trackInfo: null,
      isPlaying: false
    }
  },
  mutations: { // sync call by store.commit('')
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    TOGGLE_SIDEBAR (state) {
      state.toggleSidebar = !state.toggleSidebar
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
    setMusicPlaylist (state, payload) {
      state.music.Playlist = payload
    },
    setMusictrackInfo (state, payload) {
      state.music.trackInfo = payload
    }

  },
  actions: { // async call by store.dispatch('')
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  },
  getters: {
    toggleSidebar: state => state.toggleSidebar
  }
})
