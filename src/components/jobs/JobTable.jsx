import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const JobTable = ({ jobs, onDelete, onUpdate, showActions = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Job
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Posted By
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Date
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <motion.tr
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {job.summary}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.category}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {job.postedBy}
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                {formatDate(job.postedDate)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <Link
                    to={`/all-jobs/${job._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </Link>
                  {showActions && (
                    <>
                      <button
                        onClick={() => onUpdate(job._id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(job._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
