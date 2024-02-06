import Map from "@/components/Map";
import axios from "axios";
import MarkerMap from "@/components/Markermap";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { PulseLoader } from "react-spinners";

function userpage({ content, existingLightInfo, existingGrievanceInfo }) {
  const { toast } = useToast();

  const [userIsMarking, setUserIsMarking] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(
    [
      existingLightInfo?.responseObject[0]?.coordinates[0] + 0.0002,
      existingLightInfo?.responseObject[1]?.coordinates[1] + 0.0002,
    ] || [0, 0]
  );
  const [dataContent, setDataContent] = useState(content);
  const [showToast, setShowToast] = useState(false);
  const [isCLient, setIsCLient] = useState(false);

  useEffect(() => {
    if (dataContent === false) {
      setShowToast(true);
    }
  }, [dataContent]);

  useEffect(() => {
    setIsCLient(true);
  }, []);

  useEffect(() => {
    if (showToast) {
      toast({
        variant: "destructive",
        title: "Something unexpected occurred",
        description: "Unable to fetch data from the server",
      });
    }
  }, [showToast]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar
        info={existingLightInfo}
        grievanceInfo={existingGrievanceInfo}
        markingHandler={setUserIsMarking}
        markerPosition={markerPosition}
      />
      {dataContent && isCLient ? (
        <>
          {userIsMarking ? (
            <MarkerMap
              markingPosition={markerPosition}
              zoom={18}
              className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0"
              center={[0, 0]}
              handler={setMarkerPosition}
              markers={existingLightInfo}
            />
          ) : (
            <>
              <Map
                zoom={18}
                className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0"
                markers={existingLightInfo}
                role={"admin"}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Skeleton className="min-w-[67vw] flex items-center justify-center max-h-screen rounded-none absolute right-0 z-10 top-0 left-auto bottom-0 bg-lightblue-400 dark:bg-green-800">
            <PulseLoader color="#000" size={15} />
          </Skeleton>
        </>
      )}

      <Toaster />
    </div>
  );
}

export async function getServerSideProps() {
  let resGrievance = null;
  let resLight = null;
  try {
    resLight = await axios.get("http://localhost:3000/api/streetlight", {
      params: {},
    });

    resGrievance = await axios.get("http://localhost:3000/api/grievance", {
      params: {},
    });
  } catch {
    return {
      props: {
        content: false,
        existingLightInfo: null,
        existingGrievanceInfo: null,
      },
    };
  }

  const existingLightInfo = resLight.data;
  const existingGrievanceInfo = resGrievance.data;
  return {
    props: {
      content: true,
      existingLightInfo,
      existingGrievanceInfo,
    },
  };
}

export default userpage;
