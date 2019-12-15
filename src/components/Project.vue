<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-plus-circle" style="padding: 3px"/>{{ messagetitle }}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <project-form :project="project" project-btn-title="Add Project" @project-is-created-updated="submitProject"/>
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
      project: {projectName: 'project name', status: 'processing'},
      messagetitle: ' Add Project '
    }
  },
  methods: {
    submitProject: function (project) {
      TrackingService.postProject(project)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
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
