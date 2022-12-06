import { api } from "../../api";

export async function loginService(email: string, password: string) {
  try {
    const url = "/auth/signin";
    const body = { email: email.toLowerCase(), password };
    const response = await api.post(url, body);
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
    const url = "/auth/signup";
    const body = { username, email: email.toLowerCase(), password };
    const response = await api.post(url, body);
    return response;
  } catch (error) {
    return null;
  }
}

export async function validateAuth(token: string) {
  try {
    const url = "/auth/validate";
    const body = { token };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post(url, body, config);
    return response;
  } catch (error) {
    return null;
  }
}
