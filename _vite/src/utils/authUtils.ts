import { IUser } from "../types/IAuthContext";

export function getUserLocalStorage() {
  const user = localStorage.getItem("u");

  if (!user) return null;

  return JSON.parse(user);
}

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function deleteUserLocalStorage() {
  localStorage.removeItem("u");
}
