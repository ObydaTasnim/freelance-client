import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { User, Mail, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
    setPhotoURL(imageURL);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-primary-600 mb-8">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full ring-4 ring-primary-500 object-cover mb-4"
          />

          <label className="flex items-center gap-2 cursor-pointer text-primary-600 hover:underline">
            <ImageIcon size={18} />
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-5">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 mb-1 font-medium">
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="flex items-center gap-2 mb-1 font-medium">
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
