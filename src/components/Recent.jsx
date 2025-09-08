// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Recent = () => {
  return (
    <div className="bg-accent/5 w-full py-12 px-4 flex flex-col items-center gap-8">
      <motion.button
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="text-center text-primary text-3xl font-medium italic px-4 py-2 rounded-md shadow-md">
          Recent Listings
        </h2>
      </motion.button>
    </div>
  );
};

export default Recent;
