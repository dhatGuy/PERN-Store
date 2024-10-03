import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthLayout } from "~/components/layouts/auth-layout";
import { rootLoader } from "~/lib/loaders";
import { Login, Register, ResetPassword } from "~/pages";
import authService from "~/services/auth.service";
const queryClient = new QueryClient();

const TestComp = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const router = createBrowserRouter([
  {
    element: <TestComp />,
    children: [
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        id: "reset-password",
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const token = url.searchParams.get("token");
          const email = url.searchParams.get("email");

          if (!token || !email) {
            return null;
          }
          const res = await authService.checkToken({ token, email });

          return res.data.data;
        },
      },
    ],
  },
  {
    path: "/",
    loader: rootLoader,
    children: [],
  },
]);

export default router;
