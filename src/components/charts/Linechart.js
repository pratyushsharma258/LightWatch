import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "next-themes";

function LineChart({ streetlights }) {
  const chartRef = useRef(null);

  const { theme } = useTheme();

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
            borderColor: theme === "dark" ? "#16a34a" : "#000000",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
            color: theme === "dark" ? "#16a34a" : "#000000",
            grid: {
              color: theme === "dark" ? "#16a34a" : "rgba(0, 0, 0, 0.5)",
            },
          },
          y: {
            beginAtZero: true,
            color: theme === "dark" ? "#16a34a" : "#000000",
            grid: {
              color: theme === "dark" ? "#16a34a" : "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Wattage Consumption Trends",
            color: theme === "dark" ? "#16a34a" : "#000000",
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
  }, [streetlights, theme]);

  return <canvas ref={chartRef} />;
}

export default LineChart;
