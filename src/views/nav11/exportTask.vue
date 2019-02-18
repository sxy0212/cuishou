<template>
  <div>
    <div-table
        :tableData="tableData"
        :addTask='addTask'
        :page='page'
        :page_size='page_size'
        v-on:deleteFn='deleteFn($event)'
        v-on:exportFn='exportFn($event)'
    >
    </div-table>
    <page-change 
        :total="total"
        :page="page"
        :page_size ="page_size"
        v-on:pageSizeChange='pageSizeChangeFn($event)'
        v-on:currentPageChange='currentPageChangeFn($event)'
    ></page-change>
</div>
</template>
<script>

import tableExportTask from '@/functions/tableCollection/tableExportTask.vue'
import pageChange from '@/components/pageChange.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'


export default {
    components:{
        'page-change':pageChange,
        'div-table':tableExportTask,
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
            templateList:[],//
            tableDownload:[//下载模板数据

            ],
            formTask:{//添加外呼数据
                value:'',
                type:'1'
            },
            importNow:false,
        }
    },
    activated(){
        this.init()
    },
    methods: {
        init(){
            const conf = {
                url : '/api/api_backend.php?r=export-task/task-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.list
                        this.total = Number( data.info.total_count )
                    }else if( data.statusCode == 0 ){
                        this.tableData = []
                        this.total = 0
                    }
                }
            }
            axiosRequest(conf)
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
                const conf = {
                    url : '/api/api_backend.php?r=export-task/task-del',
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
        },
        exportFn(row){//导出
            window.open('/api/api_backend.php?r=asrcall-case-batch/export-batch&batch_id='+row.id)
        },
        
    }
}
</script>



