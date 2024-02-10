import Navbar from "@/components/Navbar";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PulseLoader } from "react-spinners";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import Map from "@/components/Map";
import Check from "@/components/icons/Check";
import Close from "@/components/icons/Close";
import { useToast } from "@/components/ui/use-toast";

function Index({ foundLight }) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    latitude,
    longitude,
    ratedWattage: rW,
    luminosity: luM,
    criticalLuminosity: cL,
    expectedLife: exL,
    description: des,
    _id,
    createdAt,
  } = foundLight;
  const [ratedWattage, setRatedWattage] = useState(rW);
  const [luminosity, setLuminosity] = useState(luM);
  const [criticalLuminosity, setCriticalLuminosity] = useState(cL);
  const [expectedLife, setExpectedLife] = useState(exL);
  const [description, setDescription] = useState(des);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = router.query;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitHandler = async function (ev) {
    setIsLoading(true);
    ev.preventDefault();
    const data = {
      _id,
      latitude,
      longitude,
      ratedWattage,
      luminosity,
      criticalLuminosity,
      expectedLife,
      description,
    };
    const response = await axios.patch("/api/streetlight", data);

    if (response.data.status) {
      setIsLoading(false);
      toast({
        title: "Done",
        description: "Details modified successfully",
      });
      redirectHandler();
    }
  };

  const redirectHandler = function (ev) {
    router.push(`/admin/${userId}`);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="w-screen min-h-screen flex flex-row items-center bg-deepblue justify-center">
      {isClient ? (
        <>
          <Navbar userRole={"admin"} />
          <div className="flex flex-col flex-grow">
            <Map
              position={[latitude, longitude]}
              zoom={20}
              center={[latitude, longitude - 0.02]}
              className="max-w-screen max-h-screen absolute left-0 right-0 bottom-0 top-10 z-10"
            />
            <div className="flex shadow-2xl w-[24rem] h-[calc(100vh_-_56px)] shadow-lightblue dark:shadow-green-500 bg-white z-20 absolute top-[56px] dark:bg-deepgreen">
              <Card className="w-[24rem] h-[calc(100vh_-_56px)] flex flex-grow flex-col rounded-none border-none bg-white text-lightblue dark:bg-deepgreen">
                <CardHeader>
                  <CardTitle className="text-lightblue text-xl dark:text-green-500">
                    Spread more light
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-0.5"
                  >
                    <Input
                      type="text"
                      placeholder="id"
                      value={_id}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700"
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-0">
                      Database ID
                    </span>
                    <Input
                      type="number"
                      placeholder="Latitude"
                      value={latitude}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-0">Latitude</span>
                    <Input
                      type="number"
                      placeholder="Longitude"
                      value={longitude}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-0">
                      Longitude
                    </span>
                    <Input
                      type="text"
                      placeholder="CreatedAt"
                      value={createdAt ? formatTimestamp(createdAt) : ""}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-0">
                      The date when the street light was installed.
                    </span>
                    <Input
                      type="number"
                      placeholder="Rated Wattage"
                      value={ratedWattage}
                      onChange={(e) => {
                        setRatedWattage(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-0">
                      The Rated Power Consumption.
                    </span>
                    <Input
                      type="number"
                      placeholder="Luminosity"
                      value={luminosity}
                      onChange={(e) => {
                        setLuminosity(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-0">
                      The expected Luminous Intensity of the Streetlight.
                    </span>
                    <Input
                      type="number"
                      placeholder="Critical Luminosity"
                      value={criticalLuminosity}
                      onChange={(e) => {
                        setCriticalLuminosity(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-0">
                      The Critical Luminous Intensity of the Streetlight.
                    </span>
                    <Input
                      type="number"
                      placeholder="Life expectancy in hours"
                      value={expectedLife}
                      onChange={(e) => {
                        setExpectedLife(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-0">
                      The expected operating lifespan of the Streetlight.
                    </span>
                    <Textarea
                      placeholder="Description (Optional)"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="w-full mb-0 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-0">
                      Description (if Any)
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
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
                        onClick={redirectHandler}
                        type="button"
                      >
                        {isLoading ? (
                          <PulseLoader size={7} color="#ffffff" />
                        ) : (
                          <>
                            <Close className="h-5 w-5 mr-1" />
                            Go Back
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Toaster />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { streetLightId } = context.params;
  // https://light-watch-git-master-pratyushsharma258s-projects.vercel.app/

  const resLight = await axios.get(
    "https://light-watch-git-master-pratyushsharma258s-projects.vercel.app/api/streetlight",
    {
      params: { id: streetLightId },
    }
  );

  // const resLight = await axios.get("http://localhost:3000/api/streetlight", {
  //   params: { id: streetLightId },
  // });

  const { foundLight } = resLight.data;

  return {
    props: { content: "true", foundLight },
  };
}

export default Index;
