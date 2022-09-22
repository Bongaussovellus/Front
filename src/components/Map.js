import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import '../App.css';


class map extends Component{


render(){ 
  
    return (
      <div>
        <h1>Tänne kartta.</h1>
        <Map class='map' google={this.props.google} zoom={10}>
 
      
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    )
  }
}

  
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBZ8seLhFZ3P-J6hTW3lFyGGHKv-UpKD60")
  })(Map);