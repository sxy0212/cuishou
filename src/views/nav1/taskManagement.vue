<template> 
	<section>
		<div class="CenterMain  MainHp">
      <div class="TopForm">
					<div class="AIadd">
							<el-button type="success" @click="addTask"><i class="fa fa-plus"></i>添加任务</el-button>
							<el-button type="success" >队列功能</el-button>
							<el-button type="success" >队列列表</el-button>
					</div>
					<div class="AIlist">
							<ul class="el-row" style="padding-left:0">
									<li v-for="(form,index) in Dates" class="el-col el-col-8" style="min-height:300px;max-height:350px;margin-bottom:5px" :key="form.id">
											<div class="grid-content bg-purple">
													<div class="AiTop" style="display:flex;justify-content:space-between;">
															<div class="title" style="width:30%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden" :title="form.name">任务名称：{{ form.name }}</div>
															<div class="title" style="margin:0 15px;">任务编码：{{ form.task_coding }}</div>
															<div class="title" style="width:30%">
																	<el-button style="padding:5px 0" > 机器人状态：</el-button>
																	<span >正常</span>
															</div>
													</div>
													<div class="ListMain">
															<div v-if="form.status == 1" class="pic">
																	<img v-bind:src="images.robotOn" class="animated pulse infinite">
															</div>
															<div v-else class="pic">
																<img  v-bind:src="images.robotOff">
															</div>
															<div class="AiInfo">
																	<div class="Upton">
																		<span class="div1"></span>
																			<div class="list">
																				<div class="title">	识别线路</div>
																				<div class="time">{{ form.asr_number }}</div>
																				<div class="time">&nbsp;</div>
																			</div>
																			<span class="div1"></span>
																			<div class="list">
																				<div class="title">外呼时间</div>
																				<div class="time">{{form.call_time.am.s}}-{{form.call_time.am.e}}</div>
																				<div class="time">{{form.call_time.pm.s}}-{{form.call_time.pm.e}}</div>																				
																			</div>
																			<span class="div1"></span>
																	</div>
																	<div class="Upton">
																			<span class="div1"></span>
																			<div class="list">
																					<div class="title">外线号码</div>
																					<div class="time">{{form.caller_id }}</div>
																			</div>
																			<span class="div1"></span>
																			<div class="list">
																					<div class="title">机器人数</div>
																					<div class="time">{{ form.ai_count }}</div>
																			</div>
																			<span class="div1"></span>
																	</div>
																	<div class="Countp">
																			<div class="According" style="display:block">
																					<em>剩余资料：<span style="color:red"> 0 机器人未启动</span></em>
																			</div> 
																	</div>  
																	<div class="Countp">
																			<div class="According" style="display:block">
																					<em>当前状态:<span style="color:#8876f4"> 第二联系人第三轮呼叫</span></em>
																			</div> 
																	</div>  
																	<div class="AiButton">
																		<el-button type="danger" style="margin-left:16px" >
																					<i class="fa fa-headphones"></i>测试</el-button>
																			<el-button type="primary"  v-if="parseInt(form.status) == 0"  > <i class="fa fa-power-off"></i>启动</el-button>
																			<el-button type="primary"  v-else-if="parseInt(form.status) == 1" > <i class="fa fa-power-off"></i>关闭</el-button>
																			<el-button type="success" @click="edit(form.id)"><i class="fa fa-pencil"></i>编辑</el-button>
																			<el-button type="danger" @click="del(form.id)"><i class="el-icon-delete"></i>删除</el-button>
																		</div>
															</div>
													</div>
											</div>
									</li>
							</ul>
					</div>

					<!-- 添加任务弹框  -->
					<div class="dial-header addTask">
            <el-dialog title="任务添加" :visible.sync="Index.addTask" v-move>
							<div style="float:left;width:50%;height:740px;display:block;background:#fff">
								<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">基础配置</p>
								<el-form :model="form" label-width="120px" ref="forms">
                    <el-form-item label="任务名称:">
                        <el-input v-model="form.name" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="上午呼叫时间:">
                        <el-time-select placeholder="开始时间" v-model="form.start_time_am":picker-options="{start: '00:00',step: '00:30',end: '12:00'}" :style="Index.width1"></el-time-select>
                        <span>~</span>
                        <el-time-select placeholder="结束时间" v-model="form.end_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00',minTime: form.start_time_am}" :style="Index.width1"></el-time-select>
                    </el-form-item>
                    <el-form-item label="下午呼叫时间:">
                        <el-time-select placeholder="开始时间" v-model="form.start_time_pm" :picker-options="{start: '11:00',step: '00:30',end: '24:00'}" :style="Index.width1"></el-time-select>
                        <span>~</span>
                        <el-time-select placeholder="结束时间" v-model="form.end_time_pm" :picker-options="{ start: '11:00', step: '00:30',end: '24:00',minTime: form.start_time_pm}" :style="Index.width1"></el-time-select>
                    </el-form-item>
                   	<el-form-item label="机器人数量:">
                        <ul>
                            <li class="Slider"><el-slider show-stops :max="10" :min="1" v-model="form.ai_count"></el-slider></li>
                        </ul>
                    </el-form-item>
                     <el-form-item label="外线号码:">
                        <el-select v-model="form.caller_id" :style="Index.width" placeholder="请选择外线号码">
                            <el-option v-for="(item,index) in AddData.outLine" :value="item.out_number" :label="item.out_number" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
										<el-form-item label="语音识别线路:">
                        <el-select v-model="form.asr_number" :style="Index.width" placeholder="请选择识别线路">
                            <el-option v-for="(item,index) in AddData.recognition_lies" :label="item.asr_number" :value="item.asr_number" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="振铃时长:">
                        <el-input v-model="form.call_duration" style="width:240px;margin-right:10px;"></el-input>秒
                    </el-form-item>
											<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">呼叫规则</p>
											<!--本人联系人-->
											<el-form :model="form1" label-width="120px" ref="forms">
											<el-form-item label="本人呼叫次数:">
													<el-input v-model="form1.call_times" :style="Index.width"></el-input>
											</el-form-item>
											<el-form-item label="呼叫使用话术:">
													<el-select v-model="form1.template_id" :style="Index.width" placeholder="请选择话术">
															<el-option v-for="(item,index) in AddData.templates" :label="item.name" :value="item.id"  :key="index"></el-option>
													</el-select>
											</el-form-item>
											<el-form-item label="未接通状态:">
													<el-checkbox-group v-model="not_connected_status1" @change="changeStatus1">
														<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index">{{item.status}}</el-checkbox>
													</el-checkbox-group>
											</el-form-item>
											<el-form-item label="直接拨打:">
													<el-select v-model="form1.next_round" :style="Index.width" placeholder="请选择联系人">
															<el-option label="第一联系人" value="1"></el-option>
															<el-option label="第二联系人" value="2"></el-option>
													</el-select>
											</el-form-item>                   
										</el-form>
                </el-form>
							</div>
								<div style="float:left;width:50%;height:740px;display:block;background:#fff">
									<!--第一联系人-->
								<el-form :model="form2" label-width="145px" ref="forms">
                    <el-form-item label="第一联系人呼叫次数:">
                        <el-input v-model="form2.call_times" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="呼叫使用话术:">
                        <el-select v-model="form2.template_id" :style="Index.width" placeholder="请选择话术">
                            <el-option v-for="(item,index) in AddData.templates" :value="item.id" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="未接通状态:">
											<el-checkbox-group v-model="not_connected_status2" @change="changeStatus2">
												<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index">{{item.status}}</el-checkbox>
											</el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="直接拨打:">
                         <el-select v-model="form2.next_round" :style="Index.width">
                            <el-option label="第二联系人" value="2"></el-option>
                        </el-select>
                    </el-form-item>   
										</el-form>
											<!--第二联系人-->
										<el-form :model="form3" label-width="145px" ref="forms">    
										 <el-form-item label="第二联系人呼叫次数:" style="margin-top:40px;">
                        <el-input v-model="form3.call_times" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="呼叫使用话术:">
                        <el-select v-model="form3.template_id" :style="Index.width" placeholder="请选择话术">
                            <el-option v-for="(item,index) in AddData.templates" :value="item.id" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>         
                </el-form>
							</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
										<el-button type="primary" @click="Index.addTask = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
				<!-- 编辑任务弹框  -->
					<div class="dial-header addTask">
            <el-dialog title="任务编辑" :visible.sync="Index.editTask" v-move>
							<div style="float:left;width:50%;height:740px;display:block;background:#fff">
								<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">基础配置</p>
								<el-form :model="formEdit" label-width="120px" ref="forms">
                    <el-form-item label="任务名称:">
                        <el-input v-model="formEdit.name" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="上午呼叫时间:">
                        <el-time-select placeholder="开始时间" v-model="start_time_am":picker-options="{start: '00:00',step: '00:30',end: '12:00'}" :style="Index.width1"></el-time-select>
                        <span>~</span>
                        <el-time-select placeholder="结束时间" v-model="end_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00',minTime: form.start_time_am}" :style="Index.width1"></el-time-select>
                    </el-form-item>
                    <el-form-item label="下午呼叫时间:">
                        <el-time-select placeholder="开始时间" v-model="start_time_pm" :picker-options="{start: '11:00',step: '00:30',end: '24:00'}" :style="Index.width1"></el-time-select>
                        <span>~</span>
                        <el-time-select placeholder="结束时间" v-model="end_time_pm" :picker-options="{ start: '11:00', step: '00:30',end: '24:00',minTime: form.start_time_pm}" :style="Index.width1"></el-time-select>
                    </el-form-item>
                   	<el-form-item label="机器人数量:">
                        <ul>
                            <li class="Slider"><el-slider show-stops :max="10" :min="1" v-model="formEdit.ai_count"></el-slider></li>
                        </ul>
                    </el-form-item>
                     <el-form-item label="外线号码:">
                        <el-select v-model="formEdit.caller_id" :style="Index.width" placeholder="请选择外线号码">
                            <el-option v-for="(item,index) in editData.outLine" :value="item.out_number" :label="item.out_number" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
										<el-form-item label="语音识别线路:">
                        <el-select v-model="formEdit.asr_number" :style="Index.width" placeholder="请选择识别线路">
                            <el-option v-for="(item,index) in editData.recognition_lies" :label="item.asr_number" :value="item.asr_number" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="振铃时长:">
                        <el-input v-model="formEdit.call_duration" style="width:240px;margin-right:10px;"></el-input>秒
                    </el-form-item>
											<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">呼叫规则</p>
											<!--本人联系人-->
											<el-form :model="form1Edit" label-width="120px" ref="forms">
											<el-form-item label="本人呼叫次数:">
													<el-input v-model="form1Edit.call_times" :style="Index.width"></el-input>
											</el-form-item>
											<el-form-item label="呼叫使用话术:">
													<el-select v-model="form1Edit.template_id" :style="Index.width" placeholder="请选择话术">
															<el-option v-for="(item,index) in editData.templates" :label="item.name" :value="item.id"  :key="index"></el-option>
													</el-select>
											</el-form-item>
											<el-form-item label="未接通状态:">
													<el-checkbox-group v-model="not_connected_status1Edit" @change="changeStatus1Edit">
														<el-checkbox :label="item.id" v-for="(item,index) in editData.call_result" :key="index">{{item.status}}</el-checkbox>
													</el-checkbox-group>
											</el-form-item>
											<el-form-item label="直接拨打:">
													<el-select v-model="form1Edit.next_round" :style="Index.width" placeholder="请选择联系人">
															<el-option label="第一联系人" value="1"></el-option>
															<el-option label="第二联系人" value="2"></el-option>
													</el-select>
											</el-form-item>                   
										</el-form>
                </el-form>
							</div>
								<div style="float:left;width:50%;height:740px;display:block;background:#fff">
									<!--第一联系人-->
								<el-form :model="form2Edit" label-width="145px" ref="forms">
                    <el-form-item label="第一联系人呼叫次数:">
                        <el-input v-model="form2Edit.call_times" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="呼叫使用话术:">
                        <el-select v-model="form2Edit.template_id" :style="Index.width" placeholder="请选择话术">
                            <el-option v-for="(item,index) in editData.templates" :value="item.id" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="未接通状态:">
											<el-checkbox-group v-model="not_connected_status2Edit" @change="changeStatus2Edit">
												<el-checkbox :label="item.id" v-for="(item,index) in editData.call_result" :key="index">{{item.status}}</el-checkbox>
											</el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="直接拨打:">
                         <el-select v-model="form2Edit.next_round" :style="Index.width">
                            <el-option label="第二联系人" value="2"></el-option>
                        </el-select>
                    </el-form-item>   
										</el-form>
											<!--第二联系人-->
										<el-form :model="form3Edit" label-width="145px" ref="forms">    
										 <el-form-item label="第二联系人呼叫次数:" style="margin-top:40px;">
                        <el-input v-model="form3Edit.call_times" :style="Index.width"></el-input>
                    </el-form-item>
                    <el-form-item label="呼叫使用话术:">
                        <el-select v-model="form3Edit.template_id" :style="Index.width" placeholder="请选择话术">
                            <el-option v-for="(item,index) in editData.templates" :value="item.id" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>         
                </el-form>
							</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
										<el-button type="primary" @click="Index.editTask = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
				</div>
			</div>
		</section>
