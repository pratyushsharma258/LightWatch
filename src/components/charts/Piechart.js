const { useEffect, useRef } = require("react");
const Chart = require("chart.js/auto");

function PieChart({ streetlights }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!streetlights || streetlights.length === 0) return;

    const reportedLights = streetlights.filter((light) => light.reported);
    const workingLights = streetlights.filter(
      (light) => light.luminosity >= light.criticalLuminosity
    );
    const notWorkingLights = streetlights.filter(
      (light) => light.luminosity < light.criticalLuminosity
    );

    const data = {
      labels: ["Reported", "Working", "Not Working"],
      datasets: [
        {
          data: [
            reportedLights.length,
            workingLights.length,
            notWorkingLights.length,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for each segment
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
  }, [streetlights]);

  return (
    <div className="h-[200px]">
      <canvas ref={chartRef} />
    </div>
  );
}

module.exports = PieChart;
