import React from "react";
import "./History.css"
import { useState } from "react";
import axios from "axios";
import "./History.css";
import {useEffect} from "react"; 
import { getAuthUser } from "../helper/Storage";




const App = () => {
  const auth = getAuthUser();
  const [History, setHistory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setHistory({ ...History, loading: true });
    axios
      .get(`http://localhost:8000/search/History/${auth.id}`)
      .then((resp) => {
        setHistory({ ...History, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setHistory({
          ...History,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [History.reload]);

  return (

    <> 
      <table striped bordered hover className="my-table">

        <thead>
          <tr>
          <th> Search Term</th>
          </tr>
        </thead>
        <tbody>
          {History.results
            .map((History) => (
              <tr key={History.id}>
                <td>{History.searchTerm} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default App;