import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Scissors,
  UtensilsCrossed,
  Stethoscope,
  Dumbbell,
  Heart,
  Briefcase,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import hero1 from "../../assets/home/hero_p1.avif";
import hero2 from "../../assets/home/hero_p2.avif";
import hero3 from "../../assets/home/hero_p3.avif";

const achievements = [
  { number: "2 min", label: "Average booking time", icon: Clock },
  { number: "99.9%", label: "Platform uptime", icon: Shield },
  { number: "100+", label: "Booking features", icon: Zap },
  { number: "24/7", label: "Available support", icon: Users },
  { number: "5+", label: "Industry integrations", icon: TrendingUp },
  { number: "0", label: "Setup fees", icon: CheckCircle },
];

const industries = [
  {
    name: "Salons & Spas",
    icon: Scissors,
    gradient: "from-rose-400 to-pink-600",
    bgColor: "bg-rose-50",
    description: "Professional nail & beauty services",
  },
  {
    name: "Restaurants",
    icon: UtensilsCrossed,
    gradient: "from-orange-400 to-red-600",
    bgColor: "bg-orange-50",
    description: "Table reservations made simple",
  },
  {
    name: "Medical Clinics",
    icon: Stethoscope,
    gradient: "from-blue-400 to-cyan-600",
    bgColor: "bg-blue-50",
    description: "Healthcare appointment management",
  },
  {
    name: "Fitness Centers",
    icon: Dumbbell,
    gradient: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-50",
    description: "Class & training scheduling",
  },
  {
    name: "Beauty Services",
    icon: Heart,
    gradient: "from-purple-400 to-pink-600",
    bgColor: "bg-purple-50",
    description: "Personalized beauty experiences",
  },
  {
    name: "Consulting",
    icon: Briefcase,
    gradient: "from-slate-400 to-gray-700",
    bgColor: "bg-slate-50",
    description: "Professional consultation booking",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Seamless Scheduling",
    description:
      "Effortless appointment booking with real-time availability and instant confirmations.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Customer Management",
    description:
      "Track customer history, preferences, and analytics to deliver personalized experiences.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Business Insights",
    description:
      "Powerful analytics and reporting to optimize operations and drive growth.",
    color: "from-purple-500 to-purple-600",
  },
];

const Home = () => {
  return (
    <div className="bg-body">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-blueGreen/5 blur-[120px]" />
          <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-skyBlue/10 blur-[120px]" />
        </div>

        <div className="relative z-10 w-9/12 md:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-blueGreen/10 px-4 py-2 text-sm font-semibold text-blueGreen mb-6 border border-blueGreen/20"
            >
              <Sparkles size={16} />
              Your Booking Solution
            </motion.div>

            <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-prussianBlue leading-tight mb-6">
              Elevate your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blueGreen to-skyBlue">
                appointments
              </span>{" "}
              and reservations
            </h1>

            <p className="text-prussianBlue/70 font-inter text-lg mb-8 leading-relaxed">
              Every appointment and reservation we power is a commitment to
              enhancing your client experience across salons, spas, and
              restaurants — keeping operations seamless.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 bg-linear-to-r from-blueGreen to-skyBlue text-white px-8 py-4 rounded-full font-inter font-semibold shadow-lg shadow-blueGreen/20 hover:shadow-blueGreen/40 transition-all"
                >
                  Book Appointment
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 border-2 border-prussianBlue text-prussianBlue px-8 py-4 rounded-full font-inter font-semibold hover:bg-prussianBlue hover:text-white transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-48 md:h-64 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
                >
                  <img
                    src={hero1}
                    alt="Salon service"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
                >
                  <img
                    src={hero2}
                    alt="Beauty treatment"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-48 md:h-64 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
              >
                <img
                  src={hero3}
                  alt="Professional service"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-linear-to-b from-white to-slate-50">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-blueGreen font-semibold mb-4">
              Why Choose Us
            </p>
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
              Built for modern businesses
            </h2>
            <p className="text-prussianBlue/70 font-inter text-lg max-w-3xl mx-auto">
              Streamline operations, enhance customer satisfaction, and maximize
              efficiency with our comprehensive booking solution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/40 hover:shadow-2xl transition-all group"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-prussianBlue mb-3">
                  {feature.title}
                </h3>
                <p className="text-prussianBlue/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full py-20 bg-linear-to-br from-utOrange to-selectiveYellow">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
              Key achievements in our booking system
            </h2>
            <p className="text-prussianBlue/70 font-inter text-lg max-w-3xl">
              From reducing booking errors to enhancing user experience and
              increasing conversion rates, our milestones showcase dedication to
              excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-sm p-8 hover:bg-white/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-prussianBlue/10 text-prussianBlue">
                    <achievement.icon size={24} />
                  </div>
                  <h3 className="font-inter text-5xl font-bold text-prussianBlue">
                    {achievement.number}
                  </h3>
                </div>
                <p className="text-prussianBlue/80 font-inter text-lg font-medium">
                  {achievement.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="w-full py-20 bg-body">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-blueGreen font-semibold mb-4">
              Industries We Serve
            </p>
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
              Built for your industry
            </h2>
            <p className="text-prussianBlue/70 font-inter text-lg max-w-3xl mx-auto">
              We partner with top-tier businesses to streamline booking
              processes and enhance customer experiences across various sectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all ${industry.bgColor} border border-slate-100`}
              >
                <div className="p-8">
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${industry.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <industry.icon
                        size={32}
                        className="text-white"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-prussianBlue mb-2 group-hover:text-blueGreen transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-prussianBlue/70 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 text-blueGreen font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Learn more
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${industry.gradient} rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-linear-to-br from-prussianBlue via-blueGreen to-skyBlue relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-9/12 md:w-3/4 mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-6 border border-white/30 backdrop-blur-sm">
            <Sparkles size={16} />
            Join the Revolution
          </div>

          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your booking experience?
          </h2>

          <p className="text-white/90 font-inter text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Join thousands of businesses worldwide who trust our platform to
            manage their appointments and reservations seamlessly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 bg-white text-prussianBlue px-8 py-4 rounded-full font-inter font-semibold shadow-2xl hover:shadow-white/50 transition-all"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-inter font-semibold hover:bg-white hover:text-prussianBlue transition-all"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
