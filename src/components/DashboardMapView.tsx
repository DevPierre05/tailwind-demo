
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useCountryCoordinates from "../hooks/useCountryCordinates";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import locationPopup from "../assets/locationPopup.svg";
import Loader from "./loader";

const customIcon = new L.Icon({
  iconUrl: locationPopup,
  iconSize: [45, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Locations = {
  id: number;
  name: string;
};

interface MapViewProps {
  darkMode: boolean;
  locations: Locations[]
}

const DashboardMapView: React.FC<MapViewProps> = ({darkMode, locations}) => {
  const { coordinates, loading, error } = useCountryCoordinates(locations);

  if (loading) return <Loader />;
  if (error) return <p className="mt-5 text-xl text-red-500">{error}</p>;

  const position: LatLngExpression = [0, 0]; // Default position if needed

  return (
    <>
      <MapContainer
        center={position}
        zoom={2}
        style={{height: "50vh", width: "100%", borderRadius: "20px" }}
      >
        <TileLayer
          url={`https://{s}.basemaps.cartocdn.com/${darkMode ? "dark": "light"}_all/{z}/{x}/{y}.png`}
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map(({ id, name, lat, lng }) => (
          <Marker key={id} position={[lat, lng]} icon={customIcon}>
            <Popup className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-lg">
              <div className="font-semibold">{name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Latitude: {lat}, Longitude: {lng}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default DashboardMapView;