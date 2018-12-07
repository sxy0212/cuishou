<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn(true)'>添加模板</el-button>
    </div>
    <div class="tableCover">
        <div-table
            :templateUse='templateUse'
            :tableData = 'tableData'
            :page="page"
            :page_size ="page_size"
            v-on:editFn='editFn($event)'
            v-on:deleteFn='deleteFn($event)'
            v-on:downloadFn='downloadFn($event)'
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
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog
            v-on:addNowChange = "addFn($event)"
            v-on:saveFn = "init($event)"
            v-on:clearId = "changeId($event)"
            v-on:clearFormTitle = "clearFormTitle($event)"
            :id="id"
            :title = "bannerTitle"
            :formTitle = "formTitle"
            :fieldsList = "fieldsList"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addTemplate from '@/functions/editDialog/addTemplate.vue'
import tableTemplate from '@/functions/tableCollection/tableTemplate.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import  { axiosParams } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'


export default {
    components:{
        'edit-dialog':addTemplate,
        'page-change':pageChange,
        'div-table':tableTemplate
    },
    data() {
        return {
            id:'',//编辑还是添加
            templateUse:true,
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"模板添加",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }],
            formTitle:{//添加或是修改模块的数据
                name:'',
                
            },
            fieldsList:[]//多选选项
        }
    },
    created() {
        this.init()
    },
    methods: {
        
        init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/template-list',
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
        askFields(val,str){//调取多选选项
            let conf = {
                url : '/api/api_backend.php?r=system-setting/template-all-fields-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        if(val == 1){
                            this.fieldsList = data.info
                        }else if(val == 2){
                            this.fieldsList = data.info.map(item=>{
                                let cod = "," + str + ","
                                if( cod.indexOf(","+item.id+",") != -1 ){
                                    item["choose"] = true
                                }
                                return item 
                            })
                        }
                        
                    }
                }
            }
            axiosRequest(conf)
        },
        addFn(val){//添加弹框的打开与关闭
            this.bannerTitle = "模板添加"
            this.addNow = val
            this.id = ''
            this.formTitle = {
                name:''
            }
            this.askFields(1)
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:''
            }
            this.fieldsList = []
        },
        editFn(row){//编辑弹框的打开与关闭
            this.bannerTitle = "模板编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name:row.name
            }
            this.askFields(2,row.fields)

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
                    url : '/api/api_backend.php?r=system-setting/template-del',
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
        downloadFn(row){
            window.open('/api/api_backend.php?r=system-setting/template-download&id=' + row.id)
        }
    }
}
</script>
<style>
</style>

