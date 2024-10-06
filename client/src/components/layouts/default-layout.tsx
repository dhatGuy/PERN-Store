import { QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { getCartQueryOptions } from "~/api/cart/get-cart";
import { meQueryOption } from "~/lib/queryOptions";
import Nav from "../Nav";

export const defaultLayoutLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(meQueryOption);
  await queryClient.ensureQueryData(getCartQueryOptions());
  return null;
};
export const DefaultLayout = ({
  children,
  title,
  loading,
}: PropsWithChildren<{
  title?: string;
  loading?: boolean;
}>) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="px-4 lg:px-0 text-gray-700 mt-16 mx-auto flex-grow h-full container">
          <Outlet />
        </main>

        <footer className="mt-auto flex justify-center py-2">
          <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            &copy; {new Date().getFullYear()} PERN Store —
            <a
              href="https://github.com/dhatguy"
              className="text-gray-500 ml-1 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @dhatGuy
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};
