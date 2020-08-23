import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllUser from "./Components/AllUser";
import Logout from "./Components/Logout";
import UserNote from "./Components/UserNote";
import AllNotes from "./Components/AllNotes";
import SignUp from "./Components/SignUp";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/app" component={App} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/alluser" component={AllUser} />
        <Route path="/allnotes" component={AllNotes} />
        <Route path="/usernote/:id" component={UserNote} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
