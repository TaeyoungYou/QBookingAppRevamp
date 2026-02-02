import { Fragment } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
} from "lucide-react";
import {
  industries,
  locations,
  services,
  availableStaff,
} from "../../data/appointments";
import { useBookingProcess } from "../../hooks/useBookingProcess";
import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import { useEffect } from "react";

// Appointment booking page with hero, modal multi-step form, and appointment list
const Appoiment = () => {
  const {
    showForm,
    currentStep,
    formData,
    steps,
    // Setters
    setShowForm,
    setFormData,
    // Functions
    hydratedAppointments,
    getAvailableTimes,
    handleSubmitForm,
    handleNextStep,
    handlePrevStep,
    resetForm,
    handleCancel,

    getStatusColor,
    getStatusLabel,
    canProceed,
  } = useBookingProcess();

  useEffect(() => {
    // Close modal on Escape key for accessibility and quick exit
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  return (
    <section className="min-h-screen bg-body">
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-[50vh] pt-28 md:pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-9/12 md:w-3/4 mx-auto"
        >
          <div className="max-w-3xl">
            {/* Word-by-word animation for headline emphasis */}
            <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-prussianBlue leading-tight mb-6">
              {"Book Your Appointment with Ease"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </h1>
            {/* Word-by-word animation for supporting copy */}
            <p className="text-xl text-prussianBlue/70 font-inter leading-relaxed mb-8">
              {"Schedule appointments for restaurants, fitness centers, medical services, spas, and more — all in one seamless experience."
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.1, type: "spring" }}
              className="bg-skyBlue text-prussianBlue px-8 py-4 rounded-full font-inter font-semibold text-lg inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all "
              onClick={() => setShowForm(true)}
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 pb-20 ">
        {/* Multi-Step Booking Form Modal */}
        {showForm && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-1020 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={resetForm}
          >
            {/* Dialog container; stopPropagation prevents backdrop click from closing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-body rounded-3xl shadow-2xl max-w-3xl w-full my-8 h-[90vh] overflow-y-scroll relative"
            >
              {/* Header with Progress */}
              <div className="bg-prussianBlue text-white p-6 rounded-t-3xl ">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-inter">
                      Book Appointment
                    </h2>
                    <p className="text-white/80 mt-1 font-inter">
                      Step {currentStep} of 5
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className=" w-full flex items-center flex-1 ">
                  {/* Render step dots with progress connectors */}
                  {steps.map((step, index) => (
                    <Fragment key={step.number}>
                      <div className="flex items-center justify-center flex-1">
                        <div className="flex flex-col items-center justify-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                              currentStep > step.number
                                ? "bg-skyBlue text-prussianBlue"
                                : currentStep === step.number
                                ? "bg-skyBlue text-prussianBlue ring-4 ring-skyBlue/30"
                                : "bg-white/20 text-white/60"
                            }`}
                          >
                            {/* Completed steps show a check icon */}
                            {currentStep > step.number ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              step.number
                            )}
                          </div>
                          <span
                            className={`text-xs mt-2 hidden md:block ${
                              currentStep >= step.number
                                ? "text-white"
                                : "text-white/60"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 flex-1 mx-2 rounded ${
                            currentStep > step.number
                              ? "bg-white"
                              : "bg-white/20"
                          }`}
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Choose Industry */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Choose Your Industry
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Select the type of service you're looking for
                      </p>
                      {/* Industry tiles */}
                      <div className="grid md:grid-cols-3 gap-4">
                        {industries.map((industry) => (
                          <motion.button
                            key={industry.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                industry: industry.value,
                              }));
                            }}
                            className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                              formData.industry === industry.value
                                ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                            }`}
                          >
                            {/* Image preview for each industry */}
                            <img
                              src={industry.image}
                              alt={industry.label}
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4 bg-body">
                              <h4 className="font-bold text-prussianBlue mb-1 font-inter">
                                {industry.label}
                              </h4>
                              <p className="text-sm text-prussianBlue/70 font-inter">
                                {industry.description}
                              </p>
                            </div>
                            {formData.industry === industry.value && (
                              <div className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1">
                                <Check className="w-5 h-5" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Choose Location */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Location
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Choose your preferred location
                      </p>
                      {/* Locations filtered by selected industry */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {locations[formData.industry]?.map(
                          (location, index) => (
                            <motion.div
                              key={location.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  location: location.name,
                                }));
                              }}
                              className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                                formData.location === location.name
                                  ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                  : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                              }`}
                            >
                              {/* Location image + short info */}
                              <div className="relative h-32 overflow-hidden">
                                <img
                                  src={location.image}
                                  alt={location.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-3">
                                  <MapPin className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <div className="p-4 bg-body">
                                <h4 className="font-bold text-prussianBlue mb-1 font-inter text-lg">
                                  {location.name}
                                </h4>
                                <p className="text-sm text-prussianBlue/70 font-inter mb-2">
                                  {location.description}
                                </p>
                                <p className="text-xs text-prussianBlue/50 font-inter flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {location.address}
                                </p>
                              </div>
                              {formData.location === location.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5"
                                >
                                  <Check className="w-5 h-5" />
                                </motion.div>
                              )}
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Choose Service */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Service
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        What service do you need?
                      </p>
                      {/* Services filtered by industry */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services[formData.industry]?.map((service, index) => (
                          <motion.button
                            key={service.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                service: service.name,
                              }));
                            }}
                            className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                              formData.service === service.name
                                ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                            }`}
                          >
                            {/* Service card with duration badge */}
                            <div className="relative h-32 overflow-hidden">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                              <div className="absolute bottom-2 left-3 right-3">
                                <span className="text-white text-xs font-semibold bg-prussianBlue/70 px-2 py-1 rounded-full">
                                  {service.duration}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 bg-body">
                              <h4 className="font-bold text-prussianBlue mb-1 font-inter">
                                {service.name}
                              </h4>
                              <p className="text-xs text-prussianBlue/70 font-inter">
                                {service.description}
                              </p>
                            </div>
                            {formData.service === service.name && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5 shadow-lg"
                              >
                                <Check className="w-4 h-4" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Choose Date & Time */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Date & Time
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        When would you like to visit?
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Date Selection */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-linear-to-br from-white to-skyBlue/5 border-2 border-skyBlue/20 rounded-2xl p-6 shadow-lg h-fit"
                        >
                          {/* Date input and quick visual confirmation */}
                          <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center gap-2 text-base font-bold text-prussianBlue font-inter">
                              <div className="p-2 bg-skyBlue/20 rounded-lg">
                                <Calendar className="w-5 h-5 text-skyBlue" />
                              </div>
                              Select Date
                            </label>
                            {formData.date && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                ✓ Selected
                              </motion.div>
                            )}
                          </div>

                          {/* Custom Date  Picker*/}
                          <div className="relative">
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  date: e.target.value,
                                }))
                              }
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full px-5 py-4 border-2 border-skyBlue/30 rounded-xl focus:border-skyBlue focus:ring-4 focus:ring-skyBlue/10 focus:outline-none transition-all text-lg font-inter text-prussianBlue bg-white shadow-sm hover:shadow-md cursor-pointer"
                              style={{
                                colorScheme: "light",
                              }}
                            />
                          </div>

                          {/* Selected Date Display */}
                          {formData.date && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-4 bg-skyBlue/10 border-2 border-skyBlue/30 rounded-xl relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-20 h-20 bg-skyBlue/10 rounded-full -mr-10 -mt-10" />
                              <div className="relative">
                                <p className="text-xs text-prussianBlue/60 font-inter mb-1 font-semibold">
                                  YOUR APPOINTMENT
                                </p>
                                <p className="text-prussianBlue font-bold font-inter text-lg">
                                  {new Date(formData.date + "T00:00:00").toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="h-1 w-12 bg-skyBlue rounded-full" />
                                  <span className="text-xs text-prussianBlue/60 font-inter">
                                    {Math.ceil(
                                      (new Date(formData.date).getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )}{" "}
                                    days from now
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Quick Date Selection Hints */}
                          {!formData.date && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs text-prussianBlue/50 font-inter mb-2">
                                Quick select:
                              </p>
                              <div className="flex gap-2">
                                {["Today", "Tomorrow", "Next Week"].map(
                                  (label, index) => {
                                    const date = new Date();
                                    if (label === "Tomorrow")
                                      date.setDate(date.getDate() + 1);
                                    if (label === "Next Week")
                                      date.setDate(date.getDate() + 7);

                                    return (
                                      <motion.button
                                        key={label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            date: date
                                              .toISOString()
                                              .split("T")[0],
                                          }))
                                        }
                                        className="px-3 py-2 bg-skyBlue/10 hover:bg-skyBlue/20 text-prussianBlue text-xs font-semibold rounded-lg transition-colors border border-skyBlue/20"
                                      >
                                        {label}
                                      </motion.button>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Time Selection */}
                        <div>
                          <h4 className="font-bold text-prussianBlue mb-3 flex items-center gap-2 font-inter">
                            <Clock className="w-5 h-5 text-skyBlue" />
                            Available Times
                          </h4>
                          <AnimatePresence>
                            {formData.date ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto"
                              >
                                {/* Render time slots from availability logic */}
                                {getAvailableTimes()?.map((slot, index) => (
                                  <motion.button
                                    key={slot.time}
                                    disabled={!slot.available}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      delay: index * 0.03,
                                      type: "spring",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        time: slot.time,
                                      }))
                                    }
                                    className={`p-3 rounded-xl font-semibold transition-all font-inter
                                    ${
                                        slot.available
                                            ? formData.time === slot.time
                                                ? "bg-skyBlue text-prussianBlue shadow-md ring-2 ring-skyBlue/50"
                                                : "bg-gray-100 text-prussianBlue/70 hover:bg-gray-200 hover:border hover:border-black/30 border border-transparent"
                                            : "bg-gray-300 text-gray-500 opacity-70 cursor-not-allowed"
                                    }
                                      `}
                                  >
                                    {slot.time}
                                  </motion.button>
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-prussianBlue/50 font-inter"
                              >
                                <Calendar className="w-12 h-12 mx-auto mb-3 text-prussianBlue/30" />
                                <p>Please select a date first</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Confirmation strip once date and time are chosen */}
                      {formData.date && formData.time && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-skyBlue/10 border border-skyBlue/30 rounded-xl text-center"
                        >
                          <p className="text-prussianBlue font-semibold font-inter">
                            ✓{" "}
                            {new Date(formData.date + "T00:00:00").toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            at {formData.time}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 5: Staff Selection & Contact Info */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Choose Your Professional & Confirm Details
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Select your preferred staff and provide your contact
                        information
                      </p>

                      {/* Staff Selection with Profiles */}
                      <div className="mb-8">
                        <h4 className="font-bold text-prussianBlue mb-4 flex items-center gap-2 font-inter text-lg">
                          <User className="w-6 h-6 text-skyBlue" />
                          Available Staff
                        </h4>
                        {/* Staff cards filtered by selected industry */}
                        <div className="grid md:grid-cols-3 gap-4">
                          {availableStaff[formData.industry]?.map(
                            (staff, index) => (
                              <motion.button
                                key={staff.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    staff: staff.name,
                                  }))
                                }
                                className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                                  formData.staff === staff.name
                                    ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                    : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                                }`}
                              >
                                {/* Staff portrait and rating */}
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={staff.image}
                                    alt={staff.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                                  <div className="absolute bottom-2 left-3">
                                    <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <span
                                          key={i}
                                          className={`text-xs ${
                                            i < staff.rating
                                              ? "text-yellow-400"
                                              : "text-gray-400"
                                          }`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 bg-body">
                                  <h5 className="font-bold text-prussianBlue font-inter">
                                    {staff.name}
                                  </h5>
                                  <p className="text-xs text-skyBlue font-inter mb-2">
                                    {staff.role}
                                  </p>
                                  <p className="text-xs text-prussianBlue/70 font-inter">
                                    {staff.bio}
                                  </p>
                                </div>
                                {formData.staff === staff.name && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                    className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5 shadow-lg"
                                  >
                                    <Check className="w-4 h-4" />
                                  </motion.div>
                                )}
                              </motion.button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Contact Form */}
                      <AnimatePresence>
                        {formData.staff && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="border-t border-gray-200 pt-6"
                          >
                            <h4 className="font-bold text-prussianBlue mb-4 font-inter text-lg">
                              Your Contact Information
                            </h4>
                            {/* Collect required contact info for booking confirmation */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <User className="w-4 h-4 text-skyBlue" />
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="John Doe"
                                />
                              </div>

                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <Phone className="w-4 h-4 text-skyBlue" />
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      phone: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="+1 (555) 123-4567"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <Mail className="w-4 h-4 text-skyBlue" />
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="john@example.com"
                                />
                              </div>
                            </div>
                            {/* Booking Summary */}
                            {formData.name &&
                              formData.email &&
                              formData.phone && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="mt-6 p-5 bg-skyBlue/10 border border-skyBlue/30 rounded-2xl"
                                >
                                  {/* Summary to confirm selections before submit */}
                                  <h5 className="font-bold text-prussianBlue mb-3 font-inter">
                                    Booking Summary
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-prussianBlue/80 font-inter">
                                    <p>
                                      <strong>Service:</strong>{" "}
                                      {formData.service}
                                    </p>
                                    <p>
                                      <strong>Location:</strong>{" "}
                                      {formData.location}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{" "}
                                      {new Date(
                                        formData.date
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p>
                                    <p>
                                      <strong>Time:</strong> {formData.time}
                                    </p>
                                    <p className="md:col-span-2">
                                      <strong>Staff:</strong> {formData.staff}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="  border-gray-200 p-6 flex justify-between items-center ">
                {/* Back button disabled on first step */}
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all font-inter ${
                    currentStep === 1
                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-prussianBlue hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                {/* Next button for steps 1-4; Confirm on final step */}
                {currentStep < 5 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all font-inter ${
                      canProceed()
                        ? "bg-skyBlue text-prussianBlue hover:shadow-lg"
                        : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitForm}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all font-inter ${
                      canProceed()
                        ? "bg-blueGreen text-body hover:shadow-lg hover:bg-blueGreen/90"
                        : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    Confirm Booking
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="w-9/12 md:w-3/4 mx-auto">
          {/* Appointments List or Empty State */}
          {hydratedAppointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Empty state with animated illustration and quick cues */}
              <div className="bg-body rounded-3xl shadow-md p-12 text-center border border-gray-100">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block mb-6"
                >
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Background circles */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-skyBlue/20 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-2 bg-skyBlue/30 rounded-full"
                    />

                    {/* Icon container */}
                    <div className="absolute inset-4 bg-skyBlue rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold text-prussianBlue mb-4 font-inter">
                  No Appointments Yet
                </h3>
                <p className="text-prussianBlue/70 text-lg mb-8 leading-relaxed font-inter max-w-xl mx-auto">
                  You haven't booked any appointments yet. Start by creating
                  your first booking for restaurants, fitness centers, medical
                  services, or other services.
                </p>

                {/* Industry thumbnails as visual cues */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={industry.value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={industry.image}
                        alt={industry.label}
                        className="w-full h-20 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-prussianBlue font-inter">
                    Your Appointments
                  </h2>
                  <p className="text-prussianBlue/70 mt-2 font-inter">
                    You have {hydratedAppointments.length} appointment
                    {hydratedAppointments.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                  onClick={() => setShowForm(true)}
                  className="bg-skyBlue text-prussianBlue px-6 py-3 rounded-full font-inter font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  New
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Render hydrated appointments from persistence layer */}
                {hydratedAppointments.map((appointment, index) => {
                  const industryObj = industries.find(
                      (i) => i.value === appointment.industryValue
                  );
                  return (
                    <motion.div
                      key={appointment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-body rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={industryObj?.image}
                          alt={industryObj?.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white font-inter mb-1">
                            {industryObj?.label}
                          </h3>
                          <p className="text-white/90 text-sm font-inter">
                            {appointment.serviceName}
                          </p>
                        </div>
                        {/* Status pill derived from appointment status */}
                        <div
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold font-inter ${getStatusColor(
                            appointment.appointmentStatus
                          )}`}
                        >
                          {getStatusLabel(appointment.appointmentStatus)}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <MapPin className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-semibold font-inter text-sm">
                            {appointment.businessLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <Calendar className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {appointment.displayDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <Clock className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {appointment.displayTime.format("HH:mm")}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <User className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {appointment.staffName}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-prussianBlue/60 mb-1 font-inter">
                            Contact
                          </p>
                          <p className="text-sm text-prussianBlue font-semibold font-inter">
                            {appointment.customerName}
                          </p>
                          <p className="text-xs text-prussianBlue/70 font-inter">
                            {appointment.customerEmail}
                          </p>
                        </div>

                        {appointment.appointmentStatus !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(appointment._id)}
                            className="w-full mt-3 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors border border-red-200 text-sm font-inter"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};
export default Appoiment;
