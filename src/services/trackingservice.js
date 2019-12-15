import Api from '@/services/api'

export default {
  tellUser (body) {
    return Api().post('/login', body,
      {headers: {'Content-type': 'application/json'}})
  },
  fetchProjects () {
    return Api().get('/tracings')
  },
  postProject (project) {
    return Api().post('/tracings', project,
      {headers: {'Content-type': 'application/json'}})
  },
  deleteProject (id) {
    return Api().delete(`/tracings/${id}`)
  },
  fetchProject (id) {
    return Api().get(`/tracings/${id}`)
  },
  putProject (id, project) {
    console.log('REQUESTING ' + project._id + ' ' +
            JSON.stringify(project, null, 5))
    return Api().put(`/tracings/${id}`, project,
      { headers: {'Content-type': 'application/json'} })
  },
  postStage (projectID, body) {
    return Api().post(`/tracings/${projectID}/stages`, body,
      {headers: {'Content-type': 'application/json'}})
  },
  postTask (projectID, teamID, body) {
    return Api().post(`/tracings/${projectID}/teams/${teamID}/tasks`, body,
      {headers: {'Content-type': 'application/json'}})
  },
  putTaskName (projectID, teamID, taskID, body) {
    return Api().put(`/tracings/${projectID}/teams/${teamID}/tasks/${taskID}/taskName`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  putTaskStatus (projectID, teamID, taskID, body) {
    return Api().put(`/tracings/${projectID}/teams/${teamID}/tasks/${taskID}/taskStatus`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  putTaskContent (projectID, teamID, taskID, body) {
    return Api().put(`/tracings/${projectID}/teams/${teamID}/tasks/${taskID}/taskContent`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  editStage (projectID, whichStageToModify, body) {
    return Api().put(`/tracings/${projectID}/stages/${whichStageToModify}`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteStage (projectID, whichStageToDelete) {
    return Api().delete(`/tracings/${projectID}/stages/${whichStageToDelete}`)
  },
  fetchTeam (teamId) {
    return Api().get(`/teams/${teamId}`)
  },
  postTeam (projectID, body) {
    return Api().post(`/tracings/${projectID}/teams`, body,
      {headers: {'Content-type': 'application/json'}})
  },
  putTeamName (projectID, teamID, body) {
    return Api().put(`/tracings/${projectID}/teams/${teamID}/teamName`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  putTeamStatus (projectID, teamID, body) {
    return Api().put(`/tracings/${projectID}/teams/${teamID}/teamStatus`, body,
      { headers: {'Content-type': 'application/json'} })
  },
  postTeamMember (projectID, teamID, body) {
    return Api().post(`/tracings/${projectID}/teams/${teamID}/teamMembersID`, body,
      {headers: {'Content-type': 'application/json'}})
  },
  deleteTeamMemberinTeam (projectID, teamID, teamMemberID) {
    return Api().delete(`/tracings/${projectID}/teams/${teamID}/teamMembersID/${teamMemberID}`)
  },
  fetchTasks (projectId, teamId) {
    return Api().get(`/tracings/${projectId}/teams/${teamId}/tasks`)
  },
  fetchTask (projectId, teamId, taskId) {
    return Api().get(`/tracings/${projectId}/teams/${teamId}/tasks/${taskId}`)
  },
  fetchTaskInProject (projectId, taskId) {
    return Api().get(`/tracings/${projectId}/tasks/${taskId}`)
  },
  fetchTaskInTeam (projectId, teamId, taskId) {
    return Api().get(`/tracings/${projectId}/teams/${teamId}/tasks/${taskId}`)
  },
  deleteTask (projectID, teamID, taskID) {
    return Api().delete(`/tracings/${projectID}/teams/${teamID}/tasks/${taskID}`)
  },
  deleteTeam (projectId, teamId) {
    return Api().delete(`/tracings/${projectId}/teams/${teamId}`)
  },
  fetchUsers () {
    return Api().get(`/users`)
  },
  fetchUser (userId) {
    return Api().get(`/users/${userId}`)
  }
}
