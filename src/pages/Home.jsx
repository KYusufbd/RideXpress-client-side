import Banner from "../components/Banner";
import Recent from "../components/Recent";
import WhyToChooseUs from "../components/WhyToChooseUs";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <WhyToChooseUs />
      <Recent />
    </div>
  );
};

export default Home;
