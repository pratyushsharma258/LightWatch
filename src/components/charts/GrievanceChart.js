import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "next-themes";

function PieChart({ grievances }) {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!grievances || grievances.length === 0) return;

    const pendingGrievances = grievances.filter(
      (grievance) => grievance.status === "pending"
    ).length;
    const resolvedGrievances = grievances.filter(
      (grievance) => grievance.status === "solved"
    ).length;

    const data = {
      labels: ["Pending", "Resolved"],
      datasets: [
        {
          data: [pendingGrievances, resolvedGrievances],
          backgroundColor: ["#FF6384", "#36A2EB"],
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
            text: "Grievance Status",
            padding: 20,
            color: theme === "dark" ? "#16a34a" : "#000000",
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
  }, [grievances]);

  return (
    <div className="h-[200px]">
      <canvas ref={chartRef} />
    </div>
  );
}

export default PieChart;
