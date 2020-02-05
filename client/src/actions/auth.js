// -----------------
// Actions / auth
// -----------------

import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types'
import setAuthToken from '../utils/setAuthToken'
import reducers from '../reducers'


// Load user
export const loadUser = () => async dispatch => {
  // Check local storage and set header with token
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  // Make request
  try {
    const res = await axios.get('/api/auth')
    // Dispatch user loaded & send user as payload to action type in reducer
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

  } catch (err) {

    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }

}