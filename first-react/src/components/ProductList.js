import React from "react";
import "../components/style/productList.css";
import { Data } from "../Core/Data/BusBooking";
import ProductCard  from "./ProductCard";

function ProductList (){
    const items = Data;
    return (
        <div class='productCard'>
            {
               items.map((item) => {
                    return <ProductCard key={item.id} 
                    name={item.name} 
                    description={item.description}       
                    image={item.image}
                    />
                    ;
                })
            
            }
        </div>
        
    );
  
};

export default ProductList;
