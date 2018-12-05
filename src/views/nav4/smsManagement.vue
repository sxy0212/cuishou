<template> 
	<section>
		<div class="CenterMain  MainHp">
      <div class="TopForm">
					<div class="AIadd" style="margin-bottom:20px;">
					 	<el-button type="info" plain @click="addTask(1)"><i class="fa fa-plus"></i>添加方案</el-button>
					</div>
					<el-table ref="multipleTable" :data="infos" style="width:100%" border >
						<el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
						<el-table-column prop="name" label="名称"></el-table-column>  
						<el-table-column prop="remark" label="备注" ></el-table-column>
						<el-table-column  label="操作" >
							<template slot-scope="scope">
								<el-button type="primary" plain  @click="addTask(2,scope.row)">编辑</el-button>
								<el-button type="primary" plain  @click="del(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
				</el-table>
					<!-- 添加或方案弹框  -->
					<div class="dial-header addTask1">
            <el-dialog title="添加方案" :visible.sync="add.show" v-move>
							<el-form :model="form" label-width="120px" ref="forms">
								<el-form-item label="方案名称:">
										<el-input v-model="form.name" :style="Index.width"></el-input>
								</el-form-item>
								<el-form-item label="发送方式"></el-form-item>
							</el-form>
							<div>
								<div style="float:left;width:33.3%;display:block;background:#fff">
									<el-form :model="form" label-width="120px" ref="forms">
											<el-form-item label="本人号码接通:">
												<el-select v-model="form.caller_id" :style="Index.width">
													<el-option value="1" label="不发送"></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="发送内容:">
												<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
											<el-form-item label="本人号码未接通:">
												<el-select v-model="form.caller_id" :style="Index.width" placeholder="请选择外线号码">
													<el-option value="1" label="不发送" ></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="机器人数量:">
													<p style="display:inline-block">第</p> 
														<el-input v-model="form.name" style="width:50px;"></el-input> 
													<p style="display:inline-block">次</p>
											</el-form-item>
											<el-form-item label="未接通:">
												<el-checkbox-group v-model="not_connected_status1" @change="changeStatus1">
													<el-checkbox label="1" v-for="(item,index) in AddData.call_result" :label="item.id">{{item.status}}</el-checkbox>
												</el-checkbox-group>
											</el-form-item>
											<el-form-item label="发送内容:">
													<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
										</el-form>
								</div>
								<div style="float:left;width:33.3%;display:block;background:#fff">
										<el-form :model="form1" label-width="120px" ref="forms">
											<el-form-item label="本人号码接通:">
												<el-select v-model="form.connected_send" :style="Index.width" placeholder="请选择外线号码">
													<el-option value="1" label="不发送" ></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="发送内容:">
												<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
											<el-form-item label="本人号码未接通:">
												<el-select v-model="form.caller_id" :style="Index.width" placeholder="请选择外线号码">
													<el-option value="1" label="不发送" ></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="机器人数量:">
													<p style="display:inline-block">第</p> 
														<el-input v-model="form.name" style="width:50px;"></el-input> 
													<p style="display:inline-block">次</p>
											</el-form-item>
											<el-form-item label="未接通:">
													<el-checkbox-group v-model="not_connected_status1" @change="changeStatus1">
													<el-checkbox label="1" v-for="(item,index) in AddData.call_result" :label="item.id">{{item.status}}</el-checkbox>
												</el-checkbox-group>
											</el-form-item>
											<el-form-item label="发送内容:">
													<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
										</el-form>
								</div>
								<div style="float:left;width:33.3%;display:block;background:#fff">
										<el-form :model="form" label-width="120px" ref="forms">
											<el-form-item label="本人号码接通:">
												<el-select v-model="form.caller_id" :style="Index.width" placeholder="请选择外线号码">
													<el-option value="1" label="不发送" ></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="发送内容:">
												<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
											<el-form-item label="本人号码未接通:">
												<el-select v-model="form.caller_id" :style="Index.width" placeholder="请选择外线号码">
													<el-option value="1" label="不发送" ></el-option>
													<el-option value="2" label="发送" ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="机器人数量:">
												<p style="display:inline-block">第</p> 
												<el-input v-model="form.name" style="width:50px;"></el-input> 
												<p style="display:inline-block">次</p>
											</el-form-item>
											<el-form-item label="未接通:">
													<el-checkbox-group v-model="not_connected_status1" @change="changeStatus1">
														<el-checkbox v-for="(item,index) in AddData.call_result" :label="item.id">{{item.status}}</el-checkbox>
													</el-checkbox-group>
											</el-form-item>
										
											<el-form-item label="发送内容:">
													<el-input v-model="form.name" :style="Index.width" type="textarea" :rows="4"></el-input>
											</el-form-item>
										</el-form>
								</div>
							</div>
							<div>
								<el-form :model="form" label-width="120px" ref="forms">
									<el-form-item label="备注:">
											<el-input v-model="form.remark" type="textarea" :rows="5"></el-input>
									</el-form-item>
								</el-form>
							
							</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
										<el-button type="primary" @click="Index.editTask = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
				<!-- 编辑任务弹框  -->
				
				</div>
			</div>
		</section>
