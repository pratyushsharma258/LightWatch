import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import Chart from "chart.js/auto";
import PieChart from "../charts/Piechart";

function Section(props) {
  const { username, info } = props;
  const streetlights = info?.responseObject;
  const [contentValue, setContentValue] = useState(props.content);

  useEffect(() => {
    return () => {
      Chart?.helpers?.each(Chart.instances, function (instance) {
        instance.destroy();
      });
    };
  }, []);

  return (
    <div className="h-full w-[29vw] bg-orange-peel left-[4vw] right-auto absolute shadow-orange-peel shadow-2xl">
      {contentValue === "home" && (
        <div className="flex flex-col items-center">
          <div className="relative top-2 text-xl">
            <strong>Welcome {username}</strong>
          </div>
          <div className="relative top-10 p-2 w-full text-black">
            <LineChart streetlights={streetlights} />
          </div>
          {/* <PieChart streetlights={streetlights} /> */}
        </div>
      )}
    </div>
  );
}

export default Section;
