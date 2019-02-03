import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getPostListStart = () => {
  return {
    type: actionTypes.GET_POST_LIST_START
  };
};

export const getPostListSuccess = posts => {
  return {
    type: actionTypes.GET_POST_LIST_SUCCESS,
    posts
  };
};

export const getPostListFail = error => {
  return {
    type: actionTypes.GET_POST_LIST_FAIL,
    error: error
  };
};

export const getPosts = token => {
  return dispatch => {
    dispatch(getPostListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios
      .get("http://127.0.0.1:8000/posts/")
      .then(res => {
        const posts = res.data;
        dispatch(getPostListSuccess(posts));
      })
      .catch(err => {
        dispatch(getPostListFail(err));
      });
  };
};

export const getPostDetailStart = () => {
  return {
    type: actionTypes.GET_POST_DETAIL_START
  };
};

export const getPostDetailSuccess = post => {
  return {
    type: actionTypes.GET_POST_DETAIL_SUCCESS,
    post
  };
};

export const getPostDetailFail = error => {
  return {
    type: actionTypes.GET_POST_DETAIL_FAIL,
    error: error
  };
};

export const getPostDetail = (token, id) => {
  return dispatch => {
    dispatch(getPostDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios
      .get(`http://127.0.0.1:8000/posts/${id}/`)
      .then(res => {
        const post = res.data;
        console.log(post);
        dispatch(getPostDetailSuccess(post));
      })
      .catch(err => {
        dispatch(getPostDetailFail(err));
      });
  };
};

export const postStart = () => {
  return {
    type: actionTypes.POST_START
  };
};

export const postSuccess = post => {
  return {
    type: actionTypes.POST_SUCCESS,
    post
  };
};

export const postFail = error => {
  return {
    type: actionTypes.POST_FAIL,
    error: error
  };
};

export const postProject = (token, project) => {
  return dispatch => {
    console.log("start");
    dispatch(postStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios
      .post(`http://127.0.0.1:8000/posts/`, project)
      .then(res => {
        console.log("success");
        dispatch(postSuccess(project));
      })
      .catch(err => {
        dispatch(postFail(err));
      });
  };
};
