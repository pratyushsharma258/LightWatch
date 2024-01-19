import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "lucide-react";

export default function Map(props) {
  const { center, zoom, markers } = props;
  const [popupMaxWidth, setPopupMaxWidth] = useState(380);

  const contentRef = useRef();

  const handlePopupOpen = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth;

      setPopupMaxWidth(contentWidth);
    }
  };

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
        {markers.responseObject.map((pos, index) => (
          <Marker key={index} position={pos.coordinates}>
            <Popup
              onOpen={handlePopupOpen}
              maxWidth={popupMaxWidth}
              minWidth={100}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center text-xs">
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(parseInt(pos.createdAt)).toLocaleDateString(
                        "en-GB"
                      )}
                      <Button
                        className="text-xs text-orange-peel bg-inherit p-1 ml-2"
                        variant="link"
                        onClick={() => console.log("helolo")}
                      >
                        <EditIcon size={14} />
                      </Button>
                      <Button
                        className="text-xs text-red-500 bg-inherit p-1"
                        variant="link"
                      >
                        <DeleteIcon size={14} />
                      </Button>
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
      </MapContainer>
    </div>
  );
}
