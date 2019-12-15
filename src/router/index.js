import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Project from '@/components/Project'
import Teams from '@/components/Teams'
import Tasks from '@/components/Tasks'
import Users from '@/components/Users'
import EditProject from '@/components/EditProject'
import DisplayProject from '@/components/DisplayProject'
import DisplayTeam from '@/components/DisplayTeam'
import AddTeam from '@/components/AddTeam'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/displayproject',
      name: 'DisplayProject',
      component: DisplayProject,
      props: true
    },
    {
      path: '/addteam',
      name: 'AddTeam',
      component: AddTeam
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/displayteam',
      name: 'DisplayTeam',
      component: DisplayTeam,
      props: true
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/editproject',
      name: 'EditProject',
      component: EditProject,
      props: true
    }
  ]
})
