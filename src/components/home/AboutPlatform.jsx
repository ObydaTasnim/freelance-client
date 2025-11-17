import { motion } from "framer-motion";
import { Shield, Zap, Users, Award } from "lucide-react";

const AboutPlatform = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description:
        "Your data and transactions are protected with enterprise-grade security",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description:
        "Quick job posting and instant connections with skilled professionals",
    },
    {
      icon: Users,
      title: "Verified Community",
      description:
        "Work with verified freelancers and trusted clients worldwide",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "High-quality work delivered by top-rated freelancers",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About FreelanceHub
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              FreelanceHub is your trusted partner in the freelance economy. We
              connect talented professionals with exciting opportunities, making
              it easier than ever to find work or hire the perfect freelancer
              for your project.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Our platform is designed with both freelancers and clients in
              mind, offering a seamless experience from job posting to project
              completion. Join thousands of satisfied users who have found
              success through FreelanceHub.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  10K+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Active Users
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  2.5K+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Jobs Posted
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <feature.icon
                      className="text-primary-600 dark:text-primary-400"
                      size={24}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
