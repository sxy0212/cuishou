<template>
    <div>
        <div-form
            :formInline='formInline'
            :area_list='area_list'
            :client_list='client_list'
            :staff_list='staff_list'
            v-on:countFn='countFn'
        ></div-form>
        <div-table
            :tableData='tableData'
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
import formMonthly from '@/functions/formCollection/formMonthly.vue'
import tableMonthly from '@/functions/tableCollection/tableMonthly.vue'

import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    components:{
        'div-form':formMonthly,
        'div-table':tableMonthly,
        'page-change':pageChange,
    },
    data(){
        return{
            page:1,
            page_size:10,
            total:0,
            formInline:{
                monthValue:[],
                staff_ids:'',
                collection_date:'',
                area_id:'',
                client_id:'',
            },
            area_list:[],
            client_list:[],
            staff_list:[],
            tableData: []
        }
    },
    activated(){
        this.getLists()
        this.init()
    },
    methods:{
        countFn(){
            this.page = 1 
            this.init()
        },
        getLists(){ //获取列表
            let conf = {
				url:'/api/api_backend.php?r=statistics/init-data',
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.area_list = data.info.area_list
                        this.client_list = data.info.client_list
                        this.staff_list = data.info.staff_list
                    }
				} 
            }
            axiosRequest(conf)
        },
        init(){ //初始化
            if( this.formInline.monthValue.length == 0 ){
                Message({
                    message: '请先选择催收员',
                    type: 'warning',
                    duration: 3 * 1000
                })
                return 
            }
            this.formInline.page = this.page
            this.formInline.page_size = this.page
            this.formInline.staff_ids = this.formInline.monthValue.join(',')
            let conf = {
                url:'/api/api_backend.php?r=statistics/daily',
                data:this.formInline,
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        // this.tableData = 
                    }
				} 
            }
            axiosRequest(conf)
        },
        saveFn(){
            
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

