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
			v-on:searchFn='searchFn($event)'
			v-on:clearFn='clearFn($event)'
		>
		</div-form>
	<div> 
    <div class="blueB">
		<second-form
			:form='form'
			:colorList='colorList'
			v-on:changeArea='changeArea($event)'
			v-on:exportFn='exportFn($event)'
			v-on:exportTel='exportTel($event)'
			v-on:exportChoosen='exportChoosen($event)'
			v-on:exportHistory='exportHistory($event)'
			v-on:pauseFn='pauseFn($event)'
			v-on:colorChange='colorChange($event)'
			v-on:distributeFn='distributeFn($event)'
			v-on:sureToDistribute='sureToDistribute($event)'
		>
		</second-form>
	</div>
	</div>
    <div class="specialTable">
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
	<el-dialog :title="bannerTitle" :visible.sync="addChangeAreaNow" v-move>
        <edit-dialog
			:areaList='areaList'
			:formTitle='formTitle'
			v-on:protectFn='protectFn($event)'
			v-on:cancelFn='cancelFn($event)'
        ></edit-dialog>
    </el-dialog>
	<el-dialog title="手动分配" :visible.sync="distributeNow" v-move>
        <second-dialog
			:formDistribute='formDistribute'
			:departmentList='distributeDepartmentList'
			:ableNum='ableNum'
			:staffList='staffList'
			v-on:cancelDistribute='cancelDistribute($event)'
			v-on:getStaffFn='getStaffFn($event)'
			v-on:sureToDistribute='sureToDistribute($event)'
		></second-dialog>
    </el-dialog>
	<el-dialog title="选择导出字段" :visible.sync="exportNow" v-move>
        <third-dialog
			:formExport='formExport'
			:fieldsList='fieldsList'
			v-on:exportTo='exportTo'
			v-on:cancelExport='cancelExport'
		></third-dialog>
    </el-dialog>
   </div>
</div>
 
</template>
<script>

import '@/styles/css/otherCase.css'
import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/functions/formCollection/formCaseFirst.vue'
import formCaseSecond from '@/functions/formCollection/formCaseSecond.vue'
import tableCaseMan from '@/functions/tableCollection/tableCaseMan.vue'
import addChangeArea from '@/functions/editDialog/addChangeArea.vue'
import addDistribute from '@/functions/editDialog/addDistribute.vue'
import addExportChoose from '@/functions/editDialog/addExportChoose.vue'

