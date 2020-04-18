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
  },
  async getsrclist () {
    const list = await Api().get('famphoto')
    const baseURL = await Api().defaults.baseURL + '/famphoto/'
    var arr = []
    for (const img in list.data) {
      arr.push({src: baseURL + list.data[img]})
    }
    console.log(arr)
    return arr
  }
}
