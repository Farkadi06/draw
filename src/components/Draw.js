import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer, FeatureGroup, ImageOverlay } from "react-leaflet";
import MyImg from "./Fundation.png"
import { EditControl } from "react-leaflet-draw";
import osm from "../utils/osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';


const Draw = () => {
    const [center, setCenter] = useState({ lat:48.829110262, lng:2.318955 });
    const [mapLayers, setMapLayers] = useState([]);

    const ZOOM_LEVEL = 20;
    const mapRef = useRef();


    const _onCreate = (e) => {
        console.log(e);
    
        const { layerType, layer } = e;
        if (layerType === "polygon" || layerType === "polyline") {
          const { _leaflet_id } = layer;
    
          setMapLayers((layers) => [
            ...layers,
            { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
          ]);
        }
    };

    const _onEdited = (e) => {
        console.log(e);
        const {
          layers: { _layers },
        } = e;
    
        Object.values(_layers).map(({ _leaflet_id, editing }) => {
          setMapLayers((layers) =>
            layers.map((l) =>
              l.id === _leaflet_id
                ? { ...l, latlngs: { ...editing.latlngs[0] } }
                : l
            )
          );
        });
    };

    const _onDeleted = (e) => {
        console.log(e);
        const {
          layers: { _layers },
        } = e;
    
        Object.values(_layers).map(({ _leaflet_id }) => {
          setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };



    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div className="col">
                        <LeafletMap center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                        <ReactLeafletGoogleLayer apiKey='AIzaSyBdR6MbBrCx6eK7Y42vX-64BjjaF3_U24g' />
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                }}
                            />
                        </FeatureGroup>

                        
                        <ImageOverlay 
                          bounds={[
                            [48.829064066393606, 2.319108697721625],
                            [48.82923449341786, 2.319053696084707]
                          ]}
                          url={MyImg}
                          opacity={0.7}
                        />
                    
                        </LeafletMap>

                        <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
                        
                    </div>
                </div>
            </div>
        </>
      
    );

};

export default Draw;