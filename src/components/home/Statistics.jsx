import { motion } from "framer-motion";
import { Users, Briefcase, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "15K+", label: "Active Users" },
  { icon: Briefcase, value: "5K+", label: "Jobs Completed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Globe, value: "30+", label: "Countries Served" },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <stat.icon
                size={36}
                className="mx-auto text-primary-600 dark:text-primary-400 mb-3"
              />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
