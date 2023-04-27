import React from "react";
// import Header from "../shared/Header";
import Header from "../shared/Headerlogout";
import myImage from './image.png';
//import React, { useState } from 'react';
import { useState } from "react";
import "../User/Sidebar2.css";
//import View_Appointment from "./View_Appointment";

import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';


const Sidebar  = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[        {
            path:"/TravelerDestination2",
            name:"TravelerDestination",
            icon:<FaTh/>
        },
      
        {
        
            path:"/View_Appointment",
            name:"View_Appointments",
            icon:<FaTh/>
        },
        {
            path:"/yourTrip",
            name:"Your Trips",
            icon:<FaUserAlt/>
        },
        {
            path:"/addrequest",
            name:"Add Request",
            icon:<FaShoppingBag/>
        },
        {
            path:"/about2",
            name:"About",
            icon:<FaUserAlt/>
        },
    ]
  
    return (  
  
    
    <div>
                   <main className='contant'>{children}</main>

    <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                 
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <div className='image'>
               <img src={myImage} alt="My Image" class="image"  width="80px" height="80px"/>
          
               <br></br>
              <br></br>
              </div>
               {
       menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <Header/>
  

           </div>
        </div>
   
    );
}
export default Sidebar;

//<Header/>