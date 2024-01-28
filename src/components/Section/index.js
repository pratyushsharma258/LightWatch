import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import Chart from "chart.js/auto";
import PieChart from "../charts/Piechart";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function Section(props) {
  const { username, info, content } = props;
  const streetlights = info?.responseObject;
  const submitHandler = async function (ev) {
    ev.preventDefault();
    if (contact?.length != 10) {
      setError("Invalid Contact Number");
      return;
    }

    setError(undefined);
  };
  const [contact, setContact] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();

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
              <Input
                type="text"
                placeholder="Contact No."
                value={contact}
                className="bg-orange-peel placeholder:text-deepblue"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .slice(0, 10)
                    .replace(/\D/g, "");
                }}
                onChange={(ev) => setContact(ev.target.value)}
              />
              {error && (
                <span className="text-xs text-red-700 mb-2">
                  Invalid Contact
                </span>
              )}
              <Textarea
                placeholder="Complaint description"
                value={description}
                className="bg-orange-peel placeholder:text-deepblue min-h-11 h-48 max-h-80"
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