</template>

<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
import { MessageBox } from 'element-ui';
	export default {
		data() {
			return {
				images: {
              robotOff:'static/image/off.png',
              robotOn: 'static/image/on.png'
        },
				AddData:{            //添加任务的时候需要用到的数据
					outLine:[],     //外线号码
					recognition_lies:[], //语音识别线路
					call_result:[],   //未接通状态
					templates:[],   //呼叫使用话术
        },
					Index:{
							addTask:false,
							editTask:false,
							width:'width:260px',
							width1:'width:120px'
						},
						form: {	
							name:"",    //任务名称
              caller_id :"",// 外线号码 
							asr_number :"",//识别线路
							ai_count:1,// 机器人数
							call_duration:"45",//振铃时长
              start_time_am:"08:00", //上午开始呼叫时间
              end_time_am:"12:00",    //上午结束呼叫时间
              start_time_pm:"11:00", //下午开始呼叫时间
              end_time_pm:"21:00",    //下午结束呼叫时间
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
			// 页面机器人列表
			init(){
				const url = '/api/api_backend.php?r=asroperate/list'
				const conf = {
						url,
						success: (data)=>{
							this.Dates = data.info
						}
				}
				axiosRequest(conf)
      },
			// 点击添加任务时数据初始话
			addInit(){
				const url = "/api/api_backend.php?r=asroperate/add-init"
				const conf = {
					url,
					success:(data)=>{
						this.AddData.outLine = data.info.out_side_lines
						this.AddData.recognition_lies = data.info.recognition_lies
						this.AddData.call_result = data.info.call_result_status
						this.AddData.templates = data.info.templates
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
				this.Index.addTask = true
				this.addInit()
			},
			// 保存添加
			onSubmit(){
				this.round_rule[0] = this.form1;
				this.round_rule[1] = this.form2;
				this.round_rule[2] = this.form3;
				const data = this.form
				data.round_rule = JSON.stringify(this.round_rule)
				const url = "/api/api_backend.php?r=asroperate/add-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode == 1){
							this.Index.addTask = false;
							this.form = this.data1
							this.form1 = this.data2
							this.form2 = this.data3
							this.form3 = this.data4
							this.not_connected_status1 = []
							this.not_connected_status2 = []
							this.init()
						}else{
							this.Index.addTask = true
						}
						message(data)
					}
				}
				axiosRequest(conf)
			},
			// 点编辑获取数据
			edit(id){
				this.Index.editTask = true
				const url = "/api/api_backend.php?r=asroperate/info"
				const conf = {
					url,
					data:{id:id},
					success:(data)=>{
						this.editData.outLine = data.info.out_side_lines
						this.editData.recognition_lies = data.info.recognition_lies
						this.editData.call_result = data.info.call_result_status.map(item=>{
							item.id = '' + item.id +''
							return item
						})
						console.log(this.editData.call_result)
						this.editData.templates = data.info.templates
						this.formEdit = data.info.info
						this.start_time_am = data.info.info.call_time.am.s
						this.end_time_am = data.info.info.call_time.am.e
						this.start_time_pm = data.info.info.call_time.pm.e
						this.end_time_pm = data.info.info.call_time.pm.e
              // start_time_pm:"11:00", //下午开始呼叫时间
              // end_time_pm:"21:00",    //下午结束呼叫时间
						var arr = data.info.round_rule.filter(item=>{
							if(item.round == 0){
								return item
							}
						})
						var arr1 = data.info.round_rule.filter(item=>{
							if(item.round == 1){
								return item
							}
						})
						var arr2= data.info.round_rule.filter(item=>{
							if(item.round == 2){
								return item
							}
						})
						this.form1Edit = arr[0]
						this.form1Edit.template_id = parseInt(arr[0].template_id)
						this.form2Edit = arr1[0]
						this.form2Edit.template_id = parseInt(arr1[0].template_id)
						this.form3Edit = arr2[0]
						this.form3Edit.template_id = parseInt(arr2[0].template_id)
						this.not_connected_status1Edit = (arr[0].not_connected_status).split(",")
						this.not_connected_status2Edit = (arr1[0].not_connected_status).split(",")
					}
				}
				axiosRequest(conf)
			},
			changeStatus1Edit(){
				this.form1Edit.not_connected_status = this.not_connected_status1Edit.join()
			},
			changeStatus2Edit(){
				this.form2Edit.not_connected_status = this.not_connected_status2Edit.join()
			},
			// 保存修改
			onSubmit(){
				this.round_rule_edit[0] = this.form1Edit;
				this.round_rule_edit[1] = this.form2Edit;
				this.round_rule_edit[2] = this.form3Edit;
				const data = this.formEdit
				data.start_time_am = this.start_time_am
        data.end_time_am = this.end_time_am
        data.start_time_pm = this.start_time_pm
        data.end_time_pm = this.end_time_pm
				data.round_rule = JSON.stringify(this.round_rule_edit)
				const url = "/api/api_backend.php?r=asroperate/add-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode == 1){
							this.Index.editTask = false;
							this.init()
						}else{
							this.Index.editTask = true
						}
						message(data)
					}
				}
				axiosRequest(conf)
			},
			// 删除
			del(id){
				this.$confirm('您确定要删除吗？','提示信息',{
						confirmButtonText: "确定",
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() =>{
						const url = "/api/api_backend.php?r=asroperate/del"
						const conf = {
								url,
								data:{id:id},
								success:(data)=>{
									this.$alert(data.message)
										if(data.statusCode == 1){
											this.init()
										}
								}
						}
						axiosRequest(conf)
				})
			}
		}
	}

</script>
<style lang="scss" scoped>
 @import '../../../static/css/taskManagement.scss'
</style>