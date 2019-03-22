<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  html,body,#app,section{ width:100%;height:100%}
  
  .addTask1 .el-dialog{width:75%;max-width:75%;background:#f2f2f2}
  .export .el-dialog{width:30%;max-width:30%;}
</style>
