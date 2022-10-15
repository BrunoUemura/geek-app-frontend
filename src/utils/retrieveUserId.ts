import jwt_decode from "jwt-decode";

interface IJwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export function retrieveUserId(token: string): string {
  const { id, iat, exp }: IJwtPayload = jwt_decode(token);
  return id;
}
