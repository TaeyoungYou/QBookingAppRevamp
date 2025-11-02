const Achievements = () => {
  const achievements = [
    { number: "2 min", label: "Average booking time" },
    { number: "99.9%", label: "Platform uptime" },
    { number: "100+", label: "Booking features" },
    { number: "24/7", label: "Available support" },
    { number: "5+", label: "Industry integrations" },
    { number: "0", label: "Setup fees" },
  ];

  return (
    <section className="w-full mx-auto min-h-screen lg:min-h-[80vh] bg-utOrange py-4 md:py-20 px-6 sm:mt-20 md:mt-0">
      <div className="w-9/12 md:w-3/4 mx-auto">
        {/* Title Section */}
        <div className="mb-10 md:mb-16">
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
            Key achievements in our booking
            <br />
            system development
          </h2>
          <p className="text-gray-600 font-inter text-base sm:text-lg max-w-2xl">
            From reducing booking errors to enhancing user interface design and
            increasing conversion rates, our milestones showcase our dedication
            to providing an exceptional booking solution.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="border-b border-prussianBlue/20 pb-6 hover:border-prussianBlue/50 transition-colors"
            >
              <h3 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-prussianBlue mb-2">
                {achievement.number}
              </h3>
              <p className="text-gray-700 font-inter text-base sm:text-lg">
                {achievement.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Achievements;
