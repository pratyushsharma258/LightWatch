import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { useState } from "react";

export default function Map(props) {

    const { position, center, zoom, handler } = props
    const [newMarkingPosition, setNewMarkingPosition] = useState(position);

    const handleMarkerDrag = function (ev) {
        handler(ev.target.getLatLng());
        setNewMarkingPosition(ev.target.getLatLng());
    }
    return (
        <div className="flex">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className={props.className}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    newMarkingPosition &&
                    <Marker
                        position={newMarkingPosition}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleMarkerDrag,
                        }}
                    >
                        <Popup maxWidth={200}>
                            <>
                                {`Latitude : ${newMarkingPosition.lat || 0}`}<br />
                                {`Longitude : ${newMarkingPosition.lng || 0}`}
                            </>
                        </Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    );
}