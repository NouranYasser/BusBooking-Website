import { useState } from "react";
import {  useParams } from "react-router-dom";
import "./UpdateAppointment.css";

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
    <section className="AppointmentUpdate">
    <div className="divUpdateAppointment">
      <br></br>
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from" className="handle">From</label>
        <input
          type="text"
          id="name"
          className="from333"
          value={from}
          onChange={(e) => setfrom(e.target.value)}
        />
        <br />
        <label htmlFor="to" className="handle">To</label> 
        <input
          type="text"
          id="to"
          className="from444"
          value={to}
          onChange={(e) => setto(e.target.value)}
        />
        <br />
        <label htmlFor="ticket_price" className=" TicketHandle">Ticket Price</label>
        <input
          type="int"
          id="ticket_price"
          className="from555"
          value={ticket_price}
          onChange={(e) => setticket_price(e.target.value)}
        />
        <br />
        <label htmlFor="day" className="DayHandle">day</label>
        <input
          type="text"
          id="day"
          className="from666"
          value={day}
          onChange={(e) => setday(e.target.value)}
        />
        <br />
        <label htmlFor="time1" className="TimeHandle">Time</label>
        <input
          type="text"
          id="time1"
          className="from888"
          value={time1}
          onChange={(e) => settime1(e.target.value)}
        />
        <br />
        <label htmlFor="max_travelers" className="handle">Max Travelers</label>
        <input
          type="int"
          id="max_travelers"
          className="from777"
          value={max_travelers}
          onChange={(e) => setmax_travelers(e.target.value)}
        />
        <br />

        <button type="submit" className="AppointmentUpdatebutton">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  
    </section>

  );
}
export default UpdateAppointment;
