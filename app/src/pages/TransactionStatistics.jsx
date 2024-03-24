import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-03"); // Default to March 2024
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/api/products/statistics", {
          params: { month: selectedMonth },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Statistics</h1>
      <div className="mb-4">
        <label htmlFor="monthSelect" className="mr-2">
          Select Month:
        </label>
        <input
          type="month"
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Total Sale Amount</h2>
          <p>{statistics.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Total Sold Items</h2>
          <p>{statistics.totalSoldItems}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Total Not Sold Items</h2>
          <p>{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
