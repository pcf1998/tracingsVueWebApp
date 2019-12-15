<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{ messagetitle }}</h3>
    <div class="add-project"><i class="fa fa-plus-circle" @click="addProject"></i>Add Project</div>
    <div id="app1">
      <v-client-table :columns="columns" :data="projects" :options="options">
        <a slot="detail" slot-scope="props" class="fa fa-eye fa-2x" @click="showProject(props.row._id)"></a>
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteProject(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editProject(props.row._id)"></a>
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
  name: 'Projects',
  data () {
    return {
      messagetitle: ' Projects List ',
      projects: [],
      project: [],
      errors: [],
      props: ['_id'],
      columns: ['detail', '_id', 'projectName', 'status', 'teamsNum', 'stagesNum', 'tasksNum', 'lastModifiedTime', 'createdTime', 'edit', 'delete'],
      options: {
        perPage: 25,
        filterable: ['projectName', 'status'],
        sortable: ['_id', 'projectName', 'status', 'teamsNum', 'stagesNum', 'tasksNum', 'lastModifiedTime', 'createdTime'],
        sortIcon: {
          base: 'fa fas',
          is: 'fa-sort',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc'
        },
        headings: {
          detail: 'Detail',
          _id: 'Project ID',
          projectName: 'Project Name',
          status: 'Status',
          teamsNum: 'Teams Number',
          stagesNum: 'Stages Number',
          tasksNum: 'Tasks Number',
          lastModifiedTime: 'Last Modified Time',
          createdTime: 'Created Time',
          edit: 'Edit Name/Status',
          delete: 'Delete'
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
          // console.log(this.projects)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteProject: function (id) {
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
          TrackingService.deleteProject(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              // console.log(this.message)
              this.loadProjects()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Project ' + JSON.stringify(response.data, null, 5), 'success')
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
    editProject: function (id) {
      this.$router.params = id
      this.$router.push('editproject')
    },
    addProject: function () {
      this.$router.push('project')
    },
    showProject: function (id) {
      this.$router.params = id
      this.$router.push('displayproject')
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

    .add-project{
        margin-top: 30px;
        text-align: right;
        font-size: 30pt;
        margin-bottom: 10px;
        margin-right: 5%;
    }
</style>
