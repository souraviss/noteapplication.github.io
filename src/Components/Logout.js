import React, { Component } from "react";

import { Link, Switch, Route } from "react-router-dom";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("user_token");

    this.props.history.push("/");
  }
  render() {
    return <div className="container">Logout</div>;
  }
}
