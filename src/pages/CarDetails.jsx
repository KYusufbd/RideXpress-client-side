import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DataContext from "../contexts/DataContext";
import { IoIosArrowRoundBack } from "react-icons/io";

const CarDetails = () => {
  const [car, setCar] = useState();
  const { setLoading } = useContext(DataContext);

  const carId = useParams().id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/cars/${carId}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [carId, setLoading]);

  // Handle booking
  const handleBooking = () => {
    // Add booking logic here
    console.log("Booking car:", car?.model);
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-row flex-wrap gap-5 justify-start p-3 bg-base-100">
        <Link to="/cars" className="btn btn-ghost w-fit p-0 my-auto">
          <IoIosArrowRoundBack size={"2rem"} />
        </Link>
        <h1 className="text-3xl font-bold text-secondary text-center">
          Car Details
        </h1>
      </div>
      {/* Car details card */}
      <div className="flex flex-col items-center justify-start py-6 w-full bg-base-300 min-h-screen my-0">
        <div className="card bg-base-100 w-120 max-w-full shadow-sm">
          <figure className="w-full aspect-video">
            <img src={car?.imageUrl} alt={car?.model} className="w-full" />
          </figure>
          <div className="card-body text-primary">
            <div className="flex flex-row flex-wrap justify-between w-full gap-2 items-center">
              <h4 className="card-title text-2xl font-bold">{car?.model}</h4>
              <div className="badge badge-secondary">
                {car?.availability ? "Avilable" : "Not Available"}
              </div>
            </div>
            <p className="font-medium opacity-70">{car?.description}</p>
            <p className="opacity-70">Location: {car?.location}</p>
            <div className="flex flex-row flex-wrap justify-between items-center w-full opacity-90">
              <p className="font-medium text-lg">
                Price Per Day: {car?.dailyRentalPrice}/- Taka
              </p>
              <p className="text-end">Booking Count: {car?.bookingCount}</p>
            </div>
            <div className="w-full border-1 bg-base-200 px-2 py-1 mt-4 rounded-sm">
              <div className="w-full bg-base-300 text-primary">
                <h5 className="font-medium opacity-90">Features:</h5>
              </div>
              <ul className="text-sm italic pl-1 opacity-70">
                {car?.features.map((feature) => {
                  return (
                    <li className="mt-1" key={car?.features.indexOf(feature)}>
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card-actions">
              <button
                onClick={handleBooking}
                className={`btn btn-primary ${car?.availability ? "" : "btn-disabled"} w-full mt-4`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
