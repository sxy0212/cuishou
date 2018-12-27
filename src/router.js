import charts from './views/charts/echarts.vue'
import taskManagement from './views/nav1/taskManagement.vue'
import caseManagement from './views/nav2/caseManagement.vue'
import dataManagement from './views/nav3/dataManagement.vue'
import dataStatistics from './views/nav31/dataStatistics.vue'
import callStatus from './views/nav32/callStatus.vue'
import smsManagement from './views/nav4/smsManagement.vue'
import smsRecord from "./views/nav4/smsRecord.vue"
import smsSend from './views/nav4/smsSend.vue'
import speechScheme from './views/nav5/speechScheme.vue'
import asrSoundScheme from "./views/nav5/asrSoundScheme.vue"
import learning from './views/nav5/learning.vue'
import sound from './views/nav5/sound.vue'
import templateTree from "./views/nav5/templateTree.vue"
import privilegeManagement from './views/nav6/privilegeManagement.vue'
import caseDetails from './views/nav2/caseDetails.vue'
import monthlyStatement from './views/nav9/monthlyStatement.vue'
import repaymentRateStatement from './views/nav9/repaymentRateStatement.vue'
import dayRepaymentStatement from './views/nav9/dayRepaymentStatement.vue'
import clientRepaymentStatement from './views/nav9/clientRepaymentStatement.vue'
import caseRepaymentStatement from './views/nav9/caseRepaymentStatement.vue'
import caseProgressStatement from './views/nav9/caseProgressStatement.vue'
import batchKindsStatement from './views/nav9/batchKindsStatement.vue'




import regionalConfiguration from "./views/nav7/regionalConfiguration.vue"
import clientConfiguration from './views/nav7/clientConfiguration.vue'
import caseConfiguration from './views/nav7/caseConfiguration.vue'
import accountManagement from './views/nav7/accountManagement.vue'
import templateManagement from './views/nav7/templateManagement.vue'
import levelSetting from './views/nav7/levelSetting.vue'
import extensionState from './views/nav7/extensionState.vue'

import collectorManagement from './views/nav8/collectorManagement.vue'
import departmentManagement from './views/nav8/departmentManagement.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from "./views/Index.vue";

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
      keep:true,
      keepAlive: false
    }
  },
  {
    path: '/charts',
    name: '首页',
    component: charts,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/taskManagement',
    name: '任务管理',
    component:  taskManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/caseManagement',
    name: '案件管理',
    component:  caseManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/caseDetails',
    name: '',
    component:  caseDetails,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/callStatus',
    name: '呼叫状态',
    component:  callStatus,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/dataStatistics',
    name: '数据统计',
    component:  dataStatistics,
    meta: {
      keepAlive: true,
    }
  },
  
  {
    path: '/dataManagement',
    name: '资料管理',
    component:  dataManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/smsManagement',
    name: '短信方案',
    component:  smsManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/smsRecord',
    name: '发送记录',
    component:smsRecord,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/smsSend',
    name: '发送短信',
    component:smsSend,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/speechScheme',
    name: '话术管理',
    component: speechScheme,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/Learning',
    component: learning,
    name:"自主学习",
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/asrSoundScheme/:id',
    component: asrSoundScheme,
    name:"",
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/templateTree/:id',
    component: templateTree,
    name:"",
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/sound/:id',
    component: sound,
    name:"",
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/departmentManagement',
    name: '部门管理',
    component: departmentManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/collectorManagement',
    name: '催收员管理',
    component: collectorManagement,
    meta: {
      keepAlive: true,
    }
  },
  
  {
    path: '/privilegeManagement',
    name: '权限管理',
    component:  privilegeManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/regionalConfiguration',
    name: '催收区域配置',
    component: regionalConfiguration,
    meta: {
      keepAlive: true,
    }
  }, {
    path: '/clientConfiguration',
    name: '委托方配置',
    component:clientConfiguration,
    meta: {
      keepAlive: true,
    }
  }, {
    path: '/caseConfiguration',
    name: '案件类型配置',
    component:  caseConfiguration,
    meta: {
      keepAlive: true,
    }
  }, {
    path: '/accountManagement',
    name: '账号管理',
    component:  accountManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/templateManagement',
    name: '模板管理',
    component: templateManagement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/levelSetting',
    name: '案件等级设置',
    component: levelSetting,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/extensionState',
    name: '分机状态',
    component: extensionState,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/monthlyStatement',
    name: '电催员电催日度统计',
    component:  monthlyStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/repaymentRateStatement',
    name: '电催还款率单月统计',
    component:  repaymentRateStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/dayRepaymentStatement',
    name: '电催还款日度统计',
    component:  dayRepaymentStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/clientRepaymentStatement',
    name: '委托方还款日度统计',
    component:  clientRepaymentStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/caseRepaymentStatement',
    name: '案件还款明细表',
    component:  caseRepaymentStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/caseProgressStatement',
    name: '案件跟进度统计',
    component:  caseProgressStatement,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/batchKindsStatement',
    name: '批次状态分类统计',
    component:  batchKindsStatement,
    meta: {
      keepAlive: true,
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
router.beforeEach((to, from, next) => {
    let user = getCookie('user');
    if(user&&to.path=='/login'){
      next({ path: '/charts' })
    }else {
      next()
    }
    if(!user){
      next({path:'/login'})
    }
    if (!user && to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  })

export default router;