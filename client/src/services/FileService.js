import Api from '@/services/Api'
import Vue from 'vue'
export const MusicEventBus = new Vue()

export default {
  getfolderlist (dir) {
    console.log('Seinding axios rerwuard with body:', {data: {path: dir}})
    return Api().get('folderreaddir', {params: {path: dir}})
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  },
  async createDir (dir) {
    let res = await Api().post('createfiledir/', {dir: dir})
    return res
  },
  async deleteDir (dir) {
    let res = await Api().delete('deletefolder/', {data: {dir: dir}})
    return res
  },
  async deleteFile (file) {
    let res = await Api().delete('deletefile/', {data: {file: file}})
    return res
  }
}
