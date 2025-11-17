import { motion } from "framer-motion";
import { Code, TrendingUp, Palette, Edit, Video, Globe } from "lucide-react";

const TopCategories = () => {
  const categories = [
    {
      icon: Code,
      title: "Web Development",
      description: "Build modern websites and web applications",
      jobs: "850+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Grow brands with digital strategies",
      jobs: "620+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Graphics Designing",
      description: "Create stunning visual content",
      jobs: "740+",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Edit,
      title: "Content Writing",
      description: "Craft compelling written content",
      jobs: "430+",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Video,
      title: "Video Editing",
      description: "Produce professional video content",
      jobs: "320+",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "SEO & Marketing",
      description: "Optimize online presence and reach",
      jobs: "290+",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find opportunities in your area of expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="card p-6 h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="text-white" size={32} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {category.jobs} Jobs
                  </span>
                  <span className="text-gray-400 group-hover:text-primary-600 transition-colors">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
