<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>流量收入</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-form ref="form" :model="form" label-width="90px" >
        <ul class="up">
            <li>
              <div class="grid-content bg-purple">
                <el-form-item label="平台:">
                  <el-select placeholder="请选择" v-model="form.plat_form">
                      <el-option :label="item.key" :value="item.value" v-for="(item,index) in platform" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </li>
            <li>
              <div class="grid-content bg-purple">
                <el-form-item label="时间:">
                  <el-select placeholder="请选择" v-model="form.time">
                      <el-option label="今天" value="today" ></el-option>
                      <el-option label="昨天" value="yesterday" ></el-option>
                      <el-option label="历史" value="history" ></el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </li>
            <li v-show="form.time == 'history'">
              <div class="grid-content bg-purple">
                <el-form-item label="选择：">
                  <el-date-picker v-model="form.fromdate" type="datetime" placeholder="通话开始日期" default-time="00:00:00" :picker-options="pickerOptions0" :clearable="false" ></el-date-picker>~
                  <el-date-picker v-model="form.todate" type="datetime" placeholder="通话结束日期"  default-time="23:59:59" :picker-options="pickerOptions1" :clearable="false" ></el-date-picker>
                </el-form-item> 
              </div>
            </li>
            <li style="margin-left:10px;">
              <el-button type="success" @click="search(1)">查询</el-button>
            </li>
        </ul>  
      </el-form>
      <div style="width:500px;padding-left:80px;">
        <span>运行的机器人数:<span style="color:red">{{totalData.running_robot}}</span> </span>
        <span>总呼叫量:<span style="color:red">{{totalData.call_count}}</span> </span>
        <span>接通量:<span style="color:red">{{totalData.called_count}}</span> </span>
        <span>呼叫时长:<span style="color:red">{{totalData.billsec_count}}</span> </span>
      </div> 
      <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total?550:200"  v-loading="loading" >
        <el-table-column type="index" label="序号" width="60" :index="index" align="center"></el-table-column>
        <el-table-column prop="company_name" label="机构名称" align="center"></el-table-column>  
        <el-table-column prop="admin_name" label="管理员名称" align="center"></el-table-column>  
        <el-table-column prop="running_robot" label="运行机器人数量" align="center"></el-table-column>
        <el-table-column prop="per_call_count" label="平均单日单台呼出量" align="center"></el-table-column>
        <el-table-column prop="per_called_count" label="平均接通率" align="center"></el-table-column>
        <el-table-column prop="per_sec_count" label="每日通话时长" align="center"></el-table-column>
      </el-table>
      <div class="pagination" v-show="!!total" style="margin:0 auto;width:400px;">
        <div class="block"> 
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :current-page.sync = "page"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
  import {formatDate} from '@/assets/js/Yt.js'
  export default {
    name:"flow",
		data() {
			return {
        form:{
          plat_form:"",
          fromdate:new Date(new Date().setHours(0, 0, 0, 0)-24*60*60*1000*2), //通话时间最小范围
          todate: new Date(new Date().setHours(23, 59,59, 59)-24*60*60*1000*2), //通话时间最大范围 
          time:"today"
        },
        currentPage:1,
        page:1,
        page_size:10,
        total:0,
        infos:[],
        loading:true,
        platform:[],    //平台
        totalData:{
          billsec_count:"",
          call_count: "",
          called_count: "",
          running_robot: ""
        },     //总数据
        pickerOptions0: {
            disabledDate: (time) => {                 
                   return time.getTime() > Date.now()-24*60*60*1000*2
                }
            },
        pickerOptions1: {
          disabledDate:(time) => {
            if(this.form.fromdate != ""){
              let currentTime = this.form.fromdate;
              return time.getTime() < currentTime || time.getTime() > Date.now()-24*60*60*1000*2;
            }else{
              return time.getTime() > Date.now()-24*60*60*1000*2
            }
            }
          } ,
        
			}
		},
    beforeMount() {
      this.initData()
      this.search(0)
    }, 
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      initData(){
        const url = "/api_backend.php?r=call-statics/platform"
        const conf = {
          url,
          success:(data)=>{
           this.platform = data.info.ai;
          }
        }
        axiosRequest(conf)
      },
      search(num){ 
        this.loading = true
        const url = "/api_backend.php?r=call-statics/flow-income"
        const data = {}
        data.time = this.form.time;
        data.plat_form = this.form.plat_form
        var start_date = ''
        var end_date = ''
        if(this.form.time != 'history'){
          data.start_date = ""
          data.end_date = ''
        }else{
          data.start_date =  formatDate(this.form.fromdate,'yyyy-MM-dd hh:mm:ss')
          data.end_date =  formatDate(this.form.todate,'yyyy-MM-dd hh:mm:ss')
        }
        if(num == 0){
          data.page = this.page;
          data.page_size = this.page_size;
        }else{
          this.page = 1;
          this.page_size = 10;
          data.page = this.page;
          data.page_size = this.page_size
        }
        const conf = {
            url,
            data:data,
            success:(data)=>{
              this.loading = false
              if(data.info.length == 0){
                this.infos = []
              }
              this.infos = data.info.info
              this.totalData.billsec_count = data.info.total.billsec_count
              this.totalData.call_count = data.info.total.call_count
              this.totalData.called_count = data.info.total.called_count
              this.totalData.running_robot = data.info.total.running_robot
              this.total = parseInt(data.info.total_count)
            }
          }
          axiosRequest(conf)
      },
      handleSizeChange(val){
        this.page_size = val
        this.search(0)
      },
      handleCurrentChange(val){
        this.page = val  
        this.search(0)
      },
	  }
	}
</script>
<style lang="scss" scoped>
  .up {
    li{
      list-style:none;
      float:left;
    }
  }
  
</style>