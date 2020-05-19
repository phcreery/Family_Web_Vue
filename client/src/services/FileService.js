import Api from '@/services/Api'
import Vue from 'vue'
export const MusicEventBus = new Vue()

export default {
  getfolderlist (dir) {
    return Api().get('folderreaddir/' + dir)
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  }
}
