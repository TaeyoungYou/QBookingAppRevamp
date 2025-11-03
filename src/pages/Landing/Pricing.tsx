import { TIERS, type BillingCycle, type Tier } from "../../data/prices";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const Pricing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="">
      <Header />

      {/* Hero Section with Background Image */}
      <section
        className="w-full h-[30vh] flex items-center justify-start pt-28 bg-cover bg-center bg-no-repeat relative bg-fixed top-4"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522273987129-4ca3c41871e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")`,
        }}
      >
        {/* Dark Overlay */}
        <div className=" absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className="relative z-10 w-9/12 md:w-3/4 mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{
              x: 0,
              y: isScrolled ? "100%" : "0%",
              opacity: isScrolled ? 0 : 1,
            }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-body"
          >
            Pricing
          </motion.h1>
        </div>
      </section>
      <section className="h-screen">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {TIERS.map((tier) => (
              <div key={tier.id}>{tier.name}</div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Pricing;
