<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-users" style="padding: 3px"/>{{ messagetitle }}</h3>
    <div class="select">
      <select v-model="selectedProjectId" @change="loadTeams()">
        <option v-for="projectDetail in projectsDetails" :value="projectDetail.id" :key="projectDetail.name">
          {{ projectDetail.name }}
        </option>
      </select>
      <p/>
      <p>Selected Project ID: {{ selectedProjectId }}</p>
      <p/>
    </div>
    <div id="app1">
      <v-client-table :columns="columns" :data="teams" :options="options">
          <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x" @click="showTeam(props.row._id)"></a>
          <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteTeam(props.row._id)"/>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Teams',
  data () {
    return {
      messagetitle: ' Teams List ',
      project: [],
      projects: [],
      projectsDetails: [],
      selectedProjectId: '',
      teams: [],
      error: [],
      columns: ['detail', '_id', 'teamName', 'status', 'memberNum', 'tasksNum', 'lastModifiedTime', 'createdTime', 'delete'],
      options: {
        perPage: 25,
        filterable: ['teamName', 'status'],
        sortable: ['_id', 'teamName', 'status', 'memberNum', 'tasksNum', 'lastModifiedTime', 'createdTime'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          detail: 'Detail',
          _id: 'Team ID',
          teamName: 'Team Name',
          status: 'Status',
          memberNum: 'Members Number',
          tasksNum: 'Tasks Number',
          lastModifiedTime: 'Last Modified Time',
          createdTime: 'Created Time'
        }
      }
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
      this.teams = []
      TrackingService.fetchProject(this.selectedProjectId)
        .then(response => {
          // JSON responses are automatically parsed.
          this.project = response.data
          // console.log(this.project)

          for (var b = 0; b < this.project.teamsNum; b++) {
            TrackingService.fetchTeam(this.project.teamsID[b])
              .then(response => {
                var newTeam = response.data
                // console.log(newTeam)
                this.teams.push(newTeam)
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
    deleteTeam: function (id) {
      this.$swal({
        title: 'Are you totally sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          TrackingService.deleteTeam(this.selectedProjectId, id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              // console.log(this.message)
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Team ' + JSON.stringify(response.data, null, 5), 'success')
              this.teams = []
              this.loadTeams()
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'This Project still exist!', 'info')
        }
      })
    },
    showTeam: function (teamID) {
      this.$router.params = teamID
      this.$router.push('displayteam')
    }
  }
}
</script>

<style scoped>
    #app1 {
        width: 90%;
        margin: 0 auto;
    }

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
