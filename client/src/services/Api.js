// small file used as placeholder/settings for API calls via axios to server-side
import axios from 'axios' // used to connect to server backend in ./server folder

export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
