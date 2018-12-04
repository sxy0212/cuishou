<template>
  <div class="cover">
    <div class="upB"> 
        <el-button type="primary" plain @click='addFn(true)'>导入资料</el-button><el-button type="success" plain @click='addFn(true)'>下载模板</el-button>
    </div>
    <div-form
        :formInline="formInline"
    >
    </div-form>

    <div-table
        :tableData="tableData"
        v-on:handleSelectionChange = 'handleSelectionChange($event)'
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
            v-on:addNowChange = "addFn($event)"
            v-on:saveFn = "init($event)"
            v-on:clearId = "changeId($event)"
            v-on:clearFormTitle = "clearFormTitle($event)"
            v-on:submitUpload = "submitUpload($event)"
            :id="id"
            :title = "bannerTitle"
            :formTitle = "formTitle"
            :fileList = 'fileList'
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>

import addDataMan from '@/functions/editDialog/addDataMan.vue'
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
        'div-table':tableDataMan
    },
    data() {
        return {
            id:'',//编辑还是添加
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"导入资料",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }],
            formTitle:{//添加或是修改模块的数据
                name:''
            },
            formInline: {
				user: '',
				region: ''
            },
            fileList: [
                {
                    name: 'food.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, 
                {
                    name: 'food2.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ]
            
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
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.formTitle
                        this.total = Number( data.total_count )
                    }
                }
            }
            axiosRequest(conf)
        },
        addFn(val){//添加弹框的打开与关闭
            this.bannerTitle = "导入资料"
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
            this.bannerTitle = "区域编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name:row.name
            }
        },
        pageSizeChangeFn(val){
            // console.log(val)
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
                    url : '/api/api_backend.php?r=system-setting/area-del',
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
        handleSelectionChange(val){
            console.log(val)
        },
        submitUpload(){//导入，上传

        }
    }
}
</script>
<style>
.upB{margin-bottom:20px;}
</style>



