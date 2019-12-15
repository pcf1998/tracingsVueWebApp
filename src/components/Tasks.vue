<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-tasks" style="padding: 3px"/>{{ messagetitle }}</h3>
    <div class="select">
      <select v-model="selectedProjectId" @change="loadTeams()">
        <option v-for="projectDetail in projectsDetails" :value="projectDetail.id" :key="projectDetail.name">{{ projectDetail.name }}</option>
      </select>
      <p/>
      <p>Selected Project ID: {{ selectedProjectId }}</p>
      <p/>
      <select v-model="selectedTeamId" @change="loadTasks()">
        <option v-for="teamDetail in teamsDetails" :value="teamDetail.id" :key="teamDetail.name">
          {{ teamDetail.name }}
        </option>
      </select>
      <p/>
      <p>Selected Team ID: {{ selectedTeamId }}</p>
      <p/>
      <select v-model="selectedTaskId" @change="loadTask()">
        <option v-for="taskDetail in tasksDetails" :value="taskDetail.id" :key="taskDetail.name">
          {{ taskDetail.name }}
        </option>
      </select>
      <p/>
      <p>Selected Task ID: {{ selectedTaskId }}</p>
    </div>
  </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'

export default {
  name: 'Tasks',
  data () {
    return {
      messagetitle: ' Tasks List ',
      projects: [],
      project: [],
      projectsDetails: [],
      teamsDetails: [],
      tasksDetails: [],
      selectedProjectId: '',
      selectedTeamId: '',
      selectedTaskId: '',
      errors: []
    }
  },
  created () {
    this.loadProjects()
  },
  methods: {
    loadProjects: function () {
      TrackingService.fetchProjects()
        .then(response => {
          // JSON responses are automatically parsed.
          this.projects = response.data
          for (var a in this.projects) {
            var newProject = {}
            newProject.id = this.projects[a]._id
            newProject.name = this.projects[a].projectName
            this.projectsDetails.push(newProject)
          }
          // console.log(this.projectsDetails)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadTeams: function () {
      this.teamsDetails = []
      this.tasksDetails = []
      this.selectedTeamId = ''
      this.selectedTaskId = ''
      TrackingService.fetchProject(this.selectedProjectId).then(response => {
        this.project = response.data
        // console.log('teams ID = ' + this.project.teamsID)
        var teamsIdNum = this.project.teamsID.length
        for (var b = 0; b < teamsIdNum; b++) {
          TrackingService.fetchTeam(this.project.teamsID[b]).then(response => {
            var newTeam = {}
            newTeam.id = response.data._id
            newTeam.name = response.data.teamName
            // console.log(newTeam)
            this.teamsDetails.push(newTeam)
          })
            .catch(error => {
              this.errors.push(error)
              console.log(error)
            })
        }
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadTasks: function () {
      this.tasksDetails = []
      this.selectedTaskId = ''
      // console.log('loadTasks() ' + this.selectedTeamId)
      TrackingService.fetchTasks(this.selectedProjectId, this.selectedTeamId).then(response => {
        var tasksIdNum = response.data.length

        for (var c = 0; c < tasksIdNum; c++) {
          TrackingService.fetchTask(this.selectedProjectId, this.selectedTeamId, response.data[c]).then(response => {
            var newTask = {}
            newTask.id = response.data._id
            newTask.name = response.data.taskName
            this.tasksDetails.push(newTask)
          })
            .catch(error => {
              this.errors.push(error)
              console.log(error)
            })
        }
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadTask: function () {
      TrackingService.fetchTask(this.selectedProjectId, this.selectedTeamId, this.selectedTaskId).then(response => {
        console.log(response.data)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }
    .select{
        font-size: 15pt;
    }
</style>
