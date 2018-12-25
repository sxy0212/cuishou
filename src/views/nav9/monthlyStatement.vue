<template>
    <div>
        <div-form
            :options ='options'
            :formInline='formInline'
            :area_list='area_list'
            :client_list='client_list'
            :staff_list='staff_list'
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
                monthValue:[]
            },
            area_list:[],
            client_list:[],
            staff_list:[],
            tableData: [
                {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }
            ]
        }
    },
    activated(){
        this.getLists()
        this.init()
    },
    methods:{
        
        getLists(){//获取列表
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
        init(){//初始化
            let conf = {
				url:'/api/api_backend.php?r=statistics/daily',
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

