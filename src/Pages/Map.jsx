import {GoogleMap, useLoadScript, Marker, InfoWindowF,} from '@react-google-maps/api';
import React, { useState } from 'react';
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";
import {
          Combobox,
          ComboboxInput,
          ComboboxPopover,
          ComboboxList,
          ComboboxOption,
        } from "@reach/combobox";
import "@reach/combobox/styles.css";
import '../Styles/mapStyles.css';
import { getDatabase, push, ref, set } from 'firebase/database';
import { UserAuth } from '../Context/AuthContext';


// API-avaimet väliaikaisesti tässä
const GOOGLE_MAPS_API_KEY="AIzaSyBZ8seLhFZ3P-J6hTW3lFyGGHKv-UpKD60"
const GOOGLE_PLACES_API_KEY="AIzaSyD06HZ7zETSRxkfOLHxnapESbQqi9kKp78"

// Nykyisen päivän haku
const curr = new Date();
const date = curr.toISOString().substring(0,10)

const mapContainerStyle = {
  minWidth: '95%',
  height: '80vh',
};

// kartan keskitys
const center = {
  lat: 60.169857,
  lng: 24.93837
}

const options = {
  zoomControl: true,
};

const libraries = ["places"];

export default function Map() {

  const { user } = UserAuth();
  // luodaan rekisterinumero, päivämäärä ja sijainti-oliot
  const [registry, setValue] = useState({
    numberplate: '',
    date: new Date()
  })
  
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  })
  const [registries, setValues] = useState([])

  const inputChanged = (e) => {
    setValue({...registry, [e.target.name]: e.target.value})
  }

  // asetetaan arvot olioihin
  const addRegistry = (e) => {
    e.preventDefault()
    setValues([...registries,registry])
    writeUserData();
    console.log(registry, registries)

  }
  // Lisätään uusi bongaus databaseen kirjautuneen käyttäjän ja uniikin ID:n alle
  function writeUserData() {
    const database = getDatabase();
    const spotListRef = ref(database, 'users/' + user.uid);
    const newSpotRef = push(spotListRef);
    set(newSpotRef, {
      registernumber: registry.numberplate,
      location: location,
      date: registry.date
    });
  };

  // ladataan kartat ja places api:sta
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: GOOGLE_PLACES_API_KEY,
    libraries: ["places"]
  });

  /*const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries: ["places"]
  });*/

// luodaan markkerit sekä valinta-oliot
const [markers, setMarkers] = React.useState([]);
const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((event) => { // Asettaa markkerin valittuun pisteeseen hakemalla koordinaatit
    setMarkers(current => [
      ...current, 
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
    setLocation( {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    },)
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({lat, lng}) => {  // Ottaa valitun pisteen kordinaatit ja tarkentaa siihen
  mapRef.current.panTo({lat, lng}); // tarkentaa kartan kyseiseen sijaintiin
  mapRef.current.setZoom(18); // zoomaa kyseiseen sijaintiin
   }, []);

  if (loadError) return "Virhe ladatessa karttaa";
  if (!isLoaded) return "Ladataan karttaa...";

return <div class='Map'>  
    <Search panTo={panTo} />  
    <GoogleMap 
    mapContainerStyle={mapContainerStyle}
    zoom={8}
    center={center}
    options={options}
    onClick={onMapClick}
    onLoad={onMapLoad }
    >
    <Locate panTo={panTo} />
      
      {markers.map(marker => (
      <Marker
       key={marker.time.toISOString()}
       position= { { lat: marker.lat, lng: marker.lng }}
       onClick={() =>{
        setSelected(marker);
       }}
       />))}
        
       {selected ? (
        // Luo infoikkunan valitulle pisteelle, johon voi lisätä rekisterinumeron ja päivämäärän
       <InfoWindowF position={{ lat: selected.lat, lng: selected.lng }} onCloseClick = {() => { 
          setSelected(null)}}>

        <div>
          <h2 style={{color:"black"}}>Rekisterikilpi bongattu!</h2>
          <p>Bongattu: {formatRelative(selected.time, new Date())}</p>
          <form onSubmit={addRegistry}>
            <input type="text" name='numberplate' value={registry.numberplate} onChange={inputChanged} placeholder="Syötä rekisterinumero" />
            <input type="date" name='date' defaultValue={date} onChange={inputChanged} /> 
            <input type="submit" value="Tallenna" />
          </form>
        </div>
       </InfoWindowF>): null}
    </GoogleMap>
  </div>;
}

function Locate({ panTo } ) { // Paikannusnappi joka pyytää käyttäjän lupaa kordinaatteihin ja kohdistaa niihin.
  return (
    <button className="locate" onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
      });
    }, () => null
  );
}}>
  <a>Find me</a>
  </button>
)}


function Search( { panTo }) { //Hakukenttä
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
    }
  );

  console.log(getLatLng)
  return (
    <div className="search">
      <Combobox 
        onSelect={async (address) => {  
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
        }
      }
      >

      <ComboboxInput
        class="ComboboxInput"
        style={{color:"white"}}
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
          data.map(( {id, description }) => 
        (<ComboboxOption key={id} value={description} />))}
       </ComboboxList>
     </ComboboxPopover>
  </Combobox>
  </div>
  )

 
}