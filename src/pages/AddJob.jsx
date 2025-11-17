import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Briefcase, User, Mail, Image, FileText, Tag } from "lucide-react";
import { jobAPI } from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AddJob = () => {
  const { user } = useAuth();
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

  const addJobMutation = useMutation({
    mutationFn: (jobData) => jobAPI.create(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["latestJobs"]);
      toast.success("Job posted successfully!");
      navigate("/my-added-jobs");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to post job");
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

    const jobData = {
      title: formData.title,
      postedBy: user.displayName,
      category: formData.category,
      summary: formData.summary,
      coverImage: formData.coverImage,
      userEmail: user.email,
    };

    addJobMutation.mutate(jobData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
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
                  Post a New Job
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the details to create a job posting
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

              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Posted By
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input-field pl-10 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input-field pl-10 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
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
              <button
                type="submit"
                disabled={addJobMutation.isPending}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {addJobMutation.isPending ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <Briefcase size={20} />
                    Post Job
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddJob;
