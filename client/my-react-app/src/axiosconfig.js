import axios from 'axios'

const axiosBase = axios.create({
    // baseURL: 'http://localhost:5500/api/',
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default axiosBase