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
import { useToast } from "../ui/use-toast";
import { PulseLoader } from "react-spinners";
import { Skeleton } from "../ui/skeleton";

function Section(props) {
  const router = useRouter();
  const { userId } = router.query;
  const { toast } = useToast();
  const { info, content, markerPosition, grievanceInfo, isClient } = props;
  const streetlights = info?.responseObject;
  const grievanceArray = grievanceInfo?.allGrievances;
  const submitHandler = async function (ev) {
    setIsLoading(true);
    ev.preventDefault();

    const formData = { description, userId };
    const response = await axios.post("/api/grievance", formData);

    if (response.data?.filed) {
      setIsLoading(false);
      toast({
        title: "Grievance Filed",
        description: "Complaint registered successfully",
      });
      router.reload();
      setDescription("");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something Went Wrong",
      });
    }
  };

  const [description, setDescription] = useState();
  const [grievances, setGrievances] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function sortGrievances(grievances) {
    const pendingGrievances = grievances.filter(
      (grievance) => grievance.status === "pending"
    );

    pendingGrievances.sort((a, b) => {
      if (router.asPath.includes("admin"))
        return parseInt(a.filedAt) - parseInt(b.filedAt);
      else return parseInt(b.filedAt) - parseInt(a.filedAt);
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
    <div className="h-full w-[29vw] bg-white left-[4vw] right-auto absolute shadow-white shadow-2xl dark:bg-deepgreen dark:shadow-none">
      {isClient ? (
        <>
          {content === "home" && router.asPath.includes("admin") && (
            <div className="flex flex-col items-center">
              <div className="relative top-3">
                <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                  Welcome to LightWatch
                </strong>
              </div>
              <div className="relative top-8 p-2 w-full">
                <GrievanceChart grievances={grievanceArray} />
              </div>
              <div className="relative top-10 p-2 w-full">
                <LineChart streetlights={streetlights} />
              </div>
              <div className="relative top-10 p-2 w-full">
                <PieChart
                  streetlights={streetlights}
                  grievances={grievanceArray}
                />
              </div>
            </div>
          )}
          {content === "home" && router.asPath.includes("user") && (
            <div className="flex flex-col items-center mx-2">
              <div className="relative top-3">
                <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                  Welcome to LightWatch
                </strong>
              </div>
              <div className="mt-8 text-left w-full pl-2 font-semibold flex flex-row gap-2 text-lightblue-600 dark:text-green-600">
                <HistoryIcon />
                Complaint History :{" "}
              </div>
              <div className="relative top-4 p-2 w-full text-lightblue-700 dark:text-green-500 flex items-center justify-center flex-col">
                <div className="hover:overflow-y-auto max-h-[76vh] w-full overflow-hidden pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {grievances?.map((grievance, index) => (
                      <AccordionItem
                        key={grievance?._id}
                        value={`item-${index}`}
                      >
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
                                grievance.status === "pending"
                                  ? "text-red-800"
                                  : ""
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
                <span className="mt-6 text-left w-full font-normal text-lightblue-400 dark:text-green-700">
                  Total {grievances?.length !== 0 ? grievances?.length : 0}{" "}
                  Complaints made.
                </span>
              </div>
            </div>
          )}
          {content === "manageGrievance" && router.asPath.includes("admin") && (
            <div className="flex flex-col items-center mx-2">
              <div className="relative top-3">
                <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                  Welcome to LightWatch
                </strong>
              </div>
              <div className="mt-8 text-left w-full pl-2 font-semibold flex flex-row gap-2 text-lightblue-600 dark:text-green-600">
                <HistoryIcon />
                Complaint History :{" "}
              </div>
              <div className="relative top-4 p-2 w-full text-lightblue-700 dark:text-green-500 flex items-center justify-center flex-col">
                <div className="hover:overflow-y-auto max-h-[76vh] w-full overflow-hidden pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {grievances?.map((grievance, index) => (
                      <AccordionItem
                        key={grievance?._id}
                        value={`item-${index}`}
                      >
                        <AccordionTrigger>
                          {grievance?.description.substring(0, 10)}...
                        </AccordionTrigger>
                        <AccordionContent className="w-full relative flex gap-3 flex-col">
                          {grievance?.status === "pending" && (
                            <Button
                              className="absolute top-0 right-0 text-lightblue-700 dark:text-green-600"
                              variant="link"
                              onClick={async () => {
                                isLoading(true);
                                const data = {
                                  _id: grievance?._id,
                                };
                                console.log(grievance);
                                const response = await axios.patch(
                                  "/api/grievance",
                                  data
                                );
                                if (response?.data?.status) {
                                  isLoading(false);
                                  toast({
                                    title: "Grievance Resolved",
                                    description:
                                      "Complaint marked as resolved successfully.",
                                  });
                                  router.reload();
                                }
                              }}
                            >
                              {isLoading ? (
                                <PulseLoader size={7} color="#ffffff" />
                              ) : (
                                <CheckCircle />
                              )}
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
                                  setIsLoading(true);
                                  router.push(
                                    `${router.asPath}/edit/${grievance?.streetLightId}`
                                  );
                                }}
                              >
                                {isLoading ? (
                                  <PulseLoader size={7} color="#ffffff" />
                                ) : (
                                  <Tagicon className="w-5 h-5 -m-1 p-0" />
                                )}
                              </Button>{" "}
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <span className="mt-6 text-left w-full font-normal text-lightblue-400 dark:text-green-700">
                  Total {grievances?.length !== 0 ? grievances?.length : 0}{" "}
                  Complaints recieved.
                </span>
              </div>
            </div>
          )}
          {content === "addLight" && (
            <div className="flex flex-col items-center">
              <div className="relative top-3">
                <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                  Welcome to LightWatch
                </strong>
              </div>
              <div className="relative top-40 p-4 w-full text-lightblue-650 text-center flex flex-col gap-2">
                <span className="font-semibold dark:text-green-500">
                  Drag the marker and select your location to add the
                  streetlight.
                </span>
                <span className="text-left flex w-full flex-row gap-1 my-4 text-lightblue-700 dark:text-green-700">
                  <Globe2 />
                  Current Coordinates :{" "}
                </span>
                <Input
                  disabled={true}
                  value={markerPosition?.lat || markerPosition[0] || 0}
                ></Input>
                <span className="text-sm text-left text-lightblue-450 dark:text-green-800">
                  Latitude
                </span>
                <Input
                  disabled={true}
                  value={markerPosition?.lng || markerPosition[1] || 0}
                ></Input>
                <span className="text-sm text-left text-lightblue-450 dark:text-green-800">
                  Longitude
                </span>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button
                    onClick={() =>
                      router.push(
                        `${router.asPath}/new?lat=${
                          markerPosition?.lat || markerPosition[0] || 0
                        }&long=${markerPosition?.lng || markerPosition[1] || 0}`
                      )
                    }
                    className="bg-lightblue-650 hover:bg-lightblue-350 dark:bg-green-700 dark:hover:bg-green-500"
                  >
                    <Check className={"w-6 h-6 bg-inherit mr-1"} />
                    Proceed
                  </Button>
                  <Button
                    onClick={() => router.reload()}
                    className="bg-lightblue-650 hover:bg-lightblue-350 dark:bg-green-700 dark:hover:bg-green-500"
                  >
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
                <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                  Welcome to LightWatch
                </strong>
              </div>
              <div className="relative top-20 p-4 w-full text-lightblue-650 dark:text-green-700 flex flex-col">
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
                    className="w-full mb-2 h-48 min-h-40 max-h-96 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    onChange={(ev) => setDescription(ev.target.value)}
                    required={true}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                      type="submit"
                    >
                      {isLoading ? (
                        <>
                          <PulseLoader size={7} color="#ffffff" />
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-1" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button
                      className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                      onClick={() => setDescription("")}
                      type="clear"
                    >
                      <Close className="h-5 w-5 mr-1" />
                      Go Back
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <div className="relative top-3">
              <strong className="font-black animate-pulse tracking-wider text-2xl text-lightblue-700 dark:text-green-600">
                Welcome to LightWatch
              </strong>
            </div>
            <div className="w-full h-full flex flex-col mt-40 gap-8 items-center justify-center">
              <div className="flex flex-grow w-full items-start flex-col gap-4 p-4">
                <Skeleton className="h-4 w-full bg-lightblue-350" />
                <Skeleton className="h-4 w-[200px] bg-lightblue-350" />
              </div>
              <div className="flex flex-grow w-full items-start flex-col gap-4 p-4">
                <Skeleton className="h-4 w-full bg-lightblue-350" />
                <Skeleton className="h-4 w-[200px] bg-lightblue-350" />
              </div>
              <div className="flex flex-grow w-full items-start flex-col gap-4 p-4">
                <Skeleton className="h-4 w-full bg-lightblue-350" />
                <Skeleton className="h-4 w-[200px] bg-lightblue-350" />
              </div>
              <div className="flex flex-grow w-full items-start flex-col gap-4 p-4">
                <Skeleton className="h-4 w-full bg-lightblue-350" />
                <Skeleton className="h-4 w-[200px] bg-lightblue-350" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Section;
