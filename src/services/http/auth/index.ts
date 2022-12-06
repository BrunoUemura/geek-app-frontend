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
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/auth/signup", {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    return null;
  }
}

export async function validateAuth(token: string) {
  try {
    const response = await api.post("/auth/validate", { token });
    return response;
  } catch (error) {
    return null;
  }
}
