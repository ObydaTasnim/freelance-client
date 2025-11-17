import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";
import { jobAPI } from "../services/api";
import useAuth from "../hooks/useAuth";
import JobTable from "../components/jobs/JobTable";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const MyAddedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myJobs", user?.email],
    queryFn: async () => {
      const response = await jobAPI.getByUserEmail(user.email);
      return response.data.data;
    },
    enabled: !!user?.email,
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id) => jobAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"]);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["latestJobs"]);
      toast.success("Job deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete job");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJobMutation.mutate(id);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-job/${id}`);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Briefcase
                  className="text-primary-600 dark:text-primary-400"
                  size={24}
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  My Added Jobs
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your job postings
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/add-job")}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Job
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {isError ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400 text-lg">
              Failed to load your jobs. Please try again later.
            </p>
          </div>
        ) : !jobs || jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Briefcase className="mx-auto mb-4 text-gray-400" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Jobs Posted Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by posting your first job
            </p>
            <button
              onClick={() => navigate("/add-job")}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Post Your First Job
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <JobTable
              jobs={jobs}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              showActions={true}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyAddedJobs;
