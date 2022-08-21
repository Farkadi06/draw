import React, { useState } from "react";
import L from 'leaflet';
import MyImg from "./Fundation.png";
import { Map, TileLayer, withLeaflet, ImageOverlay } from 'react-leaflet'
import ReactDistortableImageOverlay from 'react-leaflet-distortable-imageoverlay' // <-- react-leaflet-distortable-imageoverlay
import './style.css'
import MeasureControlDefault from 'react-leaflet-measure';




const Draw = () => {
  const position = [51.505, -0.09]
  const MeasureControl = withLeaflet(MeasureControlDefault);
  return (
    <>
      <Map center={position} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ImageOverlay
          bounds={[
            [48.829064066393606, 2.319108697721625],
            [48.82923449341786, 2.319053696084707]
          ]}
          url={MyImg}
          opacity={0.7}
        />

        <MeasureControl />
      </Map>
    </>

  );

};

export default Draw;