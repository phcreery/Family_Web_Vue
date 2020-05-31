import Api from '@/services/Api'
// import Vue from 'vue'
// export const MusicEventBus = new Vue()

export default {
  getfolderlist (dir) {
    console.log('Seinding axios rerwuard with body:', {data: {path: dir}})
    return Api().get('folderreaddir', {params: {path: dir}}) // params since it is a get request
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  },
  async createDir (dir) {
    let res = await Api().post('createfiledir/', {dir: dir}) // why is this not in {data: {...}} ??
    return res
  },
  async deleteDir (dir) {
    let res = await Api().delete('deletefolder/', {data: {dir: dir}})
    return res
  },
  async deleteFile (file) {
    let res = await Api().delete('deletefile/', {data: {file: file}})
    return res
  },
  async uploadFile (dir, filesasformData) {
    if (dir === '') {
      dir = 'root'
    }
    // console.log('Gonna post this file:', filesasformData)
    let res = await Api().post('uploadfile/' + dir, filesasformData, {headers: {'Content-Type': 'multipart/form-data'}})
    return res
  }
}
