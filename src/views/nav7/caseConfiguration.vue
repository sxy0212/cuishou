<template>
  <div class="cover">
    <div> 
        <el-button type="success" @click='addFn(true)'>添加案件类型</el-button>
    </div>
    <div class="tableCover">
        <div-table
            :tableData = 'tableData'
            :page="page"
            :page_size ="page_size"
            v-on:editFn='editFn($event)'
            v-on:deleteFn='deleteFn($event)'
            v-on:downloadFn='downloadFn($event)'
        ></div-table>
      
        <page-change 
            :total="total"
            :page="page"
            :page_size ="page_size"
            v-on:pageSizeChange='pageSizeChangeFn($event)'
            v-on:currentPageChange='currentPageChangeFn($event)'
        ></page-change>
    </div>
    <el-dialog :title="bannerTitle" :visible.sync="addNow" v-move>
        <edit-dialog
            v-on:addNowChange = "addFn($event)"
            v-on:saveFn = "init($event)"
            v-on:clearId = "changeId($event)"
            v-on:clearFormTitle = "clearFormTitle($event)"
            :id="id"
            :title = "bannerTitle"
            :formTitle = "formTitle"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import addType from '@/functions/editDialog/addType.vue'
import tableCaseCon from '@/functions/tableCollection/tableCaseCon.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'


export default {
    components:{
        'edit-dialog':addType,
        'page-change':pageChange,
        'div-table':tableCaseCon
    },
    data() {
        return {
            id:'',//编辑还是添加
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"案件类型添加",
            addNow:false,
            tableData: [],
            formTitle:{
                name:''
            },
        }
    },
    activated(){
        this.init()
	},
    methods: {
        init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/case-type-list',
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
            this.bannerTitle = "案件类型添加"
            this.addNow = val
            this.id = ''
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:''
            }
        },
        editFn(row){//编辑弹框的打开与关闭
            this.bannerTitle = "案件类型编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name:row.name
            }
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
                    url : '/api/api_backend.php?r=system-setting/case-type-del',
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

