import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Have questions, suggestions, or need support? Feel free to reach out
          to us. We’re always happy to help.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <Mail className="mx-auto text-primary-600 mb-3" size={36} />
          <h3 className="font-semibold text-lg">Email</h3>
          <p className="text-gray-600 dark:text-gray-400">
            support@freelancehub.com
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <Phone className="mx-auto text-primary-600 mb-3" size={36} />
          <h3 className="font-semibold text-lg">Phone</h3>
          <p className="text-gray-600 dark:text-gray-400">+880 1234 567 890</p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <MapPin className="mx-auto text-primary-600 mb-3" size={36} />
          <h3 className="font-semibold text-lg">Location</h3>
          <p className="text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
