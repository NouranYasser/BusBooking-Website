import React from "react";
import "./View_Appointment.css";
import { useState , useEffect} from "react"; 
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { Link } from "react-router-dom";
import myImage from './images.png';

const View_Appointment = () => {
  const auth = getAuthUser();
  const [appointments, setAppointments] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  useEffect(() => {
    setAppointments({ ...appointments, loading: true });
    axios
      .get("http://localhost:8000/appointments/getAppointments")
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

  return (

    <> 
    <Link to="/AddRequest">
        <button className="bb"> Add Request</button>
      </Link>
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
          <th> Trip Number</th>
            <th>
              <input
                type="text"
                placeholder="From"
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="To"
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
              />
            </th>
            <th>Ticket-Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Max-Num</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {appointments.results
            .filter((appointment) => {
              const fromMatch = appointment.from.toLowerCase().includes(fromQuery.toLowerCase());
              const toMatch = appointment.to.toLowerCase().includes(toQuery.toLowerCase());
              return fromMatch && toMatch;
            })
            .map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id} </td>
                <td>{appointment.from} </td>
                <td> {appointment.to} </td>
                <td> {appointment.ticket_price}</td>
                <td> {appointment.day} </td>
                <td> {appointment.time1} </td>
                <td> {appointment.max_travelers} </td>
                <td>
                  <button className="btn" type="submit">
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

export default View_Appointment;