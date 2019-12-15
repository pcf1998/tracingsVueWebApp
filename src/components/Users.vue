<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-users" style="padding: 3px"/>{{ messagetitle }}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="users" :options="options">
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
  name: 'Users',
  data () {
    return {
      messagetitle: ' Staff List ',
      user: [],
      users: [],
      errors: [],
      props: ['_id'],
      columns: ['_id', 'userName', 'status', 'department', 'position', 'gender', 'email', 'age'],
      options: {
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
          age: 'Age'
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
          // console.log(this.users)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    /* showUser: function (id) {
      TrackingService.fetchUser(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.user = response.data
          console.log(this.user)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }, */
    deleteUser: function (id) {
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
          TrackingService.deleteUser(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              // console.log(this.message)
              this.loadUsers()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Staff ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'This Staff still exist!', 'info')
        }
      })
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
</style>
