import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SortDesc,
  Grid,
  Table,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  X,
} from "lucide-react";
import { jobAPI } from "../services/api";
import JobCard from "../components/jobs/JobCard";
import JobTable from "../components/jobs/JobTable";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    minSalary: "",
    experienceLevel: "",
    datePosted: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["jobs", { sortBy, searchTerm, ...filters }],
    queryFn: async () => {
      const response = await jobAPI.getAll({
        sort: sortBy,
        search: searchTerm,
        ...filters,
      });
      return response.data.data;
    },
  });

  const handleSort = (type) => {
    setSortBy(sortBy === type ? "" : type);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: "",
      location: "",
      minSalary: "",
      experienceLevel: "",
      datePosted: "",
    });
    setSearchTerm("");
    setSortBy("");
  };

  const hasActiveFilters = () => {
    return (
      Object.values(filters).some((value) => value !== "") ||
      searchTerm !== "" ||
      sortBy !== ""
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  // Filter options
  const jobTypeOptions = [
    { value: "", label: "Any Type" },
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "remote", label: "Remote" },
  ];

  const experienceLevelOptions = [
    { value: "", label: "Any Experience" },
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "executive", label: "Executive" },
  ];

  const datePostedOptions = [
    { value: "", label: "Any Time" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

  const salaryOptions = [
    { value: "", label: "Any Salary" },
    { value: "30000", label: "$30,000+" },
    { value: "50000", label: "$50,000+" },
    { value: "80000", label: "$80,000+" },
    { value: "100000", label: "$100,000+" },
    { value: "150000", label: "$150,000+" },
  ];

  const sortOptions = [
    { value: "", label: "Relevance", icon: "🔥" },
    { value: "date-desc", label: "Newest", icon: "🆕" },
    { value: "date-asc", label: "Oldest", icon: "📅" },
    { value: "salary-desc", label: "Highest Salary", icon: "💰" },
    { value: "salary-asc", label: "Lowest Salary", icon: "💸" },
    { value: "title-asc", label: "Title A-Z", icon: "🔤" },
    { value: "title-desc", label: "Title Z-A", icon: "🔠" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover your next career opportunity from thousands of listings
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title, company, or keyword..."
                className="w-full pl-12 pr-24 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filter Jobs
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Job Type Filter */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Briefcase size={16} />
                  Job Type
                </label>
                <select
                  value={filters.jobType}
                  onChange={(e) =>
                    handleFilterChange("jobType", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {jobTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <MapPin size={16} />
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  placeholder="City, State, or Remote"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Experience Level Filter */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Briefcase size={16} />
                  Experience
                </label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) =>
                    handleFilterChange("experienceLevel", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {experienceLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Filter */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <DollarSign size={16} />
                  Min Salary
                </label>
                <select
                  value={filters.minSalary}
                  onChange={(e) =>
                    handleFilterChange("minSalary", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {salaryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Posted Filter */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar size={16} />
                  Date Posted
                </label>
                <select
                  value={filters.datePosted}
                  onChange={(e) =>
                    handleFilterChange("datePosted", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {datePostedOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Filter size={16} />
                <span>
                  {hasActiveFilters()
                    ? "Filters Applied"
                    : "No filters applied"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    refetch();
                    setShowFilters(false);
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  const labelMap = {
                    jobType: "Type",
                    location: "Location",
                    minSalary: "Min Salary",
                    experienceLevel: "Experience",
                    datePosted: "Date Posted",
                  };
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {labelMap[key]}: {value}
                      <button onClick={() => handleFilterChange(key, "")}>
                        <X size={14} />
                      </button>
                    </span>
                  );
                })}
                {sortBy && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                    Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
                    <button onClick={() => setSortBy("")}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-sm"
                >
                  <X size={14} />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sort and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Sort by:
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-700 dark:text-gray-300 mr-2">
              {data?.length || 0} jobs found
            </span>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-800 text-primary-600 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "table"
                    ? "bg-white dark:bg-gray-800 text-primary-600 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                title="Table View"
              >
                <Table size={20} />
              </button>
            </div>
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
            <button
              onClick={() => refetch()}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking
                for
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {data.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <JobTable jobs={data} />
          </motion.div>
        )}

        {/* Pagination (if needed) */}
        {data && data.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                2
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                3
              </button>
              <span className="px-2">...</span>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                10
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
