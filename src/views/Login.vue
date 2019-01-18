<template>
  <section style="overflow:hidden;zoom:1;width:100%;height:100%">
    <div class="note" :style="note">
      <!-- 管理员登录 -->
      <div class="loginForm" > 
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" >
          <el-tab-pane label="管理员登录" name="first" >
            <el-form :model="ruleForm2"  label-width="0px">
              <p class="title">
                <img src="static/image/login_top.png" style="width:25px;height:25px;">
                <span style="margin-left:5px;">言小信管理员</span>
              </p>
              <el-form-item prop="account">
                <div class="input" style="display: flex;border:1px solid #409EFF;border-radius: 20px;margin-bottom: 20px;">
                  <img src="static/image/login_user.png" style="width:20px;height:20px;margin-left: 25px;margin-top:10px;">
                  <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号" autofocus="true"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="checkPass">
                <div class="input" style="display: flex;border:1px solid #409EFF;border-radius: 20px;margin-bottom: 20px;">
                  <img src="static/image/login_pass.png" style="width:20px;height:20px;margin-left: 25px;margin-top:10px;">
                  <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleReset2"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleReset2"> <i class="el-icon-loading" v-show="logining"></i> 立即登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="催收员登录" name="second">
            <el-form :model="ruleForm2"  label-width="0px">
              <p class="title">
                <img src="static/image/login_top.png" style="width:25px;height:25px;">
                <span style="margin-left:5px;">言小信催收员</span>
              </p>
              <el-form-item>
                <div class="input" style="display: flex;border:1px solid #409EFF;border-radius: 20px;margin-bottom: 20px;">
                  <img src="static/image/login_user.png" style="width:20px;height:20px;margin-left: 25px;margin-top:10px;">
                  <el-input type="text"  v-model='ruleForm2.account' auto-complete="off" placeholder="账号"></el-input>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="input" style="display: flex;border:1px solid #409EFF;border-radius: 20px;margin-bottom: 20px;">
                  <img src="static/image/login_pass.png" style="width:20px;height:20px;margin-left: 25px;margin-top:10px;">
                  <el-input type="password"  auto-complete="off" placeholder="密码" v-model='ruleForm2.accountPassword' @keyup.enter.native="handleLoginStaff"></el-input>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="input" style="display: flex;border:1px solid #409EFF;border-radius: 20px;margin-bottom: 20px;">
                  <img src="static/image/runNumber.png" style="width:20px;height:20px;margin-left: 25px;margin-top:10px;">
                  <el-input type="password"  auto-complete="off" placeholder="分机号" v-model='ruleForm2.StaffId' @keyup.enter.native="handleLoginStaff"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleLoginStaff"> <i class="el-icon-loading" v-show="logining"></i> 立即登录</el-button>
              </el-form-item>
            </el-form>         
          </el-tab-pane>  
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@/vuex/store.js'
import axios from "axios"
import {axiosRequest,getCookie,setCookie,message} from '@/assets/js/Yt.js'


export default {
  data() {
    return { 
      note: {
        width:'100%',
        height:'100%',
        backgroundImage: "url(" + require("../../static/image/login_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize:'100% 100%',
        overflow:'hidden'
      },
      activeName:'first',
      logining: false,
      ruleForm2: {
        username: '',
        password: '',
        StaffId:'',
        UserName:'',
        Password:''
      },
      checked: true,
      dialogVisible:true
    };
  },
  methods: {
    handleReset2() {//管理登录
      this.logining = true
      const username = this.ruleForm2.username
      const password = this.ruleForm2.password
      const url = "/api/api_backend.php?r=login/login"
      const conf = {
        url,
        data:{
          username,
          password
        },
        success:(data)=>{
          if(data.statusCode == 1){
            setCookie('user',2);
            this.$router.push({ path: '/charts' })
            this.loading = false
          }else{
            this.$alert(data.message)
            this.logining = false
          }
          // message(data)
        }
      }
      axiosRequest(conf)
    },
    handleLoginStaff(){
      //催收员登录
      let conf = {
        url:"/api/api_staff.php?r=login/index",
        data:{
          UserName:this.ruleForm2.account? this.ruleForm2.account.trim() : '',
          Password:this.ruleForm2.accountPassword? this.ruleForm2.accountPassword : '',
          StaffId:this.ruleForm2.StaffId? this.ruleForm2.StaffId.trim() : ''
        },
        success:(data)=>{
          if( data.statusCode == 1 ){
            setCookie('staff','yes');
            this.$router.push({ path: '/staffInfo/index' })
            this.loading = false
          }else if(data.statusCode == 0){
            this.$alert(data.message)
            this.logining = false
          }
        }
      }
      axiosRequest(conf)
    },
    handleClick(){

    },
  },
}
</script>

  

<style rel="stylesheet/scss" lang="scss" scoped>
  @import'@/styles/css/login.scss'
</style>