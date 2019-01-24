<template>
<div class="caseManagementCss">
	<div class="cover">
		<div-form
			:conditions='conditions'
			:caseLevelList='caseLevelList'
			:clientList='clientList'
			:batchList='batchList'
			:caseStatusList='caseStatusList'
			v-on:filterFn='filterFn($event)'
			v-on:filterGetBatchList='filterGetBatchList($event)'
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
			class="addChangeArea"
        ></edit-dialog>
    </el-dialog>
	<el-dialog title="请先选择导出字段" :visible.sync="exportNow" v-move>
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

import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/staffFunctions/formCollection/formCaseFirst.vue'
import formCaseSecond from '@/staffFunctions/formCollection/formCaseSecond.vue'
import tableCaseMan from '@/staffFunctions/tableCollection/tableCaseMan.vue'
import addChangeArea from '@/staffFunctions/editDialog/addChangeArea.vue'
import addExportChoose from '@/staffFunctions/editDialog/addExportChoose.vue'

import  { axiosRequest, message } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

// import { initCase, getCaseList, filterCaseFn, pauseCaseFn, changeCaseArea, protectCaseFn  } from '@/api/login'

export default {
    components:{
        'page-change':pageChange,
		'div-form':formCaseFirst,
		'second-form':formCaseSecond,
		'div-table':tableCaseMan,
		'edit-dialog':addChangeArea,
		'third-dialog':addExportChoose
	},
	data() {
        return {
			whichOne:'',//选中的为choosen，查询为all
			formExport:{},//表单
			fieldsList:[],//选项
			ableNum:0,//可分配数量
			exportNow:false,//导出字段选择
			bannerTitle:'修改区域',
			addChangeAreaNow:false,//修改区域
			total_money:0,//总额
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
    created(){
		this.init()
		this.getList()
    },
	activated(){
		// this.conditions.staff_id = typeof( this.$route.query.staff_id ) == 'undefined'?'':this.$route.query.staff_id
		// this.conditions.depart_id = typeof(  this.$route.query.depart_id ) == 'undefined'?'': this.$route.query.depart_id
		// this.conditions.batch_id = typeof(  this.$route.query.batch_id ) == 'undefined'?'': this.$route.query.batch_id
		// this.init()
		// this.filterFn('')
	},
    methods: {
		searchFn(){
			this.page = 1
			this.init()
		},
		handleSelectionChange(val){
			this.multipList = val
		},
		filterFn(val){	//获取委托方 
			const conf = {
                url : '/api/api_staff.php?r=case/client-list',
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
					}
                }
            }
            axiosRequest(conf)
		},
		filterGetBatchList(val){	//获取委托方 
			const conf = {
                url : '/api/api_staff.php?r=case/batch-list',
                data:{
                    batch_name:val
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.batchList = data.info
						this.batchList.unshift({
							batch_name:'请选择批次',
							id:''
						})
					}
                }
            }
            axiosRequest(conf)
		},
		init(){
			this.conditions.page = this.page
			this.conditions.page_size = this.page_size
			const conf = {
                url : '/api/api_staff.php?r=case/case-list',
                data:this.conditions,
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.tableData = data.info
						this.total = Number(data.total_count)
						this.total_money = Number(data.total_money)
					}else if( data.statusCode == 0 ){
						message(data)
					}
                }
            }
            axiosRequest(conf)
		},
		getList(){
			const conf = {
                url : '/api/api_staff.php?r=case/init-data',
                data:this.conditions,
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.batchList = data.info.batchList
						this.batchList.unshift({
							batch_name:'请选择批次',
							id:''
						})
						this.caseLevelList = data.info.caseLevelList
						this.clientList = data.info.clientList
						this.clientList.unshift({
							name:'请选择委托方',
							id:''
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
				call_result_number:'',//接通状态
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
				const conf = {
					url : '/api/api_staff.php?r=case/area-list',
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
			const ids = this.multipList.map(item=> item.id).join(',')
			const conf = {
				url : '/api/api_staff.php?r=case/case-operate',
				data:{
					case_id:ids,
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
					}else if(data.statusCode == 0 ){
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
				const ids = this.multipList.map(item=>item.id).join(',')
				const conf = {
					url : '/api/api_staff.php?r=case/case-operate',
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
					url : '/api/api_staff.php?r=case/case-color',
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
		exportFn(){	//导出查询选择字段
			this.exportNow = true
			this.whichOne = 'all'
			this.getFieldsList()
		},
		getFieldsList(){
			let conf = {
                url : '/api/api_staff.php?r=system-setting/template-all-fields-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
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
				if( typeof( this.conditions.call_result_number ) == 'undefined' ){
					this.conditions.call_result_number = ''
				}
				window.open('/api/api_staff.php?r=case/case-export&export_type=searched&fields='+fields+'&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
				+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
				+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
				'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
				'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
				'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date+'&call_result_number='+this.conditions.call_result_number)
			}else if( this.whichOne == 'choosen' ){	//导出选中
				let ids =  this.multipList.map(item=>item.id).join(',')
				window.open('/api/api_staff.php?r=case/case-export&fields='+ fields +'&export_type=selected&case_id_str=' + ids)
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
			if( typeof( this.conditions.call_result_number ) == 'undefined' ){
				this.conditions.call_result_number = ''
			}
			window.open('/api/api_staff.php?r=case/case-export&export_type=selectedphone&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
			+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
			+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
			'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
			'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
			'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date+'&call_result_number='+this.conditions.call_result_number)
		},
		exportHistory(){ //导出催收记录
			if( typeof( this.conditions.call_result_number ) == 'undefined' ){
				this.conditions.call_result_number = ''
			}
			window.open('/api/api_staff.php?r=case/case-export&export_type=searchedrecord&case_name='+this.conditions.case_name+'&case_mobile='+this.conditions.case_mobile+'&case_id_num='+this.conditions.case_id_num+'&keywords='+this.conditions.keywords+'&case_code='
			+this.conditions.case_code+'&case_status'+this.conditions.case_status+'&case_level='+this.conditions.case_level
			+'&client_id='+this.conditions.client_id+'&min_case_money='+this.conditions.min_case_money+'&max_case_money='+this.conditions.max_case_money+'&min_talk_time='+this.conditions.min_talk_time+'&max_talk_time='+this.conditions.max_talk_time+
			'&min_case_date='+this.conditions.min_case_date+'&max_case_date='+this.conditions.max_case_date +'&depart_id='+this.conditions.depart_id+'&staff_id='+this.conditions.staff_id +
			'&batch_id='+this.conditions.batch_id+'&case_color='+this.conditions.case_color+'&min_case_last_collection_date='+this.conditions.min_case_last_collection_date+
			'&max_case_last_collection_date='+this.conditions.max_case_last_collection_date+'&call_result_number='+this.conditions.call_result_number)
		}
	}
}
</script>
<style>
.caseManagementCss{padding:20px;}
.caseManagementCss .blueB{background-color:rgba(0, 204, 255, 0.0980392156862745);padding:10px 0;}
.caseManagementCss .blueB .el-form-item__label,.blueB .el-form-item__content{line-height:30px;}
.caseManagementCss .marginU{margin-top:10px;}
.caseManagementCss .el-form .el-form-item{margin-bottom:10px;}
.caseManagementCss .el-form-item__content,.el-form-item__label{line-height:30px;}
.caseManagementCss .el-form-item__content .el-input{width:190px;}
.caseManagementCss .el-input__inner{height:30px;line-height:30px;}
.caseManagementCss .el-input__icon{line-height:30px;}
.caseManagementCss .dialog-footer{text-align:right;}
.caseManagementCss .totalT{width:100%;font-size:14px;line-height:23px;color: #909399;border:1px solid #d2d2d2;}
.caseManagementCss .el-table__body .two{color:#00CC99; }
.caseManagementCss .el-table__body .three{color: #0099FF;}
.caseManagementCss .el-table__body .four{color:#6633FF;}
.caseManagementCss .el-table__body .five{color:#CC0033;}
.caseManagementCss .el-table__body .six{color:#FF9966;}
.caseManagementCss .el-table__body .seven{color:#990000;}
.caseManagementCss .cover{padding:0;}
</style>




