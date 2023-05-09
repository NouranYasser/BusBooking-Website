import React from "react";
import "./View_Appointment.css";
import { useState , useEffect} from "react"; 
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ListSearch = () => {
  const [userId, setUserId] = useState(getAuthUser().id);
  const [submit, setsubmit] = useState(false);
  const location = useLocation();
  const auth = getAuthUser();
  const searchParams = new URLSearchParams(location.search);
  const searchterm = searchParams.get('searchTerm');
  //const auth = getAuthUser();
  const [appointments, setAppointments] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const data ={
      user_id:userId
    }
    setAppointments({ ...appointments, loading: true });
    axios
      .post(`http://localhost:8000/appointments/saveSearch?search=${searchterm}`,{...data})
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
    <section className="SectionTrip">
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
                  className="btnDelete"
                  onClick={(e) => {
                    requestAppointment(appointment.id);
                  }}
                >
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
    </>
  );
};

export default ListSearch;
