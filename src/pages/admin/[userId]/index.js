import Map from "@/components/Map";
import axios from "axios";
import MarkerMap from "@/components/Markermap";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

function userpage({ existingLightInfo, existingGrievanceInfo }) {
  const [userIsMarking, setUserIsMarking] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(
    [
      existingLightInfo?.responseObject[0]?.coordinates[0] + 0.0002,
      existingLightInfo?.responseObject[1]?.coordinates[1] + 0.0002,
    ] || [0, 0]
  );

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar
        info={existingLightInfo}
        grievanceInfo={existingGrievanceInfo}
        markingHandler={setUserIsMarking}
        markerPosition={markerPosition}
      />
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const resLight = await axios.get("http://localhost:3000/api/streetlight", {
    params: {},
  });

  const resGrievance = await await axios.get(
    "http://localhost:3000/api/grievance",
    {
      params: {},
    }
  );

  const existingLightInfo = resLight.data;
  const existingGrievanceInfo = resGrievance.data;
  return {
    props: {
      content: "true",
      userId,
      existingLightInfo,
      existingGrievanceInfo,
    },
  };
}

export default userpage;
