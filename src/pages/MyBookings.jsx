import { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import axios from "axios";
import { Link } from "react-router";
import AuthContext from "../contexts/AuthContext";

const MyBookings = () => {
  const { myBookings, setMyBookings, loading, setLoading } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);

  // Fetch cars data
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
  }, [user]);

  // Cancel booking
  const cancelBooking = (id) => {
    console.log("Cancel booking with id:", id);
  };

  // Modify booking date
  const modifyDate = (id) => {
    console.log("Modify booking date with id:", id);
  };

  return (
    <div className="w-full bg-base-300 min-h-screen my-0">
      <div className="w-360 max-w-full mx-auto flex flex-col gap-4 pb-4">
        {/* Top bar */}
        <div className="flex flex-row flex-wrap gap-2 justify-between p-3 bg-base-100">
          <h1 className="text-3xl font-bold text-secondary text-center">
            My Cars
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
                      <div className="w-42 aspect-video overflow-hidden rounded-xl flex items-center justify-center bg-base-100 shadow-2xl">
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
                        {booking.createdAt}
                      </p>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {booking.totalCost} Taka
                      </p>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {booking.status}
                      </p>
                    </td>
                    {/* Action buttons */}
                    <td>
                      <div className="flex flex-row flex-wrap gap-2">
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="btn btn-xs btn-primary w-22"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => modifyDate(booking._id)}
                          className="btn btn-xs btn-error w-22"
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
              You didn't add any car yet!
            </h1>
            <Link to="/add-car" className="btn btn-primary w-max">
              Add Your First Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
