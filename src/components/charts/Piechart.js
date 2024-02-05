import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "next-themes";

function PieChart({ streetlights, grievances }) {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!streetlights || streetlights.length === 0) return;

    const functionalStreetlights = streetlights.filter(
      (light) => light.luminosity >= light.criticalLuminosity
    ).length;

    const nonFunctionalStreetlights = streetlights.filter(
      (light) => light.luminosity < light.criticalLuminosity
    ).length;

    const streetlightsWithGrievances = new Set(
      grievances
        .filter((grievance) => grievance.streetLightId)
        .map((grievance) => grievance.streetLightId)
    ).size;

    const data = {
      labels: ["Functional", "Non-Functional", "With Grievances"],
      datasets: [
        {
          data: [
            functionalStreetlights,
            nonFunctionalStreetlights,
            streetlightsWithGrievances,
          ],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
          title: {
            display: true,
            text: "Streetlight Status",
            padding: 20,
            color: theme === "dark" ? "#16a34a" : "#000",
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          animateRotate: true,
          animateScale: true,
        },
      },
    });
  }, [streetlights, grievances, theme]);

  return (
    <div className="h-[200px]">
      <canvas ref={chartRef} />
    </div>
  );
}

module.exports = PieChart;
