import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { jobAPI, acceptedTaskAPI } from "../services/api";
import useAuth from "../hooks/useAuth";
import JobDetailsCard from "../components/jobs/JobDetailsCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await jobAPI.getById(id);
      return response.data.data;
    },
  });

  const acceptJobMutation = useMutation({
    mutationFn: (taskData) => acceptedTaskAPI.accept(taskData),
    onSuccess: () => {
      toast.success("Job accepted successfully!");
      navigate("/my-accepted-tasks");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to accept job");
    },
  });

  const handleAcceptJob = () => {
    if (!user) {
      toast.error("Please login to accept jobs");
      return;
    }

    if (job.userEmail === user.email) {
      toast.error("You cannot accept your own job posting");
      return;
    }

    const taskData = {
      jobId: job._id,
      jobTitle: job.title,
      jobCategory: job.category,
      jobCoverImage: job.coverImage,
      jobPostedBy: job.postedBy,
      acceptedBy: user.email,
      acceptedByName: user.displayName,
    };

    acceptJobMutation.mutate(taskData);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">
            Failed to load job details
          </p>
          <button onClick={() => navigate("/all-jobs")} className="btn-primary">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const isOwnJob = user && job.userEmail === user.email;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        {/* Job Details */}
        <JobDetailsCard job={job} />

        {/* Accept Button */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            {isOwnJob ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 px-6 py-4 rounded-lg">
                <p className="font-medium">
                  This is your job posting. You cannot accept your own jobs.
                </p>
              </div>
            ) : (
              <button
                onClick={handleAcceptJob}
                disabled={acceptJobMutation.isPending}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
              >
                {acceptJobMutation.isPending ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <CheckCircle size={24} />
                    Accept This Job
                  </>
                )}
              </button>
            )}
          </motion.div>
        )}

        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 px-6 py-4 rounded-lg text-center"
          >
            <p className="font-medium mb-3">Please login to accept this job</p>
            <button
              onClick={() => navigate("/login", { state: { from: location } })}
              className="btn-primary"
            >
              Login Now
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
