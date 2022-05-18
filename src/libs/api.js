import axios from 'axios'

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API
        ? process.env.NEXT_PUBLIC_API
        : "http://localhost:3000/api",
});

export const blazeApi = axios.create({
    baseURL: process.env.BLAZE_API_URL,
});