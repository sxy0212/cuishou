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
            staff_list:[]
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
                        let arr = []
                        for(item in data.info){
                            
                        }
                        console.log(data.info)
                    }
				} 
            }
            axiosRequest(conf)
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
        },
        saveFn(){
            
        },
    }
}
</script>

