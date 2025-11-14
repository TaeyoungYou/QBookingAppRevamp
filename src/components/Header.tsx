import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (mq.matches) {
        document.body.style.overflow = "unset";
      } else {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
      }
    };
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [isSidebarOpen]);
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed z-1020 inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        className="md:hidden fixed top-0 right-0 h-full w-80 bg-body z-1020 "
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? "0" : "100%" }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="p-6 h-full">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col  justify-between items-center h-full w-full mt-6">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 w-full ">
              <div className="w-full py-4 border-t border-gray-200">
                {" "}
                <Link
                  to="/"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  Home
                </Link>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <Link
                  to="/services"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/services"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  Services
                </Link>
              </div>
              <div className="w-full py-4  border-t border-gray-200 ">
                <Link
                  to="/about-us"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/about-us"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  About Us
                </Link>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <Link
                  to="/pricing"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/pricing"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  Pricing
                </Link>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <Link
                  to="/appointment"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/appointment"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  Appointment
                </Link>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <Link
                  to="/contact-us"
                  className={`font-inter text-center transition-colors ${
                    location.pathname === "/contact-us"
                      ? "text-skyBlue"
                      : "text-prussianBlue"
                  }`}
                  onClick={closeSidebar}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
            {/* Mobile Buttons */}
            <div className="mt-8 flex flex-col gap-4 w-full">
              <Link
                to="/dashboard"
                className="bg-gray-100 w-full py-2 rounded-full font-inter text-prussianBlue text-center  transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/appointment"
                className={`bg-skyBlue text-center w-full py-2 rounded-full font-inter text-prussianBlue transition-colors ${
                  location.pathname === "/appointment"
                    ? "text-skyBlue"
                    : "text-prussianBlue"
                }`}
              >
                Book Your Appointment
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="w-full flex justify-center items-center border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-1010  bg-body">
        {/* Header Container */}
        <motion.div
          className={`w-3/4 flex flex-col gap-8 transition-all duration-300 ${
            isScrolled
              ? " h-12 md:h-14 justify-center sm:mt-2 md:mt-0 sm:mb-0 md:mb-6"
              : "h-16 md:h-28 mt-6"
          }`}
        >
          {/* Header Top (Logo and Buttons) */}
          <motion.div className={`w-full flex justify-between items-center `}>
            <img
              src={logo}
              alt="Logo Mobile"
              className="md:hidden h-7 w-auto rounded-md"
            />

            {!isScrolled && (
              <img
                src={logo}
                alt="Logo Desktop"
                className="hidden md:block h-10 w-auto rounded-md"
              />
            )}
            {/* Desktop Buttons */}

            {!isScrolled && (
              <div
                className={`hidden md:flex gap-2 ${
                  isScrolled ? "hidden" : "visible"
                }`}
              >
                <motion.button
                  className="bg-gray-100 px-4 py-2 rounded-full font-inter  transition-colors"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                >
                  <Link to="/dashboard">Sign In</Link>
                </motion.button>
                <motion.button
                  className="bg-skyBlue text-prussianBlue px-4 py-2 rounded-full font-inter transition-colors"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                >
                  Book Your Appointment
                </motion.button>
              </div>
            )}
            {/* Mobile Toggle Menu */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-prussianBlue/60 transition-all duration-300 ${
                  isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-prussianBlue/60 transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-prussianBlue/60 transition-all duration-300 ${
                  isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </motion.div>
          {/* Desktop Navbar */}
          <section className="hidden md:flex gap-8 items-center ">
            <Link
              to="/"
              className={`font-inter transition-colors ${
                location.pathname === "/"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`font-inter transition-colors ${
                location.pathname === "/services"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              Services
            </Link>
            <Link
              to="/about-us"
              className={`font-inter transition-colors ${
                location.pathname === "/about-us"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              className={`font-inter transition-colors ${
                location.pathname === "/pricing"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/appointment"
              className={`font-inter transition-colors ${
                location.pathname === "/appointment"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              Appointment
            </Link>
            <Link
              to="/contact-us"
              className={`font-inter transition-colors ${
                location.pathname === "/contact-us"
                  ? "text-skyBlue"
                  : "text-prussianBlue/80"
              }`}
            >
              Contact Us
            </Link>
          </section>
        </motion.div>
      </section>
    </>
  );
};
export default Header;
