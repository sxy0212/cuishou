<template>
<div>
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
          <el-dropdown-item @click.native='changePassword'>修改密码</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="changePasswordNow" v-move>
      <div-dialog
        :passwordObj="passwordObj"
        v-on:protectFn="protectFn($event)"
        v-on:cancelFn="cancelFn($event)"
      ></div-dialog>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/vuex/store.js'
import { Message } from 'element-ui'
import {axiosRequest,delCookie,setCookie,getCookie} from '@/assets/js/Yt.js'
import addChangePassword from '@/staffFunctions/editDialog/addChangePassword.vue'

export default {
  components:{
    'div-dialog':addChangePassword
  },
  data() {
    return {
      changePasswordNow:false,
      passwordObj:{
        old_password:'',
        password:'',
        confirm_pwd:''
      },
      user_name:'',
      trueName:'',
      Plays:false,
      preCaseId:'',//前一个案件id
      newCaseId:"",  //当前案件id
      preCallNum:"",     //前一个呼入号码
      newCallNum:"",    //当前呼入号码
      type:"",          //类型 呼出  呼入  机器人    预测
      unique_id:"",     //uuid
    }
  },
  // computed: {
  //   trueName(){
  //     return store.state.staffInfo.true_name
  //   },
  // },
  beforeMount() {
    const  conf = {
      url:"/api/api_staff.php?r=login/info",
      success:(data)=>{
        if( data.statusCode == 1 ){
          store.commit( 'set_staff_info', data.info )
          this.user_name = data.info.user_name
          this.trueName = data.info.true_name
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
    if( getCookie('staff') ){
      this.getStatus()
    }
  },
  methods: {
    getStatus(){//获取当前状态
      setInterval(()=>{
        if( getCookie('preCaseId') == 'underfined' ){  //前一个状态没有定义时，前一个状态码是100
            this.preCaseId = "100"
        }else{
            this.preCaseId = getCookie('preCaseId') //前一个状态定义时，获取前一个状态
        }
        // if(getCookie("preCallNum") == 'underfined'){ //前一个呼入号码没有定义时，前一个号码是100
        //     preCallNum = "100"
        // }else{
        //     preCallNum =  getCookie("preCallNum")
        // }  
        const conf = {
          url:"/api/api_staff.php?r=cdr-call/handle",
          data:{
              action:"ExtenStatus"
          },
          success:(data)=>{
            if( data.statusCode == 1 ){
              if(data.info.status == 1){
                const url = '/api/api_staff.php?r=cdr-call/answer-phone'
                const conf = {
                  url,
                  data:{case_id:data.info.case_id},
                  success:(data)=>{
                    
                  }
                }
                axiosRequest(conf)
                setCookie('preCaseId',data.info.case_id)  //设置前案件id
                this.newCaseId = data.info.case_id       //当前案件id
                if(this.preCaseId != this.newCaseId){
                    router.push({
                        path:'/caseDetails/',
                        query:{
                            id:this.newCaseId
                        }
                    })
                }
              }
            }
          }
        }
        axiosRequest(conf)
      },1000)
    },
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
          Message({
            message: '取消退出',
            type: 'info',
            duration: 3 * 1000
          })
        })
    },
    changePassword(){//修改密码
      this.changePasswordNow = true
      this.passwordObj = {
        old_password:'',
        confirm_pwd:'',
        password:''
      }
    },
    protectFn(){
      const conf = {
        url:"/api/api_staff.php?r=user-info/change-pwd",
        data:{
          old_password:this.passwordObj.old_password,
          user_name:this.user_name,
          password:this.passwordObj.password,
          confirm_pwd:this.passwordObj.confirm_pwd
        },
        success:(data)=>{
          if( data.statusCode == 1 ){
            this.changePasswordNow = false
            this.passwordObj = {
              old_password:'',
              confirm_pwd:'',
              password:''
            }
            Message({
              message: data.message,
              type: 'success',
              duration: 3 * 1000
            })
          }else if( data.statusCode == 0 ){
            Message({
              message: data.message,
              type: 'error',
              duration: 3 * 1000
            })
          }
        }
      }
      axiosRequest(conf)
    },
    cancelFn(){
      this.changePasswordNow = false
      this.passwordObj = {
        old_password:'',
        user_name:'',
        password:''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu.el-menu--horizontal{
  border-bottom:0px solid transparent;
}
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

