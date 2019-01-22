import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/assets/js/Yt.js'
Vue.use(Router)

/* Layout 管理员*/
import Layout from '@/views/layout/Layout'


/* StaffLayout 催收员*/
import StaffLayout from '@/staffViews/layout/Layout'

let routes = [

  //管理员和催收员共用登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    hidden: true 
  },

  // 管理员页面
  {
    path: '/charts',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: '首页',
      component: () => import('@/views/charts/echarts.vue')
    }]
  },
  {
    path: '/taskManagement',
    component: Layout,
    children: [{
      path: '',
      name: '任务管理',
      component: () => import('@/views/nav1/taskManagement.vue')
    }]
  },
  {
    path: '/caseManagement',
    component: Layout,
    children: [{
      path: '',
      name: '案件管理',
      component: () => import('@/views/nav2/caseManagement.vue')
    }]
  },
  {
    path: '/caseDetails',
    component: Layout,
    children: [{
      path: '',
      name: '',
      component: () => import('@/views/nav2/caseDetails.vue')
    }]
  },
  {
    path: '/callStatus',
    component: Layout,
    children: [{
      path: '',
      name: '呼叫状态',
      component: () => import('@/views/nav32/callStatus.vue')
    }]
  },
  {
    path: '/dataStatistics',
    component: Layout,
    children: [{
      path: '',
      name: '数据统计',
      component: () => import('@/views/nav31/dataStatistics.vue')
    }]
  },
  {
    path: '/dataManagement',
    component: Layout,
    children: [{
      path: '',
      name: '资料管理',
      component: () => import('@/views/nav3/dataManagement.vue')
    }]
  },
  {
    path: '/smsManagement',
    component: Layout,
    children: [{
      path: '',
      name: '短信方案',
      component: () => import('@/views/nav4/smsManagement.vue')
    }]
  },
  {
    path: '/smsRecord',
    component: Layout,
    children: [{
      path: '',
      name: '发送记录',
      component: () => import('@/views/nav4/smsRecord.vue')
    }]
  },
  {
    path: '/smsSend',
    component: Layout,
    children: [{
      path: '',
      name: '发送短信',
      component: () => import('@/views/nav4/smsSend.vue')
    }]
  },
  {
    path: '/speechScheme',
    component: Layout,
    children: [{
      path: '',
      name: '话术管理',
      component: () => import('@/views/nav5/speechScheme.vue')
    }]
  },
  {
    path: '/Learning',
    component: Layout,
    children: [{
      path: '',
      name: '自主学习',
      component: () => import('@/views/nav5/learning.vue')
    }]
  },
  {
    path: '/asrSoundScheme/:id',
    component: Layout,
    children: [{
      path: '',
      name: '',
      component: () => import('@/views/nav5/asrSoundScheme.vue')
    }]
  },
  {
    path: '/templateTree/:id',
    component: Layout,
    children: [{
      path: '',
      name: '',
      component: () => import('@/views/nav5/templateTree.vue')
    }]
  },
  {
    path: '/sound/:id',
    component: Layout,
    children: [{
      path: '',
      name: '',
      component: () => import('@/views/nav5/sound.vue')
    }]
  },
  {
    path: '/departmentManagement',
    component: Layout,
    children: [{
      path: '',
      name: '部门管理',
      component: () => import('@/views/nav8/departmentManagement.vue')
    }]
  },
  {
    path: '/collectorManagement',
    component: Layout,
    children: [{
      path: '',
      name: '催收员管理',
      component: () => import('@/views/nav8/collectorManagement.vue')
    }]
  },
  {
    path: '/privilegeManagement',
    component: Layout,
    children: [{
      path: '',
      name: '权限管理',
      component: () => import('@/views/nav6/privilegeManagement.vue')
    }]
  },
  {
    path: '/regionalConfiguration',
    component: Layout,
    children: [{
      path: '',
      name: '催收区域配置',
      component: () => import('@/views/nav7/regionalConfiguration.vue')
    }]
  }, 
  {
    path: '/clientConfiguration',
    component: Layout,
    children: [{
      path: '',
      name: '委托方配置',
      component: () => import('@/views/nav7/clientConfiguration.vue')
    }]
  }, 
  {
    path: '/caseConfiguration',
    component: Layout,
    children: [{
      path: '',
      name: '案件类型配置',
      component: () => import('@/views/nav7/caseConfiguration.vue')
    }]
  }, 
  {
    path: '/accountManagement',
    component: Layout,
    children: [{
      path: '',
      name: '账号管理',
      component: () => import('@/views/nav7/accountManagement.vue')
    }]
  },
  {
    path: '/templateManagement',
    component: Layout,
    children: [{
      path: '',
      name: '模板管理',
      component: () => import('@/views/nav7/templateManagement.vue')
    }]
  },
  {
    path: '/levelSetting',
    component: Layout,
    children: [{
      path: '',
      name: '案件等级设置',
      component: () => import('@/views/nav7/levelSetting.vue')
    }]
  },
  {
    path: '/extensionState',
    component: Layout,
    children: [{
      path: '',
      name: '分机状态',
      component: () => import('@/views/nav7/extensionState.vue')
    }]
  },
  {
    path: '/monthlyStatement',
    component: Layout,
    children: [{
      path: '',
      name: '电催员电催日度统计',
      component: () => import('@/views/nav9/monthlyStatement.vue')
    }]
  },
  {
    path: '/repaymentRateStatement',
    component: Layout,
    children: [{
      path: '',
      name: '电催还款率单月统计',
      component: () => import('@/views/nav9/repaymentRateStatement.vue')
    }]
  },
  {
    path: '/dayRepaymentStatement',
    component: Layout,
    children: [{
      path: '',
      name: '电催还款日度统计',
      component: () => import('@/views/nav9/dayRepaymentStatement.vue')
    }]
  },
  {
    path: '/clientRepaymentStatement',
    component: Layout,
    children: [{
      path: '',
      name: '委托方还款日度统计',
      component: () => import('@/views/nav9/clientRepaymentStatement.vue')
    }]
  },
  {
    path: '/caseRepaymentStatement',
    component: Layout,
    children: [{
      path: '',
      name: '案件还款明细表',
      component: () => import('@/views/nav9/caseRepaymentStatement.vue')
    }]
  },
  {
    path: '/caseProgressStatement',
    component: Layout,
    children: [{
      path: '',
      name: '案件跟进度统计',
      component: () => import('@/views/nav9/caseProgressStatement.vue')
    }]
  },
  {
    path: '/batchKindsStatement',
    component: Layout,
    children: [{
      path: '',
      name: '批次状态分类统计',
      component: () => import('@/views/nav9/batchKindsStatement.vue')
    }]
  },
  {
    path: '/AsrcdrBak',
    component: Layout,
    children: [{
      path: '',
      name: '呼叫记录',
      component: () => import('@/views/nav10/AsrcdrBak.vue')
    }]
  },
  
  
