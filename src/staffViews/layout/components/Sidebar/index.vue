<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :show-timeout="200"
      :default-active="default_url"
      :collapse='isCollapse'
      @select="handleSelect"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/dashboard" >
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/staffCaseManagement" >
        <span slot="title">案件管理</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import store from '@/vuex/store.js'
import router from '@/router.js'

export default {
  watch: {
    '$route':'getPath'
  },
  data(){
    return {
      default_url:"/dashboard"
    }
  },
  mounted(){
    if( this.$route.name != "" ){
        if(this.$route.path !== '/dashboard' && this.$route.path.indexOf('dashboard') === -1) {
          store.commit('add_staff_tabs', {route: '/dashboard', name: '首页'}); 
          store.commit('add_staff_tabs', {route: this.$route.path , name: this.$route.name });
          store.commit('set_staff_active', this.$route.path);
          store.commit('save_index', this.$route.query.num); 
        
        } else {
          store.commit('add_staff_tabs', {route: '/dashboard', name: '首页'});
          store.commit('set_staff_active', '/dashboard');
          this.$router.push('/dashboard');
        }
      }
      console.log(this.$route.path)
      this.default_url = this.$route.path
  },
  computed: {
    isCollapse(){ 
      return false
    }
  },
  methods:{
    getPath(){
      this.default_url = this.$route.path
    },
    handleSelect(key,path){
      router.push({
        path:key
      })
      store.commit('save_staff_index', key)
    },
  }
}
</script>
