import React from "react";
import "./Travelers.css";
import { useState , useEffect} from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

const Travelers = () => {
  const auth = getAuthUser();
  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("http://localhost:8000/users/getUsers")
      .then((resp) => {
        setUsers({ ...users, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setUsers({
          ...users,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [users.reload]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((resp) => {
        setUsers({ ...users, reload: users.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Link to="/AddTraveler">
        <button className="addd"> Add New USer</button>
      </Link>

      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Status</th>
            <th>token</th>
            <th>role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.results.map((user) => (
              <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email} </td>
              <td> {user.password} </td>
              <td>{user.phone}</td>
              <td> {user.status} </td>
              <td> {user.token} </td>
              <td> {user.role} </td>
              <td>
                
                <button  className="btnPrimary">
                <Link
                  to={`/UpdateTraveler/${user.id}`}>
                  Update
                </Link>
                </button>
                <button
                  className="btnDanger"
                  onClick={(e) => {
                    deleteUser(user.id);
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Travelers;
