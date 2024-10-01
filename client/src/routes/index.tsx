import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { meQueryOption } from "~/lib/queryOptions";
import { Login, Register } from "~/pages";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      await queryClient.prefetchQuery(meQueryOption);
      return null;
    },
    children: [
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
