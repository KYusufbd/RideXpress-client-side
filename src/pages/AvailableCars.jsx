import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("/cars").then((res) => setCars(res.data));
  }, []);

  // Testing purpuse
  console.dir(cars);

  return (
    <div className="w-full bg-base-300 min-h-screen my-0">
      <div className="w-360 max-w-full mx-auto flex flex-col gap-4 py-4">
        <h1 className="text-3xl font-bold text-secondary text-center">
          All Available Cars
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {cars.map((car) => {
            return (
              <div className="rounded-lg overflow-hidden shadow-2xl flex flex-col">
                <div>
                  <img src={car.imageUrl} alt={car.model} className="w-full" />
                </div>
                <div className="px-2 py-3 flex flex-col text-primary justify-between h-full gap-6">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-medium">{car.model}</h4>
                    <p className="opacity-70">Location: {car.location}</p>
                    {car.availability ? (
                      <div className="btn btn-success w-fit px-2 h-6 mt-2">
                        Avilable
                      </div>
                    ) : (
                      <div className="btn btn-warning w-fit px-2 h-6 mt-2">
                        Not Available
                      </div>
                    )}
                  </div>
                  <Link to={`/cars/${car._id}`} className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;

console.log("Remove these lines after completing the page");
/* 
{
    "_id": "67e1258bcab652051e3ccf98",
    "model": "Toyota Corolla 2023",
    "dailyRentalPrice": 5000,
    "availability": true,
    "vehicleRegistrationNumber": "ABC-1234",
    "features": [
        "GPS",
        "Air Conditioning",
        "Bluetooth"
    ],
    "description": "A fuel-efficient and comfortable sedan for city and highway rides.",
    "bookingCount": 5,
    "imageUrl": "https://www.dublintoyota.com/blogs/4522/wp-content/uploads/2023/01/Screenshot-2023-01-05-084938.png",
    "location": "Dhaka, Bangladesh",
    "ownerId": "67dedb1a2eb9482959cede0a",
    "dateAdded": "2025-03-24T10:00:00Z"
}
 */
