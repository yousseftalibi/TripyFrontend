import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Table } from "react-bootstrap";
import "./Recommendation.css";
const Recommendations = () => {
    const userId = Cookies.get("userId") ;
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8083/api/recommendDestination/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
  
    <div className="recommendations">
    <header >     
      <h3>Recommended visits based on your friends</h3>
      <br/>
    </header>
    <br/>
      {trips.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rate</th>
              <th>Kinds</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.xid}>
                <td>{trip.name}</td>
                <td>{trip.rate}</td>
                <td>{trip.kinds}</td>
                <td>{trip.dist}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>You have not visited any places yet.</p>
      )}
    </div>
    </>
  );
}

export default Recommendations;