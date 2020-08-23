import React, { useState, useEffect } from "react";
import "./AllNotes.css";
import Header from "./Header";
import axios from "axios";
import ProductNotes from "./ProductNotes";
function AllNotes() {
  let [notes, setNotes] = useState([]);
  const Url = "http://15.207.8.251:10051/noteusermarge";

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
      setNotes(data);
    });
  }, []);
  return (
    <div className="usernotes">
      <Header />
      <div className="All_Notesuser">
        {
          <ProductNotes
            products={
              notes
              //  { id: note._id, title: note.title, body: note.body,creator:note.creator.email,createdDate:note.creator.createdDate}
            }
          />
        }
      </div>
    </div>
  );
}

export default AllNotes;
