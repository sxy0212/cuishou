import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from "./views/Index.vue";

// import Home from './views/Home.vue'
// import Main from './views/Main.vue'
import angetOpen from './views/nav1/angetOpen.vue'
import Form from './views/nav1/Form.vue'
import Information from './views/nav1/information.vue'
import informationList from './views/nav1/informationList.vue'
import Equipment from './views/nav1/equipment.vue'
import equipmentList from './views/nav1/equipmentList.vue'
import openEnterprise from './views/nav2/openEnterprise.vue'
import dataStatistics from "./views/nav3/dataStatistics.vue"
import flowIncome from './views/nav3/flowIncome.vue'
import activityStatistics from './views/nav3/activityStatistics.vue'
import operatingEquipment from './views/nav3/operatingEquipment.vue'
import salesman from './views/nav3/salesman.vue'
import productList from './views/nav4/productList.vue'
import order from './views/nav4/order.vue'
import salesStatistics from './views/nav4/salesStatistics.vue'
import dataShow from './views/dataShow.vue'

import balanceAlarm from './views/nav5/balanceAlarm.vue'
import robotExpiration from './views/nav5/robotExpiration.vue'
import expiredAccount from './views/nav5/expiredAccount.vue'
import workSheet from './views/nav5/workSheet.vue'
import messageGroup from './views/nav5/messageGroup.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import echarts from './views/charts/echarts.vue'
import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/assets/js/Yt.js'
Vue.use(Router)
let routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/index',
    name: '首页',
    component: Index,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/dataShow',
    name: '投影菜单',
    component: dataShow,
    meta: {
      keepAlive: true,
    }
  },
  {
    path:"/information",
    name:'客户信息录入',
    component:Information,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/informationList",
    name:'客户信息列表',
    component:informationList,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/equipment",
    name:"公司设备",
    component:Equipment,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/equipmentList",
    name:"公司设备列表",
    component:equipmentList,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/balanceAlarm",
    name:"余额告警",
    component:balanceAlarm,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/robotExpiration",
    name:"即将到期机器人",
    component:robotExpiration,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/expiredAccount",
    name:"已过期账户",
    component:expiredAccount,
    meta:{
      keepAlive:true
    }
  },
  {
    path:"/workSheet",
    name:"工单报障",
    component:workSheet,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/angetOpen',
    name: 'angetOpen',
    component: angetOpen,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/openEnterprise',
    name: '已开通企业',
    component: openEnterprise,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/productList',
    name: '产品管理',
    component: productList,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/salesStatistics',
    name: '已销售统计',
    component: salesStatistics,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/order',
    name: '待出货订单',
    component: order,
    meta: {
      keepAlive: true,
      // requireAuth:true,  
    }
  },
  {
    path: '/form',
    name: 'index',
    component: Form,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/dataStatistics',
    name: '呼叫量统计',
    component: dataStatistics,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/flowIncome',
    name: '流量收入',
    component: flowIncome,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/messageGroup',
    name: '消息群发',
    component: messageGroup,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/activityStatistics',
    name: '活跃度统计',
    component: activityStatistics,
    meta: {
      keepAlive: true
    }
  },
  
  {
    path: '/salesman',
    name: '业务员录入',
    component: salesman,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/operatingEquipment',
    name: '运行设备',
    component: operatingEquipment,
    meta: {
      keepAlive: true
    }
  },
  
  // {
  //   path: '/login',
  //   name: '',
  //   component: Login,
  //   hidden:true
  // },
  // {
  //   path: '/table',
  //   name: '',
  //   // component: Login,
  //   hidden:true
  // },
  // {
  //       path: '/404',
  //       component: NotFound,
  //       name: '',
  //       hidden: true
  //   },
  //   {
  //     path: '/',
  //     component: Home,
  //     name: '首页',
  //     iconCls: 'el-icon-message',//图标样式class
  //     children:[
  //       // { path: '/index', component : Date, name: '首页' },
  //     ]
  //   },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         // { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    // {
    //     path: '*',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // }
];
const router = new Router({
      routes
})
// router.beforeEach((to, from, next) => {
//     let user = JSON.parse(getCookie('user'));
//     if(user&&to.path=='/login'){
//       next({ path: '/index' })
//     }
//     console.log(user)
//     if (!user && to.path != '/login') {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   })

export default router;