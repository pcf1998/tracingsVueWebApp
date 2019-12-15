<template>
    <div id="app">
        <h1 id="titile">Tracking Web App</h1>
        <div id="inputemail"><label>Email  </label><input type="text" v-model="useremail"></div>
        <div id="inputpwd"><label>Password  </label><input type="password" v-model="userPassword"></div>
        <label class="tell" v-if="isUser===false">Wrong email or password</label>
        <div class="btn-submit">
            <button type="button" class="btn btn-info btn-xs" @click="submitLogin">Login</button>
        </div>

    </div>
</template>

<script>
import TrackingService from '@/services/trackingservice'

export default {
  name: 'Login',
  data () {
    return {
      useremail: '',
      userPassword: '',
      isUser: true
    }
  },
  methods: {
    submitLogin: function () {
      var body = {}
      body.email = this.useremail
      body.userPassword = this.userPassword

      TrackingService.tellUser(body)
        .then(response => {
          if (response.data.code === 0) {
            this.isUser = true
            this.$router.push('/home')
          } else {
            this.isUser = false
          }
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
    #titile {
        text-align: center;
        font-size: 40pt;
        font-weight: bold;
        margin-top: 5%;
    }

    #inputemail{
        text-align: center;
        font-size: 15pt;
        margin-top: 4%;
    }

    #inputpwd{
        text-align: center;
        font-size: 15pt;
        margin-top: 4%;
    }
    .btn-submit{
        text-align: center;
        font-size: 10pt;
        margin-top: 2%;
    }
    .tell{
        text-align: center;
        color: red;
        font-size: 15pt;
        font-weight: bold;
        margin-top: 1%;
    }
</style>
