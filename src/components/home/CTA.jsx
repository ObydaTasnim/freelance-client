import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="mb-8">
          Join FreelanceHub today and connect with opportunities worldwide.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/all-jobs"
            className="border border-white px-6 py-3 rounded-lg font-semibold"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
