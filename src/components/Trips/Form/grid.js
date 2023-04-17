import { AgGridReact } from 'ag-grid-react';
import {React, useState} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Async } from 'react-async';
import { useCallback, useRef } from 'react';

const Grid = () => {

    const [rowData, setRowData] = useState();
    let gridApi = useRef(null);

    const columnDefs = [
        { headerName: 'Name', field: 'name', resizable: true, rowDrag: true },
        { headerName: 'Rate', field: 'rate', resizable: true, sortable: true },
        { headerName: 'Kinds', field: 'kinds', resizable: true },
        { headerName: 'Dist', field: 'dist', resizable: true },
        { headerName: 'Osm', field: 'osm', resizable: true },
        { headerName: 'Wikidata', field: 'wikidata', resizable: true },
        { headerName: 'Xid', field: 'xid', resizable: true },
      ];

    const onGridReady = useCallback((params) => {
       gridApi.current = params.api;
       gridApi.current?.sizeColumnsToFit();
      }, [])

      const getNextPoint = (lat, lon, theta) => {
        const R = 6371;
        const d = 2000 / 1000;
        const φ1 = lat * Math.PI / 180;
        const λ1 = lon * Math.PI / 180;
        const φ2 = Math.asin(
          Math.sin(φ1) * Math.cos(d / R) +
            Math.cos(φ1) * Math.sin(d / R) * Math.cos(theta)
        );
        const λ2 =
          λ1 +
          Math.atan2(
            Math.sin(theta) * Math.sin(d / R) * Math.cos(φ1),
            Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2)
          );
        const newLat = φ2 * 180 / Math.PI;
        const newLon = ((λ2 * 180 / Math.PI) + 540) % 360 - 180;
        return { lat: newLat, lon: newLon };
      };
      
    const getApi = useCallback ( async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6a4f81847bmsh8785c9220ccebdfp1b97bfjsn74f82815c241',
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        }
        const response = await fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon=2.2945&lat=48.8584', options);
        const data = await response.json();

        const features = data.features.map(feature => feature.properties);
        let response2 = await fetch('http://localhost:8080/api/cleanData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(features)
          });
                
          let uniquePlaces = await response2.json();
        
        

       /* console.log(data);
        
        const latLonEast = getNextPoint(48.85341, 2.3488, 0);
        const nextReponseEast = await fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon='+latLonEast.lon+'&lat='+latLonEast.lat, options);
        console.log(await nextReponseEast.json());
    

        const latLonNorth = getNextPoint(48.85341, 2.3488, Math.PI / 2);
        const nextReponseNorth = await fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon='+latLonNorth.lon+'&lat='+latLonNorth.lat, options);
        console.log(await nextReponseNorth.json());
        
        const latLonWest = getNextPoint(48.85341, 2.3488, Math.PI );
        const nextReponseWest = await fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon='+latLonWest.lon+'&lat='+latLonWest.lat, options);
        console.log(await nextReponseWest.json());*/
        
       gridApi.current.setRowData(uniquePlaces)     
    }, []);
    

 
    const onRowDragEnd = (event) => {
        const newRowData = [...rowData];
        const movingItem = newRowData[event.node.rowIndex];
      
        newRowData.splice(event.node.rowIndex, 1);
        newRowData.splice(event.overIndex, 0, movingItem);
      
        newRowData.forEach((row, index) => {
          row.priority = index + 1;
        });
        
        setRowData(newRowData);
      };
      
    return(
    <Async promiseFn={getApi}>
            <p>You can order the rows in order to priortize an activity. The activity at the top represents what you would like to do the most.</p>
            <br/>
            <div style={ {display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <div className='ag-theme-alpine' style={ {width: '1000px', height:'400px'}}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        onRowDragEnd={onRowDragEnd}
                        onGridReady={onGridReady}
                    > </AgGridReact>
                </div>
            </div>
            <button type="submit"> Get Iternary </button>
    </Async>
    )
}

export default Grid;