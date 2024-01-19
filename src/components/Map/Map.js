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
import { useRef, useState } from "react";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Map(props) {
  const { center, position, zoom, markers } = props;
  const [popupMaxWidth, setPopupMaxWidth] = useState(380);

  const contentRef = useRef();

  const handlePopupOpen = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth;

      setPopupMaxWidth(contentWidth);
    }
  };

  const deleteHandler = async (_id) => {
    const response = await axios.delete("/api/streetlight", {
      params: { _id },
    });
    if (response.data.deleteStatus) {
      router.replace(`/admin/${userId}`);
    }
  };
  const router = useRouter();

  const { userId } = router.query;

  return (
    <div className="flex">
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={true}
        className={props.className}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers?.responseObject.map((pos, index) => (
          <Marker key={index} position={pos.coordinates}>
            <Popup
              onOpen={handlePopupOpen}
              maxWidth={popupMaxWidth}
              minWidth={100}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center justify-center text-sm">
                    <div className="flex items-center justify-center">
                      <Button variant="link" className="p-0">
                        <strong>Installed On : </strong>{" "}
                        {new Date(parseInt(pos.createdAt)).toLocaleDateString(
                          "en-GB"
                        )}
                      </Button>
                      <Button
                        className="text-xs text-orange-peel p-0 ml-2 mr-1 h-full bg-inherit"
                        variant="link"
                        onClick={() =>
                          router.push(`/admin/${userId}/edit/${pos._id}`)
                        }
                      >
                        <EditIcon size={18} />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="text-xs text-red-500 bg-inherit p-1 h-full"
                            variant="link"
                          >
                            <TrashIcon size={18} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Are you Sure ?</DialogTitle>
                            <DialogDescription>
                              Delete the current entry
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
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
                              className="bg-deepblue text-orange-peel"
                              onClick={() => deleteHandler(pos._id)}
                            >
                              Proceed
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent ref={contentRef} className="w-80">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold">
                        Streetlight Information
                      </h4>
                    </div>
                    <p className="text-xs">
                      <strong>Rated Wattage:</strong> {pos.ratedWattage}
                    </p>
                    <p className="text-xs">
                      <strong>Critical Wattage:</strong> {pos.criticalWattage}
                    </p>
                    <p className="text-xs">
                      <strong>Expected Life:</strong> {pos.expectedLife} hours
                    </p>
                    {pos.description && (
                      <p className="text-xs">
                        <strong>Description:</strong> {pos.description}
                      </p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </Popup>
          </Marker>
        ))}
        {position && (
          <Marker position={position}>
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
    </div>
  );
}
