<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-users" style="padding: 3px"/>{{ messagetitle }}</h3>
        <div class="time">
            Last Modified Time: {{team.lastModifiedTime}}
            <p></p>
            Created Time: {{team.createdTime}}
        </div>
        <div class="teamNameAndId">
            Project ID: {{team.projectID}}
            <p></p>
            Project Name: {{project.projectName}}
            <p></p>
            Team ID: {{team._id}}
            <p></p>
            <div v-if="isEditingTeamName===false">Team Name: {{team.teamName}} <i class="fa fa-edit" @click="setEditingTeamName"/></div>
            <div class="teamNameUpdate" v-if="isEditingTeamName===true">
                Team Name: <input type="text" v-model="team.teamName">
                <button class="btn btn-primary btn1" type="submit" @click="updateTeamName">Submit</button>
                <button class="btn btn-primary btn1" @click="cancelUpdateTeam">Cancel</button>
            </div>
            <p></p>
            <div v-if="isEditingTeamStatus===false">Status: {{team.status}} <i class="fa fa-edit" @click="setEditingTeamStatus"/></div>
            <div class="teamStatusUpdate" v-if="isEditingTeamStatus===true">
            Status:
            <select v-model="team.status" type="text">
                <option value="off">off</option>
                <option value="on">on</option>
            </select>
                <button class="btn btn-primary btn1" type="submit" @click="updateTeamStatus">Submit</button>
                <button class="btn btn-primary btn1" @click="cancelUpdateTeam">Cancel</button>
            </div>
        </div>
        <div class="staff-table-title"><i class="fa fa-address-book" style="padding: 3px"/>Team Members</div>
        <div class="add-team-member" @click="addTeamMember"><i class="fa fa-plus-circle"></i>Add Team Member</div>
        <div class="select-user" v-if="isAddingTeamMember===true">
            <select v-model="selectedUserId">
                <option v-for="user in users" :value="user._id" :key="user.userName">{{ user.userName }}</option>
            </select>
            <p/>
            <p>Selected Team Member ID: {{ selectedUserId }}</p>
            <button class="btn btn-primary btn1" type="submit" @click="submitAddedTeamMember">Submit</button>
            <button class="btn btn-primary btn1" @click="cancelAddTeamMember">Cancel</button>
        </div>
        <p></p>
        <v-client-table :columns="staffTableColumns" :data="staffDetails" :options="staffTableOptions">
            <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteTeamMember(props.row._id)"></a>
        </v-client-table>

        <div class="tasks-table-title"><i class="fa fa-tasks" style="padding: 3px"/>Tasks</div>
        <v-client-table :columns="tasksTableColumns" :data="tasksDetails" :options="tasksTableOptions">
            <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x" @click="showTask"></a>
        </v-client-table>

    </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'

