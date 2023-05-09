import { useState } from "react";
import {  useParams } from "react-router-dom";
import "./UpdateTraveler.css";



function UpdateTraveler() {
  const [status, setstatus] = useState("");
  const [role, setrole] = useState("");

  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, role }),
    });
    const data = await response.json();
    if (data.error) {
      setMessage("Error Updating Traveler.");
    } else {
      setMessage("Traveler Updated Successfully.");
      setstatus("");
      setrole("");
    }
  };

  return (
    <section className="sec">
      <div className="YUUYI">
     
     <br></br>
      <h2>Update Traveler</h2>
     
      <form onSubmit={handleSubmit}>
        <label htmlFor="from" className="st">status</label>
        <input className="in"
          type="text"
          id="name"
          value={status}
          onChange={(e) => setstatus(e.target.value)}
        />
        <br />
<br></br>
<br></br>

        <label htmlFor="to" className="ro">role</label>
        <input
        className="la"
          type="text"
          id="to"
          value={role}
          onChange={(e) => setrole(e.target.value)}
        />
        <br />
        <br></br>
        <br></br>

        <button type="submit" className="UpdateTraveler">Update</button>
        
      </form>
      {message && <p>{message}</p>}
    </div>
    </section>

  );
}
export default UpdateTraveler;


