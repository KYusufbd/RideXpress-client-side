import Banner from "../components/Banner";
import Recent from "../components/Recent";
import SpecialOffers from "../components/SpecialOffers";
import WhyToChooseUs from "../components/WhyToChooseUs";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <WhyToChooseUs />
      <Recent />
      <SpecialOffers />
    </div>
  );
};

export default Home;
