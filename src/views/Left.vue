<template>
    <el-menu
      default-active="1" :unique-opened="open" @open="handleOpen"
      @close="handleClose"
      @select="handleSelect" router
      class="el-menu-vertical-demo" 
      style="height:100%" background-color="#333744" text-color="#fff"  active-text-color="#ffd04b" >
      <el-menu-item :index="item.path" v-for="(item,index) in menus" v-if="item.child.length==0" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu :index="item.id" v-for="(item,index) in menus" v-if="item.child.length!=0" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.path" v-for="(item,index) in item.child" :key="index">{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
    </el-menu>       
</template>
<script type="text/ecmascript-6">
import  { axiosRequest } from '@/assets/js/Yt.js'
import store from '@/vuex/store.js'
  export default {
    data(){
      return {
        open:true,
        menus:[]
      }
    },
    mounted () {
      let conf = {
          url : '/api/api_backend.php?r=system-setting/load-menu',
          success:(data)=>{
            if( data.statusCode == 1 ){
              this.menus=data.info
            }
          }
      }
      axiosRequest(conf)
      if(this.$route.name != ""){
        if(this.$route.path !== '/taskManagement' && this.$route.path.indexOf('taskManagement') === -1) {
          store.commit('add_tabs', {route: '/taskManagement', name: '任务管理'}); 
          store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
          store.commit('set_active_index', this.$route.path);
          store.commit('save_index', this.$route.query.num); 
        
        } else {
          store.commit('add_tabs', {route: '/taskManagement', name: '任务管理'});
          store.commit('set_active_index', '/taskManagement');
          this.$router.push('/taskManagement');
        }
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        store.commit('save_index', key); 
      },
      handleClose(key, keyPath) {
        console.log(key,keyPath)
      },
      handleSelect(key,path){
        console.log(key,path)
        store.commit('save_index', path[1])
      },
      handleIconClick(ev) {
        console.log(ev)
      },
    },
  }
</script>