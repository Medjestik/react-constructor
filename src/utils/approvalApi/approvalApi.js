import { API_URL } from '../config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getData = ({ token, dppId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/get_approval_data`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const editAnnotation = ({ token, ivId, annotation }) => { 
  return fetch(`${API_URL}/ish_version_data/${ivId}/save_annotation`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ annotation })
  })
  .then(res => handleResponse(res));
};

export const getPerformers = ({ token, dppId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/designers`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addPerformer = ({ token, dppId, performer }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/designers`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ performer })
  })
  .then(res => handleResponse(res));
};

export const editPerformer = ({ token, dppId, performer }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/designers/${performer.id}`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ performer })
  })
  .then(res => handleResponse(res));
};

export const removePerformer = ({ token, dppId, performer }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/designers/${performer.id}`, {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ performer })
  })
  .then(res => handleResponse(res));
};

export const reorderPerformer = ({ token, dppId, ids }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/designers/reorder`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ids })
  })
  .then(res => handleResponse(res));
};

export const getSignatory = ({ token, dppId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/signatory`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const changeSignatory = ({ token, dppId, signatoryFio, signatoryJob }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/signatory`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ signatoryFio, signatoryJob })
  })
  .then(res => handleResponse(res));
};