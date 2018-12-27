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
             tableData: [
                {   
                    true_name:'孙晓明',
                    valid_8:6,
                    total_8:12,
                    case_8:12,
                    valid8_12:70,
                    total8_12:102,
                    case8_12:76,
                    valid12_18:68,
                    total12_18:136,
                    case12_18:120,
                    valid18_:4,
                    total18_:10,
                    case18_:4,
                    sum_valid:148,
                    sum_total:260,
                    sum_case:198
                },
                {  
                    true_name:'李学军',
                    valid_8:4,
                    total_8:7,
                    case_8:4,
                    valid8_12:36,
                    total8_12:70,
                    case8_12:62,
                    valid12_18:37,
                    total12_18:53,
                    case12_18:40,
                    valid18_:5,
                    total18_:12,
                    case18_:8,
                    sum_valid:82,
                    sum_total:142,
                    sum_case:114
                },
                {  
                    true_name:'陈向东',
                    valid_8:11,
                    total_8:14,
                    case_8:13,
                    valid8_12:43,
                    total8_12:59,
                    case8_12:52,
                    valid12_18:41,
                    total12_18:63,
                    case12_18:44,
                    valid18_:31,
                    total18_:47,
                    case18_:38,
                    sum_valid:126,
                    sum_total:183,
                    sum_case:147
                },
                {  
                    true_name:'欧阳风',
                    valid_8:16,
                    total_8:19,
                    case_8:19,
                    valid8_12:61,
                    total8_12:70,
                    case8_12:70,
                    valid12_18:78,
                    total12_18:96,
                    case12_18:90,
                    valid18_:15,
                    total18_:22,
                    case18_:20,
                    sum_valid:170,
                    sum_total:207,
                    sum_case:199
                },
                {  
                    true_name:'周志生',
                    valid_8:15,
                    total_8:24,
                    case_8:24,
                    valid8_12:88,
                    total8_12:92,
                    case8_12:88,
                    valid12_18:71,
                    total12_18:86,
                    case12_18:76,
                    valid18_:26,
                    total18_:31,
                    case18_:31,
                    sum_valid:200,
                    sum_total:233,
                    sum_case:219
                },
                {  
                    true_name:'孙锡华',
                    valid_8:9,
                    total_8:21,
                    case_8:20,
                    valid8_12:54,
                    total8_12:64,
                    case8_12:59,
                    valid12_18:58,
                    total12_18:72,
                    case12_18:72,
                    valid18_:42,
                    total18_:43,
                    case18_:42,
                    sum_valid:163,
                    sum_total:200,
                    sum_case:191
                }
            ],
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
                        // this.tableData = data.info
                        // let arr = []
                        // for(item in data.info){
                            
                        // }
                        // console.log(data.info)
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

