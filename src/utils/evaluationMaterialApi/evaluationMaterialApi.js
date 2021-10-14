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

export const copyQuestion = ({ token, omId, questionId }) => {
  return fetch(`${API_URL}/om/${omId}/questions/${questionId}/copy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const changeQuestionType = ({ token, omId, questionId, questionType }) => {
  return fetch(`${API_URL}/om/${omId}/questions/${questionId}/change_type`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ questionType })
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

export const getTask = ({ token, omId }) => {
  return fetch(`${API_URL}/om/${omId}/tasks`, {
    method: 'GET', 
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

export const editTask = ({ token, omId, task, taskId }) => { 
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/update`, {
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

export const removeTask = ({ token, omId, taskId }) => { 
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addAssessmentItem = ({ token, omId, taskId, subject }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/subject`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ subject })
  })
  .then(res => handleResponse(res));
};

export const removeAssessmentItem = ({ token, omId, taskId, subjectId }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/subjects/${subjectId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const addAssessmentObject = ({ token, omId, taskId, subjectId, object }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/subjects/${subjectId}/object`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ object })
  })
  .then(res => handleResponse(res));
};


export const editObject = ({ token, omId, taskId, subjectId, object }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/subjects/${subjectId}/object/${object.id}/update`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ object })
  })
  .then(res => handleResponse(res));
};

export const removeObject = ({ token, omId, taskId, subjectId, objectId }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/subjects/${subjectId}/object/${objectId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const selectTaskNsi = ({ token, omId, taskId, nsis }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/nsis/select`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nsis })
  })
  .then(res => handleResponse(res));
};

export const unSelectTaskNsi = ({ token, omId, taskId, nsiId, }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/nsis/${nsiId}/unselect`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const createTaskMTO = ({ token, dppId, mto }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/mtos`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ mto })
  })
  .then(res => handleResponse(res));
};

export const editTaskMTO = ({ token, dppId, mtoId, mto }) => { 
  return fetch(`${API_URL}/dpps/${dppId}/mtos/${mtoId}/update`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ mto })
  })
  .then(res => handleResponse(res));
};



export const removeTaskMTO = ({ token, dppId, mtoId }) => {
  return fetch(`${API_URL}/dpps/${dppId}/mtos/${mtoId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const selectTaskMTO = ({ token, omId, taskId, mtos }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/mtos/select`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ mtos })
  })
  .then(res => handleResponse(res));
};

export const unSelectTaskMTO = ({ token, omId, taskId, mtoId }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/mtos/${mtoId}/unselect`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};

export const uploadAdditionalMaterial = ({ token, omId, taskId, material }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/additional_files`, {
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

export const removeAdditionalMaterial = ({ token, omId, taskId, materialId }) => {
  return fetch(`${API_URL}/om/${omId}/tasks/${taskId}/additional_files/${materialId}/destroy`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res));
};
