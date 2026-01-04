const Newsletter = () => {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Join Our Newsletter
        </h2>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Stay updated with new jobs, platform updates, and freelancing tips.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="
      flex-1 px-4 py-2 rounded-lg
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      border border-gray-300 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-primary-500
    "
          />

          <button
            className="
      px-6 py-2 rounded-lg font-semibold
      bg-gray-900 dark:bg-white
      text-white dark:text-gray-900
      hover:opacity-90
      transition
    "
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
