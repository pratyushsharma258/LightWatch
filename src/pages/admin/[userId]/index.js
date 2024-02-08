import Map from "@/components/Map";
import axios from "axios";
import MarkerMap from "@/components/Marker";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

function Userpage({ existingGrievanceInfo }) {
  let existingLightInfo;

  const [userIsMarking, setUserIsMarking] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(
    [
      existingLightInfo?.responseObject[0]?.coordinates[0] + 0.0002,
      existingLightInfo?.responseObject[1]?.coordinates[1] + 0.0002,
    ] || [0, 0]
  );

  const [isCLient, setIsCLient] = useState(false);

  useEffect(async () => {
    const resLight = await axios.get(
      "https://light-watch-git-master-pratyushsharma258s-projects.vercel.app/api/streetlight",
      {
        params: {},
      }
    );
    existingLightInfo = resLight?.data;
    setIsCLient(true);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar
        info={existingLightInfo}
        grievanceInfo={existingGrievanceInfo}
        markingHandler={setUserIsMarking}
        markerPosition={markerPosition}
      />
      {isCLient ? (
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
        <></>
      )}
      <Toaster />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const resLight = await axios.get(
      "https://light-watch-git-master-pratyushsharma258s-projects.vercel.app/api/streetlight",
      {
        params: {},
      }
    );

    console.log(resLight.data);

    const resGrievance = await axios.get(
      "https://light-watch-git-master-pratyushsharma258s-projects.vercel.app/api/grievance",
      {
        params: {},
      }
    );
    console.log(resGrievance.data);

    var existingLightInfo = resLight?.data;
    var existingGrievanceInfo = resGrievance?.data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      content: true,
      existingLightInfo,
      existingGrievanceInfo,
    },
  };
}

export default Userpage;
