import React from "react";
import "./Table_Appointments.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const Table_Appointments = () => {
  const [appointments, setAppointments] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
 
  useEffect(() => {
    setAppointments({ ...appointments, loading: true });
    axios
      .get("http://localhost:8000/appointments/getAppointments")
      .then((resp) => {
        setAppointments({
          ...appointments,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setAppointments({
          ...appointments,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [appointments.reload]);

  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:8000/appointments/${id}`)
      .then((resp) => {
        setAppointments({ ...appointments, reload: appointments.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    
      <Link to="/AddAppointment2">
        <button className="bb"> Add New Appointment</button>
      </Link>
      <section className="appointment">
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
           
            <th>From</th>
            <th>To</th>
            <th>Ticket-Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Max-Num</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {appointments.results.map((appointment) => (
            <tr key={appointment.id}>
              
              <td>{appointment.from} </td>
              <td> {appointment.to} </td>
              <td> {appointment.ticket_price}</td>
              <td> {appointment.day} </td>
              <td> {appointment.time1} </td>
              <td> {appointment.max_travelers} </td>
              <td>
                <button
                  className="btnDelete"
                  onClick={(e) => {
                    deleteAppointment(appointment.id);
                  }}
                >
                  Delete
                </button>
                <Link to={"/UpdateAppointment/" + appointment.id}>
                  <button className="btnUpdate">Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      
    </>
  );
};

export default Table_Appointments;
