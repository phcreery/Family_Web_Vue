import Api from '@/services/Api'
import Vue from 'vue'
export const MusicEventBus = new Vue()

export default {
  getlist () {
    return Api().get('musiclist')
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  }
}
