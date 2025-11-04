import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed z-20 inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        className="md:hidden fixed top-0 right-0 h-full w-80 bg-body z-50 "
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
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  Home
                </a>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  Services
                </a>
              </div>
              <div className="w-full py-4  border-t border-gray-200 ">
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  About Us
                </a>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  Pricing
                </a>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  Appointment
                </a>
              </div>
              <div className="w-full py-4 border-t border-gray-200">
                <a
                  href="#"
                  className="text-prussianBlue font-inter text-center "
                  onClick={closeSidebar}
                >
                  Contact Us
                </a>
              </div>
            </nav>
            {/* Mobile Buttons */}
            <div className="mt-8 flex flex-col gap-4 w-full">
              <button className="bg-gray-100 w-full py-2 rounded-full font-inter text-prussianBlue  transition-colors">
                Sign In
              </button>
              <button className="bg-skyBlue w-full py-2 rounded-full font-inter text-prussianBlue transition-colors">
                Book Your Appointment
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="w-full flex justify-center items-center border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-10  bg-body">
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
                  Sign In
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
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </motion.div>
          {/* Desktop Navbar */}
          <section className="hidden md:flex gap-8 items-center ">
            <p className="text-prussianBlue/80 font-inter">Home</p>
            <p className="text-prussianBlue/80 font-inter">Services</p>
            <p className="text-prussianBlue/80 font-inter">About Us</p>
            <p className="text-prussianBlue/80 font-inter">Pricing</p>
            <p className="text-prussianBlue/80 font-inter">Appointment</p>
            <p className="text-prussianBlue/80 font-inter">Contact Us</p>
          </section>
        </motion.div>
      </section>
    </>
  );
};
export default Header;
