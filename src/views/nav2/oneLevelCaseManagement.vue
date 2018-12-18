<template>
<div>
	<div class="cover">
		<div-form
			:conditions='conditions'
			:levelList='levelList'
			:filterList='filterList'
			:batchList='batchList'
			:departmentList='departmentList'
			:staffList='staffList'
			:clientList='clientList'
			:caseStatusList='caseStatusList'
			v-on:changeFn='changeFn($event)'
			v-on:getDepartmentList='getDepartmentList($event)'
			v-on:filterFn='filterFn($event)'
		>
		</div-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="init" size="mini">查询</el-button>
			<el-button type="info" @click="clearFn" size="mini">清空</el-button>
		</div>
    <div> 
    <div class="blueB">
		<second-form
			:form='form'
			v-on:changeArea='changeArea($event)'
			v-on:pauseFn='pauseFn($event)'
			v-on:colorChange='colorChange($event)'
			v-on:distributeFn='distributeFn($event)'
		>
		</second-form>
	</div>
	</div>
    <div class="tableCover">
		<div class="totalT">
			查询统计：	案件总数：{{case_num}}件，总金额：￥{{case_all_money}}
		</div>
		<div-table
			:tableData='tableData'
			v-on:handleSelectionChange='handleSelectionChange($event)'
		></div-table>
		<page-change 
			:total="total"
			:page="page"
			:page_size ="page_size"
			v-on:pageSizeChange='pageSizeChangeFn($event)'
			v-on:currentPageChange='currentPageChangeFn($event)'
		></page-change>
    </div>
	<el-dialog :title="bannerTitle" :visible.sync="addChangeAreaNow" >
        <edit-dialog
			:areaList='areaList'
			:formTitle='formTitle'
			v-on:protectFn='protectFn($event)'
			v-on:cancelFn='cancelFn($event)'
        ></edit-dialog>
    </el-dialog>
	<el-dialog title="手动分配" :visible.sync="distributeNow" >
        <second-dialog
			:formDistribute='formDistribute'
			:departmentList='departmentList'
			:staffList='staffList'
			v-on:cancelDistribute='cancelDistribute($event)'
			v-on:sureToDistribute='sureToDistribute($event)'
			v-on:changeFn='changeFn($event)'
			v-on:getDepartmentList='getDepartmentList($event)'
		></second-dialog>
    </el-dialog>
   </div>
</div>
 
