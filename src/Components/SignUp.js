import React, { Component } from "react";
import "./SignUp.css";
import axios from "axios";
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
    };
    this.onfirstNameChange = this.onfirstNameChange.bind(this);
    this.onlastNameChange = this.onlastNameChange.bind(this);
    this.onemailChange = this.onemailChange.bind(this);
    this.onmobileNumberChange = this.onmobileNumberChange.bind(this);
    this.onpasswordChange = this.onpasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onfirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  onlastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  onemailChange(e) {
    this.setState({ email: e.target.value });
  }
  onmobileNumberChange(e) {
    this.setState({ mobileNumber: e.target.value });
  }
  onpasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(event) {
    const localData = localStorage.getItem("user_token");
    // const history = useHistory();
    //console.log("A name was submitted: ", this.state);
    console.log("state value", this.state);
    event.preventDefault();
    axios
      .post(
        "http://15.207.8.251:10051/users",
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          mobileNumber: this.state.mobileNumber,
          password: this.state.password,
        },
        {
          headers: { "auth-token": localData },
        }
      )
      .then((res) => {
        console.log("insert successfully done!!!");
        this.props.history.push("/");
      });
    // axios
    //   .get(
    //     `http://15.207.8.251:9200/users/${this.state.userName}/${this.state.password}`
    //   )
    //   .then((resp) => {
    //     console.lof("Result would be:--", resp);
    //   });
    // this.props.history.push("/app");
  }
  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>firstName</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="exampleInputEmail1"
              onChange={this.onfirstNameChange}
            />
          </div>
          <div className="form-group">
            <label>lastName</label>

            <input
              type="text"
              className="form-control form-control-sm"
              id="exampleInputlastname"
              onChange={this.onlastNameChange}
            />
          </div>
          <div className="form-group">
            <label>email</label>

            <input
              type="text"
              className="form-control form-control-sm"
              id="exampleInputemail"
              onChange={this.onemailChange}
            />
          </div>
          <div className="form-group">
            <label>mobileNumber</label>

            <input
              type="text"
              className="form-control form-control-sm"
              id="exampleInputmobileNumber"
              onChange={this.onmobileNumberChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              className="form-control form-control-sm"
              id="exampleInputpassword"
              onChange={this.onpasswordChange}
            />
          </div>
          <div className="container__button">
            <button type="submit" className="btn btn-primary btn-block">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
