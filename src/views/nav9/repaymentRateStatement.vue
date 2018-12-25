<template>
    <div>
        <div-form
            :options = 'options'
            :formInline = 'formInline'
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
import tableRepaymentRate from '@/functions/tableCollection/tableRepaymentRate.vue'

import pageChange from '@/components/pageChange.vue'
export default {
    components:{
        'div-form':formMonthly,
        'div-table':tableRepaymentRate,
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
            options:[
                {
                value: '选项1',
                label: '黄金糕'
                },
                 {
                value: '选项2',
                label: '双皮奶'
                }, 
                {
                value: '选项3',
                label: '蚵仔煎'
                }, 
                {
                value: '选项4',
                label: '龙须面'
                }, 
                {
                value: '选项5',
                label: '北京烤鸭'
                }
            ],
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
    methods:{
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

