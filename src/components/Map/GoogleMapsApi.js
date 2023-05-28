import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const containerStyle = {
    width: '40vw',
    height: '48vh',
   

};

const MapComponent = (props) => {
      
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YourApiKeyHere"
    })
 
    const places = props.places;
    

    return isLoaded ? (
        <>
      <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={16}
            center={{ lat: places[places.length - 1].lat, lng: places[places.length - 1].lon }}
            >
        {places && places.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.lat, lng: place.lon }}
          />
            ))}
      </GoogleMap>
          
  </>
) : (
  <></>
);
}

export default MapComponent;  