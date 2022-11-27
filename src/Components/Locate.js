import {BiCurrentLocation} from 'react-icons/bi';

export default function Locate({ panTo } ) { // Paikannusnappi joka pyytää käyttäjän lupaa kordinaatteihin ja kohdistaa niihin.
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
    <BiCurrentLocation class="icon" size={35 }/>
    </button>
  )}