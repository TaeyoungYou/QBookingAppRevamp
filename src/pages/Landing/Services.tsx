import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import services from "../../data/services.js";
const Services = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section>
      <Header />

      {/* Hero Section with Background Image */}
      <section
        className="w-full h-[30vh] flex items-center justify-start pt-28 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522273987129-4ca3c41871e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className="relative z-10 w-9/12 md:w-3/4 mx-auto">
          <motion.h1
            key={isScrolled ? "scrolled" : "not-scrolled"}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              x: 0,
              y: isScrolled ? "100%" : "0%",
              opacity: isScrolled ? 0 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            Services
          </motion.h1>
        </div>
      </section>

      {/* Services Grid -  */}
      <section className="w-full py-20 px-6 bg-body ">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
              >
                {/* Image */}
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {/* Content */}
                <div className="p-8">
                  <h3 className="font-inter text-xl font-semibold text-prussianBlue mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-inter text-base mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-skyBlue font-inter text-base inline-flex items-center gap-2 hover:gap-3 transition-all group-hover:text-blueGreen"
                  >
                    Read more <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-body rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl "
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header with Image */}
                <div className="relative h-64">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-body/90 flex items-center justify-center hover:bg-body transition-colors"
                    aria-label="Close modal"
                  >
                    <FaTimes className="text-prussianBlue text-xl" />
                  </button>
                  {/* Title on Image */}
                  <h2 className="absolute bottom-6 left-6 font-inter text-3xl sm:text-4xl font-bold text-white">
                    {selectedService.title}
                  </h2>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  {/* Description */}
                  <p className="text-prussianBlue font-inter text-lg leading-relaxed mb-8">
                    {selectedService.description}
                  </p>
                  {/* Features List */}
                  <div className="mb-8">
                    <h3 className="font-inter text-xl font-semibold text-prussianBlue mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.features.map(
                        (feature: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <FaCheckCircle className="text-skyBlue text-lg" />
                            <span className="text-prussianBlue font-inter text-base">
                              {feature}
                            </span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <button className="w-full  bg-blueGreen text-body px-8 py-4 rounded-full font-inter text-base font-semibold hover:bg-blueGreen/90 transition-colors">
                    Get Started
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </section>
  );
};
export default Services;
