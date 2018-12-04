<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn(true)'>添加委托方</el-button>
    </div>
    <div class="tableCover">
      <el-table
        border
        :data="tableData"
        style="width: 98%">
        <el-table-column
          label="序号"
          prop="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="委托方名称"
          >
        </el-table-column>
        <el-table-column
          prop="prefix"
          label="前缀"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size="mini" type="success" round @click="editFn(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" round @click="deleteFn(scope.row)">删除</el-button>
          </template>
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
        <edit-dialog
            v-on:addNowChange = "addFn($event)"
            v-on:clearId = "changeId($event)"
            v-on:saveFn = "init($event)"
            v-on:clearFormTitle = "clearFormTitle($event)"
            :id="id"
            :title="bannerTitle"
            :formTitle = "formTitle"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addClient from '@/functions/editDialog/addClient.vue'
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
            id:'',
            page:1,
            total:0,
            page_size:10,
            bannerTitle:"委托方添加",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }],
            formTitle:{
                name:'',
                prefix:''
            },
        }
    },
    created() {
        this.init()  
    },
    methods: {
        init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/commissioning-party-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.total = Number( data.total )
                    }
                }
            }
            axiosRequest(conf)
        },
        addFn(val){//添加弹框的打开与关闭
            this.bannerTitle = "委托方添加"
            this.addNow = val
            this.id = ''
        },
        pageSizeChangeFn(val){
            this.pageSize = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:'',
                prefix:''
            }
        },
        editFn(row){//编辑弹框的打开与关闭
            this.bannerTitle = "委托方编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name: row.name,
                prefix: row.prefix
            }
        },
        deleteFn(row){
             this.$confirm('确定删除这一条？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let conf = {
                    url : '/api/api_backend.php?r=system-setting/commissioning-party-del',
                    data : {
                        id:row.id
                    },
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.init()
                            Message({
                                message: data.message,
                                type: 'success',
                                duration: 3 * 1000
                            })
                        }else if(data.statusCode == 0){
                            Message({
                                message: data.message,
                                type: 'erro',
                                duration: 3 * 1000
                            })
                        }
                    }
                }
                axiosRequest(conf)
            }).catch( () =>{
                Message({
                    message:'取消删除',
                    type: 'erro',
                    duration: 3 * 1000
                })
            })
        }
    }
}
</script>
<style>
</style>

