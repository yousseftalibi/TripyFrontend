import { AgGridReact } from 'ag-grid-react';
import {React} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Async } from 'react-async';
import { useCallback, useRef, useEffect, useState } from 'react';

const Social = () => {

    const [rowData, setRowData] = useState([]);
    const wsPlaces = useRef(null);
    let gridApi = useRef(null);
    const [streaming, setStreaming] = useState(true);

    useEffect(() => {
      wsPlaces.current = new WebSocket("ws://localhost:8083/places");
      wsPlaces.current.onopen = () => {
        wsPlaces.current.send("paris");
      };
      wsPlaces.current.onmessage = (event) => {
        const place = JSON.parse(event.data);
        console.log("received message");
        console.table(place);
        setRowData((prevRowData) => [...prevRowData, place]);
      };
      return () => {
        if (wsPlaces.current) {
          wsPlaces.current.close();
        }
      };
    }, []);


    const columnDefs = [
      { headerName: 'Name', field: 'name', resizable: true },
      { headerName: 'Rate', field: 'rate', resizable: true, sortable: true },
      { headerName: 'Category', field: 'kinds', resizable: true },
      { headerName: 'Distance from you', field: 'dist', resizable: true },
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
        <p>We are search for interesting places to visit. You can stop the search when you're satisfied with the result. </p>
              <div style={ {display: 'flex', justifyContent:'center', alignItems:'center'}}>
                  <div className='ag-theme-alpine' style={ {width: '1000px', height:'400px'}}>
                      <AgGridReact
                          rowData={rowData}
                          columnDefs={columnDefs}
                          onGridReady={onGridReady}
                      > </AgGridReact>
                  </div>
              </div>
              { streaming &&
                <button type="button" onClick={toggleStreaming}> Stop Searching </button>
               } 
              { !streaming &&
                <button type="submit"> Get Iternary </button>
              }
          </Async>
      )
}

export default Social;
