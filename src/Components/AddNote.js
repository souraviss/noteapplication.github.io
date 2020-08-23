import React, { Component } from "react";
import "./AddNote.css";
import axios from "axios";
import { SketchPicker } from "react-color";
export class AddNote extends Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onNoteColorChange = this.onNoteColorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id: "",
      title: "",
      body: "",
      image: "",
      noteColor: "",
      creator: "",
    };
  }
  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  onBodyChange(e) {
    this.setState({ body: e.target.value });
  }
  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  onNoteColorChange(e) {
    this.setState({ noteColor: e.target.value });
  }
  handleChangeComplete = (color) => {
    console.log("color value", color.hex);
    console.log("color type", typeof color.hex);

    this.setState({ noteColor: color.hex });
  };

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.set("image", this.state.image);
    //  formData.append('creator', this.state.creator);
    const localData = localStorage.getItem("user_token");
    const config = {
      method: "get",
      url: "http://15.207.8.251:10051/notes/User",
      headers: { "auth-token": `${localData}` },
    };
    axios(config).then((response) => {
      //console.log("created by data", response.data.createrId);
      this.setState({ creator: response.data.createrId });
      axios
        .post(
          "http://15.207.8.251:10051/notes",
          {
            title: this.state.title,
            body: this.state.body,
            noteColor: this.state.noteColor,
            creator: this.state.creator,
          },
          {
            headers: { "auth-token": localData },
          }
        )
        .then((res) => {
          console.log("last inserted id:-", res);
          axios
            .post(
              `http://15.207.8.251:10051/notes/image-upload/${res.data.lastid}`,
              formData,
              {
                headers: { "auth-token": localData },
              }
            )
            .then((res) => {
              console.log(res);
              window.location.href = "http://15.207.8.251:10051/app";
            });
        });
    });
  }
  render() {
    return (
      <div className="AddNote">
        <form onSubmit={this.onSubmit}>
          <div className="addnote__form-group">
            <label>Title</label>
            <input type="text" name="title" onChange={this.onTitleChange} />
          </div>
          <div className="addnote__form-group">
            <label>Body</label>
            <textarea
              name="addNote"
              className="text-body"
              onChange={this.onBodyChange}
            ></textarea>
          </div>
          <div className="addnote__form-group">
            <label>Image</label>
            <input type="file" onChange={this.onFileChange} />
          </div>
          <div className="addnote__form-group">
            <label>Note Color</label>
            <input
              type="text"
              className="addnote__noteColor"
              name="noteColor"
              value={this.state.noteColor}
              onChange={this.onNoteColorChange}
            />

            <SketchPicker
              className="colorbox"
              color={this.state.background}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>

          <button className="btnSubmit">Save</button>
        </form>
      </div>
    );
  }
}

export default AddNote;
