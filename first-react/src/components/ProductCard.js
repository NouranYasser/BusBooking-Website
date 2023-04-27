import React from "react";
import "../components/style/productCard.css";

//props read only
function ProductCard (props) {
    return ( 
    <div className="product-Card">
      <div className="card-top">
        <img className="img" src={props.image} alt="Product-Card"  /> 
      </div> 


       <div className="card-info">
         <h3 className="title"><h3>{props.name}</h3></h3>
         <h4> {props.description}</h4>
      
        
       </div>
    </div>
    )
};

export default ProductCard;
   

// <button className="buy"><h4 className="now">Buy now</h4></button>
