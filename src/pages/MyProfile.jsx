import { useState, Fragment } from "react";
import { updateProfile } from "firebase/auth";
import {
  User,
  Mail,
  Image as ImageIcon,
  Settings,
  BarChart3,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // Mock dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    totalProjects: 12,
    completedTasks: 45,
    pendingTasks: 8,
    storageUsed: "2.5",
    storageTotal: "10",
    accountType: "Premium",
  });

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

  const handleLogout = () => {
    // Implement logout logic
    toast.success("Logged out successfully!");
  };

  const handleAccountUpgrade = () => {
    toast.success("Upgrading account to Premium...");
    setDashboardStats((prev) => ({ ...prev, accountType: "Premium" }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={preview || "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-24 h-24 rounded-full ring-4 ring-primary-500 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{name || "User Name"}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="mt-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                {dashboardStats.accountType}
              </span>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <BarChart3 size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <User size={20} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "billing"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <CreditCard size={20} />
                Billing
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "settings"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Settings size={20} />
                Settings
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "security"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Shield size={20} />
                Security
              </button>
            </nav>

            {/* Dropdown Menu */}
            <div className="mt-8 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Settings size={20} />
                  More Options
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700 py-2 z-10">
                  <button
                    onClick={() => {
                      setActiveTab("help");
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HelpCircle size={18} />
                    Help & Support
                  </button>
                  <button
                    onClick={() => {
                      // Handle privacy settings
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Shield size={18} />
                    Privacy Settings
                  </button>
                  <div className="border-t dark:border-gray-700 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === "dashboard" ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-primary-600 mb-8">
                Dashboard
              </h1>

             

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "Updated profile picture", time: "2 hours ago" },
                    { action: "Completed 'Project Alpha'", time: "1 day ago" },
                    { action: "Changed password", time: "3 days ago" },
                    { action: "Added new project", time: "1 week ago" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span>{activity.action}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "profile" ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-primary-600 mb-8">
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
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-primary-600 mb-8">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                This section is under development. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
