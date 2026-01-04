const faqs = [
  {
    q: "Is FreelanceHub free to use?",
    a: "Yes, creating an account and browsing jobs is completely free.",
  },
  {
    q: "How do I apply for jobs?",
    a: "Once logged in, you can view job details and apply directly.",
  },
  {
    q: "Is my data secure?",
    a: "Yes, we use secure authentication and protected routes.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
