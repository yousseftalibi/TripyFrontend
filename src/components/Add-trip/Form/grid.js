import { AgGridReact } from 'ag-grid-react';
import {React, useState} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useEffect } from 'react';

const Grid = () => {

    const [rowData, setRowData] = useState([ 
        {'activity': 'Eiffel tour', 'type':'Monument', 'period':'Modern', 'price': 0, 'priority': 1},
        {'activity': 'Versailles', 'type':'Castle', 'period':'Baroque', 'price': 15, 'priority': 2},
        {'activity': 'Louvre', 'type':'Musuem', 'period':'Modern', 'price': 30, 'priority': 3},
        {'activity': 'Notre dame of Paris', 'type':'Chruch', 'period':'Gothic', 'price': 0, 'priority': 4},
        {'activity': 'Arc de Triamph', 'type':'Monument', 'period':'Neoclassical', 'price': 0, 'priority': 5}
    ]);
    const columnDefs = [
        { headerName: 'Activity', field: 'activity', resizable:true, rowDrag: true },
        {headerName: 'Type', field: 'type', resizable:true },
        {headerName: 'Period', field: 'period', resizable:true },
        { headerName: 'Price', field: 'price', resizable:true  },
        { headerName: 'Priority', field: 'priority', resizable:true  }

    ]

    useEffect( () => {
        fetch('test').then( (result) => result.json() ).then( (rowData) => setRowData(rowData))
    }, [])

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
        <>
        <p>You can order the rows in order to priortize an activity. The activity at the top represents what you would like to do the most.</p>
        <br/>
        <div style={ {display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <div className='ag-theme-alpine' style={ {width: '1000px', height:'400px'}}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs} animateRows={true} onRowDragEnd={onRowDragEnd}> </AgGridReact>
            </div>
        </div>
        <button type="submit"> Get Iternary </button>
        </>
    )
}

export default Grid;