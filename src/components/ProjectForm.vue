<template>
  <form @submit.prevent="submit">
    <div :class="{ 'form-group--error': $v.projectName.$error }" class="form-group">
      <label class="form__label">Project Name</label><p/>
      <input v-model.trim="$v.projectName.$model" class="form__input"></div>
    <div v-if="!$v.projectName.required" class="error">Project name is Required</div>
    <div v-if="!$v.projectName.minLength" class="error">Project name must have at least {{ $v.projectName.$params.minLength.min }} letters.</div><p/>
    <div class="form-group">
      <label class="form-label">Select Project Status</label><p/>
      <select id="status" v-model="status" name="status" class="form-control" type="text">
        <option value="null" selected disabled hidden>Choose Status</option>
        <option value="processing">processing</option>
        <option value="finished">finished</option>
      </select>
    </div>
    <p>
      <button :disabled="submitStatus === 'PENDING'" class="btn btn-primary btn1" type="submit">{{ projectBtnTitle }}</button>
    </p>
    <p>
      <a href="#/projects" class="btn btn-primary btn1" role="button">Manage Projects</a>
    </p>
    <p v-if="submitStatus === 'OK'" class="typo__p">Project Added Successfully!</p>
    <p v-if="submitStatus === 'ERROR'" class="typo__p">Please Enter the Project Name Correctly.</p>
    <p v-if="submitStatus === 'PENDING'" class="typo__p">Adding...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueForm from 'vueform'
// import TrackingService from '@/services/trackingservice'
import {minLength, required} from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'ProjectFormData',
  props: ['projectBtnTitle', 'project'],
  data () {
    return {
      projectName: this.project.projectName,
      status: this.project.status,
      submitStatus: null
    }
  },
  validations: {
    projectName: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var project = {
            projectName: this.projectName,
            status: this.status

          }
          this.project = project
          console.log('Submitting in ProjectForm : ' +
              JSON.stringify(this.project, null, 5))
          this.$emit('project-is-created-updated', this.project)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
    #app1 {
        width: 95%;
        margin: 0 auto;
    }
    .required-field > label::after {
        content: '*';
        color: red;
        margin-left: 0.25rem;
    }
    .project-form .form-control-label.text-left{
        text-align: left;
    }

    label {
        display: inline-block;
        width: 540px;
        text-align: left;
        font-size: x-large;
    }
    .typo__p {
        width: 540px;
        font-size: x-large;
    }
    .btn1 {
        width: 300px;
        font-size: x-large;
    }
    p {
        margin-top: 20px;
    }

    input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
        width: 540px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #157ffb;
        color: whitesmoke;
    }

    .error:focus {
        outline-color: #ffa519;
    }
</style>
