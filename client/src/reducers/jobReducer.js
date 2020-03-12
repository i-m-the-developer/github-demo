import {GET_JOBS,GET_JOB, ADD_JOB, DELETE_JOB,UPDATE_JOB, JOB_LOADING, GET_US_STATES} from '../actions/types';

const initialState = {
    jobs: [],
    loading:false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_US_STATES:
            return {
                ...state,
                usStates:action.payload,
                loading:false
            }
        case GET_JOBS:
            return {
                ...state,
                jobs:action.payload,
                loading:false
            }
        case GET_JOB:
            return {
                ...state,
                jobs:action.payload,
                loading:false
            }
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job._id !== action.payload)
            }
        case ADD_JOB:
            console.log(`jobReducers.js payload>>ADD_JOB`,action.payload);
            console.log(`jobReducers.js state>>ADD_JOB`,...state.jobs);
            return {
                ...state,
                jobs: [action.payload, ...state.jobs]
            }
        case UPDATE_JOB:
            console.log(`jobReducers.js payload>>UPDATE_JOB`,action.payload);
            console.log(`obReducers.js state>>UPDATE_JOB`,...state.jobs);
            return {
                ...state,
                ...action.payload,
                isLoading: false
              }
        case JOB_LOADING:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}