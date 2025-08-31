import { useState } from "react";
import DataContext from "../contexts/DataContext";
import { toast } from "react-toastify";

const DataProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listView, setListView] = useState(false);

  // Function to get all dates between two dates
  function getDatesBetween(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    start.setHours(0, 0, 0, 0); // Set start date to the start of the day
    end.setHours(0, 0, 0, 0); // Set end date to the start of the day
    const dateArray = [];

    const currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate).toISOString());
      currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    }

    return dateArray;
  }

  const getTotalCost = (startDate, endDate, dailyRentalPrice) => {
    return getDatesBetween(startDate, endDate).length * dailyRentalPrice;
  };

  // Check if the selected dates are available
  const isAvailable = (startDate, endDate, bookedDates) => {
    let availability = true;
    bookedDates.forEach((date) => {
      if (new Date(date) >= startDate && new Date(date) <= endDate) {
        availability = false;
      }
    });
    return availability;
  };

  // Check if the selected dates are valid
  const isValid = (startDate, endDate) => {
    let validity = true;
    if (startDate > endDate) {
      validity = false;
      toast("Start date should be before end date!");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate < today) {
      validity = false;
      toast("Start date should be today or later!");
    }
    return validity;
  };

  const data = {
    cars,
    setCars,
    myCars,
    setMyCars,
    myBookings,
    setMyBookings,
    loading,
    setLoading,
    listView,
    setListView,
    getDatesBetween,
    getTotalCost,
    isAvailable,
    isValid,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
