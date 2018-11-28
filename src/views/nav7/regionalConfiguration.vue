<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn(true)'>添加区域</el-button>
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
          prop="name"
          label="区域名称"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size="mini" type="success" round @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page-change 
        :total="total"
        :page="page"
        :page_size ="page_size"
        v-on:pageSizeChange='pageSizeChangeFn($event)'
        v-on:currentPageChange='currentPageChangeFn($event)'
      ></page-change>
    </div>
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog
            v-on:addNowChange = "addFn($event)"
            v-on:saveFn = "init($event)"
            :id="id"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addArea from '@/components/editDialog/addArea.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    components:{
        'edit-dialog':addArea,
        'page-change':pageChange
    },
    data() {
        return {
            id:'',//编辑还是添加
            page:1,
            page_size:10,
            total:0,
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
            console.log(this.page,this.pageSize)
            let conf = {
                url : '/api/api_backend.php?r=system-setting/area-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
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
        addFn(val){//弹框的打开与关闭
            this.addNow = val
        },
        edit(row){
            this.bannerTitle = "区域编辑"
            this.id = row.id
            this.addFn(true)
        },
        pageSizeChangeFn(val){
            console.log(val)
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
             console.log(val)
            this.page = val
            this.init()
        },
        handleEdit(){

        },
        handleDelete(){
        
        }
    }
}
</script>
<style>
</style>

