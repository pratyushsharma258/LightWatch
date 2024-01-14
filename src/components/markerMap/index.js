import dynamic from "next/dynamic";

const MarkerMap = dynamic(() => import('./MarkerMap'), {
    ssr: false
});

export default MarkerMap