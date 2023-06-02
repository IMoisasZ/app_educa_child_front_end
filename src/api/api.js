import axios from "axios"

const url = "http://192.168.3.7:3001"
const api = axios.create({
  baseURL: url,
})

export default api
