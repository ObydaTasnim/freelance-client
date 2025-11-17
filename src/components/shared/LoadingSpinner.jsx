import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "default", fullScreen = false }) => {
  const sizeClasses = {
    small: "w-5 h-5",
    default: "w-10 h-10",
    large: "w-16 h-16",
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <Loader2
        className={`${sizeClasses[size]} text-primary-600 animate-spin`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
