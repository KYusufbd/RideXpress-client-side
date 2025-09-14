// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router";
import Marquee from "react-fast-marquee";

const ExploreByLocation = () => {
  const locations = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Sylhet",
  ];
  return (
    <div className="bg-secondary/5 w-full py-12 px-4 flex flex-col items-center gap-8">
      <motion.button
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="text-center text-primary text-3xl font-medium italic px-4 py-2 rounded-md shadow-md">
          Explore by Location
        </h2>
      </motion.button>
      <div className="flex flex-row flex-wrap justify-center items-center px-3 w-360 max-w-full mx-auto">
        <Marquee
          pauseOnHover={true}
          gradient={false}
          speed={100}
          className="w-full"
        >
          {locations.map((location) => (
            <Link to="/cars" state={{ location: location }} key={location}>
              <div className="btn-outline btn-primary m-2 text-5xl text-black font-light italic p-8 bg-gradient-to-br from-primary/70 to-primary/0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                {location}
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ExploreByLocation;
