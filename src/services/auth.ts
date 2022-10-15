const BACKEND_URL = "https://geek-app-backend-production.up.railway.app/api";

interface IResponse {
  status: string;
  isError: boolean;
  data: any;
  error: any;
}

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  username: string;
  email: string;
  password: string;
}

async function validateToken(token: string): Promise<IResponse> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  };

  const result = await fetch(
    `${BACKEND_URL}/v1/auth/validate-token`,
    requestOptions
  );

  return await result.json();
}

async function signIn(data: ISignIn): Promise<IResponse> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };
  const result = await fetch(`${BACKEND_URL}/v1/auth/login`, requestOptions);
  return await result.json();
}

async function signUp(data: ISignUp): Promise<IResponse> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  };
  const result = await fetch(`${BACKEND_URL}/v1/auth/register`, requestOptions);
  return await result.json();
}

export const auth = {
  validateToken,
  signIn,
  signUp,
};
