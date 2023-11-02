import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapIcon, MapPinIcon as mappinicon } from "@heroicons/react/24/solid";
import MyMapMulti from "./MyMapMulti";

export default function MyMap({ lat, lon, popup = false, scrollWheelZoom = true}) {
  return (
    <MyMapMulti
      center={[lat, lon]}
      scrollWheelZoom={scrollWheelZoom}
      markers={{
        layers: [
          {
            name: "Projekt",
            checked: true,
            markerColor: "blue",
            markers: [
              {
                lat: lat,
                lon: lon,
              },
            ],
          },
        ],
      }}
    />
  );
}
