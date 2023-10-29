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

export default class MyMap extends React.Component {
  render() {
    const { lat, lon } = this.props;

    return (
      <MapContainer
        center={[lat, lon]}
        zoom={18}
        scrollWheelZoom={true}
        className="h-96 rounded-lg shadow z-0"
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
          <LayersControl.Overlay checked name="Marker">
            <Marker position={[lat, lon]}></Marker>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}
