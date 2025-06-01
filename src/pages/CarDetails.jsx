import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DataContext from "../contexts/DataContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const CarDetails = () => {
  const [car, setCar] = useState();
  const { setLoading, getDatesBetween, isAvailable, isValid } =
    useContext(DataContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  const carId = useParams().id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/cars/${carId}`)
      .then(async (res) => {
        const bookings = await axios.get(`/cars/${carId}/bookings`);
        res.data.bookings = bookings.data;
        setCar(res.data);
        const booked = [];
        res.data.bookings.forEach((booking) => {
          const dates = getDatesBetween(booking.startDate, booking.endDate);
          booked.push(...dates);
        });
        setBookedDates(booked);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  // Handle booking
  const handleBooking = () => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    const booking = {
      carId: car?._id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalCost:
        (endDate.getDate() - startDate.getDate() + 1) * car?.dailyRentalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    if (!isAvailable(startDate, endDate, bookedDates)) {
      toast("Car is not available for the selected dates");
      setStartDate(new Date());
      setEndDate(new Date());
      document.getElementById("my_modal_1").close();
      return;
    }
    if (!isValid(startDate, endDate)) {
      setStartDate(new Date());
      setEndDate(new Date());
      document.getElementById("my_modal_1").close();
      return;
    }
    axios
      .post("/bookings", {
        booking: booking,
      })
      .then((res) => {
        console.log(res.data);
        toast(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast("Booking failed");
      });
    document.getElementById("my_modal_1").close();
  };

  return (
    <div>
      {/* Top bar */}
      <div className="sticky top-18 flex flex-row flex-wrap gap-5 w-full justify-start p-3 bg-base-100 z-10">
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
            <h3 className="font-bold text-3xl text-primary mb-4">
              Booking Summary
            </h3>
            <h6 className="text-lg font-medium">{car?.model}</h6>
            <h6 className="text-base font-medium">
              Reg Number: {car?.vehicleRegistrationNumber}
            </h6>
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
                minDate={startDate}
                maxDate={new Date().setDate(new Date(startDate).getDate() + 10)}
                excludeDates={bookedDates.map((date) => new Date(date))}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">End date:</h6>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                maxDate={new Date().setDate(new Date(startDate).getDate() + 10)}
                excludeDates={bookedDates.map((date) => new Date(date))}
              />
            </div>
            <h6 className="text-lg font-medium">
              Total cost:{" "}
              {getDatesBetween(startDate.toISOString(), endDate.toISOString())
                .length > 0
                ? getDatesBetween(
                    startDate.toISOString(),
                    endDate.toISOString(),
                  ).length * car?.dailyRentalPrice
                : 0}
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
          <button onClick={handleBooking} className="btn btn-secondary">
            Confirm
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default CarDetails;
