const { useEffect, useRef } = require("react");
const Chart = require("chart.js/auto");

function PieChart({ streetlights, grievances }) {
  const chartRef = useRef(null);

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
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"], // Colors for each segment
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
            color: "#000",
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
  }, [streetlights, grievances]);

  return (
    <div className="h-[200px]">
      <canvas ref={chartRef} />
    </div>
  );
}

module.exports = PieChart;
