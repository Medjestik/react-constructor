import { API_URL } from '../config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getProgramStructure = ({ token, dppId, stId }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/get_st_version_data/${stId}`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const editProgramStructure = ({ token, stId, sectionsId, section }) => { 
  return fetch(`${API_URL}/structure/${stId}/sections/${sectionsId}/update`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ section })
  })
  .then(res => handleResponse(res));
};

export const getProgramZoons = ({ token, stId }) => { 
  return fetch(`${API_URL}/structure/${stId}/zoons`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};