</template>
<script>
import '@/assets/css/system.css'
import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/functions/formCollection/formCaseFirst.vue'
import formCaseSecond from '@/functions/formCollection/formCaseSecond.vue'
import tableCaseMan from '@/functions/tableCollection/tableCaseMan.vue'
import addChangeArea from '@/functions/editDialog/addChangeArea.vue'
import addDistribute from '@/functions/editDialog/addDistribute.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    components:{
        'page-change':pageChange,
		'div-form':formCaseFirst,
		'second-form':formCaseSecond,
		'div-table':tableCaseMan,
		'edit-dialog':addChangeArea,
		'second-dialog':addDistribute
	},
	data() {
        return {
			distributeNow:false,//分配
			bannerTitle:'修改区域',
			addChangeAreaNow:false,//修改区域
			case_num:'',//案件总数
			case_all_money:'',//总额
			formDistribute:{
				depart_id:'',
				staff:[],
				case_all_num:''//分配数量
			},
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
				case_client:'',//委托方
				talk_time1:'',
				talk_time2:'',
				case_money1:'',
				case_money2:'',
				case_money: [        
					"",
					""
				],
				case_date: [        
					'',
					''
				],
				case_back_date: [
					"",
					""
				],
				case_last_collection_date: [        
					'',
					''
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
            tableData: [],
            formTitle:{//添加或是修改模块
                id:''
			},
			caseStatusList:[//案件状态
                {
                    value:'0',
                    label:'正常状态'
                },
                {
                    value:'1',
                    label:'暂停'
                },
                {
                    value:'2',
                    label:'关闭'
                },
                {
                    value:'3',
                    label:'退案'
                }
			],
			multipList:[],//多样的选择,
			areaList:[],//区域列表
			filterList:[],//委托方
			case_id:null,//搜索结果
		}
	},
	activated(){
		this.conditions.staff_id = this.$route.query.staff_id
		this.conditions.depart_id = this.$route.query.depart_id
		this.conditions.batch_id = this.$route.query.batch_id
		this.init()
		this.getBatchList()
		this.getDepartmentList(1)
		this.filterFn('')
	},
    methods: {
		changeCaseClient(val){
			t = val
		},
		handleSelectionChange(val){
			this.multipList = val
		},
		getBatchList(){//获取批次列表
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
		getDepartmentList(num){//获取部门或是催收员列表
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
		filterFn(val){//获取委托方
            let conf = {
                url : '/api/api_backend.php?r=collection/client-search',
                data:{
                    case_client:val
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.filterList = data.info.client
						this.conditions.case_client = data.info.client_batch_id
                    }else if(data.statusCode == 0){
                        this.filterList = []
                    }
                }
            }
            axiosRequest(conf)
        },
		init(){
			//端口需要的数据键值对必须是正好的，多余的没用的键值对会报错，所以这样单独来取
			let data = {
				case_name: this.conditions.case_name,
				case_mobile: this.conditions.case_mobile,
				case_id_num:  this.conditions.case_id_num,
				case_status:  this.conditions.case_status,
				talk_recode:  this.conditions.talk_recode,
				case_level:  this.conditions.case_level,
				batch_id:  this.conditions.batch_id,
				depart_id: this.conditions.depart_id,
				staff_id: this.conditions.staff_id,
				case_color:  this.conditions.case_color,
				id:  this.conditions.id,
				case_client: this.conditions.case_client,//委托方
				case_money: [
					this.conditions.case_money1,
					this.conditions.case_money2
				],
				case_date: this.conditions.case_date,
				case_back_date: this.conditions.case_back_date,
				case_last_collection_date: this.conditions.case_last_collection_date,
				talk_time: [
					this.conditions.talk_time1,
					this.conditions.talk_time2
				],
				
			}
            let conf = {
				url : '/api/api_backend.php?r=collection/search',
				data:{
					data:JSON.stringify(data),
					page:this.page,
                	page_size:this.page_size
				},
                success:(data)=>{
                    if( data.statusCode == 1 ){
						this.tableData = data.info.info.map(item=>{
							this.caseStatusList.forEach(one=>{
								if(one.value == item.case_status){
									item.case_status = one.label
									
								}
							})
							return item
						})
						this.total = Number( data.info.total )
						this.case_all_money = data.info.case_all_money
						this.case_num = data.info.case_num
						this.case_id = data.info.case_id
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
		clearFn(){//清空，将数组的数据全部手写清空
			this.conditions = {
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
				case_client:"",
				talk_time1:'',
				talk_time2:'',
				case_money1:'',
				case_money2:'',
				case_money: [        
					"",
					""
				],
				case_date: [        
					'',
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
			}
		},
		changeArea(){//修改区域
			if( !!this.multipList.length ){//去获取区域列表
				this.addChangeAreaNow = true
				this.formTitle = {
							id:''
						}
				let conf = {
					url : '/api/api_backend.php?r=collection/area-query',
					success:(data)=>{
						if( data.statusCode == 1 ){
							this.areaList = data.info
						}
					}
				}
				axiosRequest(conf)
			}else{
				Message({
					message: '请先选择要修改的数据',
					type: 'info',
					duration: 3 * 1000
				})
			}
		},
		protectFn(){//保存区域
			let ids = this.multipList.map(item=>{
				return item.id
			})
			let data = JSON.stringify( {
							"case_status":"",                       //案件状态，三者选填其一
							"case_color":"",                       //案件标色，三者选填其一
							"collection_area":this.formTitle.id                   //催收区域，三者选填其一
						} )
						
			let conf = {
				url : '/api/api_backend.php?r=collection/update',
				data:{
					id: ids,
					data:data
				},
				success:(data)=>{
					if( data.statusCode == 1 ){
						this.formTitle={
							id:''
						}
						this.addChangeAreaNow = false
						this.init()
						this.multipList = []
						Message({
							message: data.message,
							type: 'success',
							duration: 3 * 1000
						})
					}else{
						Message({
							message: data.message,
							type: 'info',
							duration: 3 * 1000
						})
					}
				}
			}
			axiosRequest(conf)
		},
		cancelFn(){
			this.addChangeAreaNow = false
		},
		pauseFn(str){//暂停案件
			if( !!this.multipList.length ){
				let ids = this.multipList.map(item=>{
						return item.id
				})
				let data = JSON.stringify( {
					"case_status":str,                       //案件状态，三者选填其一
					"case_color":"",                       //案件标色，三者选填其一
					"collection_area":''                   //催收区域，三者选填其一
				} )
				let conf = {
					url : '/api/api_backend.php?r=collection/update',
					data:{
						id: ids,
						data:data
					},
					success:(data)=>{
						if( data.statusCode == 1 ){
							this.init()
							this.multipList = []
							Message({
								message: data.message,
								type: 'success',
								duration: 3 * 1000
							})
						}else{
							Message({
								message: data.message,
								type: 'info',
								duration: 3 * 1000
							})
						}
					}
				}
				axiosRequest(conf)
			}else{
				Message({
					message: '请先选择要修改的数据',
					type: 'info',
					duration: 3 * 1000
				})
			}
			
		},
		colorChange(str){
			if( !!this.multipList.length ){
				let ids = this.multipList.map(item=>{
						return item.id
				})
				let data = JSON.stringify( {
					"case_status":'',                       //案件状态，三者选填其一
					"case_color":str,                       //案件标色，三者选填其一
					"collection_area":''                   //催收区域，三者选填其一
				} )
				let conf = {
					url : '/api/api_backend.php?r=collection/update',
					data:{
						id: ids,
						data:data
					},
					success:(data)=>{
						if( data.statusCode == 1 ){
							this.init()
							this.multipList = []
							Message({
								message: data.message,
								type: 'success',
								duration: 3 * 1000
							})
						}else{
							Message({
								message: data.message,
								type: 'info',
								duration: 3 * 1000
							})
						}
					}
				}
				axiosRequest(conf)
			}else{
				Message({
					message: '请先选择要修改的数据',
					type: 'info',
					duration: 3 * 1000
				})
			}
		},
		distributeFn(num){//准备分配
			if(num == 1){
				this.distributeNow  = true
			}
			let data = this.formDistribute
			data.split_status = num
			data.case_id = this.case_id
			let conf = {
				url : '/api/api_backend.php?r=collection/case-split',
				data:{
					data:JSON.stringify( data )
				},
				success:(data)=>{
					if( data.statusCode == 1 ){
						if( typeof(data.info.case_all_num) =='number' ){
							this.formDistribute.case_all_num = data.info.case_all_num
						}else{
							
						}
						
					}else{
						Message({
							message: data.message,
							type: 'info',
							duration: 3 * 1000
						})
					}
				}
			}
			axiosRequest(conf)
			

		},
		cancelDistribute(){
			this.distributeNow  = false
		},
		sureToDistribute(num){//确定分配
			let data = this.formDistribute
			data.split_status = num
			data.case_id = this.case_id
			// this.getDepartmentList(2)
			let conf = {
					url : '/api/api_backend.php?r=collection/case-split',
					data:{
						data:JSON.stringify( data )
					},
					success:(data)=>{
						if( data.statusCode == 1 ){
							// this.distributeNow  = false
							// this.init()
							// this.multipList = []
							// Message({
							// 	message: data.message,
							// 	type: 'success',
							// 	duration: 3 * 1000
							// })
						}else{
							Message({
								message: data.message,
								type: 'info',
								duration: 3 * 1000
							})
						}
					}
				}
				axiosRequest(conf)
		},
		
		
    }
}
</script>
<style scoped>
.blueB{background-color:rgba(0, 204, 255, 0.0980392156862745);padding:10px 0;margin:10px 0;}
.marginU{margin-top:10px;}
.el-form-item{margin-bottom:12px;}
.el-form-item__content,.el-form-item__label{line-height:30px;}
.el-input__inner{height:30px;line-height:30px;}
.dialog-footer{text-align:right;}
.totalT{width:98%;font-size:14px;line-height:23px;color: #909399;border:1px solid grey;}
.el-table__body .two{color:rgba(255, 51, 255, 1); }
.el-table__body .three{color: rgba(0, 204, 255, 1);}
.el-table__body .four{color:rgba(128, 0, 128, 1);}
.el-table__body .five{color:rgba(0, 204, 0, 1);}
.el-table__body .six{color:rgba(102, 51, 0, 1);}
.el-table__body .seven{color:rgba(255, 204, 0, 1);}

</style>



