import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Eye } from "lucide-react";

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="card group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {job.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {job.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {job.summary}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <User size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{job.postedBy}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{formatDate(job.postedDate)}</span>
          </div>
        </div>

        <Link
          to={`/all-jobs/${job._id}`}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Eye size={18} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
