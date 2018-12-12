<template>
    <el-menu
      :default-active="default_url" :unique-opened="open" @open="handleOpen"
      @close="handleClose"
      @select="handleSelect" router
      class="el-menu-vertical-demo" 
      style="height:100%" background-color="#333744" text-color="#fff"  active-text-color="#ffd04b" >
      <el-menu-item :index="item.path" v-for="(item,index) in menus" v-if="item.child.length==0" :key="index" class="el-submenu__title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu :index="item.id" v-for="(item,index) in menus" v-if="item.child.length!=0" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="item.path" v-for="(item,index) in item.child" :key="index" >{{item.name}}</el-menu-item>
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
        menus:[],
        default_url:"/charts"
      }
    },
     watch: {
      '$route':'getPath'
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
        if(this.$route.path !== '/charts' && this.$route.path.indexOf('charts') === -1) {
          store.commit('add_tabs', {route: '/charts', name: '首页'}); 
          store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
          store.commit('set_active_index', this.$route.path);
          store.commit('save_index', this.$route.query.num); 
        
        } else {
          store.commit('add_tabs', {route: '/charts', name: '首页'});
          store.commit('set_active_index', '/charts');
          this.$router.push('/charts');
        }
      }
      this.default_url = this.$route.path
    },
    methods:{
      getPath(){
        this.default_url = this.$route.path;
      },
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
<style>

</style>