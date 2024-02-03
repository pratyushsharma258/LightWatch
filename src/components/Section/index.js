import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import Chart from "chart.js/auto";
import PieChart from "../charts/Piechart";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe2, HistoryIcon } from "lucide-react";
import { Input } from "../ui/input";
import Check from "@/components/icons/Check";
import Close from "@/components/icons/Close";

function Section(props) {
  const router = useRouter();
  const { userId } = router.query;
  const { username, info, content, markerPosition } = props;
  const streetlights = info?.responseObject;
  const submitHandler = async function (ev) {
    ev.preventDefault();

    const formData = { description, userId };
    const response = await axios.post("/api/grievance", formData);

    if (response.data?.filed) {
      router.reload();
      setDescription("");
    }
  };

  const [description, setDescription] = useState();
  const [grievances, setGrievances] = useState();

  useEffect(() => {
    (async function () {
      const response = await axios.get("/api/grievance");
      setGrievances(response.data?.allGrievances);
    })();

    return () => {
      Chart?.helpers?.each(Chart.instances, function (instance) {
        instance.destroy();
      });
    };
  }, []);

  const sortedGrievances = grievances?.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") {
      return -1;
    } else if (a.status !== "pending" && b.status === "pending") {
      return 1;
    } else {
      return parseInt(b.filedAt) - parseInt(a.filedAt);
    }
  });

  return (
    <div className="h-full w-[29vw] bg-orange-peel left-[4vw] right-auto absolute shadow-orange-peel shadow-2xl">
      {content === "home" && router.asPath.includes("admin") && (
        <div className="flex flex-col items-center">
          <div className="relative top-3">
            <strong className="font-black animate-pulse tracking-wider text-2xl">
              Welcome {username}
            </strong>
          </div>
          <div className="relative top-10 p-2 w-full text-black">
            <LineChart streetlights={streetlights} />
          </div>
          {/* <PieChart streetlights={streetlights} /> */}
        </div>
      )}
      {content === "home" && router.asPath.includes("user") && (
        <div className="flex flex-col items-center mx-2">
          <div className="relative top-3">
            <strong className="font-black animate-pulse tracking-wider text-2xl">
              Welcome {username}
            </strong>
          </div>
          <div className="mt-8 text-left w-full pl-2 font-semibold flex flex-row gap-2">
            <HistoryIcon />
            Complaint History :{" "}
          </div>
          <div className="relative top-4 p-2 w-full text-black flex items-center justify-center flex-col">
            <div className="hover:overflow-y-auto max-h-[76vh] w-full overflow-hidden pr-4">
              <Accordion type="single" collapsible className="w-full">
                {grievances?.map((grievance, index) => (
                  <AccordionItem key={grievance?._id} value={`item-${index}`}>
                    <AccordionTrigger>
                      {grievance?.description.substring(0, 10)}...
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>{grievance?.description}</p>
                      <p>
                        <span className="ml-auto text-sm">
                          Filed at:{" "}
                          {new Date(
                            parseInt(grievance?.filedAt)
                          ).toLocaleString()}{" "}
                          | Status: {grievance?.status}
                        </span>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <span className="mt-6 text-left w-full font-normal text-gray-600">
              Total {grievances?.length !== 0 ? grievances?.length : 0}{" "}
              complaints made.
            </span>
          </div>
        </div>
      )}
      {content === "addLight" && (
        <div className="flex flex-col items-center">
          <div className="relative top-3">
            <strong className="font-black animate-pulse tracking-wider text-2xl">
              Welcome {username}
            </strong>
          </div>
          <div className="relative top-40 p-4 w-full text-licorice text-center flex flex-col gap-2">
            <span className="font-semibold">
              Drag the marker and select your location to add the streetlight.
            </span>
            <span className="text-left flex w-full flex-row gap-1 my-4">
              <Globe2 />
              Current Coordinates :{" "}
            </span>
            <Input
              disabled={true}
              value={markerPosition?.lat || markerPosition[0] || 0}
            ></Input>
            <span className="text-sm text-left">Latitude</span>
            <Input
              disabled={true}
              value={markerPosition?.lng || markerPosition[1] || 0}
            ></Input>
            <span className="text-sm text-left">Longitude</span>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                onClick={() =>
                  router.push(
                    `${router.asPath}/new?lat=${
                      markerPosition?.lat || markerPosition[0] || 0
                    }&long=${markerPosition?.lng || markerPosition[1] || 0}`
                  )
                }
              >
                <Check className={"w-6 h-6 bg-inherit mr-1"} />
                Proceed
              </Button>
              <Button onClick={() => router.reload()}>
                <Close className={"w-6 h-6 bg-inherit mr-1"} />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
      {content === "addGrievance" && (
        <div className="flex flex-col items-center">
          <div className="relative top-3">
            <strong className="font-black animate-pulse tracking-wider text-2xl">
              Welcome {username}
            </strong>
          </div>
          <div className="relative top-20 p-4 w-full text-licorice flex flex-col">
            <p>
              If you encounter any issues on our website or wish to file a
              complaint, please inform us. We will address your concerns
              promptly and reach out to you as soon as possible.
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
