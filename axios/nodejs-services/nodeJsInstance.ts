import axios from "axios";

const nodejsInstance = axios.create({
    baseURL: 'http://10.0.2.2:9999/api'
})

export default nodejsInstance;