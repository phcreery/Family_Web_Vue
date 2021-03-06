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
  },
  async deleteCatalog (dir) {
    let res = await Api().delete('videofolder', {data: {dir: dir}})
    return res
  },
  async createCatalog (dir) {
    let res = await Api().post('videofolderlist/' + dir)
    return res
  },
  async uploadVideo (dir, filesasformData) {
    let res = await Api().post('videolist/' + dir, filesasformData)
    return res
  }
}
