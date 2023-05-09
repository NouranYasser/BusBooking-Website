import React from "react";
//import Header from "../shared/Headerlogout";
import Sidebar2 from "./Sidebar2";
import "../User/UserHome.css";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import myImage from "./images.png";
import { useState } from "react";

const UserHome = () => {
  const [searchTerm, setsearchTerm] = useState();
 
  return (
    <>
      <Sidebar2 />

      <section className="body">
        <div className="StyleA">
          <div className="StyleB">
            <form action="search" className="searchbar">
              <label for="name" >
                
                <h4 className="o">search For Appointment</h4>
              </label>
              <div>
              
              <input className="searchbar input"
              
                type="text"
                placeholder="Search Appointment"
                name="q" onChange={(e) => setsearchTerm(e.target.value)}
              ></input>
              </div>
             
            </form>
            <br></br>
            <br></br>
            <form>
              <Link to={`/ShowTrips?searchTerm=${searchTerm}`}>
                <button className="button2222"> ShowTrips</button>
              </Link>
              <br></br><br></br><br></br><br></br>
              <Link to={"/History"}>
                  <button className="history">Show History</button>
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
/*<img
                src={myImage}
                alt="My Image"
                class="im"
                width="80px"
                height="80px"
              />*/