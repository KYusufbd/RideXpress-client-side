import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="h-full w-full flex flex-col gap-12 items-center justify-center z-20 relative">
        <div className="flex flex-col items-center justify-between h-60">
          <h5 className="text-6xl italic text-center font-semibold text-primary-content backdrop-brightness-50 w-120 p-4 rounded-lg">
            <Typewriter
              words={[
                "Welcome to RideXpress",
                "Your Journey Begins Here",
                "Hit the Road with Freedom!",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </h5>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              className="rounded-full bg-linear-to-b from-primary to-blue-500/50 text-primary-content px-6 py-2 text-lg font-medium shadow-blue-500/80 shadow-lg"
              to="/cars"
            >
              View Available Cars
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          width="100%"
          height="100%"
          src="/banner-video.mp4"
          title="Mega Mercedes-Benz Car Collection 1:18 Scale | Mercedes Dealership Diorama | Diecast Model Cars"
          allow="autoplay;"
          allowFullScreen
          className="banner-video"
        ></video>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary to-blue-200"></div>
    </div>
  );
};

export default Banner;
