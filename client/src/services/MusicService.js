import Api from '@/services/Api'

export default {
  getlist () {
    return Api().get('musiclist')
  },
  getBaseURL () {
    return Api().defaults.baseURL + '/music/'
  }
}
