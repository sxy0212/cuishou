<template>
    <section>
        <div class="seachForm">
            <el-form ref="form" :model="form" label-width="75px" :inline="true" >
                <el-form-item label="催收员:">
                    <el-select v-model="staff_id" placeholder="请选择" multiple :style="width">
                        <el-option :label="item.true_name" :value="item.staff_id" v-for="(item,index) in staff_list" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="催收区域:">
                    <el-select v-model="form.area_id" placeholder="请选择" :style="width">
                        <el-option label="请选择" value=""></el-option>
                        <el-option :label="item.name" :value="item.area_id" v-for="(item,index) in area_list" :key="index"></el-option>                
                    </el-select>
                </el-form-item>
                <el-form-item label="委托方:">
                    <el-select v-model="form.client_id" placeholder="请选择" :style="width">
                        <el-option label="请选择" value=""></el-option>
                        <el-option :label="item.name" :value="item.client_id" v-for="(item,index) in client_list" :key="index"></el-option>                                
                    </el-select>
                </el-form-item>
                <el-form-item label="批次:">
                    <el-select v-model="form.batch_id" placeholder="请选择" :style="width">
                        <el-option label="请选择" value=""></el-option>
                        <el-option :label="item.batch_name" :value="item.id" v-for="(item,index) in batch_list" :key="index"></el-option>                               
                    </el-select>
                </el-form-item>
                <el-form-item label="委案日期:">
                    <el-date-picker v-model="form.begin_case_date" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" :picker-options="pickerOptions0" :clearable="false" :style="width"></el-date-picker>~
                    <el-date-picker v-model="form.end_case_date" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"  :picker-options="pickerOptions1" :clearable="false" :style="width"></el-date-picker>
                </el-form-item> 
                <el-button type="primary" @click="init(1)">开始统计</el-button>
                <el-button type="primary" @click="exportDate">导出报表</el-button>
            </el-form>
        </div>
        <div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%" :height="total>0?550:100">
                <el-table-column type="index" :index="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="case_code" label="个案序列号"> </el-table-column>
                <el-table-column prop="case_name" label="姓名" width="90"></el-table-column>
                <el-table-column prop="batch_id" label="批次"></el-table-column> 
                <el-table-column prop="case_card_num" label="卡号"></el-table-column> 
                <el-table-column prop="case_date" label="委案日期"></el-table-column> 
                <el-table-column prop="case_last_paid" label="确认还款" width="140"></el-table-column> 
                <el-table-column prop="case_money" label="委案金额" width="140"></el-table-column> 
                <el-table-column prop="staff_name" label="案件催收员" width="120"></el-table-column> 
            </el-table>
        </div>
        <div class="pagination" v-show="!!total">
            <div class="block"> 
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="form.page"
                    :page-sizes="[10, 15, 20, 25]"
                    :page-size="form.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </section>
</template>
<script>
import {axiosRequest,formatDate} from '@/assets/js/Yt.js'
export default {
    data(){
        return{
            pickerOptions0: {
                disabledDate: time => {
                    let endDateVal = this.form.end_case_date;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }else{
                        return time.getTime() > Date.now();
                    }
                }
            },
            pickerOptions1: {
                disabledDate: time => {
                    let beginDateVal = this.form.begin_case_date;
                    if (beginDateVal) {
                        return (time.getTime() < new Date(beginDateVal).getTime() ||time.getTime() > Date.now());
                    }
                }
            },
            total:0,
            currentPage:1, 
            staff_id:[],
            form:{
                page:1,
                page_size:10,
                begin_case_date:"",
                end_case_date:"",
                staff_ids:"", 
                area_id:"",
                client_id:"",
                batch_id:"",
            },
            tableData:[],
            
            width:"width:180px",
             staff_list:[],// |  | 催收员 |
            area_list:[],// 催收区域 |
            client_list :[],// 委托方 |
            batch_list:[],// 批次 |
        }
    },
    activated(){
      this.init(0)
      this.initForm()
    },
    methods:{
        index(val){
            return  (this.form.page-1)*this.form.page_size+val+1
        },
        initForm(){
            const url = "/api/api_backend.php?r=statistics/init-data"
            const conf = {
                url,
                success:(data)=>{
                    this.staff_list = data.info.staff_list
                    this.area_list = data.info.area_list
                    this.client_list = data.info.client_list
                    this.batch_list = data.info.batch_list
                }
            }
            axiosRequest(conf)
        },
        //数据列表
        init(num){
            const data = this.form
            data.staff_ids = this.staff_id.join(",")
            if(num == 0){
                data.page = this.form.page
                data.page_size = this.form.page_size
            }else if(num == 1){
                data.page = 1;
                data.page_size = 10
            }
            const conf = {
                url:"/api/api_backend.php?r=statistics/repayment",
                data:data,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                        this.total = parseInt(data.info.total_count)
                    }else{
                        this.tableData = []
                        this.total = 0
                    }
                }
            }
            axiosRequest(conf)
        },
        handleSizeChange(val) {
            this.form.page_size = val
            this.init(0)
        },
        handleCurrentChange(val) {
            this.form.page = val
            this.init(0)
        },
        exportDate(){
            const staff_ids = this.staff_id.join(",")
            window.open('/api/api_backend.php?r=statistics/repayment&is_export=1&staff_ids='+staff_ids+'&area_id='+this.form.area_id+'&client_id='+this.form.client_id+'&batch_id='+this.form.batch_id+'&begin_case_date='+this.form.begin_case_date+'&end_case_date='+this.form.end_case_date)
        }
    }
}
</script>

