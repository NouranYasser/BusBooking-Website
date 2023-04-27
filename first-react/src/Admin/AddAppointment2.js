import React from "react";
import "./AddAppointment2.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ticket_price, setTicketPrice] = useState(0);
  const [day, setDay] = useState("");
  const [time1, setTime] = useState("");
  const [max_travelers, setMaxTravelers] = useState(0);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/appointments/create", {
        from,
        to,
        ticket_price,
        day,
        time1,
        max_travelers,
      })
      .then((res) => {
        console.log(res);
        navigate("/Table_Appointments");
      })
      .catch((err) => console.log(err));
  }

  return (
   <section className="ssss">
   <div className="aaaa">
      <form onSubmit={handleSubmit}>
  <br></br>
   <br></br>   
        <h2>Add Appointment</h2>
      
        <div className="mb-2">
          <label htmlFor="from"  className="eeee">From </label>
          <input
            placeholder="Enter from"
            className="form-control2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
     <br></br>
    
        <div className="mb-2">
          <label htmlFor="to" className="eeee">to  </label>
          <input
            placeholder="Enter description"
            className=" input-form-control3"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
<br></br>
<br></br>
        </div>
        <div className="mb-2">
          <label htmlFor="ticket_price" className="eeee">ticket_price</label>
          <input
            type="int"
            placeholder="Enter price"
            className="input-form-control4"
            value={ticket_price}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div>
       <br></br> 
        <div className="mb-2">
          <label htmlFor="day" className="eeee">day:</label>
          <input
            id="day"
            className="form-control5"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <br></br>
  
        <div className="mb-2">
          <label htmlFor="time" className="eeee">time:</label>
          <input
            id="time"
            className="input-form-control6"
            value={time1}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>{" "}
      
<br></br>

        <div className="mb-2">
          <label htmlFor="max_travelers">max_travelers</label>
          <input
            id="max_travelers"
            className="form-control7"
            value={max_travelers}
            onChange={(e) => setMaxTravelers(e.target.value)}
          />
        </div>
          <button className="success"> Add</button>  
      </form>
    </div>
    </section>
  );
}

export default App;