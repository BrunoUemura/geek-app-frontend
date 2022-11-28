import axios from "axios";

const baseURL = "https://geek-app-backend-serverless.vercel.app/api";

export const api = axios.create({ baseURL });
