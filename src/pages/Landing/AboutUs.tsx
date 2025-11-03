import { AnimatedTestimonials } from "../../components/AnimatedTestimonials";
import Header from "../../components/Header";
import { motion } from "framer-motion";

const AboutUs = () => {
  const testimonials = [
    {
      quote:
        "Q Application has completely transformed how we manage our salon bookings. The automated reminders alone have reduced our no-shows by 60%!",
      name: "Sarah Mitchell",
      designation: "Owner, Luxe Beauty Salon",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop",
    },
    {
      quote:
        "As a restaurant owner, managing table reservations used to be chaotic. Q Application streamlined everything and our customer satisfaction has never been higher.",
      name: "Marcus Chen",
      designation: "Owner, The Urban Kitchen",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
    },
    {
      quote:
        "The fitness class booking system is intuitive and our members love it. We've seen a 40% increase in class attendance since implementing Q Application.",
      name: "Jessica Rodriguez",
      designation: "Manager, FitZone Gym",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    },
  ];

  return (
    <section>
      <Header />

      {/* Hero Section with Parallax Background */}
      <section
        className="w-full h-[30vh] flex items-center justify-start pt-28 bg-cover bg-center bg-no-repeat relative bg-fixed"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522273987129-4ca3c41871e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-9/12 md:w-3/4 mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            About us
          </motion.h1>
        </div>
      </section>

      {/* About Us Content */}
      <section className="w-full py-20 px-6 bg-body">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <p className="text-skyBlue font-inter text-sm font-semibold mb-4 uppercase tracking-wide">
                About Us
              </p>
              <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
                Empowering businesses with smart scheduling
              </h2>
              <div className="space-y-4 text-prussianBlue/60 font-inter text-base leading-relaxed">
                <p>
                  With the increasing demand for efficient scheduling solutions,
                  our platform empowers businesses to manage their bookings
                  effectively and enhance customer engagement.
                </p>
                <p>
                  We understand the challenges of managing appointments,
                  reservations, and schedules. That's why we've built a
                  comprehensive solution that simplifies booking management for
                  businesses of all sizes.
                </p>
              </div>
              <button className="mt-8 bg-selectiveYellow text-prussianBlue px-8 py-3 rounded-full font-inter text-base font-semibold hover:bg-selectiveYellow/90 transition-colors">
                Learn more
              </button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1526253038957-bce54e05968e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                  alt="About us"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Discover New Destinations (Reversed) */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
                Built for <span className="text-blueGreen">Growth & Scale</span>
              </h2>
              <div className="space-y-4 text-prussianBlue/60 font-inter text-base leading-relaxed">
                <p>
                  Whether you're a solo practitioner or managing multiple
                  locations, Q Application scales with your business. Our
                  cloud-based platform handles everything from single
                  appointments to thousands of daily bookings with ease.
                </p>
                <p>
                  Real-time analytics, customer insights, and automated
                  workflows help you make data-driven decisions. Reduce
                  administrative overhead by up to 70% while providing
                  exceptional customer experiences that drive loyalty and repeat
                  bookings.
                </p>
              </div>
              <button className="mt-8 bg-selectiveYellow text-prussianBlue px-8 py-3 rounded-full font-inter text-base font-semibold hover:bg-selectiveYellow/90 transition-colors">
                See Features
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section
        className="w-full h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover relative"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1920&q=80")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Transforming booking is possible.
          <br />
          We've done it before.
        </motion.h2>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 px-6 bg-body">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-4"
            >
              Meet our team
            </motion.h2>
            <p className="text-gray-600 font-inter text-lg">
              Dedicated professionals driving our success
            </p>

            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </section>
    </section>
  );
};
export default AboutUs;
