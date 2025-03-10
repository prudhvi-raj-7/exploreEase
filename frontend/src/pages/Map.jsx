import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import Header from "../components/Header";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Search Control Component
const SearchControl = () => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar", // Can be 'button' or 'bar'
      autoClose: true,
      retainZoomLevel: false,
    });
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position: London

  return (
    <>
      <Header />
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Explore Locations Around the World
        </h1>
        <div className="w-full max-w-5xl h-4/5 border-2 border-dashed border-yellow-500 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            {/* Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Search Control */}
            <SearchControl />
            {/* Current Location Marker */}
            <Marker position={position}>
              <Popup>You are here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Map;
