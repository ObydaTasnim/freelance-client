import { Link } from "react-router-dom";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
          <div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-white mb-4"
            >
              <Briefcase size={28} />
              <span className="text-xl font-bold">FreelanceHub</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted platform for connecting freelancers with
              opportunities. Build your career, find the perfect job, and grow
              your business with us.
            </p>
          </div>

          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-jobs"
                  className="hover:text-primary-400 transition-colors"
                >
                  All Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/add-job"
                  className="hover:text-primary-400 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-primary-400 transition-colors cursor-pointer">
                  Web Development
                </span>
              </li>
              <li>
                <span className="hover:text-primary-400 transition-colors cursor-pointer">
                  Digital Marketing
                </span>
              </li>
              <li>
                <span className="hover:text-primary-400 transition-colors cursor-pointer">
                  Graphics Designing
                </span>
              </li>
              <li>
                <span className="hover:text-primary-400 transition-colors cursor-pointer">
                  Content Writing
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">
                  12/A Gulshan,Niketan-1200
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">01715739113</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">contact:@freelancehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} FreelanceHub. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
