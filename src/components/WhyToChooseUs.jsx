import CardWCR from "./CardWCR";

const WhyToChooseUs = () => {
  return (
    <div className="bg-secondary/5 w-full py-12 px-4 flex flex-col items-center gap-8">
      <h2 className="text-center text-primary text-3xl font-medium italic px-4 py-2 rounded-md shadow-md">
        Why Choose RideXpress
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-240 max-w-full mx-auto">
        <CardWCR
          icon="/icons/car.png"
          heading="Wide Variety of Cars"
          desc="From budget-friendly rides for daily commutes to luxury cars for special occasions — we’ve got something for everyone."
        />
        <CardWCR
          icon="/icons/money.png"
          heading="Affordable Prices"
          desc="Competitive pricing with no hidden fees. Enjoy transparent rates and great value for your money."
        />
        <CardWCR
          icon="/icons/booking.png"
          heading="Easy Booking Process"
          desc="Reserve your car in just a few clicks with our user-friendly platform. Fast, secure, and hassle-free."
        />
        <CardWCR
          icon="/icons/phone-call.png"
          heading="24/7 Customer Support"
          desc="Got a question or need help on the road? Our dedicated support team is always here for you — day or night."
        />
      </div>
    </div>
  );
};

export default WhyToChooseUs;
