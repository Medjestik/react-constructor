import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const login = ({ email, password }) => {
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

export const sendFeedback = (idea, token) => {
  return fetch(`${API_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ idea })
  })
  .then(res => handleResponse(res))
};

export const changePassword = (password, user, token) => {
  return fetch(`${API_URL}/users/${user.id}/change_password`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ password })
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

export const getFgoses = ({ token }) => {
  return fetch(`${API_URL}/fgoses`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const selectFgoses = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_fgoses`, {
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

export const getProfStandarts = ({ token }) => {
  return fetch(`${API_URL}/profstandarts`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createProfStandarts = ({ token, document }) => {
  return fetch(`${API_URL}/profstandarts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const editProfStandarts = ({ token, id, document }) => {
  return fetch(`${API_URL}/profstandarts/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const selectProfStandarts = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_profstandarts`, {
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

export const removeProfStandarts = ({ token, id }) => {
  return fetch(`${API_URL}/profstandarts/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const getJobClassification = ({ token }) => {
  return fetch(`${API_URL}/ekts`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createJobClassification = ({ token, document }) => {
  return fetch(`${API_URL}/ekts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const editJobClassification = ({ token, id, document }) => {
  return fetch(`${API_URL}/ekts/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const selectJobClassification = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_ektses`, {
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

export const removeJobClassification = ({ token, id }) => {
  return fetch(`${API_URL}/ekts/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const getDirectoryJob = ({ token }) => {
  return fetch(`${API_URL}/eks`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createDirectoryJob = ({ token, document }) => {
  return fetch(`${API_URL}/eks`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const editDirectoryJob = ({ token, id, document }) => {
  return fetch(`${API_URL}/eks/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const selectDirectoryJob = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_ekses`, {
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

export const removeDirectoryJob = ({ token, id }) => {
  return fetch(`${API_URL}/eks/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const getWorldSkills = ({ token }) => {
  return fetch(`${API_URL}/ws`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createWorldSkills = ({ token, document }) => {
  return fetch(`${API_URL}/ws`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const editWorldSkills = ({ token, id, document }) => {
  return fetch(`${API_URL}/ws/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const selectWorldSkills = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_world_skills`, {
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

export const removeWorldSkills = ({ token, id }) => {
  return fetch(`${API_URL}/ws/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const getOrganizationRules = ({ token }) => {
  return fetch(`${API_URL}/crs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createOrganizationRules = ({ token, document }) => {
  return fetch(`${API_URL}/crs`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const editOrganizationRules = ({ token, id, document }) => {
  return fetch(`${API_URL}/crs/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ document })
  })
  .then(res => handleResponse(res))
};

export const selectOrganizationRules = ({ token, initialDataVersion, data }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/select_corporate_requirements`, {
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

export const removeOrganizationRules = ({ token, id }) => {
  return fetch(`${API_URL}/crs/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const removeProgramDocument = ({ token, initialDataVersion, id, type }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/unselect_qual_based`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ id, type })
  })
  .then(res => handleResponse(res))
};

export const saveRequirements = ({ token, initialDataVersion, profLevels, userQualification }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/requirements`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ profLevels, userQualification })
  })
  .then(res => handleResponse(res))
};

export const saveDescription = ({ token, initialDataVersion, programDescription }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/description`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ programDescription })
  })
  .then(res => handleResponse(res))
};

export const saveCompetence = ({ token, initialDataVersion, countHours, type }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/results`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ countHours, type })
  })
  .then(res => handleResponse(res))
};

export const createStructurePart = ({ token, initialDataVersion, name }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/dpp_typology_parts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name })
  })
  .then(res => handleResponse(res))
};

export const chooseStructureParts = ({ token, initialDataVersion, id }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/dpp_typology_parts/choose`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ id })
  })
  .then(res => handleResponse(res))
};

export const changeStructurePartsOrder = ({ token, initialDataVersion, order }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/dpp_typology_parts/reorder`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ order })
  })
  .then(res => handleResponse(res))
};

export const editStructurePart = ({ token, initialDataVersion, id, name }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/dpp_typology_parts/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name })
  })
  .then(res => handleResponse(res))
};

export const removeStructurePart = ({ token, initialDataVersion, id }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/dpp_typology_parts/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ id })
  })
  .then(res => handleResponse(res))
};

export const getNsiType = ({ token }) => {
  return fetch(`${API_URL}/nsi_types`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createNsiElem = ({ token, initialDataVersion, elem }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/nsis`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ elem })
  })
  .then(res => handleResponse(res))
};

export const editNsiElem = ({ token, initialDataVersion, elem, id }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/nsis/${id}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ elem })
  })
  .then(res => handleResponse(res))
};

export const removeNsiElem = ({ token, initialDataVersion, id }) => {
  return fetch(`${API_URL}/ish_version_data/${initialDataVersion}/nsis/${id}/destroy`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};





export const getZoon = ({ token, dppId, zoonVersion }) => {
  return fetch(`${API_URL}/dpps/${dppId}/get_zun_version_data/${zoonVersion}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getNsi = ({ token, initialVersionId }) => {
  return fetch(`${API_URL}/ish_version_data/${initialVersionId}/nsis`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addKnowledge = ({ token, zoonVersion, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges`, {
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

export const editKnowledge = ({ token, zoonVersion, nodeId, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/${nodeId}/update`, {
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

export const removeKnowledge = ({ token, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/destroy`, {
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

export const addAbility = ({ token, zoonVersion, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/abilities`, {
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

export const editAbility  = ({ token, zoonVersion, nodeId, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/abilities/${nodeId}/update`, {
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

export const removeAbility = ({ token, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/abilities/destroy`, {
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

export const addSkill = ({ token, zoonVersion, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/skills`, {
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

export const editSkill  = ({ token, zoonVersion, nodeId, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/skills/${nodeId}/update`, {
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

export const removeSkill = ({ token, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/skills/destroy`, {
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

export const disconnectNode = ({ token, zoonVersion, node }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/disconnect`, {
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

export const addLink = ({ token, zoonVersion, nodeId, abilityId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/add_new_link`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeId, abilityId })
  })
  .then(res => handleResponse(res))
};

export const removeLink = ({ token, zoonVersion, nodeId, abilityId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/remove_new_link`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeId, abilityId })
  })
  .then(res => handleResponse(res))
};

export const buildCompetence = ({ token, zoonVersion, node, nodesId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/competences`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ node, nodesId })
  })
  .then(res => handleResponse(res))
};

export const editCompetence = ({ token, zoonVersion, node, competenceId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/competences/${competenceId}/update`, {
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

export const removeCompetence = ({ token, zoonVersion, nodeId }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/competences/destroy`, {
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

export const swapChildren = ({ token, zoonVersion, nodeId, children }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/nodes/${nodeId}/children_order`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ children })
  })
  .then(res => handleResponse(res))
};

export const sortElement = ({ token, zoonVersion, nodeId, elements }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/reorder_upper_level`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ elements })
  })
  .then(res => handleResponse(res))
};

export const changeTypologyKnowledgeOrder = ({ token, zoonVersion, dtpId, order }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/dtps/${dtpId}/reorder`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ order })
  })
  .then(res => handleResponse(res))
};

export const searchKnowledge = ({ token, zoonVersion, text }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/search`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ text })
  })
  .then(res => handleResponse(res))
};

export const addFindKnowledge = ({ token, zoonVersion, knowledge_id }) => {
  return fetch(`${API_URL}/zuns/${zoonVersion}/knowledges/import`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ knowledge_id })
  })
  .then(res => handleResponse(res))
};



