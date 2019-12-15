<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-users" style="padding: 3px"/>{{ messagetitle }}</h3>
        <div class="input-teamname">
            <label>Enter Team Name</label>
            <input type="text" v-model="teamName">
        </div>
        <p></p>
        <div class="select-teammembers">
            <label>Select Team Member</label>
            <select v-model="selectedUserId">
                <option v-for="userDetail in usersDetails" :value="userDetail.id" :key="userDetail.name">
                    {{ userDetail.name }}
                </option>
            </select>
            <i class="fa fa-plus-circle" @click="addTeamMember"></i>
        </div>

        <div v-if="teamMembersID.length>0">
            <div class="staff-table-title"><i class="fa fa-address-book" style="padding: 3px"/>Team Members</div>
            <v-client-table :columns="teamMemebrsTableColumns" :data="showTeamMemers"
                            :options="teamMemebrsTableOptions">
                <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x"
                   @click="deleteTeamMember(props.row._id)"></a>
                <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x"></a>
            </v-client-table>
            <button class="btn btn-primary btn1" type="submit" @click="submitAddTeam">Submit</button>
        </div>

    </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'AddTeam',
  data () {
    return {
      messagetitle: ' Add Team ',
      selectedProjectId: this.$router.params,
      selectedUserId: '',
      teamName: '',
      users: [],
      usersDetails: [],
      teamMembersID: [],
      showTeamMemers: [],
      teamMemebrsTableColumns: ['_id', 'userName', 'status', 'department', 'position', 'gender', 'email', 'age', 'delete'],
      teamMemebrsTableOptions: {
        perPage: 10,
        filterable: ['userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
        sortable: ['_id'],
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
  },
  methods: {
    loadUsers: function () {
      TrackingService.fetchUsers()
        .then(response => {
          // JSON responses are automatically parsed.
          this.users = response.data
          for (var a in this.users) {
            var newUser = {}
            newUser.id = this.users[a]._id
            newUser.name = this.users[a].userName
            this.usersDetails.push(newUser)
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    addTeamMember: function () {
      this.teamMembersID.push(this.selectedUserId)

      TrackingService.fetchUser(this.selectedUserId).then(response => {
        this.showTeamMemers.push(response.data)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteTeamMember: function (userID) {
      this.removeByVal(this.teamMembersID, userID)

      this.showTeamMemers = []
      for (var b = 0; b < this.teamMembersID.length; b++) {
        TrackingService.fetchUser(this.teamMembersID[b]).then(response => {
          this.showTeamMemers.push(response.data)
        })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    },
    removeByVal: function (arrylist, val) {
      for (var i = 0; i < arrylist.length; i++) {
        if (arrylist[i] === val) {
          arrylist.splice(i, 1)
          break
        }
      }
    },
    submitAddTeam: function () {
      var body = {}
      body.teamName = this.teamName
      body.teamMembersID = this.teamMembersID
      TrackingService.postTeam(this.selectedProjectId, body).then(response => {
        console.log(JSON.stringify(response.data), null, 5)
        this.$router.params = this.selectedProjectId
        this.$router.push('displayproject')
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

    .input-teamname {
        text-align: center;
        font-size: 20pt;
    }

    .select-teammembers {
        text-align: center;
        font-size: 20pt;
    }
</style>
