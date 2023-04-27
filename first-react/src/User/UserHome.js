import React from "react";
import Header from "../shared/Headerlogout";

import Sidebar2 from "./Sidebar2";
import "../User/UserHome.css";
import ProductList from "../components/ProductList";
import { Link, Route } from "react-router-dom";
import myImage from "./images.png";

const UserHome = () => {
  return (
    <>
      <Sidebar2 />

      <section className="body">
        <div className="StyleA">
          <div className="StyleB">
            <form action="search" className="searchbar">
            <label for="name">
                <h4 className="o">Destination:</h4>
              </label>
              <input
                type="text"
                placeholder="Search Appointment"
                name="q"
              ></input>
              <img
                src={myImage}
                alt="My Image"
                class="im"
                width="80px"
                height="80px"
              />
            </form>
           <br></br><br></br>
            <form>   
              <Link to="/ShowTrips">
                <button className="button2222"> ShowTrips</button>
              </Link>
            </form>
          </div>
        </div>
      </section>

      <ProductList />
    </>
  );
};
export default UserHome;

//   <h2 className="style">Welcome To GoBus</h2>
//<Link to="/ShowTrips"><button className="button2"> ShowTrips</button></Link>
