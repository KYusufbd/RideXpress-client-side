// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router";

const SpecialOffers = () => {
  const banners = [
    "/discount-banners/banner-1.jpg",
    "/discount-banners/banner-2.jpg",
    "/discount-banners/banner-3.jpg",
  ];
  return (
    <div className="bg-primary/15 w-full py-12 px-6 flex flex-col items-center gap-8">
      <motion.button
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="text-center text-primary text-3xl font-medium italic px-4 py-2 rounded-md shadow-md">
          Special Offers
        </h2>
      </motion.button>
      <div className="flex flex-col gap-8 w-360 max-w-full mx-auto overflow-hidden">
        {banners.map((banner, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-md shadow-md"
          >
            <Link to="/cars" className="w-full">
              <img src={banner} alt="discount-banner" className="w-full" />
            </Link>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
