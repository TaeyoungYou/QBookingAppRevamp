import commitment1 from "../assets/home/commitment_p1.avif";

const Commitments = () => {
  return (
    <section className="w-full mx-auto min-h-screen lg:min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Content */}
        <div className="col-span-1 bg-skyBlue flex items-center justify-center px-8 md:px-16 py-16 lg:py-0">
          <div className="max-w-xl">
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-prussianBlue mb-6">
              A Commitment to Seamless Booking Experiences
            </h2>
            <p className="text-prussianBlue/80 font-inter text-base sm:text-lg mb-8 leading-relaxed">
              Our booking system simplifies the process of scheduling
              appointments, reservations, and events, ensuring a seamless
              experience for both businesses and customers. It streamlines
              operations, enhances customer satisfaction, and maximizes
              efficiency.
            </p>
            <button className="bg-selectiveYellow text-prussianBlue px-8 py-3 rounded-full font-inter text-base hover:bg-selectiveYellow/90 transition-colors">
              More Information
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-1 h-[400px] lg:h-full">
          <img
            src={commitment1}
            alt="Commitment to seamless booking"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
export default Commitments;
