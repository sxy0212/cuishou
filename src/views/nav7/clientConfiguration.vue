<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn'>添加委托方</el-button>
    </div>
    <div class="tableCover">
      <el-table
        border
        :data="tableData"
        style="width: 98%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="miniImage"
          label="委托方名称"
          >
        </el-table-column>
        <el-table-column
          prop="miniImage"
          label="前缀"
          >
        </el-table-column>
      </el-table>
      <page-change 
        :total="total"
        :page="page"
        v-on:pageSizeChange='pageSizeChangeFn($event)'
        v-on:currentPageChange='currentPageChangeFn($event)'
      ></page-change>
    </div>
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addClient from '@/components/editDialog/addClient.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    components:{
        'edit-dialog':addClient,
        'page-change':pageChange
    },
    data() {
        return {
            page:1,
            total:0,
            pageSize:10,
            bannerTitle:"区域添加",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }]
        }
    },
    created() {
        this.init()  
    },
    methods: {
         init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/area-list',
                data : {
                    page:this.page,
                    pageSize:this.pageSize
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.total = Number( data.total_count )
                    }
                    console.log(data)
                }
            }
            axiosRequest(conf)
        },
        addFn(){
            this.addNow = true
        },
        pageSizeChangeFn(val){
            this.pageSize = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
    }
}
</script>
<style>
</style>

