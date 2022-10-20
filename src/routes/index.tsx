import { Route, Routes } from "react-router-dom";

import { Lists } from "../pages/Lists";
import { ListNew } from "../pages/ListsNew";
import { ListEdit } from "../pages/ListsEdit";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/404";
import { ROUTES } from "./constants";
import ListsDetails from "../pages/ListsDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route path={ROUTES.ROOT} element={<Lists />} />
      <Route path={ROUTES.LIST} element={<Lists />} />
      <Route path={ROUTES.LIST_DETAILS} element={<ListsDetails />} />
      <Route path={ROUTES.LIST_EDIT} element={<ListEdit />} />
      <Route path={ROUTES.LIST_NEW} element={<ListNew />} />
    </Routes>
  );
}
