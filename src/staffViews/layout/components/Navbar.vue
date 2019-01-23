<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="system">言通言小信催收员系统</div>
    <el-dropdown class="" trigger="hover">
      <span> {{trueName}}</span>
      <el-dropdown-menu slot="dropdown" style="cursor: pointer;">
        <!-- <router-link class="inlineBlock" to="/dashboard">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link> -->
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import store from '@/vuex/store.js'
import { mapGetters } from 'vuex'
import {axiosRequest,delCookie,setCookie,message} from '@/assets/js/Yt.js'

export default {
  computed: {
    // ...mapGetters([
    //   'avatar'
    // ])
    trueName(){
      return store.state.staffInfo.true_name
    }
  },
  beforeMount() {
    const  conf = {
      url:"/api/api_staff.php?r=login/info",
      success:(data)=>{
          if( data.statusCode == 1 ){
            store.commit( 'set_staff_info', data.info )
          }else if( data.statusCode == 0 ){
              Message({
                  message: data.message,
                  type: 'erro',
                  duration: 3 * 1000
              })
          }
      }
    }
    axiosRequest(conf)
  },
  methods: {
    logout() {//退出登录
        this.$confirm('确认退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const url = "/api/api_staff.php?r=login/logout"
            const conf = {
                url,
                success:(data)=>{
                  if(data.statusCode == 1){
                    store.commit('clearStaffOptions')
                    this.$router.push({path:'/login'})
                    setCookie('staff',"")
                  }else{
                    this.$alert(data.message)
                  }
                }
            }
            axiosRequest(conf)
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消退出'
            })         
        })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu.el-menu--horizontal{border-bottom:0px solid transparent;}

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color:#23262e;
  .system,.el-dropdown{
    position:absolute;
    font-size:18px;
    line-height:60px;
    color:white;
  }
  .system{
    left:20px;
  }
  .el-dropdown{
    right:20px;
    cursor: pointer;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
  
}
</style>

