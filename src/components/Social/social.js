import { AgGridReact } from 'ag-grid-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Async } from 'react-async';
import MapComponent from '../Map/GoogleMapsApi';
const Social = () => {

    const [filterOptions, setFilterOptions] = useState([]);
    const wsPlaces = useRef(null);
    let gridApi = useRef(null);
    const [streaming, setStreaming] = useState(true);
    const [places, setPlaces] = useState([]);

    const fetchPlaceDetails = async (placeId) => {
        const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${placeId}`;
        const options = {
            method: 'GET',
            headers: {
                //'X-RapidAPI-Key': 'c4d4c4a3afmsh8073c2210da8497p1bf278jsne8174b51a3ec',
                  //'X-RapidAPI-Key': '01f3cd1780mshb2b87fa150c52f3p195ac3jsn0517fb556b09',
                  'X-RapidAPI-Key': '6a4f81847bmsh8785c9220ccebdfp1b97bfjsn74f82815c241',
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const result = await response.json();

        return result.point;
    };

    useEffect(() => {
      wsPlaces.current = new WebSocket("ws://localhost:8083/places");
      wsPlaces.current.onopen = () => {
        wsPlaces.current.send("paris");
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
    }, [filterOptions]);

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
   

    return(
      <Async>
        <>
        <style>{`
            .ag-header-cell-menu-button {
                opacity: 1 !important;
            }
        `}</style>
    
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
          <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                { places.length > 0 && <MapComponent places={places} />}
                  <button type='button' style={{visibility: !streaming && places.length > 0 ? 'visible' : 'hidden'}}>Get Itinerary</button>

              </div>
              
              <div className='ag-theme-alpine pl-5' style={{ width: '1020px', height:'400px' }}>
                
                  <AgGridReact
                    rowData={places}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                  />
                  <h6 style={{ transform: 'translateY(-450px)' }}>Filter Category column to specify the type, historic period or activity</h6>

                  {streaming && (
                      <button type='button' onClick={toggleStreaming}>
                          Stop Searching
                      </button>
                  )}
              </div>
          </div>
        </div>
        </>
      </Async>
    )
    
}

export default Social;
