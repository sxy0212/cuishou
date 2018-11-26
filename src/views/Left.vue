<template>
     <el-menu
        default-active="1" :unique-opened="open" @open="handleOpen"
          @close="handleClose"
          @select="handleSelect" router
        class="el-menu-vertical-demo" style="height:100%" background-color="#333744" text-color="#fff"  active-text-color="#ffd04b" >
          <el-menu-item index="/index" key="/index">
            <i class="fa fa-home"></i>
            <span slot="title">首页</span>
          </el-menu-item> 
         
          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-chain"></i>
              <span>账户开通</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/information">客户信息录入</el-menu-item>
              <el-menu-item index="/informationList" >客户信息列表</el-menu-item>
              <el-menu-item index="/equipment">公司设备录入</el-menu-item>
              <el-menu-item index="/equipmentList">公司设备列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="fa fa-bell-o"></i>
              <span>警告</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/balanceAlarm" >余额告警</el-menu-item>
              <el-menu-item index="/robotExpiration">即将到期机器人</el-menu-item>
             <el-menu-item index="/expiredAccount">已过期账户</el-menu-item>
               <!--<el-menu-item index="/workSheet">工单报障</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
           <!--<el-submenu index="4">
            <template slot="title">
              <i class="fa fa-tasks"></i>
              <span>企业管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/openEnterprise">已开通企业</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
         <!--<el-submenu index="4">
            <template slot="title">
              <i class="fa fa-tasks"></i>
              <span>产品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/productList">产品管理</el-menu-item>
              <el-menu-item index="/salesStatistics">已销售统计</el-menu-item>
              <el-menu-item index="/order">待出货订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        <el-menu-item index="/messageGroup">
          <i class="fa fa-comment-o"></i>
          <span slot="title">消息群发</span>
        </el-menu-item>
        <el-menu-item index="/dataStatistics">
          <i class="fa fa-bar-chart"></i>
          <span slot="title">呼叫量统计</span>
        </el-menu-item>
         <el-menu-item index="/activityStatistics">
          <i class="fa fa-line-chart"></i>
          <span slot="title">活跃度统计</span>
        </el-menu-item>
         <el-menu-item index="/flowIncome">
          <i class="fa fa-area-chart"></i>
          <span slot="title">流量收入</span>
        </el-menu-item>
        
        <el-menu-item index="/salesman">
          <i class="fa fa-id-card"></i>
          <span slot="title">业务员录入</span>
        </el-menu-item> 
       <!-- <el-menu-item index="/operatingEquipment">
          <i class="fa fa-cog"></i>
          <span slot="title">运行设备</span>
        </el-menu-item> -->
      </el-menu>       
</template>
<script type="text/ecmascript-6">
import store from '../vuex/store.js'
  export default {
    data(){
      return {
        open:true,
      }
    },
 mounted () {
        //console.log(this)
        if(this.$route.path !== '/index' && this.$route.path.indexOf('index') === -1) {
            store.commit('add_tabs', {route: '/index', name: '首页'}); 
           store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
            store.commit('set_active_index', this.$route.path);
            store.commit('save_index', this.$route.query.num); 
        } else {
           store.commit('add_tabs', {route: '/index', name: '首页'});
            store.commit('set_active_index', '/index');
            this.$router.push('/index');
        }
    },
    
    methods:{
       handleOpen(key, keyPath) {
            store.commit('save_index', key);  
        },
        handleClose(key, keyPath) {
            console.log(key,keyPath);
        },
        handleSelect(key,path){
          console.log(key,path)
          store.commit('save_index', path[1]);
        },
      handleIconClick(ev) {
        console.log(ev);
      },
    },
  }
</script>