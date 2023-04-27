import React from "react";
import "./TravelerDestination.css";
import { useState , useEffect} from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

const TravelerDestination = () => {
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
        setDestinations({ ...destinations, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setDestinations({
          ...destinations,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [destinations.reload]);

  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:8000/destinations/${id}`)
      .then((resp) => {
        setDestinations({ ...destinations, reload: destinations.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Link to="/AddDestination">
        <button className="destin"> Add New Destination</button>
      </Link>

      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {destinations.results.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.id}</td>
              <td>{destination.des_name} </td>
              <td>
                <button
                  className="D"
                  onClick={(e) => {
                    deleteAppointment(destination.id);
                  }}>
                  Delete
                </button>
                <Link to="/UpdateDestination" ><button className='buto'>Update</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TravelerDestination;
