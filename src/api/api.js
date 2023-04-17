import axios from "axios"

const url = "http://192.168.15.10:3001"
const api = axios.create({
  baseURL: url,
})

export default api
