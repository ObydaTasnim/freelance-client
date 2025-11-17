import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle, X, Calendar, User } from "lucide-react";
import { acceptedTaskAPI } from "../services/api";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const MyAcceptedTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Toast confirmation popup
  const confirmToast = (message, onConfirm) => {
    toast(
      (t) => (
        <div className="p-3">
          <p className="font-medium text-white dark:text-white">{message}</p>

          <div className="flex gap-2 mt-3">
            <button
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm();
              }}
            >
              Confirm
            </button>

            <button
              className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["acceptedTasks", user?.email],
    queryFn: async () => {
      const response = await acceptedTaskAPI.getByEmail(user.email);
      return response.data.data;
    },
    enabled: !!user?.email,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => acceptedTaskAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["acceptedTasks"]);
      toast.success("Task removed successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove task");
    },
  });

  const handleDone = (id) => {
    confirmToast("Mark this task as done?", () => {
      deleteTaskMutation.mutate(id);
    });
  };

  const handleCancel = (id) => {
    confirmToast("Are you sure you want to cancel this task?", () => {
      deleteTaskMutation.mutate(id);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <CheckCircle
                className="text-primary-600 dark:text-primary-400"
                size={24}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                My Accepted Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage the jobs you've accepted
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {isError ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400 text-lg">
              Failed to load your tasks. Please try again later.
            </p>
          </div>
        ) : !tasks || tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <CheckCircle className="mx-auto mb-4 text-gray-400" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Accepted Tasks
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start accepting jobs to see them here
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={task.jobCoverImage}
                    alt={task.jobTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {task.jobCategory}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {task.jobTitle}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">
                        Posted by {task.jobPostedBy}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span>Accepted on {formatDate(task.acceptedDate)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDone(task._id)}
                      disabled={deleteTaskMutation.isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      title="Mark as Done"
                    >
                      <CheckCircle size={18} />
                      Done
                    </button>
                    <button
                      onClick={() => handleCancel(task._id)}
                      disabled={deleteTaskMutation.isPending}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      title="Cancel Task"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
