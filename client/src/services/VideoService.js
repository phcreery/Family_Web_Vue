import Api from '@/services/Api'
import Vue from 'vue'
export const VideoEventBus = new Vue()

export default {
  getlist () {
    return Api().get('videolist')
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/video/'
  }
}
