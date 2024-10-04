import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav";

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
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <main className="h-full">
            <Outlet />
          </main>
        </div>

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
