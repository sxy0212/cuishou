<template> 
	<section>
		<div class="CenterMain  MainHp">
      <div class="TopForm">
					<div class="AIadd" style="margin-bottom:20px;">
					 	<el-button type="primary"  @click="addTask(1)"><i class="fa fa-plus"></i>添加方案</el-button>
					</div>
					<el-table ref="multipleTable" :data="infos" style="width:100%" border >
						<el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
						<el-table-column prop="name" label="名称"></el-table-column>  
						<el-table-column prop="remark" label="备注" ></el-table-column>
						<el-table-column  label="操作" >
							<template slot-scope="scope">
								<el-button type="primary" plain  @click="edit(scope.row.id)">编辑</el-button>
								<el-button type="primary" plain  @click="del(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
				</el-table>
					<!-- 添加方案弹框  -->
				<div class="dial-header addTask1">
					<el-dialog title="添加方案" :visible.sync="addOrEdit.addShow" v-move>
						<div style="margin-left:20px;">
							<span style="font-size:14px;font-weight:700">方案名称:</span>
							<el-input v-model="form.name" :style="Index.width"></el-input>
						</div>
						<div style="margin-left:20px;font-size:14px;font-weight:700;margin-top:10px;margin-bottom:10px;">发送方式</div>
						<el-row>
							<el-col :span="8">
								<el-form :model="form1" label-width="160px" ref="forms" class="addTaskForm">
									<el-form-item label="本人号码接通:">
										<el-select v-model="form1.connected_send" :style="Index.width">
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="发送内容:">
										<el-input v-model="form1.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
									<el-form-item label="本人号码未接通:">
										<el-select v-model="form1.not_connected_send" :style="Index.width">
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="呼叫次数:">
											<p style="display:inline-block">第</p> 
												<el-input v-model="form1.times" style="width:50px;"></el-input> 
											<p style="display:inline-block">次</p>
									</el-form-item>
									<!--<el-form-item label="未接通:">
										<el-select v-model="not_connected_status1" multiple placeholder="请选择" @change="changeStatus1" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
										</el-select>
									</el-form-item>-->
									<el-form-item label="未接通:">
										<li @click="changeUnconnected1(1)" style="list-style:none">
											<el-input :style="Index.width" v-model="showUnconnectedName1"></el-input>
										</li>
									</el-form-item>
									<el-form-item label="发送内容:">
										<el-input v-model="form1.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="8">
								<el-form :model="form2" label-width="160px" ref="forms" class="addTaskForm" style="margin-left:5px;">
									<el-form-item label="第一联系人号码接通:">
										<el-select v-model="form2.connected_send" :style="Index.width">
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="发送内容:">
										<el-input v-model="form2.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
									<el-form-item label="第一联系人号码未接通:">
										<el-select v-model="form2.not_connected_send" :style="Index.width">
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="呼叫次数:">
											<p style="display:inline-block">第</p> 
												<el-input v-model="form2.times" style="width:50px;"></el-input> 
											<p style="display:inline-block">次</p>
									</el-form-item>
									<!--<el-form-item label="未接通:">
										<el-select v-model="not_connected_status2" multiple placeholder="请选择" @change="changeStatus2" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
										</el-select>
									</el-form-item>-->
									<el-form-item label="未接通:">
										<li @click="changeUnconnected1(2)" style="list-style:none">
											<el-input :style="Index.width" v-model="showUnconnectedName2"></el-input>
										</li>
									</el-form-item>
									<el-form-item label="发送内容:">
											<el-input v-model="form2.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="8">
								<el-form :model="form3" label-width="160px" ref="forms" class="addTaskForm" style="margin-left:10px;">
									<el-form-item label="第二联系人号码接通:">
										<el-select v-model="form3.connected_send" :style="Index.width" >
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="发送内容:">
										<el-input v-model="form3.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
									<el-form-item label="第二联系人号码未接通:">
										<el-select v-model="form3.not_connected_send" :style="Index.width">
											<el-option value="0" label="不发送" ></el-option>
											<el-option value="1" label="发送" ></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="呼叫次数:">
											<p style="display:inline-block">第</p> 
												<el-input v-model="form3.times" style="width:50px;"></el-input> 
											<p style="display:inline-block">次</p>
									</el-form-item>
									<!--<el-form-item label="未接通:">
										<el-select v-model="not_connected_status3" multiple placeholder="请选择" @change="changeStatus3" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
										</el-select>
									</el-form-item>-->
									<el-form-item label="未接通:">
										<li @click="changeUnconnected1(3)" style="list-style:none">
											<el-input :style="Index.width" v-model="showUnconnectedName3"></el-input>
										</li>
									</el-form-item>
									<el-form-item label="发送内容:">
										<el-input v-model="form3.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-form :model="form" label-width="120px" ref="forms" style="margin-top:20px;">
							<el-form-item label="备注:">
								<el-input v-model="form.remark" type="textarea" :rows="5"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="onSubmit">确认保存</el-button>
							<el-button type="primary" @click="addOrEdit.addShow = false">取消</el-button>
						</div>
					</el-dialog>
				</div>
				<!-- 编辑任务弹框  -->
					<div class="dial-header addTask1">
            <el-dialog title="编辑方案" :visible.sync="addOrEdit.editShow" v-move>
							<div style="margin-left:20px;">
								<span style="font-size:14px;font-weight:700">方案名称:</span>
								<el-input v-model="formEdit.name" :style="Index.width"></el-input>
							</div>
							<div style="margin-left:20px;font-size:14px;font-weight:700;margin-top:10px;margin-bottom:10px;">发送方式</div>
							<el-row>
								<el-col :span="8">
									<el-form :model="form1Edit" label-width="160px" ref="forms" class="addTaskForm">
										<el-form-item label="本人号码接通:">
											<el-select v-model="form1Edit.connected_send" :style="Index.width">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="发送内容:">
											<el-input v-model="form1Edit.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
										<el-form-item label="本人号码未接通:">
											<el-select v-model="form1Edit.not_connected_send" :style="Index.width">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="呼叫次数:">
												<p style="display:inline-block">第</p> 
													<el-input v-model="form1Edit.times" style="width:50px;"></el-input> 
												<p style="display:inline-block">次</p>
										</el-form-item>
										<!--<el-form-item label="未接通:">
											<el-select v-model="not_connected_status1Edit" multiple placeholder="请选择" @change="changeStatus1Edit" :style="Index.width">
												<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
											</el-select>
										</el-form-item>-->
										<el-form-item label="未接通:">
											<li @click="changeUnconnectedEdit1(1)" style="list-style:none">
												<el-input :style="Index.width" v-model="showUnconnectedNameEdit1"></el-input>
											</li>
										</el-form-item>
										<el-form-item label="发送内容:">
												<el-input v-model="form1Edit.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="8">
									<el-form :model="form2Edit" label-width="160px" ref="forms" class="addTaskForm" style="margin-left:5px;">
										<el-form-item label="第一联系人号码接通:">
											<el-select v-model="form2Edit.connected_send" :style="Index.width">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="发送内容:">
											<el-input v-model="form2Edit.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
										<el-form-item label="第一联系人号码未接通:">
											<el-select v-model="form2Edit.not_connected_send" :style="Index.width">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="呼叫次数:">
												<p style="display:inline-block">第</p> 
													<el-input v-model="form2Edit.times" style="width:50px;"></el-input> 
												<p style="display:inline-block">次</p>
										</el-form-item>
										<!--<el-form-item label="未接通:">
											<el-select v-model="not_connected_status2Edit" multiple placeholder="请选择" @change="changeStatus2Edit" :style="Index.width">
												<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
											</el-select>
										</el-form-item>-->
											<el-form-item label="未接通:">
											<li @click="changeUnconnectedEdit1(2)" style="list-style:none">
												<el-input :style="Index.width" v-model="showUnconnectedNameEdit2"></el-input>
											</li>
										</el-form-item>
										<el-form-item label="发送内容:">
											<el-input v-model="form2Edit.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="8">
									<el-form :model="form3Edit" label-width="160px" ref="forms" class="addTaskForm" style="margin-left:10px;">
										<el-form-item label="第二联系人号码接通:">
											<el-select v-model="form3Edit.connected_send" :style="Index.width" placeholder="请选择外线号码">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="发送内容:">
											<el-input v-model="form3Edit.connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
										<el-form-item label="第二联系人号码未接通:">
											<el-select v-model="form3Edit.not_connected_send" :style="Index.width" placeholder="请选择外线号码">
												<el-option value="0" label="不发送" ></el-option>
												<el-option value="1" label="发送" ></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="呼叫次数:">
												<p style="display:inline-block">第</p> 
													<el-input v-model="form3Edit.times" style="width:50px;"></el-input> 
												<p style="display:inline-block">次</p>
										</el-form-item>
										<!--<el-form-item label="未接通:">
											<el-select v-model="not_connected_status3Edit" multiple placeholder="请选择" @change="changeStatus3Edit" :style="Index.width">
												<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index" :value="item.id"></el-option>
											</el-select>
										</el-form-item>-->
											<el-form-item label="未接通:">
											<li @click="changeUnconnectedEdit1(3)" style="list-style:none">
												<el-input :style="Index.width" v-model="showUnconnectedNameEdit3"></el-input>
											</li>
										</el-form-item>
										<el-form-item label="发送内容:">
											<el-input v-model="form3Edit.not_connected_content" :style="Index.width" type="textarea" :rows="4"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
							<el-form :model="formEdit" label-width="120px" ref="forms" style="margin-top:20px;">
								<el-form-item label="备注:">
									<el-input v-model="formEdit.remark" type="textarea" :rows="5"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button type="primary" @click="onSubmitEdit">确认保存</el-button>
								<el-button type="primary" @click="addOrEdit.editShow = false">取消</el-button>
							</div>
            </el-dialog>
        	</div>

				<!-- 未接通弹框1 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnected1" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status1">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px" >{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnected1 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnected1">确定</el-button>
						</div>
					</el-dialog>
				</div>
					<!-- 未接通弹框2 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnected2" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status2">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px">{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnected2 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnected2">确定</el-button>
						</div>
					</el-dialog>
				</div>
					<!-- 未接通弹框3 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnected3" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status3">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px">{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnected3 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnected3">确定</el-button>
						</div>
					</el-dialog>
				</div>
				<!-- 未接通编辑弹框1 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnectedEdit1" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status1Edit">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px" >{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnectedEdit1 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnectedEdit1">确定</el-button>
						</div>
					</el-dialog>
				</div>
				<!-- 未接通编辑弹框2 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnectedEdit2" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status2Edit">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px">{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnectedEdit2 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnectedEdit2">确定</el-button>
						</div>
					</el-dialog>
				</div>
					<!-- 未接通编辑弹框3 -->
				<div class="dial-header queue">
					<el-dialog title="选择未接通状态" :visible.sync="showUnconnectedEdit3" :close-on-click-modal="false" :close-on-press-escape="false" v-move>
					 	<el-checkbox-group v-model="not_connected_status3Edit">
							<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index" style="width:130px;margin-bottom:15px;padding-right:10px">{{item.status}}</el-checkbox>
						</el-checkbox-group>
					 	<div slot="footer" class="dialog-footer"> 
							<el-button @click="showUnconnectedEdit3 = false">取消</el-button>  
							<el-button type="primary" @click="sureUnconnectedEdit3">确定</el-button>
						</div>
					</el-dialog>
				</div>
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
					addOrEdit:{
						addShow:false,
						editShow:false
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
						round_info:[],
						not_connected_status1:[],
						not_connected_status2:[],
						not_connected_status3:[],
						not_connected_content:"",
						form1:{
							round:"0",
							times:"",
							connected_send:"0",
							not_connected_send:"0",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
						form2:{
							round:"1",
							times:"",
							connected_send:"0",
							not_connected_send:"0",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
						form3:{
							round:"2",
							times:"",
							connected_send:"0",
							not_connected_send:"0",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
						data1:{
							round:"0",
							times:"",
							connected_send:"",
							not_connected_send:"",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
						data2:{
							round:"1",
							times:"",
							connected_send:"",
							not_connected_send:"",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
						data3:{
							round:"2",
							times:"",
							connected_send:"",
							not_connected_send:"",
							not_connected_status:"",
							connected_content:"",
							not_connected_content:""
						},
           	Dates:[],
						formEdit: {},
						round_rule_edit:[],
						not_connected_status1Edit:[],
						not_connected_status2Edit:[],
						not_connected_status3Edit:[],
						form1Edit:{},
						form2Edit:{},
						form3Edit:{},
						showUnconnected1:false,
						showUnconnectedName1:"",
						showUnconnected2:false,
						showUnconnectedName2:"",
						showUnconnected3:false,
						showUnconnectedName3:"",

						showUnconnectedEdit1:false,
						showUnconnectedNameEdit1:"",
						showUnconnectedEdit2:false,
						showUnconnectedNameEdit2:"",
						showUnconnectedEdit3:false,
						showUnconnectedNameEdit3:"",
			}
		},
		activated() {
			this.init()   //页面数据初始化 
    },
		methods: {
			clone(obj){
				return JSON.parse(JSON.stringify(obj))
			},
			// 数据列表
			init(){
				const url = "/api/api_backend.php?r=sms-rule/list"
				const conf = {
					url,
					success:(data)=>{
						this.infos = data.info
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
							this.AddData.call_result = 	data.info.call_result_status.map(item=>{
							item.id = ''+item.id+''
							return item
						})
						}
					}
					axiosRequest(conf)
			},
			// 未接通状态弹框
			changeUnconnected1(num){
				if(num == 1){
					this.showUnconnected1 = true
				}else if(num == 2){
					this.showUnconnected2 = true
				}else if(num == 3){
					this.showUnconnected3 = true
				}
			},
			sureUnconnected1(){
				var arr = []
				var arr1 = this.not_connected_status1
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedName1 = arr.map(item=>{
					return item.status
				})
				this.form1.not_connected_status = this.not_connected_status1.join(",")
				this.showUnconnected1 = false
			},
			sureUnconnected2(){
				var arr = []
				var arr1 = this.not_connected_status2
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedName2 = arr.map(item=>{
					return item.status
				})
				this.form2.not_connected_status = this.not_connected_status2.join(",")
				this.showUnconnected2 = false
			},
			sureUnconnected3(){
				var arr = []
				var arr1 = this.not_connected_status3
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedName3 = arr.map(item=>{
					return item.status
				})
				this.form3.not_connected_status = this.not_connected_status3.join(",")
				this.showUnconnected3 = false
			},
			// 未接通编辑弹框
			changeUnconnectedEdit1(num){
				if(num == 1){
					this.showUnconnectedEdit1 = true
				}else if(num == 2){
					this.showUnconnectedEdit2 = true
				}else if (num == 3){
					this.showUnconnectedEdit3 = true
				}
			},
			sureUnconnectedEdit1(){
				var arr = []
				var arr1 = this.not_connected_status1Edit
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedNameEdit1 = arr.map(item=>{
					return item.status
				})
				this.form1Edit.not_connected_status = this.not_connected_status1Edit.join(",")
				this.showUnconnectedEdit1 = false
			},
			sureUnconnectedEdit2(){
				var arr = []
				var arr1 = this.not_connected_status2Edit
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedNameEdit2 = arr.map(item=>{
					return item.status
				})
				this.form2Edit.not_connected_status = this.not_connected_status2Edit.join(",")
				this.showUnconnectedEdit2 = false
			},
				sureUnconnectedEdit3(){
				var arr = []
				var arr1 = this.not_connected_status3Edit
				  arr = this.AddData.call_result.filter(function(item){
						return arr1.indexOf(item.id) != -1;
					})  
				this.showUnconnectedNameEdit3 = arr.map(item=>{
					return item.status
				})
				this.form3Edit.not_connected_status = this.not_connected_status3Edit.join(",")
				this.showUnconnectedEdit3 = false
			},
		  addTask(){
				this.addOrEdit.addShow = true
				this.addInit()
			},
			// 保存添加
			onSubmit(){
				this.round_info[0] = this.form1
				this.round_info[1] = this.form2
				this.round_info[2] = this.form3
				const data = this.form
				data.round_info = JSON.stringify(this.round_info)
				const url = "/api/api_backend.php?r=sms-rule/add-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode==1){
							this.addOrEdit.addShow = false
							this.form1 = this.clone(this.data1)
							this.form2 = this.clone(this.data2)
							this.form3 = this.clone(this.data3)
							this.not_connected_status1 = []
							this.not_connected_status2 = []
							this.not_connected_status3 = []
							this.showUnconnectedName1 = ""
							this.showUnconnectedName2 = ""
							this.showUnconnectedName3 = ""
							this.form.name = ""
							this.form.remark = ""
							this.init()
						}else{
							this.addOrEdit.addShow = true
						}
					}
				}
				axiosRequest(conf)
			},
			// 点编辑获取数据
			edit(id){
				this.addOrEdit.editShow = true
				this.addInit()
				const url = "/api/api_backend.php?r=sms-rule/info"
				const conf = {
					url,
					data:{id:id},
					success:(data)=>{
						this.formEdit.name = data.info.rule_info.name
						this.formEdit.remark = data.info.rule_info.remark
						this.formEdit.id = data.info.rule_info.id
						
						var arr1 = data.info.round_list.filter(item=>{
							if(item.round == 0){
								return item
							}
						})
						var arr2 = data.info.round_list.filter(item=>{
							if(item.round == 1){
								return item
							}
						})
						var arr3= data.info.round_list.filter(item=>{
							if(item.round == 2){
								return item
							}
						})
						this.form1Edit = arr1[0]
						this.form2Edit = arr2[0]
						this.form3Edit = arr3[0]
						if(arr1[0].not_connected_status!=""){
							this.not_connected_status1Edit = (arr1[0].not_connected_status).split(",")
								var arr = []
								var arr1 = this.not_connected_status1Edit
									arr = this.AddData.call_result.filter(function(item){
										return arr1.indexOf(item.id) != -1;
									})  
								this.showUnconnectedNameEdit1 = arr.map(item=>{
									return item.status
								})
						}else{
							this.not_connected_status1Edit=[]
							this.showUnconnectedNameEdit1 = ""
						}
						if(arr2[0].not_connected_status!=""){
							this.not_connected_status2Edit = (arr2[0].not_connected_status).split(",")
								var arr = []
								var arr1 = this.not_connected_status2Edit
									arr = this.AddData.call_result.filter(function(item){
										return arr1.indexOf(item.id) != -1;
									})  
								this.showUnconnectedNameEdit2 = arr.map(item=>{
									return item.status
								})
						}else{
							this.not_connected_status2Edit = []
							this.showUnconnectedNameEdit2 = ""
						}
						if(arr3[0].not_connected_status!=""){
							this.not_connected_status3Edit = (arr3[0].not_connected_status).split(",")
								var arr = []
								var arr1 = this.not_connected_status3Edit
									arr = this.AddData.call_result.filter(function(item){
										return arr1.indexOf(item.id) != -1;
									})  
								this.showUnconnectedNameEdit3 = arr.map(item=>{
									return item.status
								})
						}else{
							this.not_connected_status3Edit = []
							this.showUnconnectedNameEdit3 = ""
						}
					}
				}
				axiosRequest(conf)
			},
			// 保存修改
			onSubmitEdit(){
				this.round_rule_edit[0] = this.form1Edit
				this.round_rule_edit[1] = this.form2Edit
				this.round_rule_edit[2] = this.form3Edit
				const data = this.formEdit
				data.round_info = JSON.stringify(this.round_rule_edit)
				const url = "/api/api_backend.php?r=sms-rule/edit-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode==1){
							this.addOrEdit.editShow = false
							this.init()
						}else{
							this.addOrEdit.editShow = true
						}
					}
				}
				axiosRequest(conf)
			},
			// 删除
			del(id){
			 this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              const url = "/api/api_backend.php?r=sms-rule/del"
              const conf = {
                url,
                data:{
                  id:id
                },
                success:(data)=>{
                  this.$alert(data.message)
                  this.init()
                }
              }
              axiosRequest(conf)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
        });
			},
		}
	}

</script>
<style lang="scss" scoped>
.addTask1 .el-checkbox+.el-checkbox{margin-left:5px;}
.addTask1 .el-dialog{width:75%;max-width:75%;background:#f2f2f2}
.el-checkbox+.el-checkbox{margin-left:0px}
.el-select__tags{overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
.addTaskForm{display:inline-block;background:#fff;padding-top:10px;min-height:600px;max-height:1000px;width:100%}
</style>