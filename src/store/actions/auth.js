import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        `${
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:8000"
            : "https://mse5010.herokuapp.com"
        }/rest-auth/login/`,
        {
          email: email,
          password: password
        }
      )
      .then(res => {
        const user = {
          token: res.data.key,
          username: res.data.user_type.username,
          email: email,
          phoneNumber: res.data.user_type.phoneNumber,
          name: res.data.user_type.name,
          userId: res.data.user,
          is_student: res.data.user_type.is_student,
          is_company: res.data.user_type.is_company,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  email,
  phoneNumber,
  name,
  password1,
  password2,
  is_student
) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username,
      email,
      phoneNumber,
      name,
      password1,
      password2,
      is_student,
      is_company: !is_student
    };
    console.log(user);
    axios
      .post(
        `${
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:8000"
            : "https://mse5010.herokuapp.com"
        }/rest-auth/registration/`,
        user
      )
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          email,
          phoneNumber,
          name,
          userId: res.data.user,
          is_student,
          is_company: !is_student,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
