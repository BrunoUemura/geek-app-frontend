import { Route, Routes } from "react-router-dom";

import List from "../pages/Lists";
import ListDetails from "../pages/ListsDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/404";
import ListEdit from "../pages/ListsEdit";
import ListNew from "../pages/ListsNew";
import ListRemove from "../pages/ListsRemove";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/lists" element={<List />} />
      <Route path="/lists/new" element={<ListNew />} />
      <Route path="/lists/edit/:id" element={<ListEdit />} />
      <Route path="/lists/remove/:id" element={<ListRemove />} />
      <Route path="/list/:id" element={<ListDetails />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
