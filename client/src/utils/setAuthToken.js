// ----------------------
// Utils / setAuthToken
// ----------------------

import axios from 'axios'

const setAuthToken = token => {
  // If there is a token in local storage
  if (token) {
    // Set global header
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    // If not token, delete from global header
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken