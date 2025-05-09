import { useState } from "react";
import DataContext from "../contexts/DataContext";

const DataProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listView, setListView] = useState(false);

  const data = {
    cars,
    setCars,
    myCars,
    setMyCars,
    loading,
    setLoading,
    listView,
    setListView,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
