import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import axios from "axios";

function App() {
  const [notes, setNote] = useState([]);
  const history = useHistory();
  let localData = localStorage.getItem("user_token");
  if (!localData) {
    history.push("/");
  }
  const config = {
    method: "get",
    url: "http://15.207.8.251:10051/notesUser",
    headers: { "auth-token": `${localData}` },
  };
  const fetchData = async () => {
    const response = await axios(config);
    return response;
  };

  useEffect(() => {
    fetchData().then(({ data }) => {
      setNote(data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {
        <Main notes={notes} />
        //notes.map((note, index) => <Main notes={note} key={index} />)
      }

      {/* <Footer /> */}
    </div>
  );
}

export default App;
