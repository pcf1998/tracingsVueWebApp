<template>
  <div class="hero">
    <h3 class="vue-title"><i
      class="fa fa-plus-square"
      style="padding: 3px"/>{{ messagetitle }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data () {
    return {
      messagetitle: ' Task '
    }
  }
}
</script>

<style scoped>
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }
</style>
