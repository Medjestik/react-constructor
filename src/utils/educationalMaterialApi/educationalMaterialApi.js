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

export const removeFile = ({ token, ctId, themeId, type }) => {
  return fetch(`${API_URL}/content/${ctId}/${themeId}/${type}/unlink`, {
    method: 'POST', 
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};


export const uploadMaterial = ({ token, ctId, themeId, type, material }) => {
  return fetch(`${API_URL}/content/${ctId}/${themeId}/${type}/additional_files/store`, {
    method: 'POST', 
    headers: {
      "Accept": "application/json",
      //"Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}`,
    },
    body: material,
  })
  .then(res => handleResponse(res));
};

export const removeMaterial = ({ token, ctId, themeId, type, materialId }) => {
  return fetch(`${API_URL}/content/additional_files/${materialId}/destroy`, {
    method: 'POST', 
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

