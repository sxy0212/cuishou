<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
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
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/staffComponents/Breadcrumb'
import Hamburger from '@/components/staffComponents/Hamburger'
import {axiosRequest,delCookie,setCookie} from '@/assets/js/Yt.js'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
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
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
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
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

