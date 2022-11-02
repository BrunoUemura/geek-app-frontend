import { lazy, LazyExoticComponent } from "react";
import { Loading } from "../pages/Loading";

const NotFound: LazyExoticComponent<() => JSX.Element> = lazy(() =>
  import("../pages/404").then((module) => ({
    default: module.NotFound,
  }))
);

const Lists = lazy(() =>
  import("../pages/Lists").then((module) => ({
    default: module.Lists,
  }))
);

const ListsDetails = lazy(() =>
  import("../pages/Lists/Details").then((module) => ({
    default: module.ListsDetails,
  }))
);

const Login = lazy(() =>
  import("../pages/Login").then((module) => ({
    default: module.Login,
  }))
);

const Register = lazy(() =>
  import("../pages/Register").then((module) => ({
    default: module.Register,
  }))
);

export { Loading, NotFound, Lists, ListsDetails, Login, Register };
