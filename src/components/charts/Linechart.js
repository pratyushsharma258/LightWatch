import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ streetlights }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!streetlights || streetlights.length === 0) return;

    const labels = streetlights.map((light, index) => `Light ${index + 1}`);
    const data = streetlights.map((light) => light.ratedWattage);

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Wattage Consumption",
            data: data,
            borderColor: "#003566",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
            color: "#000",
          },
          y: {
            beginAtZero: true,
            color: "#000",
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Wattage Consumption Trends",
            color: "#000",
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    });
  }, [streetlights]);

  return <canvas ref={chartRef} />;
}

export default LineChart;
