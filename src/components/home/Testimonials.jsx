import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Client",
    text: "FreelanceHub made it incredibly easy to find skilled freelancers. The experience was smooth and reliable.",
  },
  {
    name: "Rahim Khan",
    role: "Freelancer",
    text: "I found consistent work opportunities and professional clients. Highly recommended platform!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <Quote className="text-primary-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t.text}</p>
              <h4 className="font-bold">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
