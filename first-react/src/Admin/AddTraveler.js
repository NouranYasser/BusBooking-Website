import React from "react";
//import "./AddAppointment.css";
import "./AddTraveler.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  //const [token, setToken] = useState("");
  const [role, setRole] = useState(0);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/users/create", {
        name,
        email,
        password,
        phone,
        status,
        role,
      })
      .then((res) => {
        console.log(res);
        navigate("/Travelers");
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="travel">
    <div className="Traveler">
       <form onSubmit={handleSubmit}>
   <br></br>
    <br></br>   
         <h2>Add User</h2>
       
         <div className="mb-2">
           <label htmlFor="from"  className="name">Name </label>
           <input
             placeholder="Enter Name"
             className="form-controlName"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </div>
      <br></br>
     
         <div className="mb-2">
           <label htmlFor="to" className="nn">Email  </label>
           <input
             placeholder="Enter Email"
             className=" input-form-controlEmail"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
 <br></br>
 <br></br>
         </div>
         <div className="mb-2">
           <label htmlFor="ticket_price" className="nn">Password</label>
           <input
             placeholder="Enter password"
             className="input-form-controlPassword"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>
        <br></br> 
         <div className="mb-2">
           <label htmlFor="day" className="nn">Phone</label>
           <input
             id="day"
             placeholder="Enter phone"
             className="form-controlPhone"
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
           />
         </div>
         <br></br>
   
         <div className="mb-2">
           <label htmlFor="time" className="nn">Status</label>
           <input
             id="time"
             placeholder="Enter status"
             className="input-form-controlStatus"
             value={status}
             onChange={(e) => setStatus(e.target.value)}
           />
         </div>{" "}
       
 <br></br>
         
         <div className="mb-2">
           <label htmlFor="max_travelers" className="role">Role</label>
           <input
             id="max_travelers"
             placeholder="Enter role"
             className="form-controlRole"
             value={role}
             onChange={(e) => setRole(e.target.value)}
           />
         </div>
           <button className="AddTraveler"> Add</button>  
       </form>
     </div>
     </section>
  );
}

export default App;