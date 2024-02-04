import { useState, useEffect } from "react";
import LineChart from "@/components/charts/Linechart";
import GrievanceChart from "@/components/charts/GrievanceChart";
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
import { CheckCircle, Globe2, HistoryIcon, LinkIcon } from "lucide-react";
import { Input } from "../ui/input";
import Check from "@/components/icons/Check";
import Close from "@/components/icons/Close";
import Tagicon from "../icons/Tagicon";

function Section(props) {
  const router = useRouter();
  const { userId } = router.query;
  const { username, info, content, markerPosition, grievanceInfo } = props;
  const streetlights = info?.responseObject;
  const grievanceArray = grievanceInfo?.allGrievances;
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

  function sortGrievances(grievances) {
    const pendingGrievances = grievances.filter(
      (grievance) => grievance.status === "pending"
    );

    pendingGrievances.sort((a, b) => {
      return parseInt(a.filedAt) - parseInt(b.filedAt);
    });

    const resolvedGrievances = grievances.filter(
      (grievance) => grievance.status === "solved"
    );

    const sortedGrievances = pendingGrievances.concat(resolvedGrievances);

    return sortedGrievances;
  }

  useEffect(() => {
    (async function () {
      const response = await axios.get("/api/grievance");
      setGrievances(sortGrievances(response.data?.allGrievances));
    })();

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
          <div className="relative top-3">
            <strong className="font-black animate-pulse tracking-wider text-2xl">
              Welcome {username}
            </strong>
          </div>
          <div className="relative top-8 p-2 w-full text-black">
            <GrievanceChart grievances={grievanceArray} />
          </div>
          <div className="relative top-10 p-2 w-full text-black">
            <LineChart streetlights={streetlights} />
          </div>
          <div className="relative top-10 p-2 w-full text-black">
            <PieChart streetlights={streetlights} grievances={grievanceArray} />
          </div>
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
                      <p className="w-full">
                        <span className="ml-auto text-sm">
                          Filed at:{" "}
                          {new Date(
                            parseInt(grievance?.filedAt)
                          ).toLocaleString()}{" "}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={`font-bold ${
                            grievance.status === "pending" ? "text-red-800" : ""
                          }`}
                        >
                          {grievance?.status?.toUpperCase()}
                        </span>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <span className="mt-6 text-left w-full font-normal text-gray-600">
              Total {grievances?.length !== 0 ? grievances?.length : 0}{" "}
              Complaints made.
            </span>
          </div>
        </div>
      )}
      {content === "manageGrievance" && router.asPath.includes("admin") && (
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
                    <AccordionContent className="w-full relative flex gap-3 flex-col">
                      {grievance?.status === "pending" && (
                        <Button
                          className="absolute top-0 right-0"
                          variant="link"
                          onClick={async () => {
                            const data = {
                              _id: grievance?._id,
                            };
                            console.log(grievance);
                            const response = await axios.patch(
                              "/api/grievance",
                              data
                            );
                            if (response?.data?.status) {
                              router.reload();
                            }
                          }}
                        >
                          <CheckCircle />
                        </Button>
                      )}
                      <p>{grievance?.description}</p>
                      <p className="w-full">
                        <span className="ml-auto text-sm">
                          Filed at:{" "}
                          {new Date(
                            parseInt(grievance?.filedAt)
                          ).toLocaleString()}{" "}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={`font-bold ${
                            grievance.status === "pending"
                              ? "text-red-800 animate-pulse"
                              : ""
                          }`}
                        >
                          {grievance?.status?.toUpperCase()}
                        </span>
                      </p>
                      {grievance?.streetLightId && (
                        <p className="flex flex-row items-center h-5">
                          Associated Streetlight :{" "}
                          <Button
                            variant="link"
                            onClick={() => {
                              router.push(
                                `${router.asPath}/edit/${grievance?.streetLightId}`
                              );
                            }}
                          >
                            <Tagicon className="w-5 h-5 -m-1 p-0" />
                          </Button>{" "}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <span className="mt-6 text-left w-full font-normal text-gray-600">
              Total {grievances?.length !== 0 ? grievances?.length : 0}{" "}
              Complaints recieved.
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
