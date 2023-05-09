import React from "react";
import "./Requests.css";
import "./Table_Appointments.css";
import { useState , useEffect} from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

const Requests = () => {
  const auth = getAuthUser();
  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setRequests({ ...requests, loading: true });
    axios
      .get("http://localhost:8000/requests/getRequests")
      .then((resp) => {
        setRequests({ ...requests, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [requests.reload]);

  const acceptRequests = (id) => {
    axios
      .put(`http://localhost:8000/requests/accept/${id}`)
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const declineRequests = (id) => {
    axios
      .put(`http://localhost:8000/requests/decline/${id}`)
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRequests = (id) => {
    axios
      .delete(`http://localhost:8000/requests/${id}`)
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <br></br><br></br>
      <h1> Requests</h1>
      <table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Day</th>
            <th>Time</th>
            <th>status</th>
            <th>user_id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.results.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.from} </td>
              <td> {request.to} </td>
              <td> {request.day} </td>
              <td> {request.time1} </td>
              <td> {request.status} </td>    
              <td> {request.user_id} </td>
              <td>
                <button
                  className="btnAccept"
                  onClick={(e) => {
                    acceptRequests(request.id);
                  }}>
                  Accept
                </button>
                <button
                  className="btnDecline"
                  onClick={(e) => {
                    declineRequests(request.id);
                  }}>
                  Decline
                </button>
                <button
                  className="btnbtn"
                  onClick={(e) => {
                    deleteRequests(request.id);
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

export default Requests;
