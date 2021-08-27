import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:
const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_SINGLE_STUDENT = "GOT_SINGLE_STUDENT"


// ACTION CREATORS go here:
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students
});

const gotSingleStudent = student => ({
  type: GOT_SINGLE_STUDENT,
  student: student
})


// THUNK CREATORS go here:
export const fetchStudents = () => async (dispatch) => {
  const { data } = await axios.get('/api/students');
  dispatch(gotStudents(data));
}

export const fetchSingleStudents = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/students/${id}`);
  dispatch(gotSingleStudent(data));
}


const initialState = {
  students: [],
  studnet: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return {
        students: action.students
      }
    case GOT_SINGLE_STUDENT:
      return {
        student: action.student
      }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;
