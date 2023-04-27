import React from "react";
import "../components/style/Header.css";
import {Link} from "react-router-dom";

// import { Link } from "react-router-dom";

import myImage from './images.png';

const Header = () => {
  return (<header>
    <img src={myImage} alt="My Image" class="logo"  width="110px" height="110px"/>

    <nav className="navbar">
      
      <ul>
       
          <Link to="/SignUp">SignUp</Link>
          <Link to="/Login">login</Link>
       
       
      </ul>
      
    </nav>
  </header>
  );
};
export default Header;

