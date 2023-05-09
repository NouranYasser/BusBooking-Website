// import loc from './images/location.svg'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidatuon.js";
import Footer from "../shared/Footer";
import axios from "axios";
import '../components/style/signUp.css'
import { setAuthUser } from "../helper/Storage.js";

// import pharma from './images/pharma.png'
// import medicine from './images/medicine.png'
//import "./signUp.css";
import Header from "../shared/Header";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    // role:"",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8000/auth/register", values)
        .then((res) => {
          navigate("/login");
          setAuthUser(res.data); // save the sinup in user data in local storage

        })
        .catch((err) => console.log(err));
    }
    // Add logic to handle form submission
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
     <section className="sign">
        <div className="SignUp">
        
            <form action="" onSubmit={handleSubmit}>
            {/* <div className="mb-3">
  <label htmlFor="role">
    
    <strong>Kind</strong>
  </label>
  <select  name="role" onChange={handleInput} className="form-select">
    <option value="">Select Kind</option>
    <option value="Patient">Patient</option>
  </select>
  {errors.role && (
    <span className="text-danger">{errors.role}</span>
  )}
</div> */}
<br></br><br></br> <br></br>
  <br></br>
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="name"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleInput}
                  className="ccc"
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleInput}
                  className="cccs"
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
              <div className="Passwor">
                <label htmlFor="password" className="Password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                  className="SignPassword"
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
           <br></br>
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>phone</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter phone"
                  name="phone"
                  onChange={handleInput}
                  className="ccc"
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone}</span>
                )}
              </div>
              <button type="submit" className="Sign_UP_Admin">
              Sign up
              </button>
             <br></br><br></br>
              <p><h3>You agree to our terms and policies</h3></p>
              
            </form>
          </div>
     </section>
    </>
  );
};

export default SignUp;


/*import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    status:"",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:8000/auth/register", {
        name: register.name,
        email: register.email,
        password: register.password,
        phone: register.phone,
        status: register.status,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Registration Form</h1>

      {register.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}

      <Form onSubmit={RegisterFun}>
        <Form.Group className="mb-3">
          <Form.Control
            //type="text"
            placeholder="Full Name"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            //type="email"
            placeholder="Email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            //type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            //type="email"
            placeholder="Email"
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
           // type="email"
            placeholder="Email"
            value={register.status}
            onChange={(e) =>
              setRegister({ ...register, status: e.target.value })
            }
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={register.loading === true}>
          register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
*/

/*// import loc from './images/location.svg'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidatuon.js";
import axios from "axios";

// import pharma from './images/pharma.png'
// import medicine from './images/medicine.png'

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8000/auth/register", values)
        .then((res) => {
          navigate("/Login");
        })
        .catch((err) => console.log(err));
    }
    // Add logic to handle form submission
  };

  return (
    <>
      

      
      <div className="content">
        <div className="ccc">
          <div className="ccc">
            <h2>Sign-In</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="name"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleInput}
                  className="ccc"
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleInput}
                  className="cccs"
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                  className="form-control rounded-0"
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
              <button type="submit" className="ccc">
                Log in
              </button>
              <p>You agree to our terms and policies</p>
              <Link
                to="/signup"
                className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
              >
                Sign up
              </Link>
            </form>
          </div>
        </div>
        //{ <Footer /> }
      </div>
    </>
  );
};

export default SignUp;
*/