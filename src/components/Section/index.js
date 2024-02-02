import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import Chart from "chart.js/auto";
import PieChart from "../charts/Piechart";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/router";

function Section(props) {
  const router = useRouter();
  const { userId } = router.query;
  const { username, info, content } = props;
  const streetlights = info?.responseObject;
  const submitHandler = async function (ev) {
    ev.preventDefault();

    const formData = { description, userId };
    const response = await axios.post("/api/grievance", formData);

    if (response.data?.filed) {
      setDescription("");
    }
  };

  const [description, setDescription] = useState();
  const [grievances, setGrievances] = useState();

  useEffect(() => {
    const response = axios.get("/api/grievance");
    const { allGrievances } = response.data;
    setGrievances(allGrievances);

    return () => {
      Chart?.helpers?.each(Chart.instances, function (instance) {
        instance.destroy();
      });
    };
  }, []);

  return (
    <div className="h-full w-[29vw] bg-orange-peel left-[4vw] right-auto absolute shadow-orange-peel shadow-2xl">
      {content === "home" && router.asPath.includes("admin") && (
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
      {content === "home" && router.asPath.includes("user") && (
        <div className="flex flex-col items-center">
          <div className="relative top-2 text-xl">
            <strong>Welcome {username}</strong>
          </div>
          <div className="relative top-10 p-2 w-full text-black"></div>
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
        </div>
      )}
      {content === "addGrievance" && (
        <div className="flex flex-col items-center">
          <div className="relative top-2 text-xl">
            <strong>Welcome {username}</strong>
          </div>
          <div className="relative top-20 p-4 w-full text-licorice flex flex-col">
            <p>
              If you are facing any issues on the website regarding data or want
              to lodge a complaint. Tell us and we will contact you as soon as
              possible
            </p>
            <form
              className="mt-4 mb-4 gap-4 flex flex-col w-full"
              onSubmit={submitHandler}
            >
              <Textarea
                placeholder="Complaint description"
                value={description}
                className="bg-orange-peel placeholder:text-deepblue min-h-11 h-48 max-h-80"
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Button type="submit">Submit</Button>
                <Button type="clear">Clear</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Section;
