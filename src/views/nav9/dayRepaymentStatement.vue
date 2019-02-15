<template>
    <div>
        <div-form
            :formInline='formInline'
            :area_list='area_list'
            :client_list='client_list'
            :staff_list='staff_list'
            :batch_list='batch_list'
            :case_list='case_list'
            v-on:countFn='countFn'
            v-on:exportStatement='exportStatement'
        ></div-form>
        <div-table
            :tableData='tableData'
        ></div-table>
        <page-change 
            v-show="!!total"
			:total="total"
			:page="page"
			:page_size ="page_size"
			v-on:pageSizeChange='pageSizeChangeFn($event)'
			v-on:currentPageChange='currentPageChangeFn($event)'
		></page-change>
    </div>
</template>
<script>
import formDayRepayment from '@/functions/formCollection/formDayRepayment.vue'
import tableDayRepayment from '@/functions/tableCollection/tableDayRepayment.vue'

import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
export default {
    components:{
        'div-form':formDayRepayment,
        'div-table':tableDayRepayment,
        'page-change':pageChange,
    },
    data(){
        return{
            page:1,
            page_size:10,
            total:0,
            formInline:{
                monthValue:[],
                is_cancel:'0',
                area:'',
                entrust:'',
                batch_id:'',
                case_type:'',
                staff:''
            },
            batch_list:[],
            area_list:[],
            client_list:[],
            staff_list:[],
            case_list:[],
            tableData: [
                {}
            ],
            tableData: []
        }
    },
    activated(){
        this.init()
        this.getLists()
    },
    methods:{
        countFn(){
            this.page = 1
            this.init()
        },
        init(){//初始化
            this.formInline.staff = this.formInline.monthValue.join(',')
            this.formInline.page = this.page
            this.formInline.page_size = this.page_size
            let conf = {
                url:'/api/api_backend.php?r=call-stat/day-stat',
                data:this.formInline,
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                        this.total = Number(data.info.total_count)
                    }
				} 
            }
            axiosRequest(conf)
        },
        getLists(){ //获取列表
            let conf = {
				url:'/api/api_backend.php?r=call-stat/select-data',
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.area_list = data.info.area
                        this.client_list = data.info.entrust
                        this.batch_list = data.info.batch
                        this.case_list = data.info.case_type
                        this.staff_list = data.info.staff
                    }
				} 
            }
            axiosRequest(conf)
        },
        exportStatement(){  //导出
            this.formInline.staff = this.formInline.monthValue.join(',')
            window.open('/api/api_backend.php?r=call-stat/day-stat-export&staff='+ this.formInline.staff+'&area='+this.formInline.area+'&entrust='+this.formInline.entrust+'&batch_id='+this.formInline.batch_id+'&is_cancel='+this.formInline.is_cancel+'&case_type='+this.formInline.case_type)
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

