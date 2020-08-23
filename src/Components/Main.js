import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Main.css";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import { useHistory } from "react-router-dom";
import axios from "axios";
function Main(props) {
  let history = useHistory();
  const editnote = (id) => {
    console.log(id);
    // let history = useHistory();
    // history.push("/app/editnote/" + id);

    history.push("/app/editnote/" + id);
    window.location.reload();
    // props.history.push({
    //   pathname: "/app/editnote/" + id,
    // });
  };
  const onDeleteNote = (id) => {
    const localData = localStorage.getItem("user_token");
    console.log("deleted id", id);
    axios
      .delete("http://15.207.8.251:10051/notes/" + id, {
        headers: { "auth-token": localData },
      })
      .then((res) => {
        window.location.reload();
      });
  };
  return (
    <div className="noteAction">
      <Link to="/app/addnote">Add Note</Link>
      <div>
        <Switch>
          <Route path="/app/addnote" component={AddNote} />
          <Route path="/app/editnote/:id" component={EditNote} />
        </Switch>
      </div>
      <div className="main__note">
        {props.notes.map((note, index) => (
          <div
            className="notes"
            style={{ backgroundColor: note.noteColor }}
            key={index}
          >
            <div className="notes__info">
              <div className="notes__title">
                <h2>{note.title}</h2>
              </div>
              <div className="notes__description">
                <p>{note.body}</p>
              </div>

              <img src={note.image} alt={note.title} />
              <button
                className="btnEdit"
                onClick={() => {
                  editnote(note._id);
                }}
              >
                Edit
              </button>
              <button
                className="btnDelete"
                onClick={() => {
                  onDeleteNote(note._id);
                }}
              >
                X
              </button>
              {/* <Link to={`/app/editnote/${note._id}`}>Edit Note</Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
