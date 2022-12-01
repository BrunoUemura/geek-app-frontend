import { api } from "../../api";

export async function loginService(email: string, password: string) {
  try {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function registerService(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    return null;
  }
}
