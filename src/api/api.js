import axios from "axios"

const url = "http://192.168.15.3:3001"
const api = axios.create({
  baseURL: url,
})

export default api
