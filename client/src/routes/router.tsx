import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "~/components/layouts/auth-layout";
import { DefaultLayout } from "~/components/layouts/default-layout";
import { rootLoader } from "~/lib/loaders";
import { productBySlugQueryOptions, productsQueryOptions } from "~/lib/queryOptions";
import { Login, ProductDetails, ProductList, Register, ResetPassword } from "~/pages";
import { queryClient } from "~/queryClient";
import authService from "~/services/auth.service";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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
    element: <DefaultLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        // path: "/products",
        index: true,
        element: <ProductList />,
        loader: async ({ request }) => {
          const page = Number(new URL(request.url).searchParams.get("page") || 1);
          const data = await queryClient.ensureQueryData(productsQueryOptions({ page }));
          return data;
        },
      },
      {
        path: "/products/:slug",
        element: <ProductDetails />,
        loader: async ({ params }) => {
          const { slug } = params;
          const data = await queryClient.ensureQueryData(productBySlugQueryOptions({ slug }));
          console.log("🚀 ~ file: router.tsx:64 ~ loader: ~ data:", data);

          if (!data) {
            throw new Response("Not found", { status: 404 });
          }

          return data;
        },
      },
      {
        path: "/orders",
        element: <div>orders</div>,
      },
    ],
  },
]);

export default router;
