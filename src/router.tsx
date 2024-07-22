import { createBrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
import Category from "./pages/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/:category",
    element: <Category />,
  },
]);

export default router;
