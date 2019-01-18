<template>
  <div>
    <el-container>
        <el-aside class="sidebar-container">
          <sidebar/><!-- 侧边栏 -->
        </el-aside>
        <el-main class="main-container" style="min-height:550px;max-height:900px;overflow:scroll;" >
          <el-header>
            <navbar/><!-- 导航栏 -->
          </el-header>
          <app-main/><!-- Body --> 
        </el-main>
      </el-container>
    </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>  //  催收系统全局样式引入
  @import "@/styles/css/mixin.scss";
  @import "@/styles/css/sidebar.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
