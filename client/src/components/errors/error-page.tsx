import { isAxiosError } from "axios";
import { Button } from "flowbite-react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          {error?.status == 404 || (isAxiosError(error) && error.response?.status === 404) ? (
            <>
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                Something's missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500">
                {isAxiosError(error)
                  ? error.response?.data.message
                  : `Sorry, we can't find that page. You'll find lots to explore on the home page.`}
              </p>
              <Button
                as={Link}
                to="/"
                className="inline-flex text-white rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Back to Homepage
              </Button>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
                500
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                Internal Server Error.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500">
                We are already working to solve the problem.{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
