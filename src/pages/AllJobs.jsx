import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SortDesc, Grid, Table } from "lucide-react";
import { jobAPI } from "../services/api";
import JobCard from "../components/jobs/JobCard";
import JobTable from "../components/jobs/JobTable";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AllJobs = () => {
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", sortBy],
    queryFn: async () => {
      const response = await jobAPI.getAll(sortBy);
      return response.data.data;
    },
  });

  const handleSort = () => {
    setSortBy(sortBy === "date" ? "" : "date");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through all available job opportunities
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSort}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "date"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <SortDesc size={20} />
              {sortBy === "date" ? "Sorted by Date" : "Sort by Date"}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              title="Grid View"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "table"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              title="Table View"
            >
              <Table size={20} />
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : isError || !data ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400 text-lg">
              Failed to load jobs. Please try again later.
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No jobs found. Be the first to post one!
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <JobTable jobs={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
