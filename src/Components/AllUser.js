import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import User from "./user";
export class AllUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  async fetchdata() {
    const localData = localStorage.getItem("user_token");
    const response = await axios.get(`http://15.207.8.251:10051/users`, {
      headers: {
        "auth-token": localData,
      },
    });
    return response.data;
    //localStorage.setItem("token_data", response.data);
  }
  componentDidMount() {
    const userArray = [];
    this.fetchdata().then((result) => {
      userArray.push(result);
      this.setState({ users: userArray });
      console.log("user value", this.state.users);
    });
  }
  render() {
    return (
      <div className="allusers">
        <Header />

        {this.state.users.map((user, index) =>
          user.map((usr) => (
            <div key={index}>
              <User user={{ usr }} key={index} />
              <hr />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default AllUser;
