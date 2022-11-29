import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./routes";
import {
  Loading,
  Lists,
  ListsDetails,
  Login,
  NotFound,
  Register,
} from "./imports";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        <Route path={ROUTES.ROOT} element={<Lists />} />
        <Route path={ROUTES.LIST} element={<Lists />} />
        <Route path={ROUTES.LIST_DETAILS} element={<ListsDetails />} />
      </Routes>
    </Suspense>
  );
}
