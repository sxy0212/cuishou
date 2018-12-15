<template>
<div>
	<div class="cover">
		<div-form
			:conditions='conditions'
			:caseLevelList='caseLevelList'
			:clientList='clientList'
			:batchList='batchList'
			:departmentList='departmentList'
			:staffList='staffList'
			:caseStatusList='caseStatusList'
			v-on:changeFn='changeFn($event)'
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
			查询统计：	案件总数：{{total}}件，当前页的总金额：￥{{total_money}}
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
			:ableNum='ableNum'
			:staffList='staffList'
			v-on:cancelDistribute='cancelDistribute($event)'
			v-on:sureToDistribute='sureToDistribute($event)'
		></second-dialog>
    </el-dialog>
   </div>
</div>
 
</template>
<script>
import '@/assets/css/system.css'
import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/functions/formCollection/otherFormCaseFirst.vue'
import formCaseSecond from '@/functions/formCollection/otherFormCaseSecond.vue'
import tableCaseMan from '@/functions/tableCollection/otherTableCaseMan.vue'
import addChangeArea from '@/functions/editDialog/otherAddChangeArea.vue'
import addDistribute from '@/functions/editDialog/otherAddDistribute.vue'

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
			ableNum:0,//可分配数量
			distributeNow:false,//分配
			bannerTitle:'修改区域',
			addChangeAreaNow:false,//修改区域
			total_money:'',//总额
			formDistribute:{
				depart:'',
				staff:''
			},
			formKey:{
				key:''
			},
			form: {
          		name: '',
				region: ''
			},
			caseLevelList:[],//案件等级
			batchList:[],//批次列表
			clientList:[],//委托方
			departmentList:[],//部门列表
			staffList:[],//催收员列表
			conditions:{//搜索条件
				case_name: "",	//姓名
				case_mobile: "",	//联系方式
				case_id_num: "", //证件号
				keywords: "", //关键词
				case_code:'',	//案件序列号
				case_status: "",	//案件状态
				case_level:'', //案件等级
				client_id:'', //委托方
				min_case_money:'',     //最小金额
				max_case_money:'',	//最高金额
				min_talk_time:'',	//最小通话时长
				max_talk_time:'',	// 最大通话时长
				min_case_date:'',	//最小委案日期
				max_case_date:'',	//最大委案日期
				min_case_back_date:'',	//最小退案日期
				max_case_back_date:'',	//最大退案日期
				depart_id:'',	//部门id
				staff_id:'',	//催收员id
				batch_id:'',	//所属批次id
				case_color:'',	//标色搜索
				min_case_last_collection_date:'',	//最小最后跟进
				max_case_last_collection_date:'',	//最大最后跟进
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
			
			case_id:null,//搜索结果
		}

	},
	activated(){
		this.getInfoFn()
		this.conditions.staff_id = typeof( this.$route.query.staff_id ) == 'undefined'?'':this.$route.query.staff_id
		this.conditions.depart_id = typeof(  this.$route.query.depart_id ) == 'undefined'?'': this.$route.query.depart_id
		this.conditions.batch_id = typeof(  this.$route.query.batch_id ) == 'undefined'?'': this.$route.query.batch_id
		this.init()
	},
    methods: {
		changeFn(){

		},
		changeCaseClient(val){
			t = val
		},
		handleSelectionChange(val){
			this.multipList = val
		},
		filterFn(val){//获取委托方
            let conf = {
                url : '/api/api_backend.php?r=case/client-list',
                data:{
                    client_name:val
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.clientList = data.info
					}
                }
            }
            axiosRequest(conf)
		},
		getInfoFn(){//数据初始化
			let conf = {
				url : '/api/api_backend.php?r=case/init-data',
				success:(data)=>{
					if( data.statusCode == 1 ){
						let arr = []
						data.info.departmentList.forEach(item=>{
							arr.push(item)
							if( item.children.length ){
								item.children.forEach(every=>{
									arr.push({
										class_name:'textIn',
										company_id: every.company_id,
										create_time:every.create_time,
										depart_name:every.depart_name,
										id:every.id,
										parent_id:every.parent_id,
										update_time:every.update_time,
										parent_str:every.parent_str
									})
								})
								
							}
						})
						this.departmentList = arr
						this.batchList = data.info.batchList
						this.caseLevelList = data.info.caseLevelList
						this.clientList = data.info.clientList
                    }else if(data.statusCode == 0){
						Message({
							message: data.message,
							type: 'error',
							duration: 3 * 1000
						})
					}
                }
            }
            axiosRequest(conf)
		},
		init(){//页面初始化
			this.conditions.page = this.page
			this.conditions.page_size = this.page_size
			let conf = {
				url : '/api/api_backend.php?r=case/case-list',
				data: this.conditions,
				success:(data)=>{
					if( data.statusCode == 1 ){
						this.tableData = data.info
						this.total = Number(data.total_count)
						this.total_money = Number(data.total_money)
                    }else if( data.statusCode == 0 ){	//没有数据
						this.tableData = []
						this.total = 0
						this.total_money = 0
						Message({
							message: data.message,
							type: 'error',
							duration: 3 * 1000
						})
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
					url : '/api/api_backend.php?r=case/area-list',
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
			let ids = this.multipList.map(item=> item.id).join(',')
			let conf = {
				url : '/api/api_backend.php?r=case/case-operate',
				data:{
					case_id: ids,
					case_area:this.formTitle.id
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
				let ids = this.multipList.map(item=>item.id).join(',')
				let conf = {
					url : '/api/api_backend.php?r=case/case-operate',
					data:{
						case_id: ids,
						case_status:str
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
				let ids = this.multipList.map(item=>item.id).join(',')
				let conf = {
					url : '/api/api_backend.php?r=case/case-color',
					data:{
						case_id : ids,
						case_color : str
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
						this.ableNum = data.info.case_all_num
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
		cancelDistribute(){
			this.distributeNow  = false
		},
		sureToDistribute(num){//确定分配
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
<style>
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



