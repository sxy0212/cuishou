<template>
	<section style="font-size:20px;">
		<div class="title">
      言通智能机器人-信息公告板
    </div>
    <div id="tabs" style="height:500px;background:#f2f2f2">
      <el-tabs v-model="activeName"  @tab-click=" handleBtnClick" type="border-card"  >
          <el-tab-pane label="余额告警客户" name="1">
            <el-table :data="tableData1"  stripe style="width: 100%" border stripe height="800" v-loading="loading" header-row-class-name="table">
                <el-table-column type="index" label="序号" :index="index" width="100" align="center"></el-table-column>                   
                <el-table-column prop="account" label="账户名" align="center"></el-table-column>
                <el-table-column prop="money" label="余额" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="机器人到期客户" name="2">
            <el-table :data="tableData2" stripe style="width: 100%" border stripe height="800">
                <el-table-column type="index" :index="index2" label="序号" width="100" align="center"></el-table-column>                   
                <el-table-column prop="company_name" label="机构名称" align="center"></el-table-column>
                <el-table-column prop="admin_name" label="管理员名称" align="center"></el-table-column>
                <el-table-column prop="number" label="机器人编号" align="center"></el-table-column>
                <el-table-column prop="auth_time" label="机器人授权时间" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已过期账户" name="3">
            <el-table :data="tableData3" stripe style="width: 100%" border stripe height="800"> 
                <el-table-column type="index"  label="序号" width="100" align="center"></el-table-column>  
                <el-table-column prop="servers" label="平台" align="center"></el-table-column>
                <el-table-column prop="company_name" label="机构名称" align="center"></el-table-column>
                <el-table-column prop="admin_name" label="管理员名称" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="流量收入" name="4">
            <table class="el-table iconTable" cellspacing="0" cellpadding="0" width="100%">
              <thead>
                <tr>
                  <th class="cell" >总账户数目</th>
                  <th class="cell" >未过期账户</th>
                  <th class="cell" >过期账户</th>
                  <th class="cell">运行机器人数量</th>
                  <th class="cell">平均单日单台呼出量</th>
                  <th class="cell" >平均接通率</th>
                  <th class="cell" >每日通话时长</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="cell" >{{form4.total_account}}</th>
                  <th class="cell" >{{form4.no_expire}}</th>
                  <th class="cell" >{{form4.expire}}</th>
                  <th class="cell">{{form4.running_robot}}</th>
                  <th class="cell">{{form4.per_call_count}}</th>
                  <th class="cell" >{{form4.per_called_count}}</th>
                  <th class="cell" >{{form4.per_sec_count}}</th>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <!--<el-tab-pane label="工单报障" name="4">
            <el-table :data="tableData4" stripe style="width: 100%" border stripe height="400">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>                   
                <el-table-column prop="name" label="客户名称" align="center"></el-table-column>
                <el-table-column prop="sale" label="业务员"align="center"></el-table-column>
                <el-table-column prop="num" label="售后小组" align="center"></el-table-column>
                <el-table-column prop="money" label="余额" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>-->
      </el-tabs>
    </div>
     
  
	</section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
        loading:true,
				activeName:"1",
        num:0,
        time:"",
        page1:0,
        page_size1:10,
        page_total1 : "",
        page2:0,
        page_size2:10,
        page_total2 : "",
        page3:0,
        page_size3:10,
        page_total3 : "",
        tableData1:[],
        tableData2:[],
        tableData3:[],
        form4:{},


			}
		},
    mounted() {
      this.handleBtnClick()
      // this.init1()
      this.init2()
      this.init3()
      this.init4()
      this.initData()
		},
		methods: {
      index(val){
        return (this.page1-1)*this.page_size1+val+1
      },
      index2(val){
        return (this.page2-1)*this.page_size2+val+1
      },
      initData(){
        this.time = setInterval(this.handleBtnClick,20000)
      },
      // 余额告警
      init1(){       
        this.loading = true;
        this.tableData1 = []
        const url = "/api_backend.php?r=call-statics/balance"
        const conf = {
          url,
          data:{
            page:this.page1,
            page_size:this.page_size1
          },
          success:(data)=>{
            this.loading = false
            for(var item in data.info.info){
              this.tableData1.push(data.info.info[item])
            }
            this.page_total1 = parseInt(data.info.total_page)
          }
        }
        axiosRequest(conf)
      },
      // 即将过期
      init2(){
        const url = "/api_backend.php?r=call-statics/expire-robot"
        const conf = {
          url,
          data:{
            page:this.page2,
            page_size:this.page_size2
          },
          success:(data)=>{
            this.tableData2 = data.info.info
            this.page_total2 = parseInt(data.info.total_page)
          }
        }
         axiosRequest(conf)
      },
      // 已过期账户
      init3(){ 
        const url = "/api_backend.php?r=call-statics/account-expire"
        const conf = {
            url,
            data:{
              page:this.page3,
              page_size:this.page_size3
            },
            success:(data)=>{
              this.tableData3 = data.info.info
              if(data.info.total_page){
                this.page_total3 = parseInt(data.info.total_page)
              }else{
                 this.page_total3 = 0
              }
            }
          }
          axiosRequest(conf)
      },
      // 流量收入
      init4(){ 
        const url = "/api_backend.php?r=call-statics/flow-show"
        const conf = {
            url,
            success:(data)=>{
              this.form4 = data.info
            }
          }
          axiosRequest(conf)
      },
			 handleBtnClick(){
         this.num ++;
         this.activeName = this.num.toString()
        if(this.activeName == 1){
           this.page1 ++
           if(this.page1 > parseInt(this.page_total1)){
             this.page1 = 1
           }
          this.init1()
        }else if(this.activeName == 2){  
          this.page2 ++
          if(this.page2 > parseInt(this.page_total2)){
             this.page2 = 1
           }
          this.init2()
         }else if (this.activeName == 3){
           this.page3 ++
          if(this.page3 > parseInt(this.page_total3)){
             this.page3 = 1
           }
            console.log(this.page3)
          this.init3()
        }else if (this.activeName >= 4){
          this.init4()
          this.num = 0
          // console.log(3333)
        }
        // else if(this.activeName > 3){
        //   // console.log(4444)
        //  this.num = 0
        // }
        console.log(this.num)
        //  this.init1()
        
        
      },
		},
	
	}

</script>

<style lang="scss" scoped>
  #app{
    background-color:#f2f2f2;
  }
 .title{
   font-size:2.4rem;
   font-weight: bolder;
   padding-bottom:10px;
   padding-top:10px;
 }
 .el-table{
   font-size:30px !important;
 }
 .iconTable .cell{
  width:200px;text-align:center;border: 1px solid #ebeef5
 }
</style>