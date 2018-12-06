<template>
  <div class="cover">
	  <div-form
	  	:formFirst='formFirst'
	  >

	  </div-form>
		
	<div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="searchFn" size="mini">查询</el-button>
            <el-button type="info" @click="searchFn" size="mini">清空</el-button>
        </div>
    <div> 
    <div class="blueB">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="分配案件：">
				<el-button type="primary" @click="searchFn" size="mini">快速分配</el-button>
            	<el-button type="info" @click="searchFn" size="mini">手动分配</el-button>
			</el-form-item>
			<el-form-item label="案件操作：">
				<el-button type="primary" @click="searchFn" size="mini">暂停案件</el-button>
            	<el-button type="info" @click="searchFn" size="mini">关闭案件</el-button>
				<el-button type="primary" @click="searchFn" size="mini">退案</el-button>
            	<el-button type="info" @click="searchFn" size="mini">恢复案件</el-button>
				<el-button type="info" @click="searchFn" size="mini">修改催收区域</el-button>
			</el-form-item>
			<el-form-item label="导出操作：">
				<el-button type="primary" @click="searchFn" size="mini">导出查询结果</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出所选案件</el-button>
				<el-button type="primary" @click="searchFn" size="mini">导出所选电话</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
			</el-form-item>
			<el-form-item label="案件标色：">
				<el-button type="primary" @click="searchFn" size="mini">导出查询结果</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出所选案件</el-button>
				<el-button type="primary" @click="searchFn" size="mini">导出所选电话</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
            	<el-button type="info" @click="searchFn" size="mini">导出催收记录</el-button>
			</el-form-item>
		</el-form>
	</div>
	</div>
    <div class="tableCover">
		<div class="totalT">
			查询统计：	案件总数：{{totalNum}}件，总金额：￥{{titalAmount}}
		</div>
		<el-table
			border
			:data="tableData"
			style="width: 98%"
			@selection-change="handleSelectionChange"
			>
			<el-table-column
			label="选框"
			type="selection"
			width="55">
			</el-table-column>
			<el-table-column
			label="案件id"
			prop="id">
			</el-table-column>
			<el-table-column
			label="姓名"
			prop="id">
			</el-table-column>
			<el-table-column
			label="催收区域"
			prop="id">
			</el-table-column>
			<el-table-column
			prop="name"
			label="催收状态"
			>
			</el-table-column>
			<el-table-column
			label="所属批次"
			prop="id">
			</el-table-column>
			<el-table-column
			label="证件号码"
			prop="id">
			</el-table-column>
			<el-table-column
			label="委案金额"
			prop="id">
			</el-table-column>
			<el-table-column
			label="已还款"
			prop="id">
			</el-table-column>
			<el-table-column
			label="委案余额"
			prop="id">
			</el-table-column>
			<el-table-column
			label="上次通话"
			prop="id">
			</el-table-column>
			<el-table-column
			label="委案日期"
			prop="id">
			</el-table-column>
		</el-table>
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

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import store from '@/vuex/store.js'
// import indexMethod  from '@/utils/indexMethod.js'

export default {
    components:{
        'edit-dialog':addImport,
		'page-change':pageChange,
		'div-form':formCaseFirst
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
			formFirst:{//搜索条件
				case_name:'',
				case_mobile:'',
				case_id_num:'',
				case_status:'',
				case_client:'',
				case_date:'',
				case_back_date:'',
				case_money:'',
				id:'',



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
        }
    },
    created() {
		this.init()
		console.log(store)
    },
    methods: {
		handleSelectionChange(val){
			console.log(val)
		},
		searchFn(){

		},
        onSubmit(){

		},
        init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/area-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.formTitle
                        this.total = Number( data.total )
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



