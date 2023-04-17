import React from 'react';
import {useState} from 'react';
import renderForm from './Form/renderForm';
import Grid from './Form/grid';
import "./Trips.css";

let Trips = () => {
    const [clicked, setClicked] = useState(0);
    const [buttonText, setButtonText] = useState('Next');

    const handleClick = () => {
        if(clicked === 2){
            setButtonText('Submit');
        }
        
        setClicked( (clicked) => clicked + 1);
    }
     
    return (
        <>
            {clicked <= 2 ?
            (
                renderForm(clicked, handleClick, buttonText) 
                ) :
            (
            <Grid/>
            )
            }
        </>
     );

}

export default Trips;