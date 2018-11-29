<template>
  <section style="overflow:hidden;zoom:1;width:100%;height:100%">
    <div class="note" :style="note">
      <!-- 管理员登录 -->
      <div class="loginForm" > 
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" >
          <el-tab-pane label="管理员登录" name="first" >
            <el-form :model="ruleForm2"  label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <p class="title">
                <img src="/static/image/login_top.png" style="width:25px;height:25px;">
                <span style="margin-left:5px;">言小催管理员</span>
              </p>
              <el-form-item prop="account">
                <div class="input">
                  <img src="/static/image/login_user.png">
                  <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号" autofocus="true"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="checkPass">
                <div class="input">
                  <img src="/static/image/login_pass.png">
                  <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleReset2"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleReset2"> <i class="el-icon-loading" v-show="logining"></i> 立即登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="催收员登录" name="second">
            <el-form :model="ruleForm2"  label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <p class="title">
                <img src="/static/image/login_top.png" style="width:25px;height:25px;">
                <span style="margin-left:5px;">言小催催收员</span>
              </p>
              <el-form-item prop="account">
                <div class="input">
                  <img src="/static/image/login_user.png">
                  <el-input type="text"  auto-complete="off" placeholder="账号"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="checkPass">
                <div class="input">
                  <img src="/static/image/login_pass.png">
                  <el-input type="password"  auto-complete="off" placeholder="密码" @keyup.enter.native="handleReset2"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;"> <i class="el-icon-loading" v-show="logining"></i> 立即登录</el-button>
              </el-form-item>
            </el-form>         
          </el-tab-pane>
        </el-tabs>
      </div>

</div>
  
  
</section>
 
</template>

<script>
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
          password: ''
        },
        checked: true,
        dialogVisible:true
      };
    },
    methods: {
      handleReset2() {
        this.logining = true
        const username = this.ruleForm2.username
        const password = this.ruleForm2.password
        const url = "/api/api_backend.php?r=login/login "
        const conf = {
          url,
          data:{
            username,
            password
          },
          success:(data)=>{
            if(data.statusCode == 1){
              setCookie('user',2);
              this.$router.push({ path: '/taskManagement' });
              this.loading = false
            }else{
              this.$alert(data.message)
              this.logining = false
            }
            message(data)
          }
        }
        axiosRequest(conf)
      },
      handleClick(){

      }
    },
  }

</script>

<style lang="scss" scoped>
  @import'../../static/css/login.scss'
</style>