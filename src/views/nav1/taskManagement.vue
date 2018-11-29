<template> 
	<section>
		<div class="CenterMain  MainHp">
      <div class="TopForm">
					<div class="AIadd">
							<el-button type="success" @click="addTask">
									<i class="fa fa-plus"></i>添加任务</el-button>
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
																	<span v-if="form.warning_asrnumber&&form.warning_callerid">正常</span>
																	<span v-else style="color:red">异常</span>
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
																				<div class="time">09:00:00-12:00:00</div>
																				<div class="time">	09:00:00-12:00:00</div>																				
																			</div>
																			<span class="div1"></span>
																	</div>
																	<div class="Upton">
																			<span class="div1"></span>
																			<div class="list">
																					<div class="title">外线号码</div>
																					<div class="time">{{form.concurrent_line }}</div>
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
																			<button type="button"  class="el-button el-button--success" >
																					<i class="fa fa-pencil"></i>编辑</button>
																			<button type="button"  class="el-button el-button--danger  is-plain">
																					<i class="el-icon-delete"></i>删除</button>
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
                    
									<!--	<el-form-item label="是否发送短信:" style="margin-top:40px;">
											<el-select v-model="form.asr_number" :style="Index.width"  >
												<el-option label="不发送" value="1"></el-option>
												<el-option label="发送" value="2"></el-option>
											</el-select>
										</el-form-item>  -->                
                </el-form>
							</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
										<el-button type="primary" @click="Index.addTask = false">取消</el-button>
                </div>
            </el-dialog>
        </div>

				</div>
			</div>
		</section>
</template>

<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				startTime: '',
        endTime: '',
				images: {
              robotOff:'/static/image/off.png',
              robotOn: '/static/image/on.png'
        },
				AddData:{            //添加任务的时候需要用到的数据
					outLine:[],     //外线号码
					recognition_lies:[], //语音识别线路
					call_result:[],   //未接通状态
					templates:[],   //呼叫使用话术
        },
            formInit: {
                used_ai_count: "",
                company_ai_count: "",
                availue_ai_count: "",
                asr_call_max_line: "",
                maxConcurrency:"", //最大可选机器人数
                maxConcurrencyData:"", //最大机器人数
                asrcallMaxLine: "",//不超过机器人数
                call_id_list: [],
                callid_list_edit:[], //编辑里面的外线号码
                arr_asr_number:[], //语音线路
                arr_asr_number_edit:[], //编辑里的语音线路
                staff_id:[],
                ext_list:[],
                smsData:[],    //短信模板里的数据
                smsDataEdit:[], //编辑中的短信模板
                authData:[] ,   //授权时间里的数据
                authDataEdit:[] ,  //编辑里面的授权时间的数据
                smsMethod:[],       //添加中的短信发送方式
                smsMethodEdit:[],
                staff_id_edit:[],
                autoAllotCustomerList:""   //自动分配客户类型
            },
						Index:{
							addTask:false,
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
              call_limit_day:"0",      //通话限制
              call_limit_hour:"0",
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
           Dates:[{
							 ai_count: "1",
								asr_number: "8500002",
								asr_uuid: "6_8500002_e30ea8fe2fd3488a89921eab8c365e45",
								asrnumber_status: 0,
								auth_time: "2019-10-26 11:48:34",
								auto_allot_customer_grade: "",
								auto_allot_staff: "0",
								batchid_str: "",
								call_duration: "45",
								call_fault: "0",
								call_limit_day: "0",
								call_limit_hour: "0",
								caller_id: "6600002",
								callerid_status: 0,
								callin: 0,
								company_id: "3",
								concurrent_line: "1",
								create_time: "2018-10-26 11:48:34",
								creater: "root",
								dropin: 0,
								enable_daemon_call: "1",
								end_time: null,
								end_time_am: "12:00:00",
								end_time_pm: "21:00:00",
								exten_num: "0",
								id: "309",
								is_new_template: "0",
								is_usable: 0,
								name: "测试账户02",
								remain_count: null,
								robot_state: 1,
								sms_fee: "0.08",
								sms_id: "0",
								sms_method: "0",
								sms_switch: "0",
								staff_id: null,
								start_end_time:"21:00:00",
								start_time: null,
								start_time_am: "08:00:00",
								start_time_pm: "11:00:00",
								status: "0",
								switch_on_rate: "0%",
								task_coding: "18134005",
								template_id: "0",
								warning_asrnumber: 1,
								warning_callerid: 1
							},
						 {
							 ai_count: "1",
								asr_number: "8500003",
								asr_uuid: "6_8500003_eef8f66233841b818d8c19dcc2fe7d28",
								asrnumber_status: 0,
								auth_time: "2019-10-30 13:56:44",
								auto_allot_customer_grade: "",
								auto_allot_staff: "0",
								batchid_str: "",
								call_duration: "45",
								call_fault: "2",
								call_limit_day: "0",
								call_limit_hour: "0",
								caller_id: "6600007",
								callerid_status: 0,
								callin: 0,
								company_id: "3",
								concurrent_line: "1",
								create_time: "2018-10-30 13:56:44",
								creater: "root",
								dropin: 0,
								enable_daemon_call: "1",
								end_time: null,
								end_time_am: "12:00:00",
								end_time_pm: "21:00:00",
								exten_num: "0",
								id: "310",
								is_new_template: "0",
								is_usable: 1,
								name: "测试连续多少通",
								remain_count: null,
								robot_state: 0,
								sms_fee: "0.08",
								sms_id: "0",
								sms_method: "0",
								sms_switch: "0",
								staff_id: "0",
								start_end_time:"08:00:00",
								start_time: null,
								start_time_am: "08:00:00",
								start_time_pm: "11:00:00",
								status: "0",
								switch_on_rate: "0%",
								task_coding: "18003209",
								template_id: "0",
								warning_asrnumber: 1,
								warning_callerid: 1
							}
					 ],
			}
		},
		created() {
			this.data1 = clone(this.form)
			this.data2 = clone(this.form1)
			this.data3 = clone(this.form2)
			this.data4 = clone(this.form3)
		},
		 beforeMount() {

            // this.init()   //页面数据初始化 
         
        },
		methods: {
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
		  init() {
                const url = '/api/api_backend.php?r=asroperate/asrinfo'
                const conf = {
                    url,
                    data: "",
                    success: (data)=>{
                        this.forms = data.info.map((item)=>{
                            item.showWeixin = Number(data.message[0].state_wechat)
                            item.showAi = Number(data.message[0].state_ai)
                            return item
                        })
                        this.isAnyoneOn = this.forms.some(item=>item.status==="1")
                    }
                }
                axiosRequest(conf)
            },
						addTask(){
							this.Index.addTask = true
							this.addInit()
						},
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
									}else{
										this.Index.addTask = true
									}
									message(data)
								}
							}
							axiosRequest(conf)
						}
		}
	}

</script>
<style lang="scss" scoped>
 @import '../../../static/css/taskManagement.scss'
</style>