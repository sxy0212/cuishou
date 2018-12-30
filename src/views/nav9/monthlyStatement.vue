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
        ></div-table>
    </div>
</template>
<script>
import formMonthly from '@/functions/formCollection/formMonthly.vue'
import tableMonthly from '@/functions/tableCollection/tableMonthly.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    components:{
        'div-form':formMonthly,
        'div-table':tableMonthly,
    },
    data(){
        return{
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
            tableData: [
                {   
                    true_name:'王丽',
                    valid_8:3,
                    total_8:6,
                    case_8:6,
                    valid8_12:35,
                    total8_12:51,
                    case8_12:38,
                    valid12_18:34,
                    total12_18:68,
                    case12_18:60,
                    valid18_:2,
                    total18_:5,
                    case18_:2,
                    sum_valid:74,
                    sum_total:130,
                    sum_case:106
                },
                {  
                    true_name:'高峰',
                    valid_8:2,
                    total_8:5,
                    case_8:2,
                    valid8_12:34,
                    total8_12:68,
                    case8_12:60,
                    valid12_18:35,
                    total12_18:51,
                    case12_18:38,
                    valid18_:3,
                    total18_:6,
                    case18_:6,
                    sum_valid:74,
                    sum_total:130,
                    sum_case:106
                },
                {  
                    true_name:'江楠',
                    valid_8:6,
                    total_8:9,
                    case_8:8,
                    valid8_12:38,
                    total8_12:54,
                    case8_12:47,
                    valid12_18:36,
                    total12_18:58,
                    case12_18:39,
                    valid18_:26,
                    total18_:42,
                    case18_:33,
                    sum_valid:106,
                    sum_total:163,
                    sum_case:127
                },
                {  
                    true_name:'徐光明',
                    valid_8:6,
                    total_8:9,
                    case_8:9,
                    valid8_12:51,
                    total8_12:60,
                    case8_12:60,
                    valid12_18:68,
                    total12_18:86,
                    case12_18:80,
                    valid18_:5,
                    total18_:12,
                    case18_:10,
                    sum_valid:130,
                    sum_total:167,
                    sum_case:159
                },
                {  
                    true_name:'涂磊',
                    valid_8:5,
                    total_8:8,
                    case_8:8,
                    valid8_12:68,
                    total8_12:72,
                    case8_12:68,
                    valid12_18:51,
                    total12_18:66,
                    case12_18:56,
                    valid18_:6,
                    total18_:11,
                    case18_:11,
                    sum_valid:130,
                    sum_total:157,
                    sum_case:143
                },
                {  
                    true_name:'张雪丽',
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
                    sum_case:193
                }
            ]
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
            this.formInline.page = this.page
            this.formInline.page_size = this.page
            this.formInline.staff_ids = this.formInline.monthValue.join(',')
            let conf = {
                url:'/api/api_backend.php?r=statistics/daily',
                data:this.formInline,
				success:(data)=>{
                    if( data.statusCode == 1 ){
                        // this.tableData = data.info
                    }else if(data.statusCode == 0 ){
                        // this.tableData = []
                //         Message({
                //     message: '请先选择催收员',
                //     type: 'warning',
                //     duration: 3 * 1000
                // })
                    }
				} 
            }
            axiosRequest(conf)
        },
        exportStatement(){
            return
            window.open('')
        }
    }
}
</script>

