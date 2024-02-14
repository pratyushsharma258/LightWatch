"use client";
import Map from "@/components/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { PulseLoader } from "react-spinners";

function Userpage() {
  const [existingLightInfo, setExistingLightInfo] = useState();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async function () {
    const resLight = await axios.get("/api/streetlight", {
      params: {},
    });

    setExistingLightInfo(resLight?.data);
  };

  useEffect(() => {
    if (existingLightInfo) {
      setIsClient(true);
    }
  }, [existingLightInfo]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar info={existingLightInfo} isClient={isClient} />
      {isClient ? (
        <>
          <Map
            zoom={18}
            className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0"
            markers={existingLightInfo}
            role={"user"}
          />
        </>
      ) : (
        <>
          <Skeleton className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0 flex items-center justify-center bg-lightblue-450 dark:bg-green-800 rounded-none">
            <PulseLoader size={20} color="#ffffff" />
          </Skeleton>
        </>
      )}
      <Toaster />
    </div>
  );
}

export default Userpage;
