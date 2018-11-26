<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>运行设备</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding:30px;background:#fff;">
    <ul class="el-row">
      <li v-for="(item,index) in tableData">
        <div class="header">机构名称:{{item.name}}</div>
        <div class="bottom">
          <div class="left">
            <img src="../../../static/image/bg1.png">
          </div>
          <div class="right">
            <p>客户数量:{{item.count}}</p>
            <p>机器人数:{{item.ai_count}}</p>
            <p>呼叫中机器人数:{{item.called_count}}</p>
            <p>呼出总量:{{item.total}}</p>
            <p>接通数量:{{item.counect_count}}</p>
            <p>硬盘剩余空间:{{item.disk_space}}</p>
          </div>
        </div>
      </li>
    </ul> 
    </div>
  </section>

</template>

<script>
import {axiosRequest} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
           imageUrl: '',
					type: [],
					resource: '',
					desc: '',
          city:'',      //获取当前地区
          cityLists: [],
          props: {
                value: 'label',
                children: 'child'
            },
				},
        tableData: [{
            name: '上海',
            count: '10',
            ai_count:"20",
            called_count:"6",
            total:"50000",
            counect_count:"35000",
            disk_space:"1.5G",
          },{
            name: '上海',
            count: '10',
            ai_count:"20",
            called_count:"6",
            total:"50000",
            counect_count:"35000",
            disk_space:"1.5G",
          },{
            name: '上海',
            count: '10',
            ai_count:"20",
            called_count:"6",
            total:"50000",
            counect_count:"35000",
            disk_space:"1.5G",
          },{
            name: '上海',
            count: '10',
            ai_count:"20",
            called_count:"6",
            total:"50000",
            counect_count:"35000",
            disk_space:"1.5G",
          }]
			}
		},
    beforeMount() {
    
    },
		methods: {
			onSubmit() {
				console.log('submit!');
			},
       
  }
	}

</script>
<style scoped lang="scss">
 @import '../../../static/css/operatingEq.scss'
</style>