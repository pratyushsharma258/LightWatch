import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { useTheme } from "next-themes";
import Check from "@/components/icons/Check";
import Close from "@/components/icons/Close";
import { useToast } from "@/components/ui/use-toast";
import { PulseLoader } from "react-spinners";

const customWorkingIcon = new L.Icon({
  iconUrl: "/workingLamp.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customStaticIcon = new L.Icon({
  iconUrl: "/staticLamp.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customHangerIcon = new L.Icon({
  iconUrl: "/pin.png",
  iconSize: [40, 46],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customDarkHangerIcon = new L.Icon({
  iconUrl: "/pinDark.png",
  iconSize: [40, 46],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function Map(props) {
  const { position, zoom, markers, role, center } = props;
  const [popupMaxWidth, setPopupMaxWidth] = useState(380);
  const [description, setDescription] = useState();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--background-color",
      theme === "dark" ? "#011400" : "#ffffff"
    );
  }, [theme]);

  useEffect(() => {
    if (router.asPath.includes("/edit")) setIsClient(true);
    if (router.asPath.includes("/new")) setIsClient(true);
    if (markers?.responseObject) setIsClient(true);
  }, [markers]);

  const submitHandler = async function (ev, streetLightId) {
    ev.preventDefault();
    setLoading(true);
    const formData = { userId, streetLightId, description };
    const response = await axios.post("/api/grievance", formData);
    if (response.data?.filed) {
      setLoading(false);
      toast({
        title: "Grievance Filed",
        description: "Complaint registered successfully",
      });
      setDescription("");
      router.reload();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something Went Wrong",
      });
    }
  };

  const contentRef = useRef();

  const handlePopupOpen = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth;
      setPopupMaxWidth(contentWidth);
    }
  };

  const deleteHandler = async (_id) => {
    setLoading(true);
    const response = await axios.delete("/api/streetlight", {
      params: { _id },
    });
    if (response.data.deleteStatus) {
      setLoading(false);
      toast({
        title: "Done",
        description: "Streetlight deleted successfully",
      });
      router.replace(`/admin/${userId}`);
    }
  };
  const router = useRouter();

  const { userId } = router.query;

  console.log(position);
  return (
    <div className="flex">
      {isClient ? (
        <>
          <MapContainer
            center={markers?.responseObject[0]?.coordinates || center || [0, 0]}
            zoom={zoom}
            scrollWheelZoom={true}
            className={props.className}
          >
            {theme === "light" ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            ) : (
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
              />
            )}
            {markers?.responseObject.map((pos, index) => (
              <Marker
                key={index}
                position={pos.coordinates}
                icon={
                  pos.luminosity > pos.criticalLuminosity
                    ? customWorkingIcon
                    : customStaticIcon
                }
              >
                <Popup
                  onOpen={handlePopupOpen}
                  maxWidth={popupMaxWidth}
                  minWidth={100}
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex flex-grow items-center justify-center text-sm dark:bg-deepgreen dark:text-green-500">
                        <div className="flex items-center justify-center dark:text-green-500 dark:bg-deepgreen">
                          <Button
                            variant="link"
                            className="p-0 dark:text-green-400"
                          >
                            <strong>Installed On : </strong>{" "}
                            {new Date(
                              parseInt(pos.createdAt)
                            ).toLocaleDateString("en-GB")}
                          </Button>
                          {role !== "user" && (
                            <>
                              <Button
                                className="text-xs text-lightblue dark:text-green-500 p-0 ml-2 mr-1 h-full bg-inherit"
                                variant="link"
                                onClick={() => {
                                  setLoading(true);
                                  router.push(
                                    `/admin/${userId}/edit/${pos._id}`
                                  );
                                }}
                              >
                                {loading ? (
                                  <PulseLoader
                                    size={7}
                                    color={
                                      theme === "dark" ? "#ffffff" : "#000000"
                                    }
                                  />
                                ) : (
                                  <EditIcon size={18} />
                                )}
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="text-xs text-red-700 dark:text-red-500 bg-inherit p-1 h-full"
                                    variant="link"
                                  >
                                    {loading ? <></> : <TrashIcon size={18} />}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Are you Sure ?</DialogTitle>
                                    <DialogDescription>
                                      Delete the current entry
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-2 py-4 text-lightblue-400 dark:text-green-600">
                                    <div className="flex flex-grow items-center">
                                      Database ID : {pos._id}
                                    </div>
                                    <div className="flex flex-grow items-center">
                                      Created At :{" "}
                                      {new Date(
                                        parseInt(pos.createdAt)
                                      ).toLocaleDateString("en-GB")}
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      className="bg-lightblue-650 text-white hover:bg-lightblue-850 dark:bg-green-700 dark:text-green-400 dark:hover:bg-green-600"
                                      onClick={() => deleteHandler(pos._id)}
                                    >
                                      {loading ? (
                                        <>
                                          <PulseLoader
                                            size={7}
                                            color={"#ffffff"}
                                          />
                                        </>
                                      ) : (
                                        <>Proceed</>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent ref={contentRef} className="w-80">
                      <div className="space-y-2 text-lightblue-600 dark:text-green-500">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">
                            Streetlight Related
                          </h4>
                        </div>
                        <p className="text-xs">
                          <strong>Rated Wattage:</strong> {pos.ratedWattage}
                        </p>
                        {role === "admin" ? (
                          <>
                            <p className="text-xs">
                              <strong>Luminosity:</strong> {pos.luminosity}
                            </p>
                            <p className="text-xs">
                              <strong>Critical Luminosity:</strong>{" "}
                              {pos.criticalLuminosity}
                            </p>
                            <p className="text-xs">
                              <strong>Expected Life:</strong> {pos.expectedLife}{" "}
                              hours
                            </p>
                            {pos.description && (
                              <p className="text-xs">
                                <strong>Description:</strong> {pos.description}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <form
                              className="mt-2"
                              onSubmit={(ev) => submitHandler(ev, pos._id)}
                            >
                              <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full placeholder:text-white text-white bg-lightblue border-lightblue dark:bg-inherit dark:text-green-500 dark:placeholder:text-green-700"
                                required={true}
                              />
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                <Button
                                  className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                                  type="submit"
                                >
                                  {loading ? (
                                    <>
                                      <PulseLoader size={4} color="#ffffff" />
                                    </>
                                  ) : (
                                    <>
                                      <Check className="h-5 w-5 mr-1" />
                                      Save
                                    </>
                                  )}
                                </Button>
                                <Button
                                  className="w-full h-8 text-sm bg-lightblue dark:bg-green-700 dark:hover:bg-green-500"
                                  onClick={() => setDescription("")}
                                  type="button"
                                >
                                  <Close className="h-5 w-5 mr-1" />
                                  Clear
                                </Button>
                              </div>
                            </form>
                          </>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </Popup>
              </Marker>
            ))}
            {position && (
              <Marker
                position={position}
                icon={
                  theme === "light" ? customHangerIcon : customDarkHangerIcon
                }
              >
                <Popup maxWidth={200}>
                  <>
                    {`Latitude : ${position[0]}`}
                    <br />
                    {`Longitude : ${position[1]}`}
                  </>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