//  催收员页面
  {//首页
    path: '/dashboard',// 催收员
    component: StaffLayout,
    hidden: true,
    children: [{
      path: '',
      name: '首页',
      component: () => import('@/staffViews/staffInfo/index')
    }]
  },
  {
    path: '/staffCaseManagement/index',// 催收员
    component: StaffLayout,
    children: [{
      path: '',
      name: '案件管理',
      component: () => import('@/staffViews/caseManagement/index'),
      meta: { title: '案件管理', icon: 'fa-address-card-o' }
    }]
  },
  {
    path: '/staffCaseDetails/index',// 案件详情
    component: StaffLayout,
    hidden: true,
    children: [
      {
        path: '',
        name: '案件详情',
        component: () => import('@/staffViews/caseDetails/index'),
        meta: { title: '案件详情', icon: 'fa-address-card-o' }
      }
    ]
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
    let user = getCookie('user')
    let staff = getCookie('staff')
    
    
    if ( to.path === '/' ) {//如果是/地址的话，跳到登录页面
      console.log('111')
      next('/login')
    } else if( to.path == '/login' && user == 'sysadmin' ){//如果是从后台进入，并且要去的是登录页面的话，就到管理员首页去
      console.log('222')
      next({ path: '/charts' })
    }else{
      console.log('333')
      next()
    }


    if (!user && to.path != '/login' && !staff ) {//如果管理员不存在，催收员不存在，要去的不是登录页面的话，跳到登录页面
      console.log('444')
      next({ path: '/login' })
    }else{
      console.log('555')
      next()
    }
  })

export default router;