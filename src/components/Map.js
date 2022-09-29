import {GoogleMap, useLoadScript, InfoWindow, Marker, MarkerClusterer,} from '@react-google-maps/api';
import React, { Component } from 'react';
import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';


const GOOGLE_MAPS_API_KEY="AIzaSyBZ8seLhFZ3P-J6hTW3lFyGGHKv-UpKD60"
const GOOGLE_PLACES_API_KEY="AIzaSyD06HZ7zETSRxkfOLHxnapESbQqi9kKp78"

const mapContainerStyle = {
  width: '100vw',
  height: '80vh',
  
};
const center = {
  lat: 60.169857,
  lng: 24.93837
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};


export default function Map() {
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: GOOGLE_PLACES_API_KEY
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [
      ...current, 
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
    },
  ]);
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Virhe ladatessa karttaa";
  if (!isLoaded) return "Ladataan karttaa...";
  return <div>    
    <GoogleMap 
    mapContainerStyle={mapContainerStyle}
    zoom={8}
    center={center}
    options={options}
    onClick={onMapClick}
    onLoad={onMapLoad }
    >
      {markers.map(marker => (
      <Marker
       key={marker.time.toISOString()}
       position= { { lat: marker.lat, lng: marker.lng }}
       onClick={() =>{
        setSelected(marker);
       }}
       />))}
       {selected ? (
       <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick = {() => {
        setSelected(null);
       }}>
        <div>
          <h2>Rekisterikilpi bongattu!</h2>
          <p>Bongattu: {formatRelative(selected.time, new Date())}</p>
        </div>
       </InfoWindow>): null}
    </GoogleMap>
  </div>;
}