import dynamic from "next/dynamic";

const MarkerMap = dynamic(() => import("./Markermap"), {
  ssr: false,
});

export default MarkerMap;
