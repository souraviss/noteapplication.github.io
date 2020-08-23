import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SketchPicker } from "react-color";
import "./EditNote.css";

// export class EditNote extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       _id: "",
//       title: "",
//       body: "",
//       image: "",
//       noteColor: "",
//       creator: "",
//     };
//   }
//   GetData = async () => {
//     const Url = "http://15.207.8.251:9200/notes/" + this.props.match.params.id;
//     const localData = localStorage.getItem("user_token");
//     const result = await axios(Url, {
//       headers: { "auth-token": localData },
//     });
//     const data = result.data;
//     console.log("Result data:", data);
//     debugger;
//     this.setState({ ...data });
//     data.image = result.data.image.split("/uploads/")[1];
//   };

//   componentDidMount() {
//     this.GetData();
//   }

//   handleChangeComplete = (color) => {
//     this.setState({ noteColor: color.hex });
//   };
//   onChange = (e) => {
//     e.persist();
//     this.setState({ ...this.state, [e.target.name]: e.target.value });
//     // seteditnote({ ...note, [e.target.name]: e.target.value });
//   };
//   onEditSubmit = (e) => {
//     e.preventDefault();
//     debugger;

//     let formData = new FormData();
//     formData.set("image", this.state.image);
//     //  formData.append('creator', this.state.creator);
//     const localData = localStorage.getItem("user_token");
//     console.log("FORM DATA", formData.get("image"));
//     axios
//       .put(
//         "http://15.207.8.251:9200/notes/" + this.state._id,
//         {
//           title: this.state.title,
//           body: this.state.body,
//           noteColor: this.state.noteColor,
//         },
//         {
//           headers: { "auth-token": localData },
//         }
//       )
//       .then((res) => {
//         axios
//           .post(
//             `http://15.207.8.251:9200/notes/image-upload/${this.state._id}`,
//             formData,
//             {
//               headers: { "auth-token": localData },
//             }
//           )
//           .then((res) => {
//             console.log(res);
//             window.location.href = "http://15.207.8.251:3000/app";
//           });
//       });
//     // });
//   };
//   onImagechange = (e) => {
//     this.setState({ image: e.target.files[0] });
//   };
//   render() {
//     return (
//       <div className="editNote">
//         <form onSubmit={this.onEditSubmit}>
//           <div className="edit__form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               onChange={this.onChange}
//               value={this.state.title}
//             />
//           </div>

//           <div className="edit__form-group">
//             <label>Image</label>
//             <input type="file" onChange={this.onImagechange} />
//             {/* <label style={{ color: "red" }}>{validation}</label> */}
//             <p>Old Image Path: {this.state.image}</p>
//           </div>
//           <div className="edit__form-group">
//             <label>Body</label>
//             <textarea
//               className="text-body"
//               name="noteBody"
//               onChange={this.onChange}
//               value={this.state.body}
//             ></textarea>
//           </div>
//           <div className="edit__form-group">
//             <label>Note Color</label>
//             {/* <input
//               type="text"
//               name="noteColor"
//               onChange={onChange}
//               value={note.noteColor}
//             /> */}
//             <SketchPicker
//               className="colorbox"
//               color={this.state.noteColor}
//               onChangeComplete={this.handleChangeComplete}
//             />
//           </div>

//           <button className="btnUpdate">update</button>
//         </form>
//       </div>
//     );
//   }
// }

function EditNote(props) {
  let [note, seteditnote] = useState({
    _id: "",
    title: "",
    body: "",
    image: "",
    noteColor: "",
    creator: "",
  });

  let history = useHistory();
  const Url = "http://15.207.8.251:10051/notes/" + props.match.params.id;
  let imageBeh = "";
  let validation = "";
  const GetData = async () => {
    const localData = localStorage.getItem("user_token");

    const [areaValue, setAreaValue] = useState("hello");
    const result = await axios(Url, {
      headers: { "auth-token": localData },
    });
    const data = result.data;
    console.log(data);
    debugger;
    data.image = result.data.image.split("/uploads/")[1];

    seteditnote(data);
    note.imageBeh = data.image;
  };
  useEffect(() => {
    GetData();
  }, []);

  const handleChangeComplete = (color) => {
    console.log("color value", color.hex);
    console.log("color type", typeof color.hex);
  };

  const onChangeColor = (color, event) => {
    console.log(event.target);
    console.log(color);
    note.noteColor = color.hex;
  };
  const onEditSubmit = (e) => {
    e.preventDefault();
    debugger;

    let formData = new FormData();
    formData.set("image", note.image);
    //formData.append("creator", this.state.creator);
    const localData = localStorage.getItem("user_token");
    console.log("FORM DATA", formData.get("image"));
    // const config = {
    //   method: "get",
    //   url: "http://15.207.8.251:9200/notes/User",
    //   headers: { "auth-token": `${localData}` },
    // };

    // axios(config).then((response) => {
    //   console.log("created by data", response.data.createrId);
    //   this.setState({ creator: response.data.createrId });
    //   console.log("note value:--", note);
    axios
      .put(
        "http://15.207.8.251:10051/notes/" + note._id,
        {
          title: note.title,
          body: note.body,
          noteColor: note.noteColor,
        },
        {
          headers: { "auth-token": localData },
        }
      )
      .then((res) => {
        axios
          .post(
            `http://15.207.8.251:10051/notes/image-upload/${note._id}`,
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
    // });
  };
  const onChange = (e) => {
    e.persist();

    seteditnote({ ...note, [e.target.name]: e.target.value });
  };
  const onImagechange = (e) => {
    note.image = e.target.files[0];
  };
  return (
    <div className="editNote">
      <form onSubmit={onEditSubmit}>
        <div className="edit__form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>

        <div className="edit__form-group">
          <label>Image</label>
          <input type="file" onChange={onImagechange} />
          {/* <label style={{ color: "red" }}>{validation}</label> */}
          <p>Old Image Path: {note.image}</p>
        </div>
        <div className="edit__form-group">
          <label>Body</label>
          <textarea
            className="text-body"
            name="noteBody"
            onChange={onChange}
            value={note.body}
          ></textarea>
        </div>
        <div className="edit__form-group">
          <label>Note Color</label>
          {/* <input type="text" name="noteColor" value={note.noteColor} /> */}
          <SketchPicker
            className="colorbox"
            color={note.noteColor}
            onChange={onChangeColor}
            onChangeComplete={handleChangeComplete}
          />
        </div>

        <button className="btnUpdate">update</button>
      </form>
    </div>
  );
}

export default EditNote;
