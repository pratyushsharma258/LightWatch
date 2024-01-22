import Map from "@/components/Map";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-thistle-blue">
      <Navbar />
      {/* <Map position={[51.505, -0.09]} zoom={5} /> */}
    </div>
  );
}
