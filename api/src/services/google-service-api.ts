import axios from "axios"


const googleApiServices = axios.create({
  baseURL: 'https://www.googleapis.com',
})

export { googleApiServices }