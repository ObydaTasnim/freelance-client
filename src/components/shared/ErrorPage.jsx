import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="inline-block mb-6"
        >
          <AlertCircle className="w-24 h-24 text-primary-600 dark:text-primary-400" />
        </motion.div>

        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            to="/all-jobs"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            Browse Jobs
          </Link>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Lost? Don't worry, we'll help you find your way.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
