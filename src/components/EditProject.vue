<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-plus-circle" style="padding: 3px"/>{{ messagetitle }}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <project-form :project="project" project-btn-title="Update Project" @project-is-created-updated="updateProject"/>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'
import ProjectForm from '@/components/ProjectForm'

export default {
  components: {
    'project-form': ProjectForm
  },
  data () {
    return {
      project: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Project '
    }
  },
  created () {
    this.getProject()
  },
  methods: {
    getProject: function () {
      console.log('this.$router.params ' + this.$router.params)
      TrackingService.fetchProject(this.$router.params)
        .then(response => {
          this.temp = response.data
          // console.log(this.temp)
          this.project = this.temp
          this.childDataLoaded = true
          console.log('Getting Project in EditProject: ' + JSON.stringify(this.project, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateProject: function (project) {
      console.log('Before PUT ' + JSON.stringify(project, null, 5))
      TrackingService.putProject(this.$router.params, project)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(project, null, 5))
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
</style>
