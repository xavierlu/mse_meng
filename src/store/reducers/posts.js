import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  posts: [],
  currentPost: {},
  error: null,
  loading: false
};

const getPostListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPostListSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    error: null,
    loading: false
  });
};

const getPostListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export const getPostDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const getPostDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentPost: action.post,
    error: null,
    loading: false
  });
};

export const getPostDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export const postStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const postSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const postFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_LIST_START:
      return getPostListStart(state, action);
    case actionTypes.GET_POST_LIST_SUCCESS:
      return getPostListSuccess(state, action);
    case actionTypes.GET_POST_LIST_FAIL:
      return getPostListFail(state, action);
    case actionTypes.GET_POST_DETAIL_START:
      return getPostDetailStart(state, action);
    case actionTypes.GET_POST_DETAIL_SUCCESS:
      return getPostDetailSuccess(state, action);
    case actionTypes.GET_POST_DETAIL_FAIL:
      return getPostDetailFail(state, action);
    case actionTypes.POST_START:
      return postStart(state, action);
    case actionTypes.POST_SUCCESS:
      return postSuccess(state, action);
    case actionTypes.POST_FAIL:
      return postFail(state, action);
    default:
      return state;
  }
};

export default reducer;
