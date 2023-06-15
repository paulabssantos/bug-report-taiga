import axios from "axios";
import 'dotenv/config'

const taiga_instance = axios.create({ baseURL: "https://api.taiga.io/api/v1/", headers: {
    'Authorization': `Bearer ${process.env.TAIGA_TOKEN}`
 }})

export { taiga_instance }