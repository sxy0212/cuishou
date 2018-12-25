<template>
    <section>
        <div class="seachForm">
            <el-form ref="form" :model="form" label-width="75px" :inline="true" >
                <el-form-item label="催收员:">
                    <el-select v-model="form.status" placeholder="请选择"  multiple>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="发送成功" value="1"></el-option>
                        <el-option label="发送失败" value="0"></el-option>  
                    </el-select>
                </el-form-item>
                <el-form-item label="催收区域:">
                    <el-select v-model="form.status" placeholder="请选择状态" :style="width">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="发送成功" value="1"></el-option>
                        <el-option label="发送失败" value="0"></el-option>  
                    </el-select>
                </el-form-item>
                <el-form-item label="委托方:">
                    <el-select v-model="form.status" placeholder="请选择状态" :style="width">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="发送成功" value="1"></el-option>
                        <el-option label="发送失败" value="0"></el-option>  
                    </el-select>
                </el-form-item>
                <el-form-item label="批次:">
                    <el-select v-model="form.status" placeholder="请选择状态" :style="width">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="发送成功" value="1"></el-option>
                        <el-option label="发送失败" value="0"></el-option>  
                    </el-select>
                </el-form-item>
                <el-form-item label="委案日期:">
                    <el-date-picker v-model="form.start_time" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" :picker-options="pickerOptions0" :clearable="false" :style="width"></el-date-picker>~
                    <el-date-picker v-model="form.end_time" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"  :picker-options="pickerOptions1" :clearable="false" :style="width"></el-date-picker>
                </el-form-item> 
                <el-button type="primary" @click="init(1)">立即搜索</el-button>
                <el-button type="primary" @click="init(1)">导出报表</el-button>
            </el-form>
        </div>
        <div class="TableList">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%" :height="total>0?500:100">
                <el-table-column type="index" :index="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="mobile" label="个案序列号"> </el-table-column>
                <el-table-column prop="content" label="姓名"></el-table-column>
                <el-table-column prop="user_id" label="批次"></el-table-column> 
                <el-table-column prop="user_id" label="卡号"></el-table-column> 
                <el-table-column prop="user_id" label="委案日期"></el-table-column> 
                <el-table-column prop="user_id" label="确认还款"></el-table-column> 
                <el-table-column prop="user_id" label="委案金额"></el-table-column> 
                <el-table-column prop="user_id" label="案件催收员"></el-table-column> 
            </el-table>
        </div>
        <div class="pagination" v-show="!!total">
            <div class="block"> 
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
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
                    let endDateVal = this.form.end_time;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }else{
                        return time.getTime() > Date.now();
                    }
                }
            },
            pickerOptions1: {
                disabledDate: time => {
                    let beginDateVal = this.form.start_time;
                    if (beginDateVal) {
                        return (time.getTime() < new Date(beginDateVal).getTime() ||time.getTime() > Date.now());
                    }
                }
            },
            total:0,
            currentPage:1,
            form:{
                page:1,
                page_size:10,
                start_time:"",
                end_time:""
            },
            tableData:[],
            width:"width:180px"
        }
    },
    activated(){
      this.init(0)
    },
    methods:{
        index(val){
            return  (this.form.page-1)*this.form.page_size+val+1
        },
        //数据列表
        init(num){
            const data = this.form
            if(num == 0){
                data.page = this.form.page
                data.page_size = this.form.page_size
            }else if(num == 1){
                data.page = 1;
                data.page_size = 10
            }
            const conf = {
            url:"",
            data:data,
            success:(data)=>{
                if( data.statusCode == 1 ){
                this.tableData = data.info.info
                this.total = parseInt(data.info.total)
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
    }
}
</script>

