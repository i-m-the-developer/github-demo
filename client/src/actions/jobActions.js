import axios from "axios";
import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  JOB_LOADING,
  GET_US_STATES
} from "../actions/types";
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getJobs = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get("/api/jobs")
    .then(res => {
      dispatch({ 
          type: GET_JOBS, 
          payload: res.data 
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteJob = id => (dispatch, getState) => {
  axios
    .delete(`/api/jobs/${id}`,tokenConfig(getState))//can be done like this too : '/api/items/':id
    .then(res => {
      dispatch({
          type:DELETE_JOB,
          payload:id
      })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const getJob = id => (dispatch, getState) => {
    axios
      .delete(`/api/jobs/${id}`,tokenConfig(getState))//can be done like this too : '/api/items/':id
      .then(res => {
        dispatch({
            type:GET_JOB,
            payload:id
        })
      })
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  };
export const addJob = job => (dispatch, getState) => {
  console.log(`value in jobActions.js`,job);
  axios
    .post("/api/jobs", job, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_JOB,
        payload: res.data
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const setItemLoading = () => {
  return {
    type: JOB_LOADING
  };
};
export const updateJob = job => (dispatch, getState) => {
  console.log(`value in jobActions.js`,job);
  axios
    .post("/api/jobs", job, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_JOB,
        payload: res.data
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const getUSStates = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get("/states.json")
    .then(res => {
      dispatch({ 
          type: GET_US_STATES, 
          payload: res.data 
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};