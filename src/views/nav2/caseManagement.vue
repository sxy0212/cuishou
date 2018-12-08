<template>
<div>
	<div class="cover">
		<div-form
			:conditions='conditions'
			:levelList='levelList'
			:batchList='batchList'
			:departmentList='departmentList'
			:staffList='staffList'
			v-on:changeFn='changeFn($event)'
			v-on:getDepartmentList='getDepartmentList($event)'
			:clientList='clientList'
		>
		</div-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="searchFn" size="mini">查询</el-button>
			<el-button type="info" @click="clearFn" size="mini">清空</el-button>
		</div>
    <div> 
    <div class="blueB">
		<second-form
			:form='form'
		>
		</second-form>
	</div>
	</div>
    <div class="tableCover">
		<div class="totalT">
			查询统计：	案件总数：{{totalNum}}件，总金额：￥{{titalAmount}}
		</div>
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
   </div>
</div>
 
</template>
<script>
import '@/assets/css/system.css'
import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/functions/formCollection/formCaseFirst.vue'
import formCaseSecond from '@/functions/formCollection/formCaseSecond.vue'
import tableCaseMan from '@/functions/tableCollection/tableCaseMan.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import store from '@/vuex/store.js'
import router from '@/router.js'
// import indexMethod  from '@/utils/indexMethod.js'
export default {
    components:{
        'page-change':pageChange,
		'div-form':formCaseFirst,
		'second-form':formCaseSecond,
		'div-table':tableCaseMan
	},
	data() {
        return {
			totalNum:'',//案件总数
			titalAmount:'',//总额
			formKey:{
				key:''
			},
			form: {
          		name: '',
				region: ''
			},
			levelList:[],//案件等级
			batchList:[],//批次列表
			departmentList:[],//部门列表
			clientList:[],//委托方列表
			staffList:[],//催收员列表
			conditions:{//搜索条件
				case_name: "",
				case_mobile: "",
				case_id_num: "",
				case_status: "",
				talk_recode: "",
				case_level: "",
				batch_id: "",
				depart_id:'',
				staff_id:'',
				case_color: "",
				id: "",
				talk_time1:'',
				talk_time2:'',
				case_money1:'',
				case_money2:'',
				case_money: [        
					"",
					""
				],
				case_client: [ 
					"",
					""
				],
				case_date: [        "",
					""
				],
				case_back_date: [
					"",
					""
				],
				case_last_collection_date: [        
					"",
					""
				],
				talk_time: [        
					"",
					""
				]
			},
			formInline: {
				user: '',
				region: ''
			},
            id:'',//查询部门还是催收员
            page:1,
            page_size:10,
            total:0,
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }],
            formTitle:{//添加或是修改模块的数据
                name:''
            },
        }
    },
    created() {
		this.init()
		console.log(store)
		this.getBatchList()
		this.getDepartmentList(1)
	},
	methods: {
		handleSelectionChange(val){
			console.log(val)
		},
		searchFn(){

		},
        getBatchList(){
			let conf = {
                url : '/api/api_backend.php?r=collection/init-search',
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.levelList = data.info.case_level
                        this.batchList = data.info.batch_id
                    }
                }
            }
            axiosRequest(conf)
		},
		changeFn(val){
			this.id = val
		},
		getDepartmentList(num){
			let data = {
				id:this.id
			}
			let conf = {
				url : '/api/api_backend.php?r=collection/depart-search',
				data,
                success:(data)=>{
					if( data.statusCode == 1 ){
						if(num == 1){
							this.departmentList = data.info.depart
						}else if(num ==2){
							this.staffList = data.info.staff
						}
						this.id = ''
                    }
                }
            }
            axiosRequest(conf)
		},
		init(){
			this.conditions.talk_time=[
				this.conditions.talk_time1,
				this.conditions.talk_time2
			]
			this.conditions.case_money=[
				this.conditions.case_money1,
				this.conditions.case_money2
			]
            let conf = {
				url : '/api/api_backend.php?r=collection/search',
				data:{
					conditions:JSON.stringify(this.conditions)
					// page:this.page,
                	// page_size:this.page_size
				},
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                    }
                }
            }
            axiosRequest(conf)
        },
		pageSizeChangeFn(val){
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
		},
		clearFn(){

		}
        
    }
}
</script>
<style>
.blueB{background-color:rgba(0, 204, 255, 0.0980392156862745);padding:10px 0;margin:10px 0;}
.marginU{margin-top:10px;}
.el-form-item{margin-bottom:12px;}
.el-form-item__content,.el-form-item__label{line-height:30px;}
.el-input__inner{height:30px;line-height:30px;}
.dialog-footer{text-align:right;}
.totalT{width:98%;font-size:14px;line-height:23px;color: #909399;border:1px solid grey;}
</style>



