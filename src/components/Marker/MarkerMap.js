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
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const customWorkingIcon = new L.Icon({
  iconUrl: "/workingLamp.png",
  iconSize: [36, 36],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customStaticIcon = new L.Icon({
  iconUrl: "/staticLamp.png",
  iconSize: [36, 36],
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

export default function Markermap(props) {
  const { zoom, markers, markingPosition, handler } = props;
  const [popupMaxWidth, setPopupMaxWidth] = useState(380);
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--background-color",
      theme === "dark" ? "#011400" : "#ffffff"
    );
  }, [theme]);

  const [newMarkingPosition, setNewMarkingPosition] = useState(markingPosition);
  const handleMarkerDrag = function (ev) {
    handler(ev.target.getLatLng());
    setNewMarkingPosition(ev.target.getLatLng());
  };

  const contentRef = useRef();

  const handlePopupOpen = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth;

      setPopupMaxWidth(contentWidth);
    }
  };

  const router = useRouter();

  return (
    <div className="flex">
      <MapContainer
        center={markers?.responseObject[0]?.coordinates || [0, 0]}
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
                  <div className="flex items-center justify-center text-sm">
                    <div className="flex items-center justify-center">
                      <Button variant="link" className="p-0">
                        <strong>Installed On : </strong>{" "}
                        {new Date(parseInt(pos.createdAt)).toLocaleDateString(
                          "en-GB"
                        )}
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
                      <strong>Luminosity:</strong> {pos.luminosity}
                    </p>
                    <p className="text-xs">
                      <strong>Critical Luminosity:</strong>{" "}
                      {pos.criticalLuminosity}
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
        {newMarkingPosition && (
          <Marker
            position={newMarkingPosition}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
            icon={theme === "light" ? customHangerIcon : customDarkHangerIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}
