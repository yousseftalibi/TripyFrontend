import { AgGridReact } from 'ag-grid-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Async } from 'react-async';
import MapComponent from '../Map/GoogleMapsApi';
import Cookies from 'js-cookie';

const AddPlace = () => {
  const [filterOptions, setFilterOptions] = useState([]);
  const wsPlaces = useRef(null);
  let gridApi = useRef(null);
  const [streaming, setStreaming] = useState(true);
  const [places, setPlaces] = useState([]);
  const [getPlaces, setGetPlaces] = useState(false);
  const [destination, setDestination] = useState('');
  const [clicked, setClicked] = useState(false);
  const [resultPlaces, setResultPlaces] = useState([]);
  const [minutes, setMinutes] = useState();
  const [budgetMax, setBudgetMax] = useState();


  const testRapidApiKey = async (apiKey) => {
    const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/W208169532`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    if(response.status === 200){
      return true;
    }
    else{
      return false;
    }
  }
  
  const getValidRapidApiKey = async () => {
      if(testRapidApiKey("6a4f81847bmsh8785c9220ccebdfp1b97bfjsn74f82815c241")){
        return "6a4f81847bmsh8785c9220ccebdfp1b97bfjsn74f82815c241";
    }
    else if(testRapidApiKey("01f3cd1780mshb2b87fa150c52f3p195ac3jsn0517fb556b09")){
        return "01f3cd1780mshb2b87fa150c52f3p195ac3jsn0517fb556b09";
    }
    else{
        return "c4d4c4a3afmsh8073c2210da8497p1bf278jsne8174b51a3ec";
    }
  }

  const fetchPlaceDetails = async (placeId) => {
    let apiKey = await getValidRapidApiKey();
    const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${placeId}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    return result.point;
  };


  const handleGetPlaces = () => {
    if (destination !== '') {
      setGetPlaces(true);
      searchPlaces();
    } else {
      alert("destination is needed");
    }
  };
  const searchPlaces = () => {
    wsPlaces.current = new WebSocket("ws://localhost:8083/places");
    wsPlaces.current.onopen = () => {
      wsPlaces.current.send(destination);
    };
    wsPlaces.current.onmessage = async (event) => {
      let place = JSON.parse(event.data);
      const point = await fetchPlaceDetails(place.xid);
      place = { ...place, ...point };
      console.log("received message");
      console.table(place);
      const kinds = place.kinds.split(',');
      kinds.forEach((kind) => {
        if (!filterOptions.includes(kind)) {
          setFilterOptions(prevOptions => [...prevOptions, kind]);
        }
      });
      setPlaces(prevPlaces => [...prevPlaces, place]);
    };
    return () => {
      if (wsPlaces.current) {
        wsPlaces.current.close();
      }
    };
  }

  useEffect(() => {
    gridApi.current?.getRenderedNodes().forEach((node) => { node.setSelected(true); });
}, [places]);


  const columnDefs = [
    { headerName: 'Name', field: 'name', resizable: true, checkboxSelection: true },
    { headerName: 'Rate (0-7)', field: 'rate', resizable: true, sortable: true },
    { headerName: 'Category (Filter)', field: 'kinds', resizable: true, filter: 'agSetColumnFilter', filterParams: { values: filterOptions } },
    { headerName: 'Distance from you (meters)', field: 'dist', resizable: true },
  ];
  const onGridReady = useCallback((params) => {
    gridApi.current = params.api;
    gridApi.current?.sizeColumnsToFit();
    
  }, [])

  const toggleStreaming = () => {
    wsPlaces.current.send("stop");
    setStreaming(false);
  };

  const onCheckboxChanged = (event) => {
    const rowData = event.node.data;
    if (!event.node.selected) {
      setPlaces(prevPlaces => prevPlaces.filter(place => place.xid !== rowData.xid));
    }
  };


  const findTripPath = async () => {
    const response = await fetch(`http://localhost:8083/api/findPath?minutes=${minutes}&&budgetMax=${budgetMax}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(places) 
    });
  
    if (response.ok) {
      const placesResult = await response.json();
      setResultPlaces(placesResult);
      setClicked(true);

    } 
  };
  
  const addTrip = async () => {

    findTripPath();
    const userId = Cookies.get('userId');
    for (let place of places) {
      await fetch(`http://localhost:8083/api/visitPlace?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
      });
    }
    setClicked(true);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };
  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleBudgetMaxChange = (event) => {
    setBudgetMax(event.target.value);
  };
  return(
    <Async>

      <>

        <style>{`
          .ag-header-cell-menu-button {
            opacity: 1 !important;
          }
        `}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>Destination</label>
        <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Where to?"
          />
          <br/>
          <label>Duration in minutes</label>
         <input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            placeholder="For how many minutes?"
          />

          <label>Maximum in budget</label>
         <input
            type="text"
            value={budgetMax}
            onChange={handleBudgetMaxChange}
            placeholder="What's your budget?"
          />

        { getPlaces ?   (
          <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              { places.length > 0 && !clicked && <MapComponent places={places} />}
              <button type='button' style={{visibility: !streaming && places.length > 0 && !clicked? 'visible' : 'hidden'}} onClick={addTrip}>Find Trip Path and Add Trip</button>
            </div>
            { !clicked && (
            
                  <div className='ag-theme-alpine pl-5' style={{ width: '1020px', height:'400px' }}>
                    <AgGridReact
                      rowData={places}
                      columnDefs={columnDefs}
                      onGridReady={onGridReady}
                      onRowSelected={onCheckboxChanged}
                      rowSelection="multiple"
                    />
                    <h6 style={{ transform: 'translateY(-450px)' }}>Filter Category column to specify the type, historic period or activity</h6>
                  {streaming  && (
                      <button type='button' onClick={toggleStreaming}>Stop Searching</button>
                    )}
                  </div>
                  )}
          { clicked && (
            
            <div>
              <>
              { resultPlaces.length == 0 ? (<p>No path was found. Change parameters </p> )  : (
                <div>
                  <br/> <br/>
              <p>Trip Path to visit: </p> <br/>
              {resultPlaces.map((place, index) => (
              <p key={index}>{place.name}</p>
               ))} </div>)}
            </>
          </div>)
          
          }
          </div>) : (<button type='button' onClick={handleGetPlaces} disabled={!destination}>Get Places </button>)}
        </div>
        </>
    </Async>
  )
}

export default AddPlace;