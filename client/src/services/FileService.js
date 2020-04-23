import Api from '@/services/Api'
import Vue from 'vue'
export const MusicEventBus = new Vue()

export default {
  getfolderlist () {
    return Api().get('folderlist')
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  }
}
