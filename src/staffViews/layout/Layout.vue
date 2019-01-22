<template>
  <div>
    <el-container>
        <el-header style="background-color: #23262e;color:white; padding:0;">
          <navbar/><!-- 导航栏 -->
        </el-header>
        <el-aside class="sidebar-container" style="margin-top:60px;">
          <sidebar/><!-- 侧边栏 -->
        </el-aside>
        <el-main class="main-container" style="min-height:550px;max-height:900px;overflow:scroll;" >
          <!-- tabs-view -->
          <NaveTab style=""></NaveTab>
          <app-main/><!-- Body --> 
        </el-main>
      </el-container>
    </div>
</template>
<script>
import { Navbar, Sidebar, AppMain,NaveTab} from './components'


export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    NaveTab
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>  //  催收系统全局样式引入
  @import "@/styles/css/mixin.scss";
  @import "@/styles/css/sidebar.scss";
  .el-main{padding:0;}
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
