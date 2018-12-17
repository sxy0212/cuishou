<template>
  <section>
    <el-form :inline="true" :model="form"> 
      <el-form-item label="所属部门:">
        <el-select v-model="form.depart_id" placeholder="案件状态">
          <el-option v-for="(item,index) in departList" :value="item.id" :label="item.depart_name" :key="index"></el-option>
        </el-select>
      </el-form-item>  
      <el-form-item label="姓名:">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="已还款额：">
        <el-input v-model="form.case_paid_start" :style="width"></el-input>~
        <el-input v-model="form.case_paid_end" :style="width"></el-input>
      </el-form-item>
      <el-form-item label="委托金额:">
        <el-input v-model="form.case_money_start" :style="width"></el-input>~
        <el-input v-model="form.case_money_end" :style="width"></el-input>
      </el-form-item>
      <el-form-item label="最后分配时间:">
        <el-date-picker v-model="form.alloc_time_start" type="datetime" placeholder="开始时间" default-time="00:00:00" :picker-options="pickerOptions0" :clearable="false" ></el-date-picker>~
        <el-date-picker v-model="form.alloc_time_end" type="datetime" placeholder="结束时间"  default-time="23:59:59" :picker-options="pickerOptions1" :clearable="false" ></el-date-picker>
      </el-form-item> 
      <el-form-item >
        <el-button type="success" @click="init(1)">搜索</el-button>
        <el-button type="success" @click="recall">批量撤回</el-button>
        <el-button type="success" @click="exportDate">导出报表</el-button>
      </el-form-item>
	  </el-form>
    <p style="height: 30px;background: rgba(255, 153, 51, 1);line-height: 30px;color:#fff">任务数量:{{tip.total_task_count}},跟进数:{{tip.total_case_count}},跟进率:{{tip.task_case_count_percent}},委案金额:{{tip.total_case_money}},已还款额:{{tip.total_case_paid}},还款率:{{tip.paid_money_percent}}</p>
    <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total>0?500:100" @selection-change="handleSelectionChange">
      <el-table-column type="selection"  width="60"  ></el-table-column>
      <el-table-column type="index" label="序号" width="60"  :index="index"></el-table-column>
      <el-table-column prop="staff_name" label="姓名"></el-table-column>  
      <el-table-column prop="depart_name" label="所在部门"></el-table-column>  
      <el-table-column prop="task_count" label="任务数量"></el-table-column>  
      <el-table-column prop="case_count" label="跟进数"></el-table-column>  
      <el-table-column prop="case_money" label="委案金额"></el-table-column>  
      <el-table-column prop="case_paid" label="已还款额"></el-table-column>  
      <el-table-column prop="allocate_time" label="最后分配时间"></el-table-column>  
      <el-table-column  label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain  @click="check(scope.$index,scope.row)">查看任务</el-button>
        </template>
      </el-table-column>
		</el-table>
		<div class="block"> 
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curr"
          :page-sizes="[10, 20, 25, 30]"
          :page-size="form.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import {axiosRequest,clone,message,formatDate} from '@/assets/js/Yt.js'
	export default {
		data(){
      return {
        width:"width:80px",
        pickerOptions0: {
          disabledDate: (time) => {                 
            return time.getTime() > Date.now()
          }
        },
        pickerOptions1: {
          disabledDate:(time) => {
            if(this.form.alloc_time_start != ""){
              let currentTime = this.form.alloc_time_start;
                return time.getTime() < currentTime || time.getTime() > Date.now();
            }else{
              return time.getTime() > Date.now()
            }
          }
        } ,  
        form:{
          page:1,
          page_size:10,
          depart_id:"", 
          name:"",
          case_paid_start:0,
          case_paid_end:"",
          case_paid:"",
          case_money_start:0,
          case_money_end:"",
          case_money:"",
          alloc_time_start:"",
          alloc_time_end:"",
          alloc_time:""
        },
        departList:[], //部门列表
        infos:[],
        tip:{
          total_task_count:"",  //任务数量
          total_case_count:"", //跟进数量
          task_case_count_percent:"", //跟进率
          total_case_paid:"", //已还款额
          total_case_money: "", //委案金额
          paid_money_percent: "" //还款率
        },
        rest_num:"",
        curr:1,
        total:0,
        multipleSelection:[],
        staff_id_arr:[],
      }
		},
		activated() {
      this.initList()
      this.init(0)
    },
		methods: {
      index(val){
        return  (this.form.page-1)*this.form.page_size+val+1
      },
      initList(){
        const url = "/api/api_backend.php?r=collect-depart/sort-list"
        const conf = {
          url,
          success:(data)=>{
            this.departList = data.info
          }
        }
        axiosRequest(conf)
      },
      // table
      init(num){
        const url = "/api/api_backend.php?r=collect-depart/manage-list"
        const data = this.form
        if(num==0){
          data.page = this.form.page
          data.page_size = this.form.page_size
          const conf = {
            url,
            data:data,
            success:(data)=>{
              this.infos = data.info.info
              this.tip.total_task_count = data.info.total_task_count
              this.tip.total_case_count = data.info.total_case_count
              this.tip.task_case_count_percent = data.info.task_case_count_percent
              this.tip.total_case_paid = data.info.total_case_paid
              this.tip.total_case_money = data.info.total_case_money
              this.tip.paid_money_percent = data.info.paid_money_percent
              this.total = parseInt(data.info.total)
            }
          }
          axiosRequest(conf)
        }else if(num == 1){
          data.page = 1
          data.page_size = 10 
          if(this.form.case_paid_start!=""&&this.form.case_paid_end!=""){
            data.case_paid = this.form.case_paid_start+","+this.form.case_paid_end
          }else{
            data.case_paid = ""
          }
          if(this.form.case_money_start!=""&&this.form.case_money_end!=""){
            data.case_money = this.form.case_money_start +"," +this.form.case_money_end
          }else{
            data.case_money = ""
          }
          if( this.form.alloc_time_start!=""&&this.form.alloc_time_end!=""){
            data.alloc_time = formatDate(this.form.alloc_time_start,'yyyy-MM-dd hh:mm:ss')+","+formatDate(this.form.alloc_time_end,"yyyy-MM-dd hh:mm:ss")
          }else{
            data.alloc_time = ""
          }
          if(!this.form.alloc_time_start&&this.form.alloc_time_end){
            this.$alert("请选择开始时间")
          }else{
            const conf = {
                url,
                data:data,
                success:(data)=>{
                  this.infos = data.info.info
                  this.tip.total_task_count = data.info.total_task_count
                  this.tip.total_case_count = data.info.total_case_count
                  this.tip.task_case_count_percent = data.info.task_case_count_percent
                  this.tip.total_case_paid = data.info.total_case_paid
                  this.tip.total_case_money = data.info.total_case_money
                  this.tip.paid_money_percent = data.info.paid_money_percent
                  this.total = parseInt(data.info.total)
                }
              }
              axiosRequest(conf)
          }
        }
       
        
       
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.staff_id_arr = this.multipleSelection.map(item=>{
          return item.staff_id
        })
      },
      handleSizeChange(val){
        this.form.page_size = val
        this.init()
      },
      handleCurrentChange(val){
        this.page = val
        this.init()
      },
      // 撤回
      recall(){
        const url = "/api/api_backend.php?r=collect-depart/batch-cancel"
        const staff_id = this.staff_id_arr.join(",")
        const conf = {
          url,
          data:{staff_id},
          success:(data)=>{
            this.$alert(data.message)
            this.init()
          }
        }
        axiosRequest(conf)
      },
      // 导出
      exportDate(){
        window.open('/api/api_backend.php?r=collect-depart/manage-export&depart_id='+this.form.depart_id+'&name='+this.form.name+'&case_paid='+this.form.case_paid+'&case_money='+this.form.case_money+'&alloc_time='+this.form.alloc_time)
      },
      // 查看任务
      check(index,row){
        this.$router.push({path:'/caseManagement/',query:{staff_id:row.staff_id,depart_id:row.depart_id}})
      },
      
    }
  }
</script>
<style lang="scss" >
</style>   