</template>

<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
import pageChange from '@/components/pageChange.vue'
import { MessageBox } from 'element-ui';
	export default {
			components:{
        'page-change':pageChange
    },
		data() {
			return {
				infos:[],
					add:{
						show:false
					},
				addOrEdit:{
					title:"",
					show:false
				},
				AddData:{            //添加任务的时候需要用到的数据
					call_result:[],   //未接通状态
        },
					Index:{
							width:'width:200px',
							width1:'width:120px'
						},
						form: {	
							name:"",   
    					remark :"", 
            },
						round_rule:[],
						not_connected_status1:[],
						not_connected_status2:[],
						form1:{
							round:'0',
   						template_id:"",
							next_round:"1",
							call_times:"",
							not_connected_status:""
						},
						form2:{
							round:'1',
   						template_id:"",
							next_round:"2",
							call_times:"",
							not_connected_status:""
						},
						form3:{
							round:'2',
   						template_id:"",
							call_times:"",
							next_round:"3",
							not_connected_status:""
						},
						data1:{},
						data2:{},
						data3:{},
						data4:{},
           	Dates:[],
						editData:{            //编辑任务的时候需要用到的数据
							outLine:[],     //外线号码
							recognition_lies:[], //语音识别线路
							call_result:[],   //未接通状态
							templates:[],   //呼叫使用话术
						},
						formEdit: {},
						start_time_am:"", //上午开始呼叫时间
            end_time_am:"",    //上午结束呼叫时间
            start_time_pm:"", //下午开始呼叫时间
            end_time_pm:"",    //下午结束呼叫时间
						round_rule_edit:[],
						not_connected_status1Edit:[],
						not_connected_status2Edit:[],
						form1Edit:{},
						form2Edit:{},
						form3Edit:{},
			}
		},
		created() {
			this.data1 = clone(this.form)
			this.data2 = clone(this.form1)
			this.data3 = clone(this.form2)
			this.data4 = clone(this.form3)
		},
		beforeMount() {
			this.init()   //页面数据初始化 
    },
		methods: {
			// 数据列表
			init(){
				const url = "/api/api_backend.php?r=sms-rule/list"
				const conf = {
					url,
					success:(data)=>{
						this.infos = data.info
						console.log(data)
					}
				}
				axiosRequest(conf)
      },
			// 点击添加任务时数据初始化
			addInit(){
					const url = "/api/api_backend.php?r=sms-rule/add-init"
					const conf = {
						url,
						success:(data)=>{
							this.AddData.call_result = data.info.call_result_status
							console.log(data)
						}
					}
					axiosRequest(conf)
			},
			changeStatus1(){
				this.form1.not_connected_status = this.not_connected_status1.join()
			},
			changeStatus2(){
				this.form2.not_connected_status = this.not_connected_status2.join()
			},
		  addTask(){
				this.add.show = true
				this.addInit()
			},
			// 保存添加
			onSubmit(){
			
			},
			// 点编辑获取数据
			edit(id){
				
			},
			changeStatus1Edit(){
				this.form1Edit.not_connected_status = this.not_connected_status1Edit.join()
			},
			changeStatus2Edit(){
				this.form2Edit.not_connected_status = this.not_connected_status2Edit.join()
			},
			// 保存修改
			onSubmitSave(){
				
			},
			// 删除
			del(id){
				this.$confirm('您确定要删除吗？','提示信息',{
						confirmButtonText: "确定",
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() =>{
						
				})
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
<style lang="scss" >
.addTask1 .el-checkbox+.el-checkbox{margin-left:5px;}
.addTask1 .el-dialog{width:75%;max-width:75%}
</style>