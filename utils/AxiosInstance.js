import axios from "axios";


const AxiosInstance = axios.create({
    baseURL:"http://paathshaala.me/api/"
 })

export default AxiosInstance;