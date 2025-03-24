import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import DataContext from "../contexts/DataContext";

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

  return (
    <div>
      <div>
        <img src={car?.imageUrl} alt={car?.model} className="w-full" />
      </div>
      <h4 className="text-2xl font-medium">{car?.model}</h4>
    </div>
  );
};

export default CarDetails;

console.log("Remove these lines when the page is complete");

/* 
{
    "_id": "67e1258bcab652051e3ccfa2",
    "model": "Chevrolet Camaro 2020",
    "dailyRentalPrice": 16000,
    "availability": true,
    "vehicleRegistrationNumber": "CAM-2345",
    "features": [
        "V8 Engine",
        "Sport Mode",
        "Convertible"
    ],
    "description": "A powerful muscle car with an aggressive design and thrilling performance.",
    "bookingCount": 9,
    "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-camaross-001-1563903153.jpg?crop=0.428xw:0.544xh;0.220xw,0.221xh&resize=768:*",
    "location": "Dhaka, Bangladesh",
    "ownerId": "67e05d2aea3b6eb5b1da6074",
    "dateAdded": "2025-03-03T12:30:00Z"
}
*/
