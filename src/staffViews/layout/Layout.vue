<template>
  <div>
    <el-container>
        <el-header style="position:relative;background-color: #23262e;color:white; padding:0;">
          <keep-alive>
            <navbar/><!-- 导航栏 -->
           </keep-alive>
            <NaveTab style="margin-left:180px;margin-top:10px;"></NaveTab>
        </el-header>
        <el-aside class="sidebar-container" style="margin-top:60px;">
          <keep-alive>
            <sidebar/><!-- 侧边栏 -->
          </keep-alive>
        </el-aside>
        <el-main class="main-container" style="min-height:550px;max-height:815px;overflow:scroll;" >
          <keep-alive>
            <!-- tabs-view -->
           
          </keep-alive> 
          <keep-alive>
          <router-view></router-view>
          </keep-alive> 
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
  html,body,p,h1,h2,h3,h4,h5{ padding:0; margin:0;}
#app {
  font-family:'微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body,#app,.el-container{height:100%}
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
