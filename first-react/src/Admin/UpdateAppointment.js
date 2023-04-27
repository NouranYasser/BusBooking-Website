import { useState } from "react";
import {  useParams } from "react-router-dom";
//import UpdateAppointment from "./UpdateAppointment";
// import "../Dashboard.css";
// import Sidebar from "../sidebar";

function UpdateAppointment() {
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [ticket_price, setticket_price] = useState("");
  const [day, setday] = useState("");
  const [time1, settime1] = useState("");
  const [max_travelers, setmax_travelers] = useState("");

  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8000/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, ticket_price, day,time1,max_travelers }),
    });
    const data = await response.json();
    if (data.error) {
      setMessage("Error Updating Appointment.");
    } else {
      setMessage("Appointment Updated Successfully.");
      setfrom("");
      setto("");
      setticket_price("");
      setday("");
      settime1("");
      setmax_travelers("");
    }
  };

  return (
    <div class="container-fluid documentation">
      <div className="row">
    <div>
    <div className="FHFGHGr">
          <div className="YUUYI">
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">from:</label>
        <input
          type="text"
          id="name"
          value={from}
          onChange={(e) => setfrom(e.target.value)}
        />
        <br />
        <label htmlFor="to">to:</label>
        <input
          type="text"
          id="to"
          value={to}
          onChange={(e) => setto(e.target.value)}
        />
        <br />
        <label htmlFor="ticket_price">ticket_price:</label>
        <input
          type="int"
          id="ticket_price"
          value={ticket_price}
          onChange={(e) => setticket_price(e.target.value)}
        />
        <br />
        <label htmlFor="day">day:</label>
        <input
          type="text"
          id="day"
          value={day}
          onChange={(e) => setday(e.target.value)}
        />
        <br />
        <label htmlFor="time1">time1:</label>
        <input
          type="text"
          id="time1"
          value={time1}
          onChange={(e) => settime1(e.target.value)}
        />
        <br />
        <label htmlFor="max_travelers">max_travelers:</label>
        <input
          type="int"
          id="max_travelers"
          value={max_travelers}
          onChange={(e) => setmax_travelers(e.target.value)}
        />
        <br />

        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    </div>
    </div>
    </div>

  );
}
export default UpdateAppointment;
/*import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
//import { getAuthUser } from "../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateAppointment = () => {
  let { id } = useParams();
 //const auth = getAuthUser();
  const [appointment, setAppointment] = useState({
    from: "",
    to: "",
    ticket_price: "",
    day: "",
    time1: "",
    max_travelers: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });

  const updateAppointment = (e) => {
    e.preventDefault();

    setAppointment({ ...appointment, loading: true });

    const formData = new FormData();
    formData.append("from", appointment.from);
    formData.append("to", appointment.to);
    formData.append("ticket_price", appointment.ticket_price);
    formData.append("day", appointment.day);
    formData.append("time1", appointment.time1);
    formData.append("max_travelers", appointment.max_travelers);
   
    axios
      .put("http://localhost:8000/appointments/" + id, formData, {
        headers: {
          //token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setAppointment({
          ...appointment,
          loading: false,
          success: "appointment updated successfully !",
          reload: appointment.reload + 1,
        });
      })
      .catch((err) => {
        setAppointment({
          ...appointment,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/appointment/" + id)
      .then((resp) => {
        setAppointment({
          ...appointment,
          from: resp.data.from,
          to: resp.data.to,
          ticket_price: resp.data.ticket_price,
          day: resp.data.day,
          time1: resp.data.time1,
          max_travelers: resp.data.max_travelers,

        });
      })
      .catch((err) => {
        setAppointment({
          ...appointment,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [appointment.reload]);

  return (
    <div className="login-container">
      <h1>Update Movie Form</h1>

      {appointment.err && (
        <Alert variant="danger" className="p-2">
          {appointment.err}
        </Alert>
      )}

      {appointment.success && (
        <Alert variant="success" className="p-2">
          {appointment.success}
        </Alert>
      )}

      <Form onSubmit={updateAppointment} className="text-center py-2">

        <Form.Group className="mb-3">
          <Form.Control
           
            placeholder="appointment Name"
            value={appointment.from}
            onChange={(e) => setAppointment({ ...appointment, from: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.to}
            onChange={(e) => setAppointment({ ...appointment, to: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.ticket_price}
            onChange={(e) => setAppointment({ ...appointment, ticket_price: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.from}
            onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.day}
            onChange={(e) => setAppointment({ ...appointment, day: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.time1}
            onChange={(e) => setAppointment({ ...appointment, time1: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            
            placeholder="appointment Name"
            value={appointment.max_travelers}
            onChange={(e) => setAppointment({ ...appointment, max_travelers: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Appointment
        </Button>
      </Form>
    </div>
  );
};

export default UpdateAppointment;
*/

