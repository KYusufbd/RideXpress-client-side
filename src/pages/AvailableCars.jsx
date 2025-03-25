import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import DataContext from "../contexts/DataContext";
import { HiViewGrid } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";

const AvailableCars = () => {
  const { cars, setCars, setLoading, listView, setListView } = useContext(DataContext);

  // Fetch cars data
  useEffect(() => {
    setLoading(true);
    axios
      .get("/cars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const viewToggle = () => {
    setListView(!listView);
  };

  return (
    <div className="w-full bg-base-300 min-h-screen my-0">
      <div className="w-360 max-w-full mx-auto flex flex-col gap-4 pb-4">
        <div className="flex flex-row justify-between p-3 bg-base-100">
          <h1 className="text-3xl font-bold text-secondary text-center">
            All Available Cars
          </h1>
          <div className="flex flex-row">
            <button onClick={viewToggle} className="btn btn-ghost p-1">
              {listView && <HiViewGrid size="2rem" />}
              {!listView && <HiViewList size="2rem" />}
            </button>
          </div>
        </div>
        {!listView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3">
            {cars.map((car) => {
              return (
                <div
                  key={car._id}
                  className="rounded-lg overflow-hidden shadow-2xl flex flex-col bg-base-100"
                >
                  <div>
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full"
                    />
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
                      <div className="w-full border-1 bg-base-200 px-2 py-1 mt-4 opacity-70 rounded-sm">
                        <div className="w-full bg-base-300 text-primary">
                          <h5>Features:</h5>
                        </div>
                        <ul className="text-sm italic pl-1">
                          {car.features.map((feature) => {
                            return (
                              <li key={car.features.indexOf(feature)}>
                                {feature}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <Link to={`/cars/${car._id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {listView && (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Model</th>
                  <th>Features</th>
                  <th>Availability</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => {
                  return (
                    <tr key={cars.indexOf(car)}>
                      <td>
                        <div className="w-42 md:w-58 lg:w-72 overflow-hidden rounded-xl">
                          <img
                            src={car.imageUrl}
                            alt={car.model}
                            className="w-full"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-start gap-2">
                          <h4 className="text-xl font-medium">{car.model}</h4>
                          <p className="opacity-70">Location: {car.location}</p>
                        </div>
                      </td>
                      <td>
                        <div className="w-full border-1 bg-base-200 px-2 py-1 mt-4 opacity-70 rounded-sm">
                          <ul className="text-sm italic pl-1">
                            {car.features.map((feature) => {
                              return (
                                <li key={car.features.indexOf(feature)}>
                                  {feature}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
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
                      <th>
                        <Link
                          to={`/cars/${car._id}`}
                          className="btn btn-primary w-max"
                        >
                          Book Now
                        </Link>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
