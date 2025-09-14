import Banner from "../components/Banner";
import ExploreByLocation from "../components/ExploreByLocation";
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
      <ExploreByLocation />
    </div>
  );
};

export default Home;
