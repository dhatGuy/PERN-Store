import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "~/components/errors/error-page";

import { AuthLayout } from "~/components/layouts/auth-layout";
import { DefaultLayout } from "~/components/layouts/default-layout";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/signup",
          lazy: async () => {
            const { Signup } = await import("./routes/auth/signup");

            return { Component: Signup };
          },
        },
        {
          path: "/login",
          lazy: async () => {
            const { Login } = await import("./routes/auth/login");

            return { Component: Login };
          },
        },
        {
          path: "/reset-password",
          lazy: async () => {
            const { ResetPassword } = await import("./routes/auth/reset-password");

            return { Component: ResetPassword };
          },
          loader: async (args) => {
            const { resetPasswordLoader } = await import("./routes/auth/reset-password");
            return resetPasswordLoader()(args);
          },
        },
      ],
    },
    {
      path: "/",
      element: <DefaultLayout />,
      errorElement: <ErrorPage />,
      loader: async () => {
        const { defaultLayoutLoader } = await import("../components/layouts/default-layout");
        return defaultLayoutLoader(queryClient)();
      },
      children: [
        {
          // path: "/products",
          index: true,
          lazy: async () => {
            const { ProductRoute } = await import("./routes/products/products");
            return { Component: ProductRoute };
          },
          loader: async (args) => {
            const { productsLoader } = await import("./routes/products/products");
            return productsLoader(queryClient)(args);
          },
        },
        {
          path: "/products/:slug",
          lazy: async () => {
            const { ProductRoute } = await import("./routes/products/product");
            return { Component: ProductRoute };
          },
          loader: async (args) => {
            const { productLoader } = await import("./routes/products/product");
            return productLoader(queryClient)(args);
          },
        },
        {
          path: "/cart",
          lazy: async () => {
            const { CartRoute } = await import("./routes/cart/cart");
            return { Component: CartRoute };
          },
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
