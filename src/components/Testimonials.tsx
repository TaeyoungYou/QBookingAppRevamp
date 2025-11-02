import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
const Testimonials = () => {
  //   Industries targeting
  const industries = [
    {
      name: "Salons & Spas",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    },
    {
      name: "Restaurants",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    },
    {
      name: "Medical Clinics",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    },
    {
      name: "Fitness Centers",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    },
    {
      name: "Beauty Services",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
    },
    {
      name: "Consulting",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
  ];

  // Future testimonials placeholder với content chung chung
  const futureTestimonials = [
    {
      quote:
        "Looking for a booking system that truly understands your business needs? We're here to revolutionize how you manage appointments.",
      author: "Salon & Spa Owners",
      role: "Beauty Industry",
    },
    {
      quote:
        "Streamline your reservations with cutting-edge technology designed for modern restaurants and dining experiences.",
      author: "Restaurant Managers",
      role: "Food & Beverage",
    },
    {
      quote:
        "Professional appointment management built for healthcare providers who value efficiency and patient satisfaction.",
      author: "Healthcare Professionals",
      role: "Medical Services",
    },
  ];

  return (
    <section className="w-full mx-auto min-h-screen bg-body px-6">
      <div className="w-9/12 md:3/4 mx-auto">
        {/* Heeader */}
        <div className="text-center mb-12">
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-4">
            Built for Your Industry
          </h2>
          <p className="text-prussianBlue/50 font-inter text-base sm:text-lg max-w-3xl mx-auto mb-2 ">
            Together, we partner with top-tier businesses to streamline booking
            processes and enhance customer experiences.
          </p>
          <a
            href="#"
            className="text-blueGreen font-inter text-base inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Learn more <FaArrowRight />
          </a>
        </div>

        {/* Industry Targeting */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
            >
              <div className="aspect-4/3 relative">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-prussianBlue/80 to-transparent group-hover:from-prussianBlue/90 transition-all " />
                {/* Display industry name */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-inter text-sm text-center font-semibold block">
                    {industry.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials/Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futureTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all"
            >
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-blueGreen opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 font-inter text-base mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <p className="text-prussianBlue font-inter font-semibold text-base">
                  {testimonial.author}
                </p>
                <p className="text-prussianBlue/50 font-inter text-base">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="font-inter text-2xl sm:text-3xl font-bold text-prussianBlue mb-4">
            Streamlining Your Booking Experience
          </h3>
          <p className="text-gray-600 font-inter text-base sm:text-lg max-w-3xl mx-auto mb-8">
            Join us in our mission to enhance travel experiences and promote
            seamless bookings. We focus on creating memorable journeys through
            innovative solutions.
          </p>

          <button className="bg-skyBlue text-prussianBlue px-8 py-3 rounded-full font-inter text-base hover:bg-skyBlue/90  transition-colors">
            Join the Booking Revolution
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
