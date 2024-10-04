import { Navbar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="shadow-lg fixed w-full bg-white top-0 z-10">
        <Navbar.Brand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-bold">PERN Store</span>
        </Navbar.Brand>
      </Navbar>
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
  );
};
