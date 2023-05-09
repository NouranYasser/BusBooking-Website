const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Internet_application',
    port : "3306"
  });
  connection.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected");
  });
  module.exports = connection;
