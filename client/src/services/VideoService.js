import Api from '@/services/Api'
import Vue from 'vue'
export const VideoEventBus = new Vue()

export default {
  getlist (dir) {
    return Api().get('videolist/' + dir)
  },
  getfolderlist () {
    return Api().get('videofolderlist')
  },
  getBaseURL (dir) {
    return Api().defaults.baseURL + '/video/' + dir + '/'
  }
}
