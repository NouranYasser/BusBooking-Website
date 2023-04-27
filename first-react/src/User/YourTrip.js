import React from "react";
import "./YourTrip.css";

const YourTrip = () => {
    return (<> 
    
    <table className="my-table" >
        <thead >
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Ticket-Price</th>
                <th>Day</th>
                <th>Time</th>
                <th>Max-Num</th>
     
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>cairo</td>
                <td>aswan</td>
                <td>285$</td>
                <td>sunday</td>
                <td>8 am</td>
                <td>80</td>
            

            </tr>
            <tr>
                <td>cairo</td>
                <td>alex</td>
                <td>350$</td>
                <td>monday</td>
                <td>8pm</td>
                <td>80</td>
               
            </tr>
            <tr>
                <td>suhag</td>
                <td>cairo</td>
                <td>200$</td>
                <td>wednesday</td>
                <td>10 pm</td>
                <td>80</td>
           
                
            </tr>
          
        </tbody>
  
       
    </table>
          
 </>

  );
    }
export default YourTrip;