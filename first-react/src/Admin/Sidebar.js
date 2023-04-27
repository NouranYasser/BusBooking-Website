import React, { useState } from 'react';
import "./Sidebar.css";
import myImage from './image.png';
//import { Link } from 'react-router-dom';
// import FaTh from './table_Appointments'
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



const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[        {
            path:"/TravelerDestination",
            name:"TravelerDestination",
            icon:<FaTh/>
        },
        
        {
        
            path:"/Table_Appointments",
            name:"View_Appointments",
            icon:<FaTh/>
        },
        {
            path:"/Travelers",
            name:"Travelers",
            icon:<FaUserAlt/>
        },
        {
            path:"/Requests",
            name:"Requests",
            icon:<FaShoppingBag/>
        },
        {
            path:"/About",
            name:"About",
            icon:<FaUserAlt/>
        },
      
    ]
    return (
    <div >
                   <main className='contant1'>{children}</main>

    <div className="container1">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar1">
               <div className="top_section1">
                 
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars1">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <div className='image1'>
               <img src={myImage} alt="My Image" class="image"  width="80px" height="80px"/>
               <p ><h3 className='h1'>Hello Admin</h3></p>
               <br></br>
              <br></br>
              </div>
               {
       menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link1" activeclassName="active1">
                           <div className="icon1">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text1">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>

       
           </div>
        </div>

    );
};

export default Sidebar;