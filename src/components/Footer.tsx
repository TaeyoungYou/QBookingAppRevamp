import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdEmail, MdPhone } from "react-icons/md";
const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-linear-to-r from-utOrange to-selectiveYellow border-t border-white rounded-tr-full mt-28"
      whileInView={{
        opacity: [0, 1],
        x: ["-100%", "0%"],
        transition: {
          duration: 2,
          type: "spring",
          stiffness: 100,
          delay: 0.5,
        },
      }}
    >
      <div className="w-9/12 md:w-3/4 mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="font-inter text-2xl sm:text-3xl font-semibold text-prussianBlue mb-6">
              Revolutionize Your Booking Experience
            </h2>
            <p className="text-gray-600 font-inter text-base leading-relaxed mb-6">
              "Q" is your all-in-one booking solution designed for modern
              businesses. We simplify appointment scheduling for salons, spas,
              restaurants, clinics, and more. Our platform streamlines
              operations, reduces no-shows, and enhances customer satisfaction
              with seamless booking experiences.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center bg-blueGreen text-white px-8 py-3 rounded-full font-inter text-base hover:bg-blueGreen/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          {/* Right Content */}
          <div>
            <h3 className="font-inter text-xl font-semibold text-prussianBlue mb-4">
              Our Contacts
            </h3>
            {/* Contact Links */}
            <div className="space-y-2 mb-6">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-white hover:text-blueGreen transition-colors"
              >
                <MdPhone className="text-lg" />
                <span className="font-inter text-base">+1 (234) 567-890</span>
              </a>
              <a
                href="mailto:support@qapplication.com"
                className="flex items-center gap-2 text-white hover:text-blueGreen transition-colors"
              >
                <MdEmail className="text-lg" />
                <span className="font-inter text-base">
                  support@qapplication.com
                </span>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex gap-2">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-prussianBlue hover:bg-blueGreen hover:text-white transition-all border border-gray-200"
                aria-label="Facebook"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF className="text-base" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-prussianBlue hover:bg-blueGreen hover:text-white transition-all border border-gray-200"
                aria-label="Twitter"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaXTwitter className="text-base" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-prussianBlue hover:bg-blueGreen hover:text-white transition-all border border-gray-200"
                aria-label="Instagram"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="text-base" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-prussianBlue hover:bg-blueGreen hover:text-white transition-all border border-gray-200"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedinIn className="text-base" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-6 bg-sand border-t-white ">
        <div className="w-9/12 md:w-3/4 mx-auto flex  justify-center items-center ">
          <p className="text-gray-600 font-inter text-sm">Copyright © Q Team</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
