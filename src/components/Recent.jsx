import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import { Link } from "react-router";
import { DateTime } from "luxon";

const Recent = () => {
  const { recentCars, setRecentCars, setLoading } = useContext(DataContext);

  // Fetch recent cars data
  useEffect(() => {
    setLoading(true);
    axios
      .get("/recent")
      .then((res) => {
        setRecentCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-accent/5 w-full py-12 px-4 flex flex-col items-center gap-8">
      <motion.button
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="text-center text-primary text-3xl font-medium italic px-4 py-2 rounded-md shadow-md">
          Recent Listings
        </h2>
      </motion.button>

      {/* Recent cars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
        {recentCars?.map((car) => {
          return (
            <motion.button
              key={car._id}
              initial={{ scale: 0.75 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/cars/${car._id}`}>
                <div className="rounded-lg overflow-hidden shadow-2xl flex flex-col bg-primary/5 h-full">
                  {/* Image div */}
                  <div>
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full"
                    />
                  </div>
                  {/* Info div */}
                  <div className="flex flex-col text-primary justify-center h-full">
                    <div className="flex flex-col w-full gap-2 py-6 px-4 items-center">
                      <h4 className="text-xl font-medium">{car.model}</h4>
                      <p className="opacity-70">
                        Date Posted:{" "}
                        {DateTime.fromISO(car.dateAdded).toLocaleString(
                          DateTime.DATE_MED,
                        )}
                      </p>
                      <p className="opacity-70">
                        Booking Count: {car.bookingCount}
                      </p>
                      <p className="font-medium text-secondary">
                        {car.dailyRentalPrice}/- Taka/day
                      </p>
                      {car.availability ? (
                        <div className="btn btn-success w-fit px-2 h-6 mt-3">
                          Avilable
                        </div>
                      ) : (
                        <div className="btn btn-warning w-fit px-2 h-6 mt-3">
                          Not Available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
