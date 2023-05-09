import { useState } from "react";
import {  useParams } from "react-router-dom";
import "./UpdateDestination.css";

function UpdateDestination() {
  const [des_name, setdestination] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8000/destinations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({des_name }),
    });
    const data = await response.json();
    if (data.error) {
      setMessage("Error Updating Destination.");
    } else {
      setMessage("Destination Updated Successfully.");
      setdestination("");
    }
  };

  return (
      <section className="sectionUpdate">
      <div className="YUUYI2">
        <br></br><br></br>
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from" className="destinationtext">destination</label>
        <input
          type="text"
          id="name"
          className="labelUpdate"
          value={des_name}
          onChange={(e) => setdestination(e.target.value)}
        />
        <br />
        
        <br />

        <button type="submit" className="buttonUpdateDes">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </section>

  );
}
export default UpdateDestination;


