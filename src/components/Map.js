import {GoogleMap, useLoadScript, InfoWindowF, Marker, MarkerClusterer,} from '@react-google-maps/api';
import React, { Component } from 'react';
import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const GOOGLE_MAPS_API_KEY="AIzaSyBZ8seLhFZ3P-J6hTW3lFyGGHKv-UpKD60"
const GOOGLE_PLACES_API_KEY="AIzaSyD06HZ7zETSRxkfOLHxnapESbQqi9kKp78"

const mapContainerStyle = {  // Kartan leveys ja korkeus
  width: '100vw',
  height: '80vh',
};
const center = {
  lat: 60.169857,
  lng: 24.93837
}

const options = {
  zoomControl: true,
};

const libraries = ["places"];

export default function Map() {
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: GOOGLE_PLACES_API_KEY,
    libraries: ["places"]
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
    mapRef.current = map; // tallennetaan kartta useRefiin
  }, []);

<<<<<<< Updated upstream
  const panTo = React.useCallback(({lat, lng}) => {
  mapRef.current.panTo({lat, lng});
  mapRef.current.setZoom(14);
=======
  const panTo = React.useCallback(({lat, lng}) => {  // Ottaa valitun pisteen kordinaatit ja zoomaa siihen
  mapRef.current.panTo({lat, lng}); // koordinaatit
  mapRef.current.setZoom(16); // zoom 
>>>>>>> Stashed changes
   }, []);

  if (loadError) return "Virhe ladatessa karttaa";
  if (!isLoaded) return "Ladataan karttaa...";

return <div>    

    <Search panTo={panTo} />
    <Locate panTo={panTo} />

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
<<<<<<< Updated upstream
       key={marker.time.toISOString()}
=======
       key={marker.time.toISOString()}  
>>>>>>> Stashed changes
       position= { { lat: marker.lat, lng: marker.lng }}
       onClick={() =>{
        setSelected(marker);
       }}
       />))}
       {selected ? (
       <InfoWindowF position={{ lat: selected.lat, lng: selected.lng }} onCloseClick = {() => {
        setSelected(null);
       }}>
        <div>
          <h2>Rekisterikilpi bongattu!</h2>
          <p>Bongattu: {formatRelative(selected.time, new Date())}</p>
        </div>
       </InfoWindowF>): null}
    </GoogleMap>
  </div>;
}

function Locate({ panTo } ) {
  return (
  <button className="locate" onClick={() => {
  navigator.geolocation.getCurrentPosition((position) => {
    panTo({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  },
  () => null
  );
}}>

  <img src="compass.svg" alt="compass - locate me" />
  </button>
)}


function Search( { panTo }) {
  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, clearSuggestions,}
     = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 60.169857, lng: () => 24.9383 },
      radius: 100 * 10,
    },
  });

  return (
  <div className="search">
    <Combobox 
     onSelect={async (address) => 
    {
      setValue(address, false); 
      clearSuggestions()

      try {
        const results =  await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
        } 
        catch(error) {
        console.log("error")
      }
    }}
    >
      <ComboboxInput
       value={value}
        onChange={(e) => {
      setValue(e.target.value);
    }}
        disabled={!ready}
        placeholder="Syötä osoite"
      />
  <ComboboxPopover>
    <ComboboxList>
    {status === "OK" && 
    
    data.map(( {id, description }) => (    <ComboboxOption key={id} value={description} />
    ))}
    </ComboboxList>
  </ComboboxPopover>
  </Combobox>
  </div>
  )
}