import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="h-full w-full flex flex-col gap-12 items-center justify-center z-20 relative">
        <h5 className="text-6xl italic text-center font-semibold text-primary-content backdrop-brightness-50 w-120 p-4 rounded-lg">
          Hit the Road with Freedom!
        </h5>
        <Link
          className="rounded-full bg-linear-to-b from-primary to-blue-500 text-primary-content px-6 py-2 text-lg hover:text-xl font-medium shadow-blue-500/80 shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
          to="/cars"
        >
          View Available Cars
        </Link>
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
