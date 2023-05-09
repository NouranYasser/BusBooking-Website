import React from "react";
import "./YourTrip.css";
import { useState , useEffect} from "react"; 
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { Link } from "react-router-dom";


const YourTrip = () => {
  const auth = getAuthUser();
  const [appointments, setAppointments] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  useEffect(() => {
    setAppointments({ ...appointments, loading: true });
    axios
      .get(`http://localhost:8000/search/myTrips/${auth.id}`) 
      .then((resp) => {
        setAppointments({ ...appointments, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setAppointments({
          ...appointments,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [appointments.reload]);
  const deleteRequests = (id) => {
    axios
      .delete(`http://localhost:8000/requests/${id}`)
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
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
            <th>Ticket-Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Max-Num</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.results
            .map((appointment) => (
              <tr key={appointment.id}>
                
                <td>{appointment.from} </td>
                <td> {appointment.to} </td>
                <td> {appointment.ticket_price}</td>
                <td> {appointment.day} </td>
                <td> {appointment.time1} </td>
                <td> {appointment.max_travelers} </td>
                <td> {appointment.status} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default YourTrip;