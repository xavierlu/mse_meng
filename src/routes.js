import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={AssignmentList} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/profile/" component={Profile} />
  </Hoc>
);

export default BaseRouter;
