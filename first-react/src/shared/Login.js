import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../helper/Storage";
import '../components/style/login.css'

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", { email, password });
      console.log(response.data);
     
      if (response.data.name === "Admin22222") {
        navigate("/Admin");
      } else  {
        navigate("/User");
      }
      setAuthUser(response.data);
      // do something with response data
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  return (
   <section className="login">
   <div className="divLogin">
      <h1 className="log">Login</h1>
      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="emaillogin" >Email</label>
          <input className="Emaillogin"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input className="passwordlogin"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="buttonlogin">Login</button>
      </form>
    </div>
    </section>
  );
};

export default Login;