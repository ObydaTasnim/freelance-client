import { Briefcase, Users, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          About FreelanceHub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          FreelanceHub is a modern freelancing platform designed to connect
          skilled professionals with clients who need reliable and quality
          services. Our goal is to simplify job posting, task acceptance, and
          collaboration in a secure and user-friendly environment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <Users className="mx-auto text-primary-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
          <p className="text-gray-600 dark:text-gray-400">
            FreelanceHub brings together freelancers and job providers in one
            trusted space, encouraging collaboration and long-term growth.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <Briefcase className="mx-auto text-primary-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Smart Job Management</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Users can post jobs, browse opportunities, apply for tasks, and
            manage their work efficiently with a structured dashboard.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
          <ShieldCheck className="mx-auto text-primary-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
          <p className="text-gray-600 dark:text-gray-400">
            With authentication, protected routes, and role-based access,
            FreelanceHub ensures data safety and secure user interactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
