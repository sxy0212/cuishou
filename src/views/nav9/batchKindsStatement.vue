<template>
    <section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="seachForm">
          <el-form ref="form" :model="form" label-width="75px" :inline="true" >
             <el-form-item label="催收区域:">
              <el-select v-model="form.area" placeholder="请选择" :style="width" @change="changeArea">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in areaDate" :key="index"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="案件状态:">
              <el-select v-model="form.case_status" placeholder="请选择" :style="width">
                <el-option label="全部" value=""></el-option>
                <el-option label="暂停" value="1"></el-option>
                <el-option label="正常" value="0"></el-option>  
                <el-option label="关闭" value="2"></el-option>  
                <el-option label="退案" value="3"></el-option>  
              </el-select>
            </el-form-item>
             <el-form-item label="委托方:">
              <el-select v-model="form.client" placeholder="请选择" :style="width" @change="changeClient">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in clientDate" :key="index"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="批次:">
              <el-select v-model="form.id" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.batch_name" :value="item.id" v-for="(item,index) in caseData" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" >开始统计</el-button>
            <el-button type="primary">导出报表</el-button>
          </el-form>
        </div>
        <div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%" show-summary :summary-method="getSummaries">
            <el-table-column type="index"  label="序号" width="50"></el-table-column>
            <el-table-column prop="case_type" label="案件状态"> </el-table-column>
            <el-table-column prop="case_money" label="委案金额"></el-table-column>
            <el-table-column prop="count" label="案量"></el-table-column> 
            <el-table-column prop="case_paid" label="确认还款"></el-table-column> 
            <el-table-column prop="pay_rate" label="确认还款率"></el-table-column> 
            <el-table-column prop="estimate_rate" label="预估还款率"></el-table-column> 
          </el-table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {axiosRequest,formatDate} from '@/assets/js/Yt.js'
export default {
    data(){
        return{
        form:{
          case_status:"",
          client:"",
          area:"",
          id:""
        },
        clientDate:[],      //委托方数据
        areaDate:[],        //催收区域数据
        caseData:[],        //批次号数据
        tableData:[{
            case_money: "287503.5",
            case_paid: "10500",
            case_type: "正常",
            count: "3",
            estimate_rate: "3.65%",
            pay_rate: "3.65%",
            },{
                case_money: "15680",
                case_paid:"5000",
                case_type: "暂停",
                count: "2",
                estimate_rate: "31.89%",
                pay_rate:"31.89%",
            },{
                case_money: null,
                case_paid: null,
                case_type: "关闭",
                count: "0",
                estimate_rate: 0,
                pay_rate: 0
            },{
                case_money: null,
                case_paid: null,
                case_type: "退案",
                count: "0",
                estimate_rate: 0,
                pay_rate: 0
            }
        ],
        width:"width:176px"
        }
    },
    activated(){
    //   this.init()
    //   this.initClient()     //委托方
    //   this.initArea()       //催收区域
    //   this.initType()       //批次号
    },
    methods:{
      initArea(){
          const url = "/api/api_backend.php?r=asrcall-case-batch/collection-area"
          const conf = {
              url,
              success:(data)=>{
                  this.areaDate = data.info
              }
          }
          axiosRequest(conf)
      },
      initClient(){
          const url = "/api/api_backend.php?r=asrcall-case-batch/client"
          const conf = {
              url,
              success:(data)=>{
                  this.clientDate = data.info
              }
          }
          axiosRequest(conf)
      },
      initType(){
          const url = "/api/api_backend.php?r=asrcall-case-batch/case-num"
          const client = this.form.client
          const area = this.form.area
          const conf = {
              url,
              data:{
                  client,
                  area
              },
              success:(data)=>{
                  this.caseData = data.info
              }
          }
          axiosRequest(conf)
      },
      changeArea(val){
          this.form.area = val
          this.initType()
      },
      changeClient(val){
          this.form.client = val
          this.initType()
      },
      //数据列表
      init(){
        const conf = {
          url:"/api/api_backend.php?r=asrcall-case-batch/case-type-count",
          data:{
              case_status:this.form.case_status,
              id:this.form.id
          },
          success:(data)=>{
              if(data.statusCode == 1){
                 this.tableData = data.info 
              }else{
                  this.tableData = []
              }
              
          }
        }
        axiosRequest(conf)
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => parseFloat(item[column.property]));
          if (!values.every(value =>Number (value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          
          } else {
            sums[index] = '';
          }
        });
        sums[5]+="%"
        sums[6]+="%"
        return sums;
      },
      exportDate(){
          window.open('/api/api_backend.php?r=asrcall-case-batch/case-type-count&action=export&case_status='+this.form.case_status+'&id='+this.form.id)
      }
    }
}
</script>

