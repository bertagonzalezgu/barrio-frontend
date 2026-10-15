import axios from "axios";
import { auth } from "./firebase";
import { categoryToBackend, categoryToFrontend } from "./interceptors/categoryCase";

const API_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({ baseURL: API_URL })

apiClient.interceptors.request.use(async (config) => {
    const token = await auth.currentUser?.getIdToken()
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.request.use(categoryToBackend)
apiClient.interceptors.response.use(categoryToFrontend)