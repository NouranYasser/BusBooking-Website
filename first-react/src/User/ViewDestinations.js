import React from "react";
import "../User/TravelerDestination.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ViewDestinations = () => {
  const [submit, setsubmit] = useState(false);
  const auth = getAuthUser();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
 const searchTerm = searchParams.get('searchTerm');
 const [appointments, setAppointments] = useState({
  loading: true,
  results: [],
  err: null,
  reload: 0,
});
 const navigate = useNavigate();
  const [destinations, setDestinations] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  
  useEffect(() => {
    setDestinations({ ...destinations, loading: true });
    axios
      .get(`http://localhost:8000/search?search=${searchTerm}`)
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
  const requestAppointment = (id) => {
    const data ={
      user_id:auth.id,
      id:id
    }
    axios
      .post(`http://localhost:8000/requests/create`,{...data})
      .then((resp) => {
        setAppointments({ ...appointments, reload: appointments.reload + 1 });
        setsubmit(true);
        navigate("/yourTrip");
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  return (
    <>
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>ticket_price</th>
            <th>day</th>
            <th>time1</th>
            <th>max_travelers</th>
          </tr>
        </thead>
        <tbody>
          {destinations.results.map((destination) => (
            <tr key={destination.id}>
                <td>{destination.from} </td>
                <td> {destination.to} </td>
                <td> {destination.ticket_price}</td>
                <td> {destination.day} </td>
                <td> {destination.time1} </td>
                <td> {destination.max_travelers} </td>
                <td>
                <button
                  className="btnDelete"
                  onClick={(e) => {
                    requestAppointment(destination.id);
                  }}
                >
                  Request
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewDestinations;
