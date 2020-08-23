import React, { useState, useEffect } from "react";
import "./UserNote.css";
import axios from "axios";
import Header from "./Header";

function UserNote(props) {
  let [Note, setNotes] = useState([]);
  const Url = "http://15.207.8.251:10051/notes/user/" + props.match.params.id;

  const GetData = async () => {
    const localData = localStorage.getItem("user_token");
    const result = await axios(Url, {
      headers: { "auth-token": localData },
    });
    return result.data;
  };
  useEffect(() => {
    GetData().then((data) => {
      console.log("compile data", data);
      setNotes(data.data);
    });
  }, []);
  return (
    <div className="user__note">
      <Header />
      <h1 className="user_note_heading">user note</h1>
      <hr />
      {Note.map((nt) => (
        <div className="user_note__info" key={nt._id}>
          <h2>{nt.title}</h2>
          <div className="user_note__body">
            <p>{nt.body}</p>
          </div>
          <div className="user_note__image">
            <img src={nt.image} alt={nt.title} />
          </div>
          <div className="user_note__notecolor">
            <div
              className="user_note__notecolor__box"
              style={{ backgroundColor: nt.noteColor }}
            ></div>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserNote;
