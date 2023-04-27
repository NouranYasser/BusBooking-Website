import React from "react";
//import "./AddAppointment.css";
import "./AddAppointment2.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

function App() {
  const [des_name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/destinations/", {
        des_name,
      })
      .then((res) => {
        console.log(res);
        navigate("/TravelerDestination");
      })
      .catch((err) => console.log(err));
  }

  return (
   <section className="ssss">
   <div className="aaaa">
      <form onSubmit={handleSubmit}>
  <br></br>
   <br></br>   
        <h2>Add Destination</h2>
      
        <div className="mb-2">
          <label htmlFor="from"  className="eeee">Destination Name </label>
          <input
            placeholder="Enter from"
            className="form-control2"
            value={des_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
     <br></br>
          <button className="success"> Add</button>  
      </form>
    </div>
    </section>
  );
}

export default App;