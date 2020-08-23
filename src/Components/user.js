import React, { Component } from "react";
import "./user.css";
import { Link } from "react-router-dom";
export class User extends Component {
  constructor(props) {
    super(props);
    console.log("mapping value", this.props.user);
    this.state = {
      id: this.props.user.usr._id,
      firstName: this.props.user.usr.firstName,
      lastName: this.props.user.usr.lastName,
      email: this.props.user.usr.email,
      mobileNumber: this.props.user.usr.mobileNumber,
    };
  }

  render() {
    return (
      <div className="user">
        <Link to={`/usernote/${this.state.id}`}>
          <span className="user__name">User Name</span>{" "}
          <h2>{this.state.firstName + " " + this.state.lastName}</h2>
          <p className="user__email">Email: {this.state.email}</p>
          <p className="user__phone">Phone: {this.state.mobileNumber}</p>
        </Link>
      </div>
    );
  }
}

export default User;
