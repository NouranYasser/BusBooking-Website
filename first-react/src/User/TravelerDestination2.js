import React from "react";
import "../User/TravelerDestination.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { Link } from "react-router-dom";

const TravelerDestinations2 = () => {
  const auth = getAuthUser();
  const [destinations, setDestinations] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setDestinations({ ...destinations, loading: true });
    axios
      .get("http://localhost:8000/destinations/getDestinations")
      .then((resp) => {
        setDestinations({
          ...destinations,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setDestinations({
          ...destinations,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [destinations.reload]);
  

  return (
    <>
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {destinations.results.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.des_name}</td>
              <td>
              <Link to={`/ViewDestinations?searchTerm=${destination.des_name}`}>
                  <button className="btnUpdate">View</button>
              </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TravelerDestinations2;
