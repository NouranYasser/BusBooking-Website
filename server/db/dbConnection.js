const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bus_booking',
    port : "3306"
  });
  connection.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected");
  });
  module.exports = connection;
