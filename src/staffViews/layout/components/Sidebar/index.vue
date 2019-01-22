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
      <!-- <el-menu-item index="/dashboard" > -->
        <!-- <span slot="title">首页</span> -->
      <!-- </el-menu-item> -->
      <el-menu-item index="/staffCaseManagement" >
        <span slot="title">案件管理</span>
      </el-menu-item>
    </el-menu>
  <!-- </el-scrollbar> -->
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
      default_url:"/staffInfo/index"
    }
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
      console.log('侧边栏点击')
      router.push({
        path:key
      })
      store.commit('save_index', key)
    },
  }
}
</script>
