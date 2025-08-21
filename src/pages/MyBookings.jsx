import { useContext, useEffect, useState } from "react";
import DataContext from "../contexts/DataContext";
import axios from "axios";
import { Link } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { DateTime } from "luxon";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

const MyBookings = () => {
  const { myBookings, setMyBookings, loading, setLoading, getDatesBetween } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [changeToReload, setChangeToReload] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingToBeModified, setBookingToBeModified] = useState(null);

  // Fetch booking data
  useEffect(() => {
    setLoading(true);
    axios
      .get("/my-bookings")
      .then((res) => {
        setMyBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, changeToReload]);

  // Delete booking function used in cancel booking
  const deleteBooking = (id) => {
    axios
      .delete(`/bookings/${id}`)
      .then((res) => {
        console.log(res.data);
        setChangeToReload(!changeToReload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Cancel booking
  const cancelBooking = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once cancelled you have to book car again!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your booking has been cancelled!", {
          icon: "success",
        });
        deleteBooking(id);
      } else {
        swal("Your booking is safe!");
      }
    });
  };

  // Modify booking date function
  const modifyDate = () => {
    console.log("Modifying booking date.");
  };

  const handleDateChange = (bookingId, carId) => {
    setBookingToBeModified(myBookings.find((b) => b._id === bookingId));

    console.log(bookingToBeModified); // Testing purpose

    document.getElementById("my_modal_1").showModal();

    axios.get(`/cars/${carId}/bookings`).then((bookings) => {
      const booked = [];
      console.log("Bookings data:", bookings.data); // Testing purpose
      bookings.data.forEach((booking) => {
        const dates = getDatesBetween(booking.startDate, booking.endDate);
        booked.push(...dates);
      });

      const thisBookingDates = getDatesBetween(
        bookingToBeModified?.startDate,
        bookingToBeModified?.endDate,
      );
      // Remove the dates of the booking that is being modified
      const filteredBooked = booked.filter(
        (date) => !thisBookingDates.includes(date),
      );
      // Set booked dates excluding the dates of the booking being modified
      setBookedDates(filteredBooked);
    });

    // Testing purpose
    console.log("Booked dates:", bookedDates);
  };

  // Testing purpose
  console.log("My bookings:", myBookings);

  return (
    <div className="w-full bg-base-300 min-h-screen my-0">
      <div className="w-360 max-w-full mx-auto flex flex-col gap-4 pb-4">
        {/* Top bar */}
        <div className="flex flex-row flex-wrap gap-2 justify-between p-3 bg-base-100">
          <h1 className="text-3xl font-bold text-secondary text-center">
            My Bookings
          </h1>
        </div>

        {/* Cars list */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Booking Date</th>
                <th>Total Price</th>
                <th>Booking Status</th>
                <th>Action Buttons</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => {
                return (
                  <tr key={myBookings.indexOf(booking)}>
                    <td>
                      <div className="w-20 aspect-video overflow-hidden rounded-xl flex items-center justify-center bg-base-100 shadow-2xl">
                        <img
                          src={booking.car.imageUrl}
                          alt={booking.car.model}
                          className="min-w-full min-h-full"
                        />
                      </div>
                    </td>
                    <td>
                      <h4 className="text-xl font-medium">
                        {booking.car.model}
                      </h4>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-secondary">
                        {DateTime.fromISO(booking.createdAt).toFormat(
                          "dd-LL-yyyy t",
                        )}
                      </p>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {booking.totalCost} Taka
                      </p>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </p>
                    </td>
                    {/* Action buttons */}
                    <td>
                      <div className="flex flex-row flex-wrap gap-2">
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className={`btn ${booking.status === "cancelled" && "btn-disabled"} btn-warning btn-xs w-22`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleDateChange(booking._id, booking.carId)
                          }
                          className={`btn ${booking.status === "cancelled" && "btn-disabled"} btn-xs btn-primary w-22`}
                        >
                          Modify Date
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* No cars found */}
        {myBookings.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center gap-4 h-96">
            <h1 className="text-3xl font-bold text-secondary text-center">
              You didn't book any car yet!
            </h1>
            <Link to="/cars" className="btn btn-primary w-max">
              Book A Car
            </Link>
          </div>
        )}
      </div>
      {/* Modal for modifying booking dates */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col justify-between bg-base-200 text-base-content relative min-h-11/12 my-5">
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-bold text-3xl text-primary mb-4">
              Booking Summary
            </h3>
            <p className="py-4 -mb-4 text-base italic text-warning">
              Please select dates to book the car:
            </p>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">Start date:</h6>
              <DatePicker
                selected={bookingToBeModified?.startDate}
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 10)}
                excludeDates={bookedDates.map((date) => new Date(date))}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">End date:</h6>
              <DatePicker
                selected={bookingToBeModified?.endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                maxDate={new Date().setDate(new Date(startDate).getDate() + 9)}
                excludeDates={bookedDates.map((date) => new Date(date))}
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost absolute right-3 top-3 h-5 w-5">
                X
              </button>
            </form>
          </div>
          <button onClick={modifyDate} className="btn btn-secondary">
            Confirm
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;
