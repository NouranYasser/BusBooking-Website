import React from "react";
import "./View_Appointment.css";
import { useState , useEffect} from "react"; 
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

const ListSearch = () => {
  //const auth = getAuthUser();
  const [appointments, setAppointments] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setAppointments({ ...appointments, loading: true });
    axios
      .get("http://localhost:8000/appointments/search")
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
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Ticket-Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Max-Num</th>
            <th>Option</th>
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
                  className="btn btn-sm btn-danger" type="submit" 
                  >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListSearch;
