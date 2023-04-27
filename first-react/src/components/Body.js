import React from "react";
import "./style/Body.css"
// import Image from '../shared/images.png';
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";
import Header from "../shared/Header";
function Body(){
  return (
 
   <>
 <Header/>
    <ProductList/>
    <productCard/>
      <div className="content">
        <div >
          {/* <img src={Image} alt="My Image" /> */}
      
         
      
        </div>
        <ul>
        </ul>

      </div>
   
    </>
  
  );
};
export default Body;


