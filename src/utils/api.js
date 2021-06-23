import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const login= ({ email, password }) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => handleResponse(res));
};

export const getMe = ({ token }) => {
  return fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const updateUserInfo = (userInfoUpdate, token) => {
  return fetch(`${API_URL}/users/update_user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userInfoUpdate })
  })
  .then(res => handleResponse(res))
};

export const getPrograms = ({ token }) => {
  return fetch(`${API_URL}/my_dpps`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getProgramDescription = ({ token, id }) => {
  return fetch(`${API_URL}/dpps/${id}/overview`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getInitialData = ({ token, dppId, initialDataVersion }) => {
  return fetch(`${API_URL}/dpps/${dppId}/get_ish_version_data/${initialDataVersion}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const updateInitialData = ({ token, dppId, initialDataVersion, ish_data }) => {
  return fetch(`${API_URL}/dpps/${dppId}/update_ish_version_data/${initialDataVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ish_data })
  })
  .then(res => handleResponse(res))
};


export const getProfLevels = ({ token }) => {
  return fetch(`${API_URL}/dpps/get_prof_levels`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};