import  { axiosRequest,deepClone } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    components:{
        'page-change':pageChange,
		'div-form':formCaseFirst,
		'second-form':formCaseSecond,
		'div-table':tableCaseMan,
		'edit-dialog':addChangeArea,
		'second-dialog':addDistribute,
		'third-dialog':addExportChoose
	},
	data() {
        return {
			whichOne:'',//选中的为choosen，查询为all
			formExport:{},//表单
			fieldsList:[],//选项
			ableNum:0,//可分配数量
			distributeNow:false,//分配
			exportNow:false,//导出字段选择
			bannerTitle:'修改区域',
			addChangeAreaNow:false,//修改区域
			total_money:'',//总额
			colorList:[//颜色设置列表
               	{
                    class:'one',
                    code:'1',
                },
                {
                    class:'two',
                    code:'2',
                },
                {
                    class:'three',
                    code:'3',  
                },
                {
                    class:'four',
                    code:'4',  
                },
                {
                    class:'five',
                    code:'5',  
                },
                {
                    class:'six',
                    code:'6',  
                },
                {
                    class:'seven',
                    code:'7',
                },
                
            ],
			formDistribute:{
				depart:'',
				staff:[]
			},
			form: {},
			caseLevelList:[],//案件等级
			batchList:[],//批次列表
			clientList:[],//委托方
			departmentList:[],//部门列表
			distributeDepartmentList:[],//部门列表
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
			formInline: {},
            page:1,
            page_size:10,
            total:0,
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
		}
	},
	activated(){
		this.getInfoFn()
		this.conditions.staff_id = typeof( this.$route.query.staff_id ) == 'undefined'?'':this.$route.query.staff_id
		this.conditions.depart_id = typeof(  this.$route.query.depart_id ) == 'undefined'?'': this.$route.query.depart_id
		this.conditions.batch_id = typeof(  this.$route.query.batch_id ) == 'undefined'?'': this.$route.query.batch_id
		this.init()
		this.getStaffFn('-1')
		// this.changeFn('')
		this.filterFn('')
	},
    methods: {
		searchFn(){
			this.page = 1
			this.init()
		},
		changeFn(val){	//获取催收员
			let conf = {
				url : '/api/api_backend.php?r=case/depart-staff-list',
				data: {
					depart_id:val
				},
				success:(data)=>{
					this.conditions.staff_id = ''
					if( data.statusCode == 1 ){
						this.staffList = data.info.staffList
					}else if( data.statusCode == 0 ){	//没有数据
						this.staffList = []
					}
                } 
            }
            axiosRequest(conf)
		},
		handleSelectionChange(val){
			this.multipList = val
		},
		filterFn(val){	//获取委托方
            let conf = {
                url : '/api/api_backend.php?r=case/client-list',
                data:{
                    client_name:val
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.clientList = data.info
						this.clientList.unshift({
							name:'请选择委托方',
							id:''
						})
						console.log(this.clientList)
					}
                }
            }
            axiosRequest(conf)
		},
		getInfoFn(){	//数据初始化
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
		init(){	//页面初始化
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
		clearFn(){	//清空，将数组的数据全部手写清空
			this.conditions={//搜索条件
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
			}
		},
		changeArea(){	//修改区域
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
		protectFn(){	//保存区域
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
		pauseFn(str){	//暂停案件
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
		getDistributeDepartmentList(){	//获取部门
			let conf = {
				url : '/api/api_backend.php?r=case/department-list',
				success:(data)=>{
					if( data.statusCode == 1 ){
						let arr = []
						data.info.forEach(item=>{
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
						this.distributeDepartmentList = arr
                    }else if( data.statusCode == 0 ){	//没有数据
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
		getStaffFn(val){	//获取催收员
			let conf = {
				url : '/api/api_backend.php?r=case/depart-staff-list',
				data: {
					depart_id:val
				},
				success:(data)=>{
					this.formDistribute.staff = []
					if( data.statusCode == 1 ){
						this.staffList = data.info.staffList
					}else if( data.statusCode == 0 ){	//没有数据
						this.staffList = []
					}
                } 
            }
            axiosRequest(conf)
		},
		distributeFn(){	//手工分配
			this.distributeNow  = true
			this.getDistributeDepartmentList()
			let data = deepClone(this.conditions)
			data.distributable = '1'
			let conf = {
				url : '/api/api_backend.php?r=case/case-list',
				data,
				success:(data)=>{
					if( data.statusCode == 1 ){
						this.ableNum = data.info.distributableCount
                    }else if( data.statusCode == 0 ){	//没有数据
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
		cancelDistribute(){
			this.distributeNow  = false
			this.formDistribute = {
				staff:[],
				split_num:'',
				depart_id:''
			}
			this.staffList = []
		},
		sureToDistribute(num){	//确定分配
			if( num == 2 ){//快速分配
				this.$confirm('您确定要分配这些案件吗？','提示信息',{
					confirmButtonText: "确定分配",
					cancelButtonText: '取消分配',
					type: 'warning'
				}).then(() =>{
					let data = deepClone(this.conditions)
					data.quick_distributor = '1'
					let conf = {
						url : '/api/api_backend.php?r=case/distributor',
						data,
						success:(data)=>{
							if( data.statusCode == 1 ){
								this.init()
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
				}).catch(()=>{
					Message({
						message: '取消分配',
						type: 'info',
						duration: 3 * 1000
					})
					return
				})
			}else if( num == 1 ){//手动分配
				let ids = this.formDistribute.staff.map(item => {
					this.staffList.forEach(every => {
						if( every.true_name == item ){
							item = every.id
						}
					})
					return item
				}).join(',')
				let data = deepClone(this.conditions)
				data.distributor_num = this.formDistribute.split_num
				data.distributor_staff_ids = ids
				let conf = {
					url : '/api/api_backend.php?r=case/distributor',
					data,
					success:(data)=>{
						if( data.statusCode == 1 ){
							this.distributeNow  = false
							this.formDistribute = {
								staff:[],
								split_num:'',
								depart_id:''
							}
							this.ableNum = 0
							this.multipList = []
							this.staffList = []
							this.init()
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
			}
		},
		exportFn(){	//导出查询选择字段
			this.exportNow = true
			this.whichOne = 'all'
			this.getFieldsList()
			
		},
		getFieldsList(){
			let conf = {
                url : '/api/api_backend.php?r=system-setting/template-all-fields-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
						// this.fieldsList = data.info
						this.fieldsList = data.info.map(item=>{
							if( item.is_required == 1 ){
								item["choose"] = true
							}else{
								item['choose'] = false
							}
							return item 
						})
					}
                }
            }
            axiosRequest(conf)
		},
		cancelExport(){
			this.exportNow = false
			this.fieldsList = []
			this.whichOne = ''
		},
		exportTo(){	
			let fields = this.fieldsList.filter(item=>item.choose).map(every=>every.field_english_name).join(',')
			if( this.whichOne == 'all' ){	//导出查询
				window.open('/api/api_backend.php?r=case/case-export&export_type=searched&fields='+fields+'&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
				+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
				+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
				'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
				'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
				'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date)
			}else if( this.whichOne == 'choosen' ){	//导出选中
				let ids =  this.multipList.map(item=>item.id).join(',')
				window.open('/api/api_backend.php?r=case/case-export&fields='+ fields +'&export_type=selected&case_id_str=' + ids)
			}
		},
		exportChoosen(){	// 导出选中选择字段
			if( this.multipList.length ){
				this.exportNow = true
				this.whichOne = 'choosen'
				this.getFieldsList()
			}else{
				Message({
					message: '请先选择要导出的案件',
					type: 'warning',
					duration: 3 * 1000
				})
			}
		},
		exportTel(){	// 导出电话
			window.open('/api/api_backend.php?r=case/case-export&export_type=selectedphone&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
			+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
			+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
			'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
			'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
			'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date)
		},
		exportHistory(){ //导出催收记录
			window.open('/api/api_backend.php?r=case/case-export&export_type=searchedrecord&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
			+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
			+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
			'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
			'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
			'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date)
		}
	}
}
</script>




