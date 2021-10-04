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