
<template>
  <div id="app">
     <el-container v-if="$route.meta.keepAlive">
  
      <el-header>
        <keep-alive>
        <!-- 导航栏 -->
          <top></top>
         
        </keep-alive> 
         <NaveTab style="margin-left:250px;">

         </NaveTab> 
      </el-header>
    <el-container v-if="$route.meta.keepAlive">
      <el-aside style="background-color: #EBEBEB;width:250px;">
        <!-- 侧边栏 -->
        <keep-alive>
          <left></left>
        </keep-alive>
      </el-aside>
     
        <el-main style="min-height:550px;max-height:750px;overflow:auto;margin-top:60px;" >
          <!-- Body --> 
          <keep-alive>
          <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
        </el-main>
      
      
    </el-container>
    </el-container>
    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import left from './views/Left'
import top from './views/Top'
import NaveTab from './views/NaveTab/index'
import {axiosRequest,getCookie,setCookie} from '@/assets/js/Yt.js'
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  components:{
    left,
    NaveTab,
    top
  },
  beforeMount() {
    this.upload()
  },
  methods:{
    upload(){     //按F5刷新时
      if(this.$route.path == '/' ){
        this.$router.push("/taskManagement")
      }
    },  
    reload(){            //单页面刷新
    //  location.replace("/#/form");
    // location.reload()
    console.log(this.$route.path)
    this.$router.push(this.$route.path)
      console.log('刷新')
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    } ,

  }
} 
</script>

<style  lang="scss">
html,body,p,h1,h2,h3,h4,h5{ padding:0; margin:0;}
#app {
  font-family:'微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#f2f2f2;
}
	#app .el-header{
			padding:0 0;
	}
  #app a{
    text-decoration: none;
  }
  .el-main{
    background:#f2f2f2;
  }
  ul li{list-style:none;}
  .addTask .el-dialog__body{padding:10px 0px;}
  .addTask .el-dialog{max-width:1000px;min-width:1000px;}
  html,body,#app,.el-container{height:100%}
  .loginForm{
    .el-input__inner{border:none;width:300px;}
    .el-input[data-v-26084dc2]{margin-bottom:0px;}
    .el-tabs__nav{ width: 100%; display: flex;
      .el-tabs__item:nth-child(1){ border-top-left-radius:10px !important }
      .el-tabs__item:nth-child(2),.el-tabs__nav .el-tabs__item:nth-child(2) { border-top-right-radius:10px !important }
    }
    .el-tabs__item{ flex: 5; text-align: center}
  } 
</style>