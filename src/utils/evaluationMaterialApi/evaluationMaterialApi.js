import { API_URL } from '../config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getKnowledges = ({ token, dppId, omId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/get_om_version_data/${omId}`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const createQuestion = ({ token, omId, questionData }) => { 
  return fetch(`${API_URL}/om/${omId}/questions`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ questionData })
  })
  .then(res => handleResponse(res));
};

export const editQuestion = ({ token, omId, questionId, questionData }) => { 
  return fetch(`${API_URL}/om/${omId}/questions/${questionId}/update`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ questionData })
  })
  .then(res => handleResponse(res));
};

export const deleteQuestion = ({ token, omId, questionId }) => { 
  return fetch(`${API_URL}/om/${omId}/questions/${questionId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const createTask = ({ token, omId, task }) => { 
  return fetch(`${API_URL}/om/${omId}/tasks`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ task })
  })
  .then(res => handleResponse(res));
};