import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Briefcase, Image, FileText, Tag, ArrowLeft } from "lucide-react";
import { jobAPI } from "../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    summary: "",
    coverImage: "",
  });

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphics Designing",
  ];

  // Fetch job data
  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await jobAPI.getById(id);
      return response.data.data;
    },
  });

  // Set form data when job is loaded
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        category: job.category,
        summary: job.summary,
        coverImage: job.coverImage,
      });
    }
  }, [job]);

  const updateJobMutation = useMutation({
    mutationFn: (jobData) => jobAPI.update(id, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries(["job", id]);
      queryClient.invalidateQueries(["myJobs"]);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["latestJobs"]);
      toast.success("Job updated successfully!");
      navigate("/my-added-jobs");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobMutation.mutate(formData);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Briefcase
                  className="text-primary-600 dark:text-primary-400"
                  size={24}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Update Job
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Modify your job posting details
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Title *
                </label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="e.g., Full Stack Web Developer"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="input-field pl-10 appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image URL *
                </label>
                <div className="relative">
                  <Image
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {formData.coverImage && (
                  <div className="mt-3">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Job Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description *
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input-field pl-10 resize-none"
                    placeholder="Describe the job requirements, responsibilities, and qualifications..."
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formData.summary.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateJobMutation.isPending}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {updateJobMutation.isPending ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    "Update Job"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateJob;
