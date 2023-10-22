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

export default class MyMap extends React.Component{
    render(){
        const {lat, lon} = this.props;

        return <MapContainer
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
          <LayersControl.Overlay checked name="GeoPortal">
            {/* <WMSTileLayer
                                                    // crs='Earth'
                                                    // crs={}
                                                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        params={{
                                                            srs: 'Earth',
                                                            service: "WMS",
                                                            version:
                                                                "1.1.1",
                                                            request:
                                                                "GetMap",
                                                            format: "image/png",
                                                            transparent: false,
                                                            CACHEID: 7441758,
                                                            layers: "stadtplan",
                                                            SINGLETILE: false,
                                                            // width: "512",
                                                            // HEIGHT: 512,
                                                            // srs: "Earth",
                                                        }}
                                                        // url="https://geodienste.hamburg.de/HH_WMS_Cache_Stadtplan?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&CACHEID=7441758&LAYERS=stadtplan&SINGLETILE=false&WIDTH=512&HEIGHT=512&SRS=EPSG:25832&STYLES=&BBOX=564719.9341632356,5933629.266033529,567429.2660335298,5936338.5979038235"
                                                        url="https://geodienste.hamburg.de/HH_WMS_Cache_Geoportal/Hamburg_Plan"
                                                    /> */}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Marker">
            <Marker position={[lat, lon]}></Marker>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    }
}