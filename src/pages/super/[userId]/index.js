import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import MarkerMap from "@/components/Markermap";
import { useState } from "react";
import Check from "@/components/icons/Check";
import Close from "@/components/icons/Close";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

function userpage({ username, userId, existingLightInfo }) {
  const buttonStyles =
    "m-1 text-lg bg-orange-peel text-deepblue shadow-orange-peel hover:text-orange-peel hover:shadow-deepblue shadow-md h-16 rounded-2xl gap-2";

  const [userIsMarking, setUserIsMarking] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([0, 0]);

  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie;

    const parsedCookies = cookies.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    jwt.verify(
      parsedCookies.token,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {},
      (err, data) => {
        if (err) console.log("Not found");
        console.log(data);
      }
    );
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar username={username} role={"admin"} info={existingLightInfo} />
      {userIsMarking ? (
        <>
          <MarkerMap
            position={[0, 0]}
            zoom={3}
            className="max-w-screen max-h-screen absolute left-0 right-0 bottom-0 top-10 z-10"
            center={[0, 0]}
            handler={setMarkerPosition}
          />
          <div
            className="z-20 absolute w-full bg-thistle-blue p-6 rounded-lg h-[8rem] bottom-0 grid grid-cols-2"
            style={{ boxShadow: "0px -4px 100px 8px black" }}
          >
            <Button
              className={buttonStyles}
              onClick={() =>
                router.push(
                  `/admin/${userId}/new?lat=${
                    markerPosition.lat || markerPosition[0]
                  }&long=${markerPosition.lng || markerPosition[1]}`
                )
              }
            >
              Proceed with current marker location
              <Check className={"w-8 h-full ml-2"} />
            </Button>
            <Button
              className={buttonStyles}
              onClick={() => setUserIsMarking(false)}
            >
              Go Back to User Options
              <Close className={"w-8 h-full ml-2"} />
            </Button>
          </div>
        </>
      ) : (
        <>
          <Map
            zoom={18}
            className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0"
            markers={existingLightInfo}
          />
          {/* <div
            className="z-20 absolute w-full bg-thistle-blue p-6 rounded-lg h-[13rem] bottom-0 grid grid-cols-2"
            style={{ boxShadow: "0px -4px 100px 8px black" }}
          >
            <Button
              className={buttonStyles}
              onClick={() => setUserIsMarking(true)}
            >
              <Createicon />
              Add street light
            </Button>
            <Button className={buttonStyles}>
              <Usericon />
              Grievance management
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // return {
  //     props: { title: "role", content: "true" }
  // }

  const { userId } = context.params;
  // console.log(userId);

  const actualId = userId;

  // return {
  //     props: { title: "role", content: "true" }
  // }

  const res = await axios.get("http://localhost:3000/api/fetchrole", {
    params: {
      userId: actualId,
      userRole: "admin",
    },
  });
  // console.log(res);
  const { username } = res.data;

  if (res.data.found === "true") {
    const resLight = await axios.get("http://localhost:3000/api/streetlight", {
      params: {},
    });

    const existingLightInfo = resLight.data;
    return {
      props: { content: "true", username, userId, existingLightInfo },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default userpage;
