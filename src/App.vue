<template>
    <div id="app">
        <b-navbar toggleable="md" variant="dark" type="dark">
            <b-navbar-toggle target="nav_collapse"/>
            <img src="./assets/mevnnav.png" class="img-circle" style="padding: 5px">
            <b-navbar-brand to="/">Tracking Web App</b-navbar-brand>
            <b-collapse id="nav_collapse" is-nav>
                <b-navbar-nav v-if="!(path==='/')">
                    <b-nav-item to="/home"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
                    <b-nav-item to="/projects"><i class="fa fa-list" style="padding: 5px"> Projects</i></b-nav-item>
                    <b-nav-item to="/teams"><i class="fa fa-users" style="padding: 5px"> Teams</i></b-nav-item>
                    <b-nav-item to="/tasks"><i class="fa fa-tasks" style="padding: 5px"> Tasks</i></b-nav-item>
                    <b-nav-item to="/users"><i class="fa fa-address-book" style="padding: 5px"> Staff</i></b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>{{weatherDetail.weather[0].description}} in</b-nav-item>
                    <b-nav-item>{{weatherDetail.name}}</b-nav-item>
                    <b-nav-item>IP: {{ip}}</b-nav-item>
                    <b-nav-item v-if="path==='/'"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
                    <b-nav-item @click="logout" v-if="!(path==='/')"><i class="fa fa-sign-out" style="padding: 5px">
                        Logout </i></b-nav-item>
                    <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"/>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="scroll">
            <marquee v-if="scrollstatus" behavior="scroll" direction="left" scrollamount=10 bgcolor="#f5f5f5"
                     onmouseover="this.stop()" onmouseout="this.start()" style="font-size: 20pt;">
                {{currencyDetails}}
            </marquee>
        </div>
        <div>
            <audio src='https://api.uomg.com/api/rand.music' autoplay loop>
            </audio>
        </div>
        <router-view/>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      path: '',
      errors: [],
      ip: '',
      ipDetail: [],
      currencyDetails: [],
      scrollstatus: false,
      weatherDetail: []
    }
  },
  created () {
    this.getIP()
  },
  mounted () {
    this.path = this.$route.path
  },
  watch: {
    $route (to) {
      this.path = to.path
    }
  },
  methods: {
    getIP: function () {
      axios.get('http://ifconfig.me/ip').then(response => {
        this.ip = response.data

        axios.get('https://ipapi.co/' + this.ip + '/json/').then(response => {
          this.ipDetail = response.data

          axios.get('http://www.apilayer.net/api/live?access_key=c9e6d33bd849b6efbcab068ba404be22').then(response => {
            this.currencyDetails = response.data.quotes
            this.scrollstatus = true
          }).catch(error => {
            this.errors.push(error)
            console.log(error)
          })

          axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.ipDetail.latitude + '&lon=' + this.ipDetail.longitude + '&APPID=a24d43b39f2df0687cd139984a2e3e46').then(response => {
            this.weatherDetail = response.data
          }).catch(error => {
            this.errors.push(error)
            console.log(error)
          })
        }).catch(error => {
          this.errors.push(error)
          console.log(error)
        })
      }).catch(error => {
        this.errors.push(error)
        console.log(error)
      })
    },
    logout: function () {
      this.$swal({
        title: 'You want to exit ? ? ?',
        text: 'Do you finish every task?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        // console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          this.$router.push('/')
          this.$swal('Byebye', 'Hope to see you soon', 'success')
        } else {
          // console.log('SWAL Else Result : ' + result.value)
          this.$swal('Good job ! ! !', 'Let\'s make more money!', 'info')
        }
      })
    }
  }

}
</script>

<style>
    #app {
        font-family: 'Times New Roman', 'San Francisco', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-top: 20px;
        background: url("./assets/homerbgyellow.png") no-repeat fixed;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        position: page;
    }

    .VueTables__sortable {
        cursor: pointer;
    }
</style>
