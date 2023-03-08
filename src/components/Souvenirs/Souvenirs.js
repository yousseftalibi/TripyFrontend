import { useState } from 'react';
import React from 'react';
import './Souvenirs.css';

function Souvenirs() {
  let submit = async () => {

    const reponse = await fetch('http://localhost:8080/api/registerEquipement/homeAppliance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: type,
        frequency: frequency,
        energy_rating: energyRating,
      })
    });

    await reponse.json();
  }

  const [type, setType] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [energyRating, setEnergyRating] = useState(0);

  return (
    <div className='contents'>
      <h3>Type :</h3>
      <input type="text" onChange={(e) => setType(e.target.value)} />
      <h3>Frequency :</h3>
      <input type="number" onChange={(e) => setFrequency(e.target.value)} />
      <h3>Energy Rating :</h3>
      <input type="number" onChange={(e) => setEnergyRating(e.target.value)} />
      <br />

      <button onClick={submit} type='submit'>Submit</button>
      <br />


    </div>
  );
}

export default Souvenirs;
