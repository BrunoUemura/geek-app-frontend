import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API || "http://localhost:3000/api";

export const api = axios.create({ baseURL });
