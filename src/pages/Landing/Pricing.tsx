import { TIERS, type BillingCycle, type Tier } from "../../data/prices";
import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Footer from "../../components/Footer";
const Pricing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatPrice = (price: number) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const tiersForView: Tier[] = useMemo(() => {
    return TIERS.map((tier) => ({
      ...tier,
      suffix: billing === "monthly" ? "/month" : "/month (billed yearly)",
    }));
  }, [billing]);
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

      {/* Pricing Content */}
      <section className="w-full py-20  bg-body">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <motion.h1 className="text-3xl font-bold tracking-tight text-prussianBlue sm:text-4xl lg:text-5xl">
            Simple pricing for appointment scheduling
          </motion.h1>
          <p className="mt-4 text-base text-prussianBlue/50 sm:text-lg">
            Choose a plan that fits your business and scales with your bookings.
          </p>

          {/* Billing toggle */}
          <div className="w-full mt-8 flex items-center justify-center gap-4">
            <span
              className={`text-base ${
                billing === "monthly" ? "text-blueGreen" : "text-prussianBlue"
              }`}
            >
              Monthly
            </span>
            <button
              type="button"
              aria-label="Toggle billing cycle"
              onClick={() =>
                setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))
              }
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  billing === "yearly" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-base ${
                billing === "yearly" ? "text-blueGreen" : "text-prussianBlue"
              }`}
            >
              Yearly{" "}
              <span className="ml-1 rounded bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                save 15%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="w-full   bg-body">
        <div className="w-9/12 md:w-3/4 mx-auto">
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {tiersForView.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`relative rounded-2xl border ${
                    tier.mostPopular
                      ? "border-utOrange/60 perspective-near "
                      : "border-gray-200 perspective-distant "
                  } bg-white p-6 shadow-sm  hover:shadow-md hover:scale-102 transition-all duration-200 `}
                >
                  {tier.mostPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-selectiveYellow px-3 py-1 text-xs font-medium text-white">
                      Most popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-prussianBlue">
                      {tier.name}
                    </h3>
                    <p className="mt-1 mb-4 text-sm text-prussianBlue/60">
                      {tier.description}
                    </p>

                    <div className="mb-5 flex items-end gap-1">
                      <span className="text-4xl font-bold text-prussianBlue">
                        {billing === "monthly"
                          ? formatPrice(tier.monthlyPrice)
                          : formatPrice(tier.yearlyPrice)}
                      </span>
                      <span className="pb-1 text-sm text-prussianBlue/60">
                        {tier.suffix}
                      </span>
                    </div>

                    <ul className="mb-6 space-y-2 text-sm text-gray-700">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                              f.included
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {f.included ? "✓" : "✗"}
                          </span>
                          <span
                            className={
                              f.included
                                ? ""
                                : "text-prussianBlue/60 line-through"
                            }
                          >
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`${
                        tier.mostPopular
                          ? "bg-selectiveYellow text-white hover:bg-selectiveYellow/90"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-selectiveYellow/90"
                      } inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default Pricing;
