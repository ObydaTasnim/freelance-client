import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Link to="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
