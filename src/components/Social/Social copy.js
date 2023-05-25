import { AgGridReact } from 'ag-grid-react';
import {React, useState} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Async } from 'react-async';
import { useCallback, useRef } from 'react';

const Social = () => {

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

  
    const getApi = useCallback ( async () => {
        const options = {
            method: 'GET'
        }
        const response = await fetch('http://localhost:8083/api/normalController/paris', options);
        const data = await response.json();
        console.table(data);
       gridApi.current.setRowData(data)     
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


export default Social;
