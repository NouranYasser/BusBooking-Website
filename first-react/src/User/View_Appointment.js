import React from "react";
import "./View_Appointment.css";
import { useState , useEffect} from "react"; 
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const View_Appointment = () => {
  const auth = getAuthUser();
  const [submit, setsubmit] = useState(false);
  const [appointments, setAppointments] = useState({
    
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setAppointments({ ...appointments, loading: true });
    axios
      .get(`http://localhost:8000/appointments/getAppointments`)
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
            <th>Ticket-Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Max-Num</th>
            <th>Option</th>
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
                <td>
                <Link to = "/yourTrip">
                <button
                  className="btnDelete"
                  onClick={(e) => {
                    requestAppointment(appointment.id);
                  }}
                >
                  Request
                </button>
                </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default View_Appointment;