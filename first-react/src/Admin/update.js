/*import { useState } from "react";
import {  useParams } from "react-router-dom";
//import UpdateAppointment from "./UpdateAppointment";
// import "../Dashboard.css";
// import Sidebar from "../sidebar";

function Update() {
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
      setMessage("Error updating medicine.");
    } else {
      setMessage("Medicine updated successfully.");
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
      <h2>Update Medicine</h2>
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
export default Update;
*/