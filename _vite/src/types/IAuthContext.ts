export interface IUser {
  id?: string;
  name?: string;
  token?: string;
  isAuthenticated?: boolean;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
