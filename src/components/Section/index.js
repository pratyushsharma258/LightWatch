import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import Chart from "chart.js/auto";
import PieChart from "../charts/Piechart";

function Section(props) {
  const { username, info, content } = props;
  const streetlights = info?.responseObject;
  // console.log(info);

  useEffect(() => {
    return () => {
      Chart?.helpers?.each(Chart.instances, function (instance) {
        instance.destroy();
      });
    };
  }, []);

  return (
    <div className="h-full w-[29vw] bg-orange-peel left-[4vw] right-auto absolute shadow-orange-peel shadow-2xl">
      {content === "home" && (
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
      {content === "addLight" && (
        <div className="flex flex-col items-center">
          <div className="relative top-2 text-xl">
            <strong>Welcome {username}</strong>
          </div>
          <div className="relative top-40 p-4 w-full text-licorice text-center">
            Drag the marker and select your location to add the streetlight.
          </div>
          {/* <PieChart streetlights={streetlights} /> */}
        </div>
      )}
    </div>
  );
}

export default Section;
