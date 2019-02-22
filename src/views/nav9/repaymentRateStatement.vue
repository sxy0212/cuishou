<template>
    <div>
        <div-form
            :formInline='formInline'
            :area_list='area_list'
            :client_list='client_list'
            :staff_list='staff_list'
            v-on:countFn='countFn'
            v-on:exportStatement='exportStatement'
        ></div-form>
        <div-table
            :tableData='tableData'
            v-if="tableData.length"
            :list='list'
        ></div-table>
        <div v-if="!tableData.length" style="text-align:center;">暂无数据</div>
    </div>
</template>
<script>
import formRepaymentRate from '@/functions/formCollection/formRepaymentRate.vue'
import tableRepaymentRate from '@/functions/tableCollection/tableRepaymentRate.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'

export default {
    components:{
        'div-form':formRepaymentRate,
        'div-table':tableRepaymentRate,
    },
    data(){
        return{
            formInline:{
                monthValue:[],
                staff_id:'',
                start_time:'',
                end_time:'',
                area_id:'',
                client_id:''
            },
            tableData: [],
            area_list:[],
            client_list:[],
            staff_list:[],
            list:[]
        }
    },
    activated(){
        this.init()
        this.getLists()
    },
    methods:{
        countFn(){
            this.init()
        },
        init(){
            this.formInline.staff_id = this.formInline.monthValue.join(',')
            if( !this.formInline.start_time ) this.formInline.start_time = ''
            if( !this.formInline.end_time ) this.formInline.end_time = ''
            let conf = {
                url:'/api/api_backend.php?r=statistics-daily/list',
                data:this.formInline,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        if( data.info.length ){
                            this.list = data.info[0].list
                        }
                    }else if( data.statusCode == 0 ){
                        this.tableData = []
                        this.list = []
                    }
				} 
            }
            axiosRequest(conf)
        },
        exportStatement(){//导出报表
            window.open('/api/api_backend.php?r=statistics-daily/export&staff_id='+this.formInline.staff_id+'&start_time='+this.formInline.start_time+'&end_time='+this.formInline.end_time+'&area_id='+this.formInline.area_id+"&client_id="+this.formInline.client_id)
        },
        getLists(){
            let conf = {
				url:'/api/api_backend.php?r=statistics-daily/init',
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.area_list = data.info.area_list
                        this.client_list = data.info.client_list
                        this.staff_list = data.info.staff_list
                    }
				} 
            }
            axiosRequest(conf)
        }
    }
}
</script>

