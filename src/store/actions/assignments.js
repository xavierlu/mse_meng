import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getAssignmentListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_START
  };
};

export const getAssignmentListSuccess = assignments => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_SUCCESS,
    assignments
  };
};

export const getAssignmentListFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_FAIL,
    error: error
  };
};

export const getAssignments = token => {
  return dispatch => {
    dispatch(getAssignmentListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios
      .get("http://127.0.0.1:8000/assignments/")
      .then(res => {
        const assignments = res.data;
        dispatch(getAssignmentListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getAssignmentListFail(err));
      });
  };
};

export const getAssignmentDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START
  };
};

export const getAssignmentDetailSuccess = assignment => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
    assignment
  };
};

export const getAssignmentDetailFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
    error: error
  };
};

export const getAssignmentDetail = (token, id) => {
  return dispatch => {
    dispatch(getAssignmentDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios
      .get(`http://127.0.0.1:8000/assignments/${id}/`)
      .then(res => {
        const assignment = res.data;
        console.log(assignment);
        dispatch(getAssignmentDetailSuccess(assignment));
      })
      .catch(err => {
        dispatch(getAssignmentDetailFail(err));
      });
  };
};

export const postStart = () => {
  return {
    type: actionTypes.POST_START
  };
};

export const postSuccess = assignment => {
  return {
    type: actionTypes.POST_SUCCESS,
    assignment
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
      .post(`http://127.0.0.1:8000/assignments/`, project)
      .then(res => {
        console.log("success");
        dispatch(postSuccess(project));
      })
      .catch(err => {
        dispatch(postFail(err));
      });
  };
};
