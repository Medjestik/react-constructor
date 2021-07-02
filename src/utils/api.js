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

export const getProfStandarts = ({ token }) => {
  return fetch(`${API_URL}/profstandarts/get_profstandarts`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const selectProfStandarts = ({ token, dppId, initialDataVersion, data }) => {
  return fetch(`${API_URL}/dpps/${dppId}/update_ish_version_data/${initialDataVersion}/select_profstandarts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ data })
  })
  .then(res => handleResponse(res))
};

export const getZoon = ({ token, dppId, zoonVersion }) => {
  return fetch(`${API_URL}/dpps/${dppId}/get_zun_version_data2/${zoonVersion}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addKnowledge = ({ token, dppId, zoonVersion, node }) => {
  return fetch(`${API_URL}/dpps/${dppId}/add_knowledge_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ node })
  })
  .then(res => handleResponse(res))
};

export const removeKnowledge = ({ token, dppId, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/dpps/${dppId}/remove_knowledge_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeId })
  })
  .then(res => handleResponse(res))
};

export const addAbility = ({ token, dppId, zoonVersion, node }) => {
  return fetch(`${API_URL}/dpps/${dppId}/add_ability_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ node })
  })
  .then(res => handleResponse(res))
};

export const removeAbility = ({ token, dppId, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/dpps/${dppId}/remove_ability_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeId })
  })
  .then(res => handleResponse(res))
};

export const addSkill = ({ token, dppId, zoonVersion, node }) => {
  return fetch(`${API_URL}/dpps/${dppId}/add_skill_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ node })
  })
  .then(res => handleResponse(res))
};

export const removeSkill = ({ token, dppId, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/dpps/${dppId}/remove_skill_new/${zoonVersion}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeId })
  })
  .then(res => handleResponse(res))
};

export const moveNode = ({ token, dppId, elem_type, elem_id, to_type, to_id }) => {
  return fetch(`${API_URL}/dpps/${dppId}/move_elem`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ elem_type, elem_id, to_type, to_id })
  })
  .then(res => handleResponse(res))
};

export const getNsi = ({ token, initialVersionId }) => {
  return fetch(`${API_URL}/nsis/${initialVersionId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};