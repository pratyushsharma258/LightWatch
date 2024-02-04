import Navbar from "@/components/Navbar";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import Map from "@/components/Map";

function index() {
  const router = useRouter();
  const { lat, long, userId } = router.query;

  const [ratedWattage, setRatedWattage] = useState();
  const [luminosity, setLuminosity] = useState();
  const [criticalLuminosity, setCriticalLuminosity] = useState();
  const [expectedLife, setExpectedLife] = useState();
  const [description, setDescription] = useState("");
  const [isClient, setIsClient] = useState(false);

  const submitHandler = async function (ev) {
    ev.preventDefault();
    const data = {
      lat,
      long,
      ratedWattage,
      luminosity,
      criticalLuminosity,
      expectedLife,
      description,
    };

    const response = await axios.post("/api/streetlight", data);

    if (response.data._id) {
      toast("Streetlight registered", {
        description: "Registered succesfully in database.",
        action: {
          label: "Undo",
          onClick: () => console.log("Success"),
        },
      });
      redirectHandler();
    }
  };

  const redirectHandler = function (ev) {
    router.push(`/admin/${userId}`);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-row items-center justify-center">
      {isClient ? (
        <>
          <Navbar userRole={"admin"} />
          <div className="flex flex-col flex-grow">
            <Map
              position={[lat, long]}
              zoom={12}
              center={[lat, long - 0.002]}
              className="max-w-screen max-h-screen absolute left-0 right-0 bottom-0 top-[56px] z-10"
            />
            <div className="flex shadow-2xl w-[24rem] h-[calc(100vh_-_56px)] shadow-lightblue bg-white z-20 absolute top-[56px] dark:bg-deepgreen">
              <Card className="w-[24rem] h-[calc(100vh_-_56px)] flex flex-grow flex-col rounded-none border-white bg-white text-lightblue dark:bg-deepgreen">
                <CardHeader>
                  <CardTitle className="mb-1 text-lightblue text-xl dark:text-green-500">
                    Spread more light
                  </CardTitle>
                  <CardDescription className="text-xs dark:text-green-600">
                    Please enter details of the installed Street Light
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-0"
                  >
                    <Input
                      type="number"
                      placeholder="Latitude"
                      value={lat}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-2">Latitude</span>
                    <Input
                      type="number"
                      placeholder="Longitude"
                      value={long}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                      disabled={true}
                    />
                    <span className="text-xs text-licorice mb-2">
                      Longitude
                    </span>
                    <Input
                      type="number"
                      placeholder="Rated Wattage"
                      value={ratedWattage}
                      onChange={(e) => {
                        setRatedWattage(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-2">
                      The Rated Wattage of the Streetlight (in Watts).
                    </span>
                    <Input
                      type="number"
                      placeholder="Luminosity"
                      value={luminosity}
                      onChange={(e) => {
                        setLuminosity(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-2">
                      The expected operating Luminos Intensity (in Candella).
                    </span>
                    <Input
                      type="number"
                      placeholder="Critical Luminosity"
                      value={criticalLuminosity}
                      onChange={(e) => {
                        setCriticalLuminosity(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-2">
                      The critical Luminos Intensity (in Candella).
                    </span>
                    <Input
                      type="number"
                      placeholder="Life expectancy in hours"
                      value={expectedLife}
                      onChange={(e) => {
                        setExpectedLife(e.target.value);
                      }}
                      required={true}
                      className="w-full mb-2 h-10 text-sm placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700"
                    />
                    <span className="text-xs text-licorice mb-2">
                      The expected operating lifespan of the Streetlight.
                    </span>
                    <Textarea
                      placeholder="Description (Optional)"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="w-full mb-2 min-h-10 max-h-14 h-10 text-xs placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700 "
                    />
                    <span className="text-xs text-licorice mb-2">
                      Description (if Any)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                        onClick={redirectHandler}
                      >
                        Go Back
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

export default index;
