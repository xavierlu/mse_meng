import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  assignments: [],
  error: null,
  loading: false
};

const getAssignmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    assignments: action.assignments,
    error: null,
    loading: false
  });
};

const getAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSIGNMENT_LIST_START:
      return getAssignmentListStart(state, action);
    case actionTypes.GET_ASSIGNMENT_LIST_SUCCESS:
      return getAssignmentListSuccess(state, action);
    case actionTypes.GET_ASSIGNMENT_LIST_FAIL:
      return getAssignmentListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
