import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  // 🌐 Public pages
  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/all-jobs", label: "All Jobs" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // 🔒 Private pages
  const privateLinks = user
    ? [
        { path: "/add-job", label: "Add a Job" },
        { path: "/my-added-jobs", label: "My Added Jobs" },
        { path: "/my-accepted-tasks", label: "My Accepted Tasks" },
      ]
    : [];

  const navLinks = [...publicLinks, ...privateLinks];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
          >
            <Briefcase size={32} />
            <span className="text-2xl font-bold">FreelanceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Profile Avatar → My Profile Route */}
                <Link to="/my-profile" className="relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full ring-2 ring-primary-500 cursor-pointer"
                  />
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      My Profile
                    </p>
                  </div>
                </Link>

                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive
                          ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                {user && (
                  <>
                    <NavLink
                      to="/my-profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      My Profile
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full mt-2 btn-primary"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!user && (
                  <div className="flex flex-col space-y-2 border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-outline text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
