import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const StatisticsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchData = async () => {
    if (selectedMonth !== "") {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get(
          `/api/statistics?month=${selectedMonth}`
        );
        setStatistics(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  // array of month options
  const monthOptions = [
    { value: "", label: "Choose a month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section>
      <div className="w-[90%]  max-w-5xl mx-auto py-20">
        <div className="mx-auto  w-96">
          <div className="flex mb-10 items-center">
            <label className="w-full">Select a month: </label>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="select select-primary w-full max-w-xs">
              {monthOptions.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Total Sale Amount: {statistics?.totalSaleAmount}</p>
            <p>Total Sold Items: {statistics?.totalSoldItems}</p>
            <p>Total Not Sold Items: {statistics?.totalNotSoldItems}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StatisticsPage;
