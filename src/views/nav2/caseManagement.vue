<template>
  <div class="cover">
		<div-form
			:conditions='conditions'
			:levelList='levelList'
			:batchList='batchList'
			:departmentList='departmentList'
			:staffList='staffList'
			:val='val'
			:clientList='clientList'
			v-on:changeFn='changeFn($event)'
			v-on:getDepartmentList='getDepartmentList($event)'
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
		></second-form>
	</div>
	</div>
    <div class="tableCover">
		<div class="totalT">
			查询统计：	案件总数：{{totalNum}}件，总金额：￥{{titalAmount}}
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
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog
            v-on:addNowChange = "addFn($event)"
            v-on:saveFn = "init($event)"
            v-on:clearId = "changeId($event)"
            v-on:clearFormTitle = "clearFormTitle($event)"
            :id="id"
            :title = "bannerTitle"
            :formTitle = "formTitle"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addImport from '@/functions/editDialog/addArea.vue'
import pageChange from '@/components/pageChange.vue'
import formCaseFirst from '@/functions/formCollection/formCaseFirst.vue'
import formCaseSecond from '@/functions/formCollection/formCaseSecond.vue'
import tableCaseMan from '@/functions/tableCollection/tableCaseMan.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import store from '@/vuex/store.js'


export default {
    components:{
        'edit-dialog':addImport,
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
			talk_recode:'',
			conditions:{//搜索条件
				case_name:'',
				case_mobile:'',
				case_id_num:'',
				case_status:'',
				talk_recode:'',
				case_level:'',
				batch_id:'',
				case_color:'',
				id:'',
				staff_id:'',//催收员
				talk_time1:'',
				talk_time2:'',
				case_money1:'',
				case_money2:'',
				case_money:[                                              //委案金额,选填
					"",
					""
				],
				
				case_client:[                                               //委托方,选填
					"",
					""
				],
				case_date:[                                               //委案日期,选填
					"",
					""
				],
				case_back_date:[                                               //委案日期,选填
					"",
					""
				],
				case_last_collection_date:[                                               //委案日期,选填
					"",
					""
				],
				talk_time:[                                                 //通话时长,选填
					"",
					""
				],
			},
			formInline: {
				user: '',
				region: ''
			},
            id:'',//编辑还是添加
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"区域添加",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }],
            formTitle:{//添加或是修改模块的数据
                name:''
			},
			val:''//代表当前是否选择部门
        }
    },
    created() {
		this.init()
		console.log(store)
		this.getBatchList()
		this.getDepartmentList(1)
		this.getClientList()
    },
    methods: {
		init(){
			this.conditions.talk_time = [this.conditions.talk_time1,this.conditions.talk_time2]
			this.conditions.case_money = [this.conditions.case_money1,this.conditions.case_money2]
			let conf = {
				url : '/api/api_backend.php?r=collection/search',
				data:{
					data:JSON.stringify(this.conditions),
				},
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info.info
                        // this.total = Number( data.total )
                    }
                }
            }
            axiosRequest(conf)
        },
		handleSelectionChange(val){
			console.log(val)
		},
		searchFn(){

		},
		clearFn(){

		},
        onSubmit(){

		},
		changeFn(val){
			this.val = val
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
		getDepartmentList(num){//获取案件列表
			let data = {
				'id' : this.val
			}
			let conf = {
				url : '/api/api_backend.php?r=collection/depart-search',
				data,
                success:(data)=>{
					if( data.statusCode == 1 ){
						if(num == 1){
							this.departmentList = data.info.depart
						}else if(num == 2){
							this.staffList = data.info.staff
						}
						this.val = ''
						
                    }
                }
            }
            axiosRequest(conf)
		},
		getClientList(){
			let conf = {
                url : '/api/api_backend.php?r=collection/client-search',
                success:(data)=>{
					if( data.statusCode == 1 ){
						this.clientList = data.info
                    }
                }
            }
            axiosRequest(conf)
		},
        
        addFn(val){//添加弹框的打开与关闭
            this.bannerTitle = "区域添加"
            this.addNow = val
            this.id = ''
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:''
            }
        },
        editFn(row){//编辑弹框的打开与关闭
            this.bannerTitle = "区域编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name:row.name
            }
        },
        pageSizeChangeFn(val){
            // console.log(val)
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
        deleteFn(row){
             this.$confirm('确定删除这一条？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let conf = {
                    url : '/api/api_backend.php?r=system-setting/area-del',
                    data : {
                        id:row.id
                    },
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.init()
                            Message({
                                message: data.message,
                                type: 'success',
                                duration: 3 * 1000
                            })
                        }else if(data.statusCode == 0){
                            Message({
                                message: data.message,
                                type: 'erro',
                                duration: 3 * 1000
                            })
                        }
                    }
                }
                axiosRequest(conf)
            }).catch( () =>{
                Message({
                    message:'取消删除',
                    type: 'erro',
                    duration: 3 * 1000
                })
            })
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



