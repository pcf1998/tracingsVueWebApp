<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"/>{{ messagetitle }}</h3>
        <div class="project-id">Project ID: {{project._id}}</div>
        <p></p>
        <div class="project-name">Project Name:
            <select v-model="selectedProjectId" @change="loadProject()">
                <option v-for="ProjectDetail in ProjectsDetails" :value="ProjectDetail.id" :key="ProjectDetail.name">{{
                    ProjectDetail.name }}
                </option>
            </select>
        </div>
        <p></p>
        <div class="stages-table-title"><i class="fa fa-users" style="padding: 3px"/>Stages (CLICK CELL TO EDIT)</div>
        <div class="add-stage"><i class="fa fa-plus-circle" @click="addStage"></i>Add Satge</div>
        <div class="stage-table">
            <v-client-table :columns="stagesTableColumns" :data="stagesDetails" :options="stagesTableOptions">
                <div slot="content" slot-scope="props">
                    <span @click="setEditingStageContent" v-if="isEditingStageContent===false">
                        <a>{{props.row.content}}</a>
                    </span>
                    <span v-else>
                        <textarea v-model="props.row.content" style="height: 100%;width: 100%"></textarea>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="editStage(props.row.id,props.row.content)">Submit</button>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="cancelEditingStageContent">Cancel</button>
                    </span>
                </div>
                <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteStage(props.row.id)"></a>
            </v-client-table>
        </div>
        <textarea v-if="addSatgeStatus===true" class="added-stage-input" v-model="addedStage"></textarea>
        <p></p>
        <button v-if="addSatgeStatus===true" class="btn btn-primary btn1" type="submit" @click="submitAddedStage">
            Submit
        </button>
        <button v-if="addSatgeStatus===true" class="btn btn-primary btn1" @click="cancelAddStage">Cancel</button>
        <p></p>
        <div class="stages-table-title"><i class="fa fa-tasks" style="padding: 3px"/>Tasks (CLICK CELL TO EDIT)</div>
        <div class="add-task"><i class="fa fa-plus-circle" @click="addTask"></i>Add Task</div>
        <div class="tasks-table">
            <v-client-table :columns="tasksTableColumns" :data="tasksDetails" :options="tasksTableOptions">
                <div slot="taskName" slot-scope="props">
                    <span @click="setEditingTaskName" v-if="isEditingTaskName===false">
                        <a>{{props.row.taskName}}</a>
                    </span>
                    <span v-else>
                        <textarea v-model="props.row.taskName" style="height: 100%;width: 100%"></textarea>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="submitTaskName(props.row.teamID,props.row._id,props.row.taskName)">Submit</button>
                        <button type="button" class="btn btn-info btn-xs" @click="cancelEditingTaskName">Cancel</button>
                    </span>
                </div>
                <div slot="status" slot-scope="props">
                    <span @click="setEditingTaskStatus" v-if="isEditingTaskStatus===false">
                        <a>{{props.row.status}}</a>
                    </span>
                    <span v-else>
                    <select v-model="props.row.status" type="text">
                        <option value="null" selected disabled hidden>Choose Status</option>
                        <option value="processing">processing</option>
                        <option value="finished">finished</option>
                    </select>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="submitTaskStatus(props.row.teamID,props.row._id,props.row.status)">Submit</button>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="cancelEditingTaskStatus">Cancel</button>
                    </span>
                </div>
                <div slot="taskContent" slot-scope="props">
                    <span @click="setEditingTaskContent" v-if="isEditingTaskContent===false">
                        <a>{{props.row.taskContent}}</a>
                    </span>
                    <span v-else>
                        <textarea v-model="props.row.taskContent" style="height: 100%;width: 100%"></textarea>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="submitTaskContent(props.row.teamID,props.row._id,props.row.taskContent)">Submit</button>
                        <button type="button" class="btn btn-info btn-xs"
                                @click="cancelEditingTaskContent">Cancel</button>
                    </span>
                </div>
                <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x"
                   @click="deleteTask(props.row.teamID,props.row._id)"></a>
            </v-client-table>
        </div>
        <div v-if="addedTaskStatus==true" class="added-task">
            Selected Team:
            <select v-model="addedTask.teamID" @change="selectTeamIDChange">
                <option v-for="teamDetail in teamsDetails" :value="teamDetail.id" :key="teamDetail.teamName">{{
                    teamDetail.teamName }}
                </option>
            </select>
            <p></p>
            Team ID: {{ addedTask.teamID }}
            <p></p>
            Selected Team Member:
            <select v-model="addedTask.membersID">
                <option v-for="staffDetail in staffDetails" :value="staffDetail._id" :key="staffDetail.userName">{{
                    staffDetail.userName }}
                </option>
            </select>
            <p></p>
            Team Member ID: {{ addedTask.membersID }}
            <p></p>
            Enter Task Name: <input type="text" v-model="addedTask.taskName">
            <p></p>
            Enter Task Content: <textarea v-model="addedTask.taskContent"></textarea>
            <p></p>
            <button class="btn btn-primary btn1" type="submit" @click="submitAddedTask">Submit</button>
            <button class="btn btn-primary btn1" @click="cancelAddTask">Cancel</button>
        </div>
        <p></p>
        <div v-if="showTeamMembersStatus==true">
            <div class="staff-table-title"><i class="fa fa-address-book" style="padding: 3px"/>Staff</div>
            <div class="hide-staffTable"><i class="fa fa-eye-slash" @click="hideStaffTable"></i>Hide</div>
            <v-client-table :columns="staffTableColumns" :data="staffDetails" :options="staffTableOptions">
                <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x"></a>
            </v-client-table>
        </div>
        <p></p>
        <div class="team-table-title"><i class="fa fa-users" style="padding: 3px"/>Teams</div>
        <div class="add-team"><i class="fa fa-plus-circle" @click="addTeam"></i>Add Team</div>
        <v-client-table :columns="teamsTableColumns" :data="teamsDetails" :options="teamsTableOptions">
            <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x" @click="showTeam(props.row.id)"></a>
            <a slot="showStaff" slot-scope="props" class="fa fa-child fa-2x" @click="showStaff(props.row.id)"></a>
        </v-client-table>
    </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'DisplayProject',
  data () {
    return {
      messagetitle: ' Project ',
      project: {},
      projects: [],
      ProjectsDetails: [],
      selectedProjectId: this.$router.params,
      stagesDetails: [],
      addedStage: '',
      stages: [],
      addSatgeStatus: false,
      isEditingStageContent: false,
      addedTask: {},
      addedTaskStatus: false,
      tasksDetails: [],
      isEditingTaskName: false,
      isEditingTaskStatus: false,
      isEditingTaskContent: false,
      tasksTableColumns: ['_id', 'taskName', 'status', 'taskContent', 'teamID', 'teamName', 'teamMemberName', 'delete'],
      tasksTableOptions: {
        perPage: 25,
        filterable: ['taskName', 'status', 'taskContent', 'teamName', 'teamMemberName'],
        sortable: ['_id', 'taskName', 'status', 'teamName', 'teamMemberName'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          _id: 'Task ID',
          taskName: 'Task Name',
          status: 'Status',
          taskContent: 'Task Content',
          teamID: 'Team ID',
          teamName: 'Team Name',
          teamMemberName: 'Team Member Name',
          delete: 'Delete'
        },
        editableColumns: ['taskName', 'status']
      },
      team: [],
      teamsDetails: [],
      selectedTeamId: '',
      staffDetails: [],
      teamsTableColumns: ['detail', 'id', 'teamName', 'status', 'tasksNum', 'memberNum', 'showStaff'],
      teamsTableOptions: {
        perPage: 25,
        filterable: ['teamName', 'status'],
        sortable: ['id', 'teamName', 'status', 'tasksNum', 'memberNum'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          detail: 'Detail',
          id: 'Team ID',
          teamName: 'team Name',
          status: 'Status',
          memberNum: 'Members Number',
          showStaff: 'Show Team Members',
          tasksNum: 'Tasks Number'
        }
      },
      showTeamMembersStatus: false,
      staffTableColumns: ['detail', '_id', 'userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
      staffTableOptions: {
        perPage: 25,
        filterable: ['userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
        sortable: ['_id'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          detail: 'Detail',
          _id: 'Staff ID',
          userName: 'Name',
          status: 'Status',
          department: 'Department',
          position: 'Position',
          gender: 'Gender',
          email: 'Email',
          age: 'Age'
        }
      },
      stagesTableColumns: ['id', 'content', 'delete'],
      stagesTableOptions: {
        perPage: 25,
        filterable: [],
        headings: {
          id: 'Stage Sequence',
          content: 'Stage Content',
          delete: 'Delete'
        },
        editableColumns: ['content']
      }
    }
  },
  created () {
    this.loadProjects()
    this.loadProject()
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
            this.ProjectsDetails.push(newProject)
          }
          // console.log(this.ProjectsDetails)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadProject: function () {
      this.stagesDetails = []
      this.tasksDetails = []
      this.teamsDetails = []
      this.staffDetails = []
      TrackingService.fetchProject(this.selectedProjectId)
        .then(response => {
          this.project = response.data

          var tasksIdNum = this.project.tasksID.length
          for (var c = 0; c < tasksIdNum; c++) {
            TrackingService.fetchTaskInProject(this.project._id, this.project.tasksID[c]).then(response => {
              var newTask = {}
              newTask = response.data

              TrackingService.fetchTeam(newTask.teamID).then(response => {
                newTask.teamName = response.data.teamName

                TrackingService.fetchUser(newTask.membersID).then(response => {
                  newTask.teamMemberName = response.data.userName
                  this.tasksDetails.push(newTask)
                })
                  .catch(error => {
                    this.errors.push(error)
                    console.log(error)
                  })
              })
                .catch(error => {
                  this.errors.push(error)
                  console.log(error)
                })
            })
              .catch(error => {
                this.errors.push(error)
                console.log(error)
              })
          }

          for (var b = 0; b < this.project.stages.length; b++) {
            var newStage = {}
            newStage.id = b + 1
            newStage.content = this.project.stages[b]
            this.stagesDetails.push(newStage)
          }

          // console.log('Getting Project in DisplayProject: ' + JSON.stringify(this.project, null, 5))
          var teamsIdNum = this.project.teamsID.length
          for (var a = 0; a < teamsIdNum; a++) {
            TrackingService.fetchTeam(this.project.teamsID[a]).then(response => {
              var newTeam = {}
              newTeam.id = response.data._id
              newTeam.teamName = response.data.teamName
              newTeam.status = response.data.status
              newTeam.memberNum = response.data.memberNum
              newTeam.tasksNum = response.data.tasksNum
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
    showTeam: function (teamId) {
      this.$router.params = teamId
      this.$router.push('displayteam')
    },
    showStaff: function (teamId) {
      this.team = []
      this.staffDetails = []

      TrackingService.fetchTeam(teamId).then(response => {
        this.team = response.data

        var staffIdNum = this.team.teamMembersID.length
        for (var a = 0; a < staffIdNum; a++) {
          TrackingService.fetchUser(this.team.teamMembersID[a]).then(response => {
            var newUser = {}
            newUser._id = response.data._id
            newUser.userName = response.data.userName
            newUser.status = response.data.status
            newUser.department = response.data.department
            newUser.position = response.data.position
            newUser.gender = response.data.gender
            newUser.email = response.data.email
            newUser.age = response.data.age
            this.staffDetails.push(newUser)
          })
            .catch(error => {
              this.errors.push(error)
              console.log(error)
            })
        }
        this.showTeamMembersStatus = true
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    addStage: function () {
      this.addedStage = ''
      this.stages = []
      this.addSatgeStatus = true
    },
    submitAddedStage: function () {
      this.stages.push(this.addedStage)
      var body = {}
      body.stages = this.stages
      // console.log(body)

      TrackingService.postStage(this.project._id, body)
        .then(response => {
          this.stagesDetails = []
          this.addSatgeStatus = false
          this.loadProject()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    cancelAddStage: function () {
      this.addedStage = ''
      this.stages = []
      this.addSatgeStatus = false
    },
    deleteStage: function (id) {
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
          TrackingService.deleteStage(this.project._id, id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              // console.log(this.message)
              this.loadProject()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this stage ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'This stage still exist!', 'info')
        }
      })
    },
    hideStaffTable: function () {
      this.showTeamMembersStatus = false
    },
    setEditingStageContent: function () {
      this.isEditingStageContent = true
    },
    cancelEditingStageContent: function () {
      this.isEditingStageContent = false
      this.loadProject()
    },
    editStage: function (whichStageToModify, stage) {
      var body = {}
      body.stages = stage
      TrackingService.editStage(this.project._id, whichStageToModify, body)
        .then(response => {
          // JSON responses are automatically parsed.
          this.message = response.data
          console.log(this.message)
          this.stagesDetails = []
          this.loadProject()
          this.isEditingStageContent = false
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteTask: function (teamID, taskID) {
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
          TrackingService.deleteTask(this.project._id, teamID, taskID)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              // console.log(this.message)
              this.loadProject()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this task ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'This task still exist!', 'info')
        }
      })
    },
    addTask: function () {
      this.addedTask = {}
      this.addedTaskStatus = true
    },
    selectTeamIDChange: function () {
      this.showStaff(this.addedTask.teamID)
    },
    cancelAddTask: function () {
      this.addedTask = {}
      this.addedTaskStatus = false
    },
    submitAddedTask: function () {
      var body
      body = this.addedTask
      // console.log(body)

      TrackingService.postTask(this.project._id, this.addedTask.teamID, body)
        .then(response => {
          this.addedTaskStatus = false
          this.showTeamMembersStatus = false
          this.loadProject()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    setEditingTaskName: function () {
      this.isEditingTaskName = true
    },
    cancelEditingTaskName: function () {
      this.isEditingTaskName = false
      this.loadProject()
    },
    submitTaskName: function (teamID, taskID, taskName) {
      var body = {}
      body.taskName = taskName

      TrackingService.putTaskName(this.project._id, teamID, taskID, body)
        .then(response => {
          this.isEditingTaskName = false
          this.loadProject()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    setEditingTaskStatus: function () {
      this.isEditingTaskStatus = true
    },
    cancelEditingTaskStatus: function () {
      this.isEditingTaskStatus = false
      this.loadProject()
    },
    submitTaskStatus: function (teamID, taskID, taskStatus) {
      var body = {}
      body.status = taskStatus

      TrackingService.putTaskStatus(this.project._id, teamID, taskID, body)
        .then(response => {
          this.isEditingTaskStatus = false
          this.loadProject()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    setEditingTaskContent: function () {
      this.isEditingTaskContent = true
    },
    cancelEditingTaskContent: function () {
      this.isEditingTaskContent = false
      this.loadProject()
    },
    submitTaskContent: function (teamID, taskID, taskContent) {
      var body = {}
      body.taskContent = taskContent

      TrackingService.putTaskContent(this.project._id, teamID, taskID, body)
        .then(response => {
          this.isEditingTaskContent = false
          this.loadProject()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    addTeam: function () {
      this.$router.params = this.project._id
      this.$router.push('addteam')
    }

  }
}
</script>

<style scoped>
    #app1 {
        width: 95%;
        margin: 0 auto;
    }

    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }

    .project-id {
        text-align: left;
        font-size: 20pt;
    }

    .project-name {
        text-align: left;
        font-size: 20pt;
    }

    .stages-table-title {
        text-align: center;
        font-size: 20pt;
        font-weight: bold;
    }

    .add-stage {
        text-align: right;
        font-size: 20pt;
        margin-right: 5%;
    }

    .add-team {
        text-align: right;
        font-size: 20pt;
        margin-right: 5%;
    }

    .add-task {
        text-align: right;
        font-size: 20pt;
        margin-right: 5%;
    }

    .stage-table {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all
    }

    .added-stage-input {
        width: 40%;
        height: 20%;
    }

    .tasks-table {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all
    }

    .team-table-title {
        text-align: center;
        font-size: 20pt;
        font-weight: bold;
    }

    .staff-table-title {
        text-align: center;
        font-size: 20pt;
        font-weight: bold;
    }

    .hide-staffTable {
        text-align: right;
        font-size: 20pt;
        margin-right: 5%;
    }

    .added-task {
        font-size: 20pt;
    }
</style>
