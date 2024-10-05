import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Spinner } from "flowbite-react";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import ErrorPage from "~/components/errors/error-page";
import { queryConfig } from "~/lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
              <Toaster position="top-right" />
              {children}
            </QueryClientProvider>
          </HelmetProvider>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
