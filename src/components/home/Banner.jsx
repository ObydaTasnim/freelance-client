import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Users, CheckCircle } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary-500 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Find Your Perfect
              <span className="block text-yellow-300">Freelance Job Today</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Join thousands of freelancers and clients on the most reliable
              marketplace platform. Post jobs, find opportunities, and grow your
              career with FreelanceHub.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: CheckCircle, text: "Verified Jobs" },
                { icon: Users, text: "Trusted Community" },
                { icon: TrendingUp, text: "Grow Your Career" },
                { icon: Briefcase, text: "Easy to Use" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 text-white"
                >
                  <item.icon
                    size={20}
                    className="text-yellow-300 flex-shrink-0"
                  />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/all-jobs"
                className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center"
              >
                Browse Jobs
              </Link>
              <Link
                to="/add-job"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center"
              >
                Post a Job
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  
                  {[
                    {
                      label: "Active Jobs",
                      value: "2,500+",
                      color: "bg-yellow-400",
                    },
                    {
                      label: "Freelancers",
                      value: "10,000+",
                      color: "bg-green-400",
                    },
                    {
                      label: "Success Rate",
                      value: "98%",
                      color: "bg-blue-400",
                    },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.2 }}
                      className="bg-white rounded-xl p-4 flex items-center space-x-4 shadow-lg"
                    >
                      <div
                        className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                      >
                        <Briefcase className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
