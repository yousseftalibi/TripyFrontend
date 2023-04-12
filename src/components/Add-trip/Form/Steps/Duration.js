import React from 'react';
import { useState } from 'react';

let Duration = () => {
    const [type, setType] = useState('');
        return (
        <>
        <label htmlFor="type">Type</label>
        <br/>
        <select id="type" onChange={ (e) => {setType(e.target.value)}}> 
            <option value="">-- select one --</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="Months">Months</option>
        </select>
        <br/>

        <label htmlFor="value">Value</label>
        <br/>
        {type=='Months' ? (
                <select id="Months" > 
                  <option value="">-- select one --</option>
                  <option value="january">January</option>
                  <option value="febuary">Feburay</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
              </select> 
            ) :
        <input type="number" id="value" min={0}/>
        }

        <br/>
        </>
    )

}

export default Duration;