import hero1 from "../assets/home/hero_p1.avif";
import hero2 from "../assets/home/hero_p2.avif";
import hero3 from "../assets/home/hero_p3.avif";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[85vh] md:min-h-screen pt-28 md:pt-40 pb-0 relative overflow-hidden">
        <div className="w-9/12 md:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left image colllage */}
          <div className="flex flex-col gap-2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="h-44 hidden lg:block md:h-64">
                <img
                  src={hero1}
                  alt="hero1"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="h-64 hidden lg:block md:h-[420px]">
                <img
                  src={hero2}
                  alt="hero2"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            {/* Row 2: full width wide image */}
            <div className="h-48 sm:h-56 md:h-64">
              <img
                src={hero3}
                alt="hero3"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          {/* Right content column */}
          <div className="max-w-xl lg:ml-6 order-1 lg:order-2 text-center lg:text-left">
            <h1 className="font-inter text-3xl  sm:text-5xl  lg:text-6xl md:leading-tight leading-snug tracking-tight text-prussianBlue">
              Elevate your appointments
              <br />
              and table reservations
              <br />
              for a hassle-free
              <br />
              experience
            </h1>
            <p className="mt-6 text-prussianBlue/80 font-inter">
              Every appointment and reservation we power is a commitment to
              enhancing your client and guest experience across salons, spas,
              barbershops, and restaurants — keeping your operations seamless.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              className="bg-skyBlue block  sm:w-auto text-prussianBlue px-5 py-3 rounded-full font-inter mt-6 mx-auto lg:mx-0"
            >
              Book Your Appointment
            </motion.button>
          </div>
        </div>

        {/* Wave Background */}
        <div className="absolute bottom-0 left-0 w-full h-[40px] pointer-events-none hidden md:block ">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#fb8500"
            />
          </svg>
        </div>
      </section>
    </>
  );
};
export default Hero;
