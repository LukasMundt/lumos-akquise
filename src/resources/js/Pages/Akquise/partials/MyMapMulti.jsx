import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  WMSTileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MyMapMulti({
  center,
  markers = {},
  zoom = 18,
  height = "450px",
  scrollWheelZoom = true,
}) {
  const svgIcon = L.divIcon({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fill-blue-600 stroke-blue-600 w-8 h-8 "><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>',
    className: "bg-transparent",
    iconAnchor: [15, 30],
  });
  const svgIconRed = L.divIcon({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fill-red-600 stroke-red-600 w-8 h-8 "><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>',
    className: "bg-transparent",
    iconAnchor: [15, 30],
  });
  const svgIconYellow = L.divIcon({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fill-yellow-400 stroke-yellow-400 w-8 h-8 "><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>',
    className: "bg-transparent",
    iconAnchor: [15, 30],
  });

  return (
    <div id="mapContainer" className="h-full">
      <MapContainer
        // center={[lat, lon]}
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        className={"rounded-lg shadow z-0"}
        style={{ height: height }}
      >
        {/* <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_light_grau/default/EU_EPSG_25832_TOPPLUS/{z}/{x}/{y}.png"
    /> */}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          {/* <LayersControl.Overlay checked name="GeoPortal">
          <WMSTileLayer
            // crs='Earth'
            // crs={}
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            params={{
              srs: "EPSG:25832",
              service: "WMS",
              version: "1.1.1",
              request: "GetMap",
              format: "image/png",
              transparent: true,
              CACHEID: 9994582,
              layers: "stadtplan",
              SINGLETILE: false,
              // width: "512",
              // HEIGHT: 512,
              // srs: "Earth",
            }}
            // https://geodienste.hamburg.de/HH_WMS_Cache_Stadtplan?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&CACHEID=9994582&LAYERS=stadtplan&SINGLETILE=false&WIDTH=512&HEIGHT=512&SRS=EPSG%3A25832&STYLES=  &BBOX=563365.2682280885%2C5942570.061205501%2C563500.7348216032%2C5942705.527799016
            // https://geodienste.hamburg.de/HH_WMS_Cache_Stadtplan?service=WMS&request=GetMap&layers=stadtplan&styles=&format=image%2Fpng&transparent=true&version=1.1.1&srs=Earth%3A25832&CACHEID=9994582&SINGLETILE=false&width=256&height=256 &bbox=1108489.7841916261,7100235.557410023,1108642.6582481964,7100388.4314665925
            
            // url="https://geodienste.hamburg.de/HH_WMS_Cache_Stadtplan?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&CACHEID=7441758&LAYERS=stadtplan&SINGLETILE=false&WIDTH=512&HEIGHT=512&SRS=EPSG:25832&STYLES=&BBOX=564719.9341632356,5933629.266033529,567429.2660335298,5936338.5979038235"
            url="https://geodienste.hamburg.de/HH_WMS_Cache_Stadtplan"
          />
        </LayersControl.Overlay> */}

          {markers.layers.map((layer) => {
            // console.log(layer);
            return (
              <LayersControl.Overlay
                checked={layer.checked === undefined ? true : layer.checked}
                name={layer.name != null ? layer.name : "Layer"}
                key={layer.name != null ? layer.name : "Layer"}
              >
                <LayerGroup>
                  {layer.markers.map((marker) => {
                    // console.log(marker);
                    return (
                      <Marker
                        key={marker.lat + marker.lon}
                        position={[marker.lat, marker.lon]}
                        icon={
                          layer.markerColor === "red"
                            ? svgIconRed
                            : layer.markerColor === "yellow"
                            ? svgIconYellow
                            : svgIcon
                        }
                      >
                        {marker.label != undefined ? (
                          <Popup offset={[0, -15]}>
                            {marker.url != null ? (
                              <a href={marker.url}>
                                {marker.label}
                              </a>
                            ) : (
                              marker.label
                            )}
                          </Popup>
                        ) : (
                          ""
                        )}
                      </Marker>
                    );
                  })}
                </LayerGroup>
              </LayersControl.Overlay>
            );
          })}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
