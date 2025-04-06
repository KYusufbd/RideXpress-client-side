import axios from "axios";
import { toast } from "react-toastify";

const AddCar = () => {
  const addCar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const carData = {
      model: formData.get("model"),
      dailyRentalPrice: JSON.parse(formData.get("dailyRentalPrice")),
      availability: JSON.parse(formData.get("availability")),
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
    axios
      .post("/cars", {
        car: carData,
      })
      .then((res) => {
        if (res.status === 200) {
          toast("Car added successfully");
          e.target.reset();
        } else {
          toast("Failed to add car");
        }
      })
      .catch((err) => {
        console.error(err);
        toast("An error occurred while adding the car");
      });
  };
  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-row flex-wrap gap-5 justify-start p-3 bg-base-100">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Add Car
        </h1>
      </div>
      {/* Add car form */}
      <div className="flex flex-col items-center justify-start py-6 w-full bg-base-300 min-h-screen my-0">
        <form
          onSubmit={addCar}
          className="card bg-base-100 flex flex-col gap-3 w-120 max-w-full shadow-sm p-6"
        >
          <input
            type="text"
            required
            name="model"
            placeholder="Model"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <input
            type="number"
            required
            name="dailyRentalPrice"
            placeholder="Daily Rental Price (Taka)"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <select
            name="availability"
            defaultValue={true}
            className="bg-base-200 px-3 py-2 rounded-sm"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
          <input
            type="text"
            required
            name="vehicleRegistrationNumber"
            placeholder="Vehicle Registration Number"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <textarea
            type="text"
            required
            name="features"
            placeholder="Features (Write each feature in new line)"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <input
            type="text"
            required
            name="description"
            placeholder="Description"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <input
            type="url"
            required
            name="imageUrl"
            placeholder="Image URL"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <input
            type="text"
            required
            name="location"
            placeholder="Location (e.g. Khulna, Bangladesh)"
            className="bg-base-200 px-3 py-2 rounded-sm"
          />
          <button type="submit" className="btn btn-primary mt-4">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
