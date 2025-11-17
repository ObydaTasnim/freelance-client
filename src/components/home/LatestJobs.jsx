import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Briefcase } from "lucide-react";
import { jobAPI } from "../../services/api";
import LoadingSpinner from "../shared/LoadingSpinner";

const LatestJobs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: async () => {
      const response = await jobAPI.getLatest();
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-red-600 dark:text-red-400">
        Failed to load latest jobs. Please try again later.
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the most recent job postings and find your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {job.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {job.summary}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User size={16} className="mr-2" />
                    <span>{job.postedBy}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(job.postedDate)}</span>
                  </div>
                </div>

                <Link
                  to={`/all-jobs/${job._id}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:gap-2 transition-all group"
                >
                  View Details
                  <ArrowRight
                    size={18}
                    className="ml-1 group-hover:ml-2 transition-all"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/all-jobs"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Jobs
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestJobs;
