import Map from "@/components/Map";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

function Userpage({ existingLightInfo }) {
  const buttonStyles =
    "m-1 text-lg bg-orange-peel text-deepblue shadow-orange-peel hover:text-orange-peel hover:shadow-deepblue shadow-md h-16 rounded-2xl gap-2";

  const router = useRouter();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Sidebar info={existingLightInfo} />
      <Map
        zoom={18}
        className="min-w-[67vw] max-h-screen absolute right-0 z-10 top-0 left-auto bottom-0"
        markers={existingLightInfo}
        role={"user"}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const userId = context.params;
  const resLight = await axios.get("http://localhost:3000/api/streetlight", {
    params: {},
  });

  const existingLightInfo = resLight.data;
  return {
    props: { content: "true", userId, existingLightInfo },
  };
}

export default Userpage;
