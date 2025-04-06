import { useContext, useEffect, useState } from "react";
import DataContext from "../contexts/DataContext";
import axios from "axios";
import { Link } from "react-router";
import AuthContext from "../contexts/AuthContext";
import swal from "sweetalert";

const MyCars = () => {
  const { myCars, setMyCars, loading, setLoading } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [carForUpdate, setCarForUpdate] = useState(null);

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
  }, [user]);

  // Handle update
  const handleUpdate = (carId) => {
    // Set the car for update
    axios.get(`/cars/${carId}`).then((res) => {
      setCarForUpdate(res.data);
      // Open the modal
      const modal = document.getElementById("my_modal_1");
      modal.showModal();
    });
  };

  // Update car
  const updateCar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const carData = {
      model: formData.get("model"),
      dailyRentalPrice: Number(formData.get("dailyRentalPrice")),
      availability: Boolean(formData.get("availability")),
      vehicleRegistrationNumber: formData.get("vehicleRegistrationNumber"),
      features: formData
        .get("features")
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== ""),
      description: formData.get("description"),
      bookingCount: 0,
      imageUrl: formData.get("imageUrl"),
      location: formData.get("location"),
      ownerId: "", // This should be replaced with the actual owner ID after user authentication
      dateAdded: new Date().toISOString(),
    };
    console.log(carData); // For debugging
  };

  // Handle delete
  const handleDelete = (carId) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover your car: ${carId}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("/cars/" + carId)
          .then((res) => {
            console.log(res.data);
            setMyCars(myCars.filter((car) => car._id !== carId));
            swal("Poof! Your car has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal("Your car is not deleted!");
      }
    });
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
                          className="btn btn-xs btn-primary w-18"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="btn btn-xs btn-error w-18"
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
        {/* Modal for updating a car */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center text-primary opacity-70">
              Update Car Info
            </h3>
            <form
              onSubmit={updateCar}
              className="card bg-base-100 flex flex-col gap-3 w-120 max-w-full shadow-sm p-6"
            >
              <input
                type="text"
                required
                name="model"
                defaultValue={carForUpdate?.model}
                placeholder="Model"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <input
                type="number"
                required
                name="dailyRentalPrice"
                defaultValue={carForUpdate?.dailyRentalPrice}
                placeholder="Daily Rental Price (Taka)"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <select
                name="availability"
                defaultValue={carForUpdate?.availability ? 1 : ""}
                className="bg-base-200 px-3 py-2 rounded-sm"
              >
                <option value={1}>Available</option>
                <option value={""}>Not Available</option>
              </select>
              <input
                type="text"
                required
                name="vehicleRegistrationNumber"
                defaultValue={carForUpdate?.vehicleRegistrationNumber}
                placeholder="Vehicle Registration Number"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <textarea
                type="text"
                required
                name="features"
                defaultValue={carForUpdate?.features.join("\n")}
                placeholder="Features (Write each feature in new line)"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <input
                type="text"
                required
                name="description"
                defaultValue={carForUpdate?.description}
                placeholder="Description"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <input
                type="url"
                required
                name="imageUrl"
                defaultValue={carForUpdate?.imageUrl}
                placeholder="Image URL"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <input
                type="text"
                required
                name="location"
                defaultValue={carForUpdate?.location}
                placeholder="Location (e.g. Khulna, Bangladesh)"
                className="bg-base-200 px-3 py-2 rounded-sm"
              />
              <button type="submit" className="btn btn-primary mt-4">
                Update Car
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog" className="absolute top-0 right-0">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-circle btn-ghost">X</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyCars;
