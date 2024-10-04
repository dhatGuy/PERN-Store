import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Windmill } from "@windmill/react-ui";
import { Spinner } from "flowbite-react";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { ContentLayout } from "./components/layouts";
import "./index.css";
import { queryClient } from "./queryClient";
import { router } from "./routes";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(container);

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

root.render(
  <Suspense
    fallback={
      <ContentLayout>
        <Spinner />
      </ContentLayout>
    }
  >
    <GoogleOAuthProvider clientId={googleClientId}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Windmill>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
          </Windmill>
        </QueryClientProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </Suspense>
);
