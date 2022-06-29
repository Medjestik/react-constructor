import { API_URL } from '../config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getControlUsers = ({ token }) => { 
  return fetch(`${API_URL}/users`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addControlUser = ({ token, user }) => { 
  return fetch(`${API_URL}/users`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ user })
  })
  .then(res => handleResponse(res));
};

export const editControlUser = ({ token, user }) => { 
  return fetch(`${API_URL}/users/${user.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ user })
  })
  .then(res => handleResponse(res));
};

export const deleteControlUser = ({ token, user }) => { 
  return fetch(`${API_URL}/users/${user.id}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getControlPrograms = ({ token }) => { 
  return fetch(`${API_URL}/dpps`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getControlRoles = ({ token }) => { 
  return fetch(`${API_URL}/roles`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addControlProgram = ({ token, dpp }) => { 
  return fetch(`${API_URL}/dpps`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ dpp })
  })
  .then(res => handleResponse(res));
};

export const editControlProgram = ({ token, dpp }) => { 
  return fetch(`${API_URL}/dpps/${dpp.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ dpp })
  })
  .then(res => handleResponse(res));
};

export const deleteControlProgram = ({ token, dpp }) => { 
  return fetch(`${API_URL}/dpps/${dpp.id}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const resetPasswordControlUser = ({ token, user }) => { 
  return fetch(`${API_URL}/users/${user.id}/reset_password`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getControlTypology = ({ token }) => { 
  return fetch(`${API_URL}/typologies`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addControlTypology = ({ token, typology }) => { 
  return fetch(`${API_URL}/typologies`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ typology })
  })
  .then(res => handleResponse(res));
};

export const editControlTypology = ({ token, typology }) => { 
  return fetch(`${API_URL}/typologies/${typology.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ typology })
  })
  .then(res => handleResponse(res));
};

export const deleteControlTypology = ({ token, structure }) => { 
  return fetch(`${API_URL}/typologies/${structure.id}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getFeedback = ({ token }) => { 
  return fetch(`${API_URL}/ideas`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getControlNotice = ({ token }) => { 
  return fetch(`${API_URL}/announcements`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addControlNotice = ({ token, announcement }) => { 
  return fetch(`${API_URL}/announcements`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ announcement })
  })
  .then(res => handleResponse(res));
};

export const editControlNotice = ({ token, announcement }) => { 
  return fetch(`${API_URL}/announcements/${announcement.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ announcement })
  })
  .then(res => handleResponse(res));
};

export const deleteControlNotice = ({ token, notice }) => { 
  return fetch(`${API_URL}/announcements/${notice.id}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};
