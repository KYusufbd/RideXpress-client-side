import { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import axios from "axios";
import { Link } from "react-router";

const MyCars = () => {
  const { myCars, setMyCars, loading, setLoading } = useContext(DataContext);

  // Fetch cars data
  useEffect(() => {
    setLoading(true);
    axios
      .get("/my-cars")
      .then((res) => {
        setMyCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle update
  const handleUpdate = (carId) => {
    // Add update logic here
    console.log("Updating car:", carId);
  };

  // Handle delete
  const handleDelete = (carId) => {
    // Add delete logic here
    console.log("Deleting car:", carId);
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
                <th>Daily Rental Price</th>
                <th>Booking Count</th>
                <th>Availability</th>
                <th>Date Added</th>
                <th>Action Buttons</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => {
                return (
                  <tr key={myCars.indexOf(car)}>
                    <td>
                      <div className="w-42 aspect-video overflow-hidden rounded-xl flex items-center justify-center bg-base-100 shadow-2xl">
                        <img
                          src={car.imageUrl}
                          alt={car.model}
                          className="min-w-full min-h-full"
                        />
                      </div>
                    </td>
                    <td>
                      <h4 className="text-xl font-medium">{car.model}</h4>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-secondary">
                        {car.dailyRentalPrice}/- Taka
                      </p>
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {car.bookingCount}
                      </p>
                    </td>
                    <td>
                      {car.availability ? (
                        <div className="btn btn-success w-fit px-2 h-6 mt-2">
                          Avilable
                        </div>
                      ) : (
                        <div className="btn btn-warning w-26 px-2 h-6 mt-2">
                          Not Available
                        </div>
                      )}
                    </td>
                    <td>
                      <p className="opacity-80 text-base font-medium text-primary">
                        {new Date(car.dateAdded).toLocaleDateString()}
                      </p>
                    </td>
                    {/* Action buttons */}
                    <td>
                      <div className="flex flex-row flex-wrap gap-2">
                        <button
                          onClick={() => handleUpdate(car._id)}
                          className="btn btn-xs btn-primary"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
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
        {myCars.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center gap-4 h-96">
            <h1 className="text-3xl font-bold text-secondary text-center">
              No Cars Found
            </h1>
            <Link to="/" className="btn btn-primary w-max">
              Go Back
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;
