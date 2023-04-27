import React from "react";
import "../components/style/Header.css";
import {Link} from "react-router-dom";
import { removeAuthUser } from "../helper/Storage";
// import { Link } from "react-router-dom";

import myImage from './images.png';


const Header = () => {
  const handleLogout = () => {
    removeAuthUser();
    // Navigate to the login page or homepage
    // For example:
    window.location.href = '/';
  };
  return (<header>
    <img src={myImage} alt="My Image" class="logo"  width="110px" height="110px"/>

    <nav className="navbar">
      
      <ul>
       
          <Link to="/">Home</Link>
          <li ><button className="logoutbtn" onClick={handleLogout}>
           Logout
          </button></li>
       
       
      </ul>
      
    </nav>
  </header>
  );
};
export default Header;

