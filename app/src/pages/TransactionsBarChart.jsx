import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

// Import the chartjs-adapter-date-fns adapter
import "chartjs-adapter-date-fns";

const TransactionsBarChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/bar-chart", {
          params: {
            month: "2024-03", // Example month format: "YYYY-MM"
          },
        });
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map((entry) => entry.range);
          const counts = data.map((entry) => entry.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Number of Items",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        } else {
          console.log("Empty or invalid data received from the API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      {chartData.labels && chartData.datasets ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Items",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Price Range",
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TransactionsBarChart;
