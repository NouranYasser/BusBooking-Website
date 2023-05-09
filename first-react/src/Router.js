  import { createBrowserRouter } from "react-router-dom";
  import App from "./App";
  //import Login from "..src/shared/Login";  // import { SignUp } from './shared/SignUp.js';
  //import Login from "./shared/Login.js"
  import Login from "./shared/Login.js";
  import LoginValidatuon from "./shared/LoginValidatuon.js";
  import Body from "./components/Body";
  import UserHome from "./User/UserHome.js";
  import View_Appointment from "./User/View_Appointment";
  import YourTrip from "./User/YourTrip";
  import UpdateDestination from "./Admin/UpdateDestination";
  import ShowTrips from "./User/ShowTrips";
  import About2 from "./User/About2";
  import TravelerDestination2 from "./User/TravelerDestination2";
  import AdminHome from "./Admin/AdminHome";  
  import TravelerDestination from "./Admin/TravelerDestination";
  import About from "./Admin/About";
  import Table_Appointments from "./Admin/Table_Appointments";
  import Travelers from "./Admin/Travelers";
  import Requests from "./Admin/Requests"; 
  import SignUp from "./shared/SignUp"; 
  import AddAppointment2 from "./Admin/AddAppointment2"
  import UpdateAppointment from "./Admin/UpdateAppointment";
  import AddTraveler from "./Admin/AddTraveler";
  import AddDestination from "./Admin/AddDestination";
  import UpdateTraveler from "./Admin/UpdateTraveler";
  import History from "./User/History";
  import Guest from "./middleware/Guest";
  import Admin from "./middleware/Admin";
  import ViewDestinations from "./User/ViewDestinations";
  
  //import ListSearch from "./User/listSerach";
 
  export const router = createBrowserRouter([
    {
    
      path: "/",
      element: <App />,

      children:[

    {
      path: "/",
      element:<Body/> 
    },
    {
      element: <Admin />,
      // element: <Guest1 /> ,
  
      children: [
        {
          path: "/AddDestination",
          element: <AddDestination/>,
        },
        {
          path: "/UpdateDestination/:id",
          element: <UpdateDestination/>,
        },
        {
          path: "/UpdateTraveler/:id",
          element: <UpdateTraveler/>,
        },
        {
          path: "/AddTraveler",
          element: <AddTraveler/>,
        },
        {
          path: "/UpdateAppointment/:id",
          element: <UpdateAppointment/>,
        },
        {
          path: "/AddAppointment2",
          element:<AddAppointment2/>
        },
        {
          path: "/Requests",
          element:<Requests/>
        },
        {
          path: "/Travelers",
          element:<Travelers/>
        },
        {
          path: "/Table_Appointments",
          element:<Table_Appointments/>
        },
        {
          path: "/Admin",
          element:<AdminHome/>
        },
        {
          path: "/About",
          element:<About/>
        },
    
        {
          path: "/TravelerDestination",
          element:<TravelerDestination/>
        },
    ]},
    {
      element: <Guest />,
      // element: <Guest1 /> ,
  
      children: [
    {
      path: "/Login",
      element:<Login/> 
    },
    {
      path: "/signup",
      element:<SignUp/>
    },
    ]},
    {
      path :"/loginValidatuon",
      element: <loginValidatuon/>
    }, 

    {
      path: "/User",
      element:<UserHome/>
    },
    {
      path: "/History",
      element:<History/>
    },

    {
      path: "/View_Appointment",
      element:<View_Appointment/>
    },

    {
      path: "/yourTrip",
      element:<YourTrip/>
    },

   {
      path: "/ShowTrips",
      element:<ShowTrips/>
    },

    {
      path: "/About2",
      element:<About2/>
    },

    {
      path: "/TravelerDestination2",
      element:<TravelerDestination2/>
    },
    {
      path :"/ViewDestinations",
      element:<ViewDestinations/>
    }
    
    

    
   /* {
      path:"/listSerach",
      element:<ListSearch/>
    }
    */
   /* {
      path: "/AddDestination",
      element: <AddDestination/>,
    },*/

  ],


    },

    ]);
    

