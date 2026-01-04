import { motion } from "framer-motion";

const blogs = [
  {
    title: "How to Succeed as a Freelancer",
    excerpt:
      "Learn practical tips to build your freelancing career and attract long-term clients.",
  },
  {
    title: "Hiring the Right Talent",
    excerpt:
      "A simple guide for clients to choose the best freelancer for their project.",
  },
];

const Blogs = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Latest Blogs</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{blog.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
