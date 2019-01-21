<template>
    <div>
        <div-table
            :templateUse='templateUse'
            :templateList='templateList'
            :page="page"
            :page_size ="page_size"
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
import { Message } from 'element-ui'

export default {
    name:'addDownload',
    props:[
        'templateList'
    ],
    components:{
        'div-table':tableTemplate,
        'page-change':pageChange
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

