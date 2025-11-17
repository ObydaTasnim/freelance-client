import { motion } from "framer-motion";
import { Calendar, User, Mail, Briefcase } from "lucide-react";

const JobDetailsCard = ({ job }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
     
      <div className="relative h-80 overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {job.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {job.title}
          </h1>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-8">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <User
                className="text-primary-600 dark:text-primary-400"
                size={20}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posted By
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {job.postedBy}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail
                className="text-primary-600 dark:text-primary-400"
                size={20}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contact
              </p>
              <p className="font-semibold text-gray-900 dark:text-white break-all">
                {job.userEmail}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar
                className="text-primary-600 dark:text-primary-400"
                size={20}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posted On
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatDate(job.postedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase
              className="text-primary-600 dark:text-primary-400"
              size={24}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Job Description
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {job.summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetailsCard;
