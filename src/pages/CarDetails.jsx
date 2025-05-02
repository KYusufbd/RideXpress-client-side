import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DataContext from "../contexts/DataContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const [car, setCar] = useState();
  const { setLoading } = useContext(DataContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className={`btn btn-primary ${car?.availability ? "" : "btn-disabled"} w-full mt-4`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col justify-between bg-base-200 text-base-content relative min-h-11/12 my-5">
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-bold text-3xl text-primary mb-4">Booking Summary</h3>
            <h6 className="text-lg font-medium">{car?.model}</h6>
            <h6 className="text-base font-medium">Reg Number: {car?.vehicleRegistrationNumber}</h6>
            <h6 className="text-base font-medium">Location: {car?.location}</h6>
            <h6 className="text-base font-medium">
              Daily Cost: {car?.dailyRentalPrice}
            </h6>
            <p className="py-4 -mb-4 text-base italic text-warning">
              Please select dates to book the car:
            </p>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">Start date:</h6>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">End date:</h6>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <h6 className="text-lg font-medium">
              Total cost:{" "}
              {(endDate.getDate() - startDate.getDate() + 1) *
                car?.dailyRentalPrice}
              /- Taka
            </h6>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost absolute right-3 top-3 h-5 w-5">
                X
              </button>
            </form>
          </div>
          <button onClick={handleBooking} className="btn btn-secondary">Confirm</button>
        </div>
      </dialog>
    </div>
  );
};

export default CarDetails;

/*
{
    "_id": "67e1258bcab652051e3ccfa4",
    "model": "Porsche 911 Carrera 2021",
    "dailyRentalPrice": 25000,
    "availability": false,
    "vehicleRegistrationNumber": "POR-5678",
    "features": [
        "Turbocharged Engine",
        "Rear-Wheel Drive",
        "Sport Exhaust"
    ],
    "description": "A high-performance sports car with stunning acceleration and handling.",
    "bookingCount": 4,
    "imageUrl": "https://robbreport.com/wp-content/uploads/2021/05/1-13.jpg?w=1000",
    "location": "Sylhet, Bangladesh",
    "ownerId": "67e05d2aea3b6eb5b1da6074",
    "dateAdded": "2025-03-04T10:50:00Z"
}
*/
