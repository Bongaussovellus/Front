import {GoogleMap, useLoadScript, Marker, InfoWindowF,} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import '../Styles/mapStyles.css';
import { getDatabase, push, ref, set, get, query, limitToLast } from 'firebase/database';
import { UserAuth } from '../Context/AuthContext';
import Locate from '../Components/Locate.js';
import Search from '../Components/Search.js';
import {FcInfo} from 'react-icons/fc';
import swal from 'sweetalert';


// API-avaimet väliaikaisesti tässä
const GOOGLE_MAPS_API_KEY="AIzaSyBZ8seLhFZ3P-J6hTW3lFyGGHKv-UpKD60"
const GOOGLE_PLACES_API_KEY="AIzaSyD06HZ7zETSRxkfOLHxnapESbQqi9kKp78"

// Nykyisen päivän haku
const curr = new Date();
const date = curr.toISOString().substring(0,10)


const mapContainerStyle = {
  minWidth: '97%',
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


const db = getDatabase();

export default function Map() {

  const [address, setAddress] = useState('');
  const { user } = UserAuth();

  // luodaan rekisterinumero, päivämäärä ja sijainti-oliot
  const [registry, setValue] = useState({
    numberplate: '',
    date: date,
    location: ''
  })
  
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  })
  const [registries, setValues] = useState([])

  const inputChanged = (e) => {
    setValue({...registry, [e.target.name]: e.target.value})
  }

  const [item, setItem] = useState([]);
  const [nextRegNum, setNextRegNum] = useState(null);

  // Haetaan viimeisin bongaus databasesta
  const latestRef = query(ref(db, 'users/' + user.uid), limitToLast(1));
  get(latestRef).then((snapshot) => {
    const data = snapshot.val();
    const mappedItems = data ? Object.keys(data).map(key => ({key, ...data[key]})) : 
    [];
    setItem(mappedItems);
    updateNext(); 
  })
  //Seuraavan bongauksen päivitys
  function updateNext() {
    let text = item[0].registernumber;
    const textArray = text.split('-');
    const regnum = parseInt(textArray[1]);
    setNextRegNum(regnum + 1);
  }
  const num = registry.numberplate;

  const addRegistry = (e) => {
    e.preventDefault()
  // tarkistetaan onko syötetty reknumero liian iso tai pieni kuin
  // odotettu seuraava reknumero
    if (num.replace(/\D/g,'') > nextRegNum) {
      swal({text: "Rekisterinumero jota yrität tallentaa on liian suuri", icon: "error"})

    } else if (num.replace(/\D/g,'') < nextRegNum) {
      swal({text: "Rekisterinumero jota yrität tallentaa on liian pieni", icon: "error"})

  // asetetaan arvot olioihin kuin syötetty reknumero vastaa odotettua seuraavaa reknumeroa
    } else if ( registry.date > date) {
      swal({text: "Rekisterinumeron bongausta ei voi tallentaa tulevaisuuteen", icon: "error"})
    } else { 
      setValues([...registries,registry])
      getAddress();
      writeUserData();
      setSelected(null);
    }
    }

  // varmistetaan, että osoite arvot eivät ole nollat
  useEffect(() => {
    if (location.lat !== 0 & location.lng !== 0) {
      getAddress();
    } else {
      console.log("Ei osoitetta!")
    }
  });

  // Haetaan kartalta klikatun markerin osoite
  const getAddress = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`)
      .then((response) => response.json())
      setAddress(response.results[0].formatted_address);
      
   }


  // Lisätään uusi bongaus databaseen kirjautuneen käyttäjän ja uniikin ID:n alle
  function writeUserData() {
    const database = getDatabase();
    const spotListRef = ref(database, 'users/' + user.uid);
    const newSpotRef = push(spotListRef);
    set(newSpotRef, {
      registernumber: registry.numberplate,
      location: address,
      date: registry.date
    });
  };

  // ladataan kartat ja places api:sta
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: GOOGLE_PLACES_API_KEY,
    libraries: libraries
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
  mapRef.current.setZoom(16); // zoomaa kyseiseen sijaintiin
   }, []);

  if (loadError) return "Virhe ladatessa karttaa";
  if (!isLoaded) return "Ladataan karttaa...";




return <div class='Map'>  
    <Search panTo={panTo} />  
    <GoogleMap 
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
    options={options}
    onClick={onMapClick}
    onLoad={onMapLoad }
    >
    <Locate panTo={panTo} />
    <div className='nextReg'> 
        <FcInfo type="button" onClick={() => swal( "Seuraava bongattava numero on:  " + JSON.stringify(nextRegNum))} size={33} />
    </div>
      
      {markers.map(marker => (
      <Marker
       key={marker.key}
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
          <p style={{color:"black"}} >Bongattu: {formatRelative(selected.time, new Date())}</p>
          <form onSubmit={addRegistry}>
            <input type="text" name='numberplate' className='numberplate' value={registry.numberplate} onChange={inputChanged} placeholder="Syötä rekisterinumero"  />
            <input type="date" name='date' defaultValue={date} onChange={inputChanged} /> 
            <input type="submit" value="Tallenna" className='Tallenna'/>
          </form>
        </div>
       </InfoWindowF>): null}
    </GoogleMap>
  </div>;
}

