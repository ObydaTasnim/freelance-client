import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        An unexpected error occurred while loading this page. Please try again
        later or return to the homepage.
      </p>

      {error?.statusText || error?.message ? (
        <p className="text-sm text-red-500 mb-4">
          {error.statusText || error.message}
        </p>
      ) : null}

      <Link to="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
