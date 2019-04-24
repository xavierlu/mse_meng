import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import LoginCompany from "./containers/LoginCompany";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";
import PostForm from "./containers/PostForm";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={PostList} />
    <Route exact path="/posts/:id" component={PostDetail} />
    <Route exact path="/post" component={PostForm} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/login-company/" component={LoginCompany} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/profile/" component={Profile} />
  </Hoc>
);

export default BaseRouter;
