<template>
    <div>
        <div-form
            v-show="batchList.length"
            :batchList='batchList'
        ></div-form>
        <div>
            <el-button type="primary" @click="init" size='mini'>开始统计</el-button>
            <el-button type="primary" @click="exportStatement" size='mini'>导出报表</el-button>
        </div>
        <div-table
            :tableData='tableData'
            :page='page'
            :page_size='page_size'
        ></div-table>
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
import formMonthly from '@/functions/formCollection/formCallComplete.vue'
import tableMonthly from '@/functions/tableCollection/tableCallComplete.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    components:{
        'div-form':formMonthly,
        'div-table':tableMonthly,
        'page-change':pageChange
    },
    data(){
        return{
            batchList:[],
            tableData: [],
            page:1,
            page_size:10,
            total:0,
        }
    },
    activated(){
        this.getBatchList()
        this.init()
    },
    methods:{
        init(){ //初始化
            const batchid_str = this.batchList.filter(item=>item.choose).map(item=>item.id).join(',')
            const conf = {
                url:'/api/api_backend.php?r=asrcall-case-batch/case-call-count',
                data:{
                    batchid_str,
                    page:this.page,
                    page_size:this.page_size
                },
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                        this.total = Number(data.info.total)
                    }else if(data.statusCode == 0 ){
                        this.tableData = []
                    }
				} 
            }
            axiosRequest(conf)
        },
        getBatchList(){
            const conf = {
                url:'/api/api_backend.php?r=asrcall-case-batch/batch-name-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.batchList = data.info
                    }else if(data.statusCode == 0 ){
                        this.batchList = []
                    }
				} 
            }
            axiosRequest(conf)

        },
        exportStatement(){
            const ids =  this.batchList.filter(item=>item.choose).map(item=>item.id).join(',')
            window.open('/api/api_backend.php?r=asrcall-case-batch/case-call-count-export&action=export'+'&batchid_str='+ids)
        },
        pageSizeChangeFn(val){
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
    }
}
</script>

