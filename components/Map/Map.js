import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function Map(props) {
    const { position, zoom } = props

    return <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} className="w-80 h-80">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                A pretty CSS
            </Popup>
        </Marker>
    </MapContainer>
}