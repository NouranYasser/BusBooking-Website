const express = require("express");
const bodyParser = require('body-parser');
const app = express(); 
// Global Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors")
app.use(cors());  // Allow HTTP Reqests Local Hosts 

// Require Module
const auth = require("./routes/Auth");
const appointments = require("./routes/appointments");
const users = require("./routes/users");
const requests = require("./routes/requests");
const destinations = require("./routes/destinations");
const search = require("./routes/search");
// Run The App "server"
app.listen(8000,"localhost",()=>{
    console.log("SERVER IS RUNNING");
});

// API Route {End Points}
app.use("/auth",auth);
app.use("/appointments",appointments);
app.use("/users",users);
app.use("/requests",requests);
app.use("/destinations",destinations);
app.use("/search",search);



