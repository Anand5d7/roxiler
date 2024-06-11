import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Loader from "../components/Loader";
import Error from "../components/Error"; // Assume you have an Error component

const BarChartPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("3"); // Default to March
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [barChartData, setBarChartData] = useState([]);

  const fetchData = async () => {
    if (selectedMonth !== "") {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get(`/api/bar-chart?month=${selectedMonth}`);
        setBarChartData(response.data);
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

  // Array of month options
  const monthOptions = [
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

  const getMonthLabel = (value) => {
    const month = monthOptions.find((option) => option.value === value);
    return month ? month.label : "";
  };

  const chartData = {
    labels: barChartData.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section>
      <div className="w-[90%] max-w-5xl mx-auto py-20">
        <div className="mx-auto w-96">
          <div className="flex mb-10 items-center">
            <label className="w-full">Select a month: </label>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="select select-primary w-full max-w-xs"
            >
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Bar Chart Stats - {getMonthLabel(selectedMonth)}</h2>
            <p className="text-sm text-gray-500">(Selected month name from dropdown)</p>
          </div>
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarChartPage;
