// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated number */}
        <motion.h1
          className="text-9xl font-extrabold text-blue-900 tracking-widest"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        {/* Car GIF / Image */}
        <motion.img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="Car lost"
          className="mx-auto mt-6 rounded-xl shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        />

        {/* Button */}
        <motion.div
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/"
            className="btn bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
