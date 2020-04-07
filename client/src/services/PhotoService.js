import Api from '@/services/Api'

export default {
  getlist () {
    return Api().get('famphoto')
  },
  getphoto (photo) {
    return Api().post('famphoto', photo)
  },
  getBaseURL (photo) {
    return Api().defaults.baseURL + '/famphoto/'
  }
}