export default {
  name: 'DisplayTeam',
  data () {
    return {
      messagetitle: ' Team ',
      errors: [],
      project: {},
      team: {},
      isEditingTeamName: false,
      isEditingTeamStatus: false,
      teamID: this.$router.params,
      tasksDetails: [],
      tasksTableColumns: ['detail', '_id', 'taskName', 'status', 'taskContent', 'teamMemberName'],
      tasksTableOptions: {
        perPage: 25,
        filterable: ['_id', 'taskName', 'status', 'taskContent', 'teamMemberName'],
        sortable: ['_id', 'taskName', 'status', 'taskContent', 'teamMemberName'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          detail: 'Detail',
          _id: 'Task ID',
          taskName: 'Task Name',
          status: 'Status',
          taskContent: 'Task Content',
          teamMemberName: 'Team Member Name'
        }
      },
      users: [],
      selectedUserId: '',
      isAddingTeamMember: false,
      staffDetails: [],
      staffTableColumns: ['_id', 'userName', 'status', 'department', 'position', 'gender', 'email', 'age', 'delete'],
      staffTableOptions: {
        perPage: 25,
        filterable: ['userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
        sortable: ['_id', 'userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          _id: 'Staff ID',
          userName: 'Name',
          status: 'Status',
          department: 'Department',
          position: 'Position',
          gender: 'Gender',
          email: 'Email',
          age: 'Age',
          delete: 'Delete'
        }
      }
    }
  },
  created () {
    this.loadUsers()
    this.loadTeam()
  },
  methods: {
    loadUsers: function () {
      TrackingService.fetchUsers()
        .then(response => {
          // JSON responses are automatically parsed.
          this.users = response.data
          // console.log(this.users)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadTeam: function () {
      this.staffDetails = []
      this.tasksDetails = []

      TrackingService.fetchTeam(this.teamID)
        .then(response => {
          this.team = response.data
          console.log(JSON.stringify(this.team, null, 5))

          TrackingService.fetchProject(this.team.projectID)
            .then(response => {
              this.project = response.data
            })
            .catch(error => {
              this.errors.push(error)
              console.log(error)
            })

          var tasksIdNum = this.team.tasksID.length
          for (var c = 0; c < tasksIdNum; c++) {
            TrackingService.fetchTaskInTeam(this.team.projectID, this.team._id, this.team.tasksID[c]).then(response => {
              var newTask = {}
              newTask = response.data

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
          }

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
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    showTask: function () {
      this.$router.params = this.team.projectID
      this.$router.push('displayproject')
    },
    setEditingTeamName: function () {
      this.isEditingTeamName = true
    },
    updateTeamName: function () {
      var body = {}
      body.teamName = this.team.teamName
      TrackingService.putTeamName(this.team.projectID, this.team._id, body).then(response => {
        this.isEditingTeamName = false
        this.loadTeam()
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateTeamStatus: function () {
      var body = {}
      body.status = this.team.status
      TrackingService.putTeamStatus(this.team.projectID, this.team._id, body).then(response => {
        this.isEditingTeamStatus = false
        this.loadTeam()
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    setEditingTeamStatus: function () {
      this.isEditingTeamStatus = true
    },
    cancelUpdateTeam: function () {
      this.isEditingTeamName = false
      this.isEditingTeamStatus = false
      this.loadTeam()
    },
    addTeamMember: function () {
      this.isAddingTeamMember = true
      this.loadUsers()
    },
    cancelAddTeamMember: function () {
      this.users = []
      this.selectedUserId = ''
      this.isAddingTeamMember = false
    },
    submitAddedTeamMember: function () {
      var body = {}
      body.teamMembersID = []
      body.teamMembersID.push(this.selectedUserId)

      TrackingService.postTeamMember(this.team.projectID, this.team._id, body).then(response => {
        this.users = []
        this.selectedUserId = ''
        this.isAddingTeamMember = false
        this.loadTeam()
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteTeamMember: function (teamMemberID) {
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
          TrackingService.deleteTeamMemberinTeam(this.team.projectID, this.team._id, teamMemberID).then(response => { // JSON responses are automatically parsed.
            this.message = response.data
            // console.log(this.message)
            this.loadTeam()
            // Vue.nextTick(() => this.$refs.vuetable.refresh())
            this.$swal('Deleted', 'You successfully deleted this Team Member ' + JSON.stringify(response.data, null, 5), 'success')
          })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'This Team Member still exist!', 'info')
        }
      })
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

    .time{
        text-align: right;
        font-size: 15pt;
    }

    .teamNameAndId{
        text-align: left;
        font-size: 20pt;
    }

    .staff-table-title {
        text-align: center;
        font-size: 20pt;
        font-weight: bold;
    }

    .add-team-member {
        text-align: right;
        font-size: 20pt;
    }

    .tasks-table-title {
        text-align: center;
        font-size: 20pt;
        font-weight: bold;
    }
    .select-user {
        font-size: 20pt;
    }
</style>
