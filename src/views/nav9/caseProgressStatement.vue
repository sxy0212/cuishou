<template>
    <section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="seachForm">
          <el-form ref="form" :model="form" label-width="75px" :inline="true" >
            <el-form-item label="催收员:">
              <el-select v-model="staff_id" placeholder="请选择" multiple :style="width">
                <el-option :label="item.true_name" :value="item.id" v-for="(item,index) in staff_list" :key="index"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="催收区域:">
              <el-select v-model="form.area_id" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in area_list" :key="index"></el-option>                
              </el-select>
            </el-form-item>
             <el-form-item label="委托方:">
              <el-select v-model="form.client_id" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in client_list" :key="index"></el-option>                                
              </el-select>
            </el-form-item>
            <el-form-item label="还款情况:">
              <el-select v-model="form.paid" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option label="已还" value="1"></el-option>
                <el-option label="未还" value="0"></el-option>  
              </el-select>
            </el-form-item>
             <el-form-item label="批次:">
              <el-select v-model="form.batch_id" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.batch_name" :value="item.id" v-for="(item,index) in batch_list" :key="index"></el-option>                               
              </el-select>
            </el-form-item>
            <el-form-item label="案件类型:">
              <el-select v-model="form.type_id" placeholder="请选择" :style="width">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in type_list" :key="index"></el-option>                                              
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="init()">开始统计</el-button>
            <el-button type="primary" @click="init(1)">导出报表</el-button>
          </el-form>
        </div>
        <div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="案件催收员"> </el-table-column>
            <el-table-column prop="never" label="从未跟进"></el-table-column>
            <el-table-column prop="1to3" label="1-3天未跟进"></el-table-column> 
            <el-table-column prop="4to6" label="4-6天未跟进"></el-table-column> 
            <el-table-column prop="7to15" label="7-15天未跟进"></el-table-column> 
            <el-table-column prop="16to30" label="16-30天未跟进"></el-table-column> 
            <el-table-column prop="31to45" label="31-45天未跟进"></el-table-column> 
            <el-table-column prop="46to60" label="46-60天未跟进"></el-table-column> 
            <el-table-column prop="60tomax" label="60天以上未跟进"></el-table-column> 
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
            staff_list:[],// |  | 催收员 |
            area_list:[],// 催收区域 |
            client_list :[],// 委托方 |
            batch_list:[],// 批次 |
            type_list:[],// |  | 案件类型 |
            staff_id:[],
            form:{
                staff_id:"", 
                area_id:"",
                client_id:"",
                paid:"",
                batch_id:"",
                type_id :""
            },
            tableData:[],
            width:"width:170px"
        }
    },
    activated(){
      this.init()
      this.initForm()
    },
    methods:{
        initForm(){
            const url = "/api/api_backend.php?r=collection-count/init"
            const conf = {
                url,
                success:(data)=>{
                    this.staff_list = data.info.staff_list
                    this.area_list = data.info.area_list
                    this.client_list = data.info.client_list
                    this.batch_list = data.info.batch_list
                    this.type_list = data.info.type_list
                    console.log(data)
                }
            }
            axiosRequest(conf)
        },
        //数据列表
        init(){
            const data = this.form
            data.staff_id = this.staff_id.join(",")
            const conf = {
            url:"/api/api_backend.php?r=collection-count/collection-list",
            data:data,
            success:(data)=>{
                if( data.statusCode == 1 ){
                    var arr = []
                    for (let i in data.info) {
                        arr.push(data.info[i])
                    }
                    this.tableData = arr
                }else{
                    this.tableData = []
                }
            }
            }
            axiosRequest(conf)
        },
    }
}
</script>

