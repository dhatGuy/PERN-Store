import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "~/lib/loaders";
import { Login, Register } from "~/pages";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: rootLoader,
    children: [],
  },
]);

export default router;
