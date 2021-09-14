import { API_URL } from '../config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getProgramStructure = ({ token, dppId, ctId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/get_content_data/${ctId}`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const getContent = ({ token, ctId, themeId, type }) => { 
  return fetch(`${API_URL}/content/${ctId}/${themeId}/${type}`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const uploadContent = ({ token, ctId, themeId, type, file }) => {
  return fetch(`${API_URL}/content/${ctId}/${themeId}/${type}/upload`, {
    method: 'POST', 
    headers: {
      "Accept": "application/json",
      //"Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}`,
    },
    body: file,
  })
  .then(res => handleResponse(res));
};