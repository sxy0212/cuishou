<template>
  <div class="cover">
    <div class="upB"> 
        <el-button type="primary" plain @click='addFn(true)'>导入资料</el-button><el-button type="success" plain @click='downloadFn(true)'>下载模板</el-button>
    </div>
    <div-form
        :formInline='formInline'
        :areaList='areaList'
        :typeList='typeList'
        :clientList='clientList'
        v-on:addFn = 'searchFn($event)'
    >
    </div-form>

    <div-table
        :tableData="tableData"
        :addTask='addTask'
        v-on:deleteFn='deleteFn($event)'
        v-on:exportFn='exportFn($event)'
        v-on:addToFn='addToFn($event)'
        v-on:addToTask='addToTask($event)'
    >
    </div-table>
    <page-change 
        :total="total"
        :page="page"
        :page_size ="page_size"
        v-on:pageSizeChange='pageSizeChangeFn($event)'
        v-on:currentPageChange='currentPageChangeFn($event)'
    ></page-change>
    
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog
            v-on:init='init($event)'
            v-on:changeAddNow="changeAddNow($event)"
            v-on:addNowChange="addFn($event)"
            v-on:saveFn="init($event)"
            v-on:clearId="changeId($event)"
            v-on:clearFormTitle="clearFormTitle($event)"
            :id="id"
            :action="action"
            :title = "bannerTitle"
            :formTitle = "formTitle"
            :fileList = 'fileList'
            :areaList='areaList'
            :typeList='typeList'
            :clientList='clientList'
        ></edit-dialog>
    </el-dialog>
    <el-dialog title="下载模板" :visible.sync="addDown" >
        <div-dialog
        ></div-dialog>
    </el-dialog>
    <el-dialog title="添加到外呼任务" :visible.sync="addTask" >
        <task-dialog
            :formTask='formTask'
            :taskList='taskList'
            v-on:sureToAddTask='sureToAddTask($event)'
        ></task-dialog>
    </el-dialog>
  </div>
</template>
<script>

import addDataMan from '@/functions/editDialog/addDataMan.vue'
import addTask from '@/functions/editDialog/addTask.vue'
import addDownload from '@/functions/editDialog/addDownload.vue'
import formDataMan from '@/functions/formCollection/formDataMan.vue'
import tableDataMan from '@/functions/tableCollection/tableDataMan.vue'
import pageChange from '@/components/pageChange.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'


export default {
    components:{
        'edit-dialog':addDataMan,
        'page-change':pageChange,
        'div-form':formDataMan,
        'div-table':tableDataMan,
        'div-dialog':addDownload,
        'task-dialog':addTask
    },
    data() {
        return {
            id:'',//编辑还是添加
            batch_id:'',//哪个外呼任务
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"导入资料",
            addNow:false,
            addDown:false,//是否打开下载模板
            addTask:false,//是否添加外呼任务
            tableData: [],
            formTitle:{//添加或是修改模块的数据
                batch_name:'',
                collection_area:'',
                client:'',
                case_type:'',
                remark:'',
            },
            fileList: [],
            action:'',
            formInline: {
				collection_area: '',
                client: '',
                case_type:''
            },
            areaList:[//区域资料
            ],
            clientList:[//客户资料

            ],
            typeList:[//类型资料

            ],
            taskList:[//任务列表

            ],
            tableDownload:[//下载模板数据

            ],
            formTask:{//添加外呼数据
                value:''
            }
        }
    },
    created() {
        this.init()
        this.getAreaList()
        this.getClientList()
        this.getTypeList()
    },
    methods: {
        init(){
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/case-batch-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                        this.total = Number( data.info.total )
                    }
                }
            }
            axiosRequest(conf)
        },
        searchFn(){//搜索
            let data = this.formInline
            data.page = this.page
            data.page_size = this.page_size
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/search-batch-list',
                data,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.total = Number( data.info.length )
                    }else if(data.statusCode == 0 ){
                        this.tableData = []
                        this.total = 0
                    }
                }
            }
            axiosRequest(conf)
        },
        getAreaList(){//获取基本数据
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/collection-area',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.areaList = data.info
                    }
                }
            }
            axiosRequest(conf)
        },
        getClientList(){//获取基本数据
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/client',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.clientList = data.info
                    }
                }
            }
            axiosRequest(conf)
        },
        getTypeList(){//获取基本数据
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/case-type',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.typeList = data.info
                    }
                }
            }
            axiosRequest(conf)
        },
        addFn(val){//添加
            this.bannerTitle = "导入资料"
            this.addNow = val
            this.id = ''
            this.fileList =[]
            this.action = '/api/api_backend.php?r=asrcall-case-batch/import-batch'
            this.formTitle = {
                batch_name:'',
                collection_area:'',
                client:'',
                case_type:'',
                remark:''
            }
        },
        changeAddNow(val){
            this.addNow = val
        },
        downloadFn(val){//添加弹框的打开与关闭
            this.addDown = val
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:''
            }
        },
        addToFn(row){//追加
            this.bannerTitle = "资料追加"
            this.id = row.id
            this.addNow = true
            this.fileList =[]
            this.action = '/api/api_backend.php?r=asrcall-case-batch/superaddition'
        },
        pageSizeChangeFn(val){
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
        deleteFn(row){
            this.$confirm('确定删除这一条？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let conf = {
                    url : '/api/api_backend.php?r=asrcall-case-batch/fake-del-batch',
                    data : {
                        batch_id:row.id
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
        },
        exportFn(row){//导出
            window.open('/api/api_backend.php?r=asrcall-case-batch/export-batch&batch_id='+row.id)
        },
        addToTask(row){//获取任务
            this.addTask= true
            this.batch_id = row.id
            this.formTask = {
                            value:''
                        }
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/config-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.taskList = data.info
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
        },
        sureToAddTask(){//添加到外呼任务
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch/add-to-config',
                data:{
                    batch_id:this.batch_id,
                    config_id:this.formTask.value
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.init()
                        this.addTask= false
                        this.batch_id = ''
                        this.formTask = {
                            value:''
                        }
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
        }
        
    }
}
</script>
<style>
.upB{margin-bottom:20px;}
</style>



