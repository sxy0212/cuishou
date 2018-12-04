<template>
    <div>
        <div-table
            :templateUse='templateUse'
            :tableData='tableData'
            v-on:downloadFn = 'downloadFn($event)'
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
import tableTemplate from '@/functions/tableCollection/tableTemplate.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'

export default {
    name:'addDownload',
    components:{
        'div-table':tableTemplate,
        'page-change':pageChange
    },
    created() {
        this.init()
    },
    data(){
        return {
            templateUse:false,
            page:1,
            page_size:10,
            total:0,
            tableData:[]
        }
    },
    methods:{
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
                        this.total = Number(data.total)
                    }
                }
            }
            axiosRequest(conf)
        },
        downloadFn(row){
            window.open('/api/api_backend.php?r=system-setting/template-download&id=' + row.id)
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

