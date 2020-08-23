import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };

    this.UserNameChange = this.UserNameChange.bind(this);
    this.PasswordChange = this.PasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UserNameChange(event) {
    this.setState({ userName: event.target.value });
  }
  PasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // const history = useHistory();
    //console.log("A name was submitted: ", this.state);
    event.preventDefault();
    this.fetchdata().then((result) => {
      // console.log("Result would be:--", result);
      localStorage.setItem("user_token", result);
      this.props.history.push("/app");
    });
    // if (data) {
    //   localStorage.setItem("user_token", data);
    //   this.props.history.push("/app");
    // }
    // axios
    //   .get(
    //     `http://15.207.8.251:9200/users/${this.state.userName}/${this.state.password}`
    //   )
    //   .then((resp) => {
    //     console.lof("Result would be:--", resp);
    //   });
    // this.props.history.push("/app");
    // this.context.router.transitionTo("/app");
  }

  async fetchdata() {
    const response = await axios.get(
      `http://15.207.8.251:10051/users/${this.state.userName}/${this.state.password}`
    );
    return response.data;
    //localStorage.setItem("token_data", response.data);
  }
  render() {
    return (
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center">Log in to Codepen</h3>
            <div className="card-text">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={this.state.userName}
                    onChange={this.UserNameChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="exampleInputPassword1"
                    value={this.state.password}
                    onChange={this.PasswordChange}
                  />
                </div>
                <div className="container__button">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign in
                  </button>
                  <a href="#" style={{ float: "right", fontSize: "12px" }}>
                    Forgot password?
                  </a>
                </div>
                <div className="sign-up">
                  Don't have an account? <Link to="/SignUp">Create One</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
