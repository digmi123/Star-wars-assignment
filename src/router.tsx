import { createBrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { categories } from "@/consts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/:category",
    element: <Category />,
    loader: ({ params }) => {
      if (!categories.includes(params.category)) {
        throw new Response("Not Found", { status: 404 });
      }
      return { category: params.category };
    },
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
