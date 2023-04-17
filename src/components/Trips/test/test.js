import {React, useState} from 'react';
import { Async } from 'react-async';

const CleanData = () => {
  
    const getApi =   async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6a4f81847bmsh8785c9220ccebdfp1b97bfjsn74f82815c241',
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        }
        const response = await fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon=2.2945&lat=48.8584', options);
        const data = await response.json();

        console.log(data);
        
        let myobj = data.features.map(feature => feature.properties);

       await fetch('http://localhost:8080/api/cleanData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myobj )
      });

      
    }
    

 

    return(
      <button onClick={getApi}>clean data</button>
    )
}

export default CleanData;