<template> 
	<section>
		<div class="CenterMain  MainHp">
      		<div class="TopForm">
				<div class="AIadd">
					<el-button type="success" @click="addTask"><i class="fa fa-plus"></i>添加任务</el-button>
					<el-button type="success" @click="queueAdd">队列功能</el-button>
                    <el-button type="success" @click="queueList">队列列表</el-button>
				</div>
				<div class="AIlist">
					<ul class="el-row" style="padding-left:0">
						<li v-for="(form,index) in Dates" class="el-col el-col-8" style="min-height:300px;max-height:350px;margin-bottom:5px" :key="index">
							<div class="grid-content bg-purple">
								<div class="AiTop" style="display:flex;justify-content:space-between;">
									<div class="title" style="width:30%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden" :title="form.name">任务名称：{{ form.name }}</div>
									<div class="title" style="margin:0 15px;">任务编码：{{ form.task_coding }}</div>
									<div class="title" style="width:30%">
									<!--<el-button style="padding:5px 0" > 机器人状态：</el-button> -->
										<span >机器人状态: <span v-if="form.warning_asrnumber&&form.warning_callerid">正常</span>
                                        <span v-else style="color:red">异常</span></span>
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
												<em>人机交互：<span style="color:red">{{form.exten_num}}</span></em>
											</div> 
										</div>  
										<div class="Countp" style="height:30px;">
											<div class="According" style="display:block" v-show="form.status == 0">
												<em>剩余资料：<span style="color:red">名称:{{form.remain_name}}
												<p style="margin-left:56px;">数量:{{form.remain_count}} 机器人未启动</p>
												</span></em>
											</div> 
											<div class="According" style="display:block" v-show="form.status == 1">
												<em>剩余资料：<span style="color:red">名称:{{form.remain_name}}
												<p style="margin-left:56px;">数量:{{form.remain_count}} 呼叫中：{{ form.callin }}通话中：{{ form.dropin }}</p>
												</span></em>
											</div> 
										</div>  
										<div class="Countp">
											<div class="According" style="display:block">
												<em>当前状态:
													<span style="color:#8876f4" v-if="form.calling_round == -1">呼叫已完成
													</span>
													<span style="color:#8876f4" v-else-if="form.calling_round == 0">本人
														<span style="color:#8876f4" v-if="form.calling_times == 0">第一次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 1">第二次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 2">第三次呼叫</span>
													</span>
													<span style="color:#8876f4" v-else-if="form.calling_round == 1">第一联系人
														<span style="color:#8876f4" v-if="form.calling_times == 0">第一次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 1">第二次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 2">第三次呼叫</span>
													</span>
													<span style="color:#8876f4" v-else-if="form.calling_round == 2">第二联系人
														<span style="color:#8876f4" v-if="form.calling_times == 0">第一次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 1">第二次呼叫</span>
														<span style="color:#8876f4" v-else-if="form.calling_times == 2">第三次呼叫</span>
													</span>
												</em>
											</div> 
										</div>  
										<div class="AiButton">
											<el-button type="danger" style="margin-left:16px" @click="text(form.id)" :disabled="form.warning_asrnumber == 0||form.warning_callerid == 0">
													<i class="fa fa-headphones"></i>测试</el-button>
											<el-button type="primary"  v-if="parseInt(form.status) == 0"   @click="close(form.id,form.status)" :disabled="form.warning_asrnumber==0||form.warning_callerid==0"> <i class="fa fa-power-off"></i>启动</el-button>
											<el-button type="primary"  v-else-if="parseInt(form.status) == 1"  @click="close(form.id,form.status)" > <i class="fa fa-power-off"></i>关闭</el-button>
											<el-button type="success" @click="edit(form.id)" :disabled="form.warning_asrnumber == 0||form.warning_callerid == 0"><i class="fa fa-pencil"></i>编辑</el-button>
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
						<div style="float:left;width:50%;height:750px;max-height:900px;display:block;background:#fff">
							<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">基础配置</p>
							<el-form :model="form" label-width="120px" ref="forms">
								<el-form-item label="任务名称:">
									<el-input v-model="form.name" :style="Index.width"></el-input>
								</el-form-item>
								<el-form-item label="上午呼叫时间:">
									<el-time-select placeholder="开始时间" v-model="form.start_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00'}" :style="Index.width1"></el-time-select>
									<span>~</span>
									<el-time-select placeholder="结束时间" v-model="form.end_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00',minTime: form.start_time_am}" :style="Index.width1"></el-time-select>
								</el-form-item>
								<el-form-item label="下午呼叫时间:">
									<el-time-select placeholder="开始时间" v-model="form.start_time_pm" :picker-options="{start: '11:00',step: '00:30',end: '24:00'}" :style="Index.width1"></el-time-select>
									<span>~</span>
									<el-time-select placeholder="结束时间" v-model="form.end_time_pm" :picker-options="{ start: '11:00', step: '00:30',end: '24:00',minTime: form.start_time_pm}" :style="Index.width1"></el-time-select>
								</el-form-item>
								<el-form-item label="机器人数量:">
									<ul style="margin-top:15px;">
										<li class="Slider"><el-slider show-stops :max="AddData.usable_ai_count" :min="1" v-model="form.ai_count"></el-slider></li>
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
								 <el-form-item label="交互方式：">
									<el-radio-group v-model="form.agent_or_queue" @change="agentorqueueChange">
										<div>
											<el-radio label="mobile">转手机</el-radio>
											<el-input v-model="form.asrtomobile" style="width:120px; margin-left:10px"></el-input>
										</div>
										<div style="margin-top:10px;">
											<el-radio label="ext">转分机</el-radio>
											<el-select v-model="form.exten" placeholder="请选择" style="width:100px;margin-left:10px;">
												<el-option v-for="(item,index) in AddData.ext_list" :label="item.name" :value="item.name" :key="index"></el-option>
											</el-select>
										</div>
										<!--<div>
											<el-radio label="queue">转队列</el-radio>
											<el-input v-model="AddQueueData.caller_id"  :disabled="true" style="width: 100px;margin-left:10px"></el-input>
											<span @click="agentorqueueChangeWord" style="font-size:14px;display: inline-block;border-bottom: 1px solid #333;line-height: 10px;cursor: pointer;">
												<span v-show="AddQueueData.member == ''">0</span>
												<span>{{AddQueueData.member}}</span>成员(点击选择接听成员)
											</span>
										</div>-->
									</el-radio-group>
								</el-form-item>
								<el-form-item label="振铃时长:">
									<el-input v-model="form.call_duration" style="width:240px;margin-right:10px;"></el-input>秒
								</el-form-item>
								<div style="height:15px;background:#f2f2f2"></div>
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
										<el-select v-model="not_connected_status1" multiple  placeholder="请选择" @change="changeStatus1" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index"
											:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
									<!--<el-form-item label="未接通状态:">
											<el-checkbox-group v-model="not_connected_status1" @change="changeStatus1">
												<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index">{{item.status}}</el-checkbox>
											</el-checkbox-group>
									</el-form-item>-->
									<el-form-item label="直接拨打:">
										<el-select v-model="form1.next_round" :style="Index.width" placeholder="请选择联系人">
											<el-option label="第一联系人" value="1"></el-option>
											<el-option label="第二联系人" value="2"></el-option>
										</el-select>
									</el-form-item>                   
								</el-form>
                			</el-form>
							</div>
							<div style="float:left;width:15px;height:750px;max-height:900px;background:#f2f2f2"></div>
							<div style="float:left;width:45%;height:750px;max-height:900px;display:block;background:#fff">
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
										<el-select v-model="not_connected_status2" multiple  placeholder="请选择" @change="changeStatus2" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in AddData.call_result" :key="index"
											:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
									<!--<el-form-item label="未接通状态:">
										<el-checkbox-group v-model="not_connected_status2" @change="changeStatus2">
											<el-checkbox :label="item.id" v-for="(item,index) in AddData.call_result" :key="index">{{item.status}}</el-checkbox>
										</el-checkbox-group>
									</el-form-item>-->
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
								<!--短信-->
								<el-form :model="form" label-width="145px" ref="forms">    
									<el-form-item label="是否发送短信:" style="margin-top:40px;">
                        				<el-select v-model="form.sms_rules" :style="Index.width" >
											<el-option value="0" label="不发送短信" ></el-option>
											<el-option v-for="(item,index) in AddData.smsList" :value="item.id" :label="item.name" :key="index"></el-option>
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
						<div style="float:left;width:50%;height:750px;max-height:900px;display:block;background:#fff">
							<p style="text-align:center;font-size:16px;margin-bottom:10px;font-weight:bold">基础配置</p>
							<el-form :model="formEdit" label-width="120px" ref="forms">
								<el-form-item label="任务名称:">
									<el-input v-model="formEdit.name" :style="Index.width"></el-input>
								</el-form-item>
								<el-form-item label="上午呼叫时间:">
									<el-time-select placeholder="开始时间" v-model="start_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00'}" :style="Index.width1"></el-time-select>
									<span>~</span>
									<el-time-select placeholder="结束时间" v-model="end_time_am" :picker-options="{start: '00:00',step: '00:30',end: '12:00',minTime: start_time_am}" :style="Index.width1"></el-time-select>
								</el-form-item>
								<el-form-item label="下午呼叫时间:">
									<el-time-select placeholder="开始时间" v-model="start_time_pm" :picker-options="{start: '11:00',step: '00:30',end: '24:00'}" :style="Index.width1"></el-time-select>
									<span>~</span>
									<el-time-select placeholder="结束时间" v-model="end_time_pm" :picker-options="{ start: '11:00', step: '00:30',end: '24:00',minTime: start_time_pm}" :style="Index.width1"></el-time-select>
								</el-form-item>
								<el-form-item label="机器人数量:">
									<ul style="margin-top:15px;">
										<li class="Slider"><el-slider show-stops :max="formEdit.usable_ai_count" :min="1" v-model="formEdit.ai_count"></el-slider></li>
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
								<el-form-item label="交互方式：">
									<el-radio-group v-model="agent_or_queue" @change="agentorqueueChangeEdit">
										<div style="margin-bottom:5px;">
											<el-radio label="mobile" >转手机</el-radio>
											<el-input v-model="formEdit.asrtomobile" style="width:120px;  margin-left:10px"></el-input>
										</div>
										<div style="margin-bottom:5px;margin-top:10px;">
											<el-radio label="ext" >转分机</el-radio>
											<el-select v-model="formEdit.extNum" placeholder="请选择" style="width:100px;margin-left:10px;">
												<el-option v-for="(item,index) in AddData.ext_list" :label="item.name" :value="item.name" :key="index"></el-option>
											</el-select>
										</div>
										<!--<div>
											<el-radio label="queue">转队列</el-radio>
											<el-input v-model="formEdit.caller_id"  :disabled="true" style="width: 100px;margin-left:10px"></el-input>
											<span @click="agentorqueueChangeWordEdit" style="font-size:14px;display: inline-block;border-bottom: 1px solid #333;line-height: 10px;cursor: pointer;">
												<span v-show="EditQueueData.member == ''">0</span>
												<span v-show="EditQueueData.member != ''">{{EditQueueData.member}}</span>成员(点击选择接听成员)
											</span>
										</div>-->
									</el-radio-group>
									
								</el-form-item>
								<el-form-item label="振铃时长:">
									<el-input v-model="formEdit.call_duration" style="width:240px;margin-right:10px;"></el-input>秒
								</el-form-item>
								<div style="height:15px;background:#f2f2f2"></div>
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
									<el-select v-model="not_connected_status1Edit" multiple placeholder="请选择" @change="changeStatus1Edit" :style="Index.width">
										<el-option :label="item.status" v-for="(item,index) in editData.call_result" :key="index"
										:value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<!--<el-form-item label="未接通状态:">
										<el-checkbox-group v-model="not_connected_status1Edit" @change="changeStatus1Edit">
											<el-checkbox :label="item.id" v-for="(item,index) in editData.call_result" :key="index">{{item.status}}</el-checkbox>
										</el-checkbox-group>
								</el-form-item>-->
								<el-form-item label="直接拨打:">
									<el-select v-model="form1Edit.next_round" :style="Index.width" placeholder="请选择联系人">
											<el-option label="第一联系人" value="1"></el-option>
											<el-option label="第二联系人" value="2"></el-option>
									</el-select>
								</el-form-item>                   
							</el-form>
                		</el-form>
					</div>
					<div style="float:left;width:15px;height:750px;max-height:900px;background:#f2f2f2"></div>
					<div style="float:left;width:45%;height:750px;max-height:900px;display:block;background:#fff">
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
										<el-select v-model="not_connected_status2Edit" multiple placeholder="请选择" @change="changeStatus2Edit" :style="Index.width">
											<el-option :label="item.status" v-for="(item,index) in editData.call_result" :key="index"
											:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
							<!--<el-form-item label="未接通状态:">
								<el-checkbox-group v-model="not_connected_status2Edit" @change="changeStatus2Edit">
									<el-checkbox :label="item.id" v-for="(item,index) in editData.call_result" :key="index">{{item.status}}</el-checkbox>
								</el-checkbox-group>
                    		</el-form-item>-->
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
						<!--短信-->
						<el-form :model="formEdit" label-width="145px" ref="forms">    
							<el-form-item label="是否发送短信:" style="margin-top:40px;">
								<el-select v-model="formEdit.sms_rules" :style="Index.width" >
									<el-option value="0" label="不发送短信" ></el-option>
									<el-option v-for="(item,index) in AddData.smsList" :value="item.id" :label="item.name" :key="index"></el-option>
								</el-select>
							</el-form-item>        
						</el-form>
					</div>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="onSubmitSave">确认保存</el-button>
							<el-button type="primary" @click="Index.editTask = false">取消</el-button>
						</div>
            		</el-dialog>
        		</div>
			  	<!-- 添加时点击转队列按钮的时候出现的弹框 -->
				<div class="dial-header bind">
					<el-dialog title="选择接听的坐席" :visible.sync="AddQueueData.QueueShow" :close-on-click-modal= "false" :close-on-press-escape="false">
						<el-form :inline="true"  class="demo-form-inline" @submit.native.prevent  label-width="90px" :model="AddQueueData">
							<el-form-item label=" 振铃策略:" style="display:block">
								<el-select placeholder="请选择" v-model="AddQueueData.strategy">
									<el-option value="ringall" label="群振"></el-option>
									<el-option value="roundrobin" label="轮询分配"></el-option>
									<el-option value="rrmemory" label="记忆轮询分配"></el-option>
									<el-option value="leastrecent" label="按最后一次接通分配"></el-option>
									<el-option value="fewestcalls" label="按呼叫次数分配"></el-option>
									<el-option value="random" label="随机分配"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label=" 振铃时长:" style="display:block">
								<el-input style="width:100px" v-model="AddQueueData.timeout"></el-input> <span>秒</span>
							</el-form-item>
							<el-form-item label=" 最大等待数:" style="display:block">
								<el-input style="width:100px" v-model="AddQueueData.maxlen"></el-input> <span>个</span>
							</el-form-item>
						</el-form>
						<el-table ref="multipleTables" :data="AddQueueData.Data" tooltip-effect="dark" height="200" style="width:100%" @selection-change="handleSelectionChangeQueue">
							<el-table-column type="selection" prop="id"></el-table-column>
							<el-table-column prop="true_name" label="用户名"></el-table-column>
							<el-table-column prop="staff_id" label="真实姓名(工号)"></el-table-column>
							<el-table-column prop="penalty" label="振铃顺序">
								<template slot-scope="scope">
									<el-input :value="scope.row.penalty" :disabled="true"> </el-input>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="QueueSure">确定保存</el-button>
							<el-button type="primary" @click="AddQueueData.QueueShow=false" >取消</el-button>
						</div>
					</el-dialog>
				</div>
				 <!-- 编辑时点击转队列按钮的时候出现的弹框 -->
				<div class="dial-header bind">
					<el-dialog title="选择接听的坐席" :visible.sync="EditQueueData.QueueShow" :close-on-click-modal= "false" :close-on-press-escape="false" v-move>
						<el-form :inline="true"  class="demo-form-inline" @submit.native.prevent  label-width="90px" :model="EditQueueData">
							<el-form-item label=" 振铃策略:" style="display:block">
								<el-select placeholder="请选择" v-model="EditQueueData.strategy">
									<el-option value="ringall" label="群振"></el-option>
									<el-option value="roundrobin" label="轮询分配"></el-option>
									<el-option value="rrmemory" label="记忆轮询分配"></el-option>
									<el-option value="leastrecent" label="按最后一次接通分配"></el-option>
									<el-option value="fewestcalls" label="按呼叫次数分配"></el-option>
									<el-option value="random" label="随机分配"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label=" 振铃时长:" style="display:block">
								<el-input style="width:100px" v-model="EditQueueData.timeout"></el-input> <span>秒</span>
							</el-form-item>
							<el-form-item label=" 最大等待数:" style="display:block">
								<el-input style="width:100px" v-model="EditQueueData.maxlen"></el-input> <span>个</span>
							</el-form-item>
						</el-form>
						<el-table ref="multipleTables1" :data="EditQueueData.Data" tooltip-effect="dark" height="200" style="width:100%" @selection-change="handleSelectionChangeQueueEdit">
							<el-table-column type="selection" prop="id"></el-table-column>
							<el-table-column prop="true_name" label="用户名"></el-table-column>
							<el-table-column prop="staff_id" label="真实姓名(工号)"></el-table-column>
							<el-table-column prop="penalty" label="振铃顺序">
								<template slot-scope="scope">
									<el-input :value="scope.row.penalty" :disabled="true"> </el-input>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="EditQueueSure">确定保存</el-button>
							<el-button type="primary" @click="EditQueueData.QueueShow=false" >取消</el-button>
						</div>
					</el-dialog>
				</div>
				<!-- 队列功能弹框 -->
				<div class="dial-header Main">
					<el-dialog title="组成队列" :visible.sync="AddQueue.show">
						队列名称:
						<el-input v-model="AddQueue.name" style="width:200px"  placeholder="请输入名称"></el-input>
						<span style="color:red;font-size:12px">*必填</span>
						<el-table ref="multipleTable" :data="AddQueue.date" border :height="AddQueue.date.length<=1?100:300" tooltip-effect="dark" style="width: 100%;margin-top:10px" @selection-change="handleSelectionChangeQueue" >
							<el-table-column type="selection"></el-table-column>
							<el-table-column  prop="name" label="任务名称" ></el-table-column>
							<el-table-column  prop="task_coding" label="任务编号" ></el-table-column>
							<el-table-column  prop="asr_number" label="外线号码" ></el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer"> 
							<el-button @click="AddQueue.show = false">取消</el-button>  
							<el-button type="primary" @click="queueSure">组成队列</el-button>
						</div>
					</el-dialog>
				</div>
				<!-- 已有队列弹框 -->
				<div class="dial-header queue">
					<el-dialog title="已有队列" :visible.sync="showQueue.show" >
						<el-table :data="showQueue.tableData" style="width: 100%" border>
							<el-table-column type="expand" label="点击查看详情" width="80"> 
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand" v-for="(item,index) in  props.row.config_info" :key="index">
										<el-form-item label='队列中机器人名称:' >
											<span>{{props.row.config_info[index].name}}</span>
										</el-form-item>
										<el-form-item label='任务编号:' >
											<span>{{props.row.config_info[index].task_coding}}</span>
										</el-form-item>
										<el-form-item label='外线号码:' >
											<span>{{props.row.config_info[index].asr_number}}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column label="序号" type="index" width="50"></el-table-column>
							<el-table-column label="队列名称" prop="queue_name" width="100"></el-table-column>
							<el-table-column label="任务编号" prop="task_coding"></el-table-column>
							<el-table-column label="创建时间" prop="create_time" width="170"> </el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button type="danger" @click="delQueue(scope.$index,scope.row)">删除</el-button>
								</template> 
							</el-table-column>
						</el-table>
					</el-dialog>
				</div>
				<!--呼叫测试-->
				<div class="dial-header  bind">
					<el-dialog title="呼叫测试" :visible.sync="Call">
						<el-form :model="callTest" label-width="120px" ref="forms" @submit.native.prevent>
							<el-form-item label="测试号码:">
								<el-input v-model="callTest.telephone" :style="Index.width"></el-input>
							</el-form-item>
							<el-form-item label="测试使用话术:">
								<el-select v-model="callTest.template_id" :style="Index.width" placeholder="请选择话术">
									<el-option v-for="(item,index) in test_tempalte_list" :label="item.name" :value="item.id"  :key="index"></el-option>
								</el-select>
							</el-form-item>                  
						</el-form>
						<div class="button" style="text-align:center;padding:20px 0px 15px">
							<el-button type="primary" @click="startText">开始测试</el-button>
						</div>
					</el-dialog>
				</div>
			</div>
		</div>
		
	</section>
</template>

<script>
import {axiosRequest,clone,message,getCookie} from '@/assets/js/Yt.js'
import { MessageBox } from 'element-ui';
import store from '@/vuex/store.js'
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
					ext_list:[],     //转分机数据
					smsList:[],               //短信
					usable_ai_count:0         //添加时机器人最大数
        		},
				AddQueueData:{            //添加任务的时候转队列需要用到的数据
					QueueShow:false,      //转队列的时候出现的弹框
					Data:[],      //数据
					caller_id:"",
					strategy:"rrmemory",//[振铃策略] 
					timeout:"30",//[振铃时长]
					maxlen:"10",//[最大等待数]
					staff_id_queue:"" ,
					multipleSelection:[],
					member:"",    //成员个数
            	},
				EditQueueData:{            //编辑任务的时候转队列需要用到的数据
					QueueShow:false,      //转队列的时候出现的弹框
					Data:[],      //数据
					caller_id:"",
					strategy:"",//[振铃策略] 
					timeout:"",//[振铃时长]
					maxlen:"",//[最大等待数]
					staff_id_queue:"" ,
					multipleSelection:[],
					member:"",    //成员个数
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
					agent_or_queue: "", //交互方式 1转手机，2转分机，3队列
					exten_num: "", //分机号（转分机） 
					asrtomobile: "",//手机号（转手机）
					asrqueue: "",//队列（队列）
					exten_num:"",//人机交互需要传给后台的值
					exten:"",    //转分机对应的值
					strategy:"",      //转队列需要用到的参数
					timeout:"",
					maxlen:"",
					staff_id_queue:"",
					sms_rules:"0"      //短信
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
				data1:{
					name:"",    //任务名称
              		caller_id :"",// 外线号码 
					asr_number :"",//识别线路
					ai_count:1,// 机器人数
					call_duration:"45",//振铃时长
					start_time_am:"08:00", //上午开始呼叫时间
					end_time_am:"12:00",    //上午结束呼叫时间
					start_time_pm:"11:00", //下午开始呼叫时间
					end_time_pm:"21:00",    //下午结束呼叫时间
					agent_or_queue: "", //交互方式 1转手机，2转分机，3队列
					exten_num: "", //分机号（转分机） 
					asrtomobile: "",//手机号（转手机）
					asrqueue: "",//队列（队列）
					exten_num:"",//人机交互需要传给后台的值
					exten:"",    //转分机对应的值
					strategy:"",      //转队列需要用到的参数
					timeout:"",
					maxlen:"",
					staff_id_queue:"",
					sms_rules:"0"
				},
				data2:{
					round:'0',
					template_id:"",
					next_round:"1",
					call_times:"",
					not_connected_status:""
				},
				data3:{
					round:'2',
					template_id:"",
					call_times:"",
					next_round:"3",
					not_connected_status:""
				},
				data4:{
					round:'2',
					template_id:"",
					call_times:"",
					next_round:"3",
					not_connected_status:""
				},
           		Dates:[],
				editData:{            //编辑任务的时候需要用到的数据
					outLine:[],     //外线号码
					recognition_lies:[], //语音识别线路
					call_result:[],   //未接通状态
					templates:[],   //呼叫使用话术
				},
				agent_or_queue:"",
				formEdit: {
					extNum: "", //分机号（转分机） 
					asrtomobile: "",//手机号（转手机）
					usable_ai_count:0
				},
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
				closeData:{
					status:"",
					status1:"",
					status2:""
				},
				isAnyoneOn:false,     //检测启动是否开启
				AddQueue:{ // 添加为队列用到数据
					show:false,            
					name:"",
					date:[],
					multipleSelection:[]
				} ,
				showQueue:{      //显示已有队列
					show:false, 
					tableData:[]
            	},
				Call:false ,      //呼叫测试弹框  
				test_tempalte_list:[],    //测试种话术列表
				callTest:{
					telephone:"",
					id:"",
					template_id:""
				}
			}
		},
		activated() {
			this.init()   //页面数据初始化 	
		},
		 watch:{
            //监测是否有开启按钮
            isAnyoneOn :{
                handler: function (val) {
                    if( val ){
                        this.timer = setInterval(this.init,5000)
                    }else if(!val){
                        clearInterval(this.timer)
                    }
                },
            }
        },
		methods: {
			// 页面机器人列表
			init(){
				if(getCookie("user")&&this.$route.path == '/taskManagement'){
					const url = '/api_backend.php?r=asroperate/list'
					const conf = {
						url,
						success: (data)=>{
							// message(data)
							this.Dates = data.info
							this.isAnyoneOn = this.Dates.some(item=>item.status==="1")
						}
					}
					axiosRequest(conf)
				}
				
      		},
			// 点击添加任务时数据初始化
			addInit(){
				const url = "/api_backend.php?r=asroperate/add-init"
				const conf = {
					url,
					success:(data)=>{
						this.AddData.outLine = data.info.out_side_lines
						this.AddData.recognition_lies = data.info.recognition_lies
						this.AddData.call_result = data.info.call_result_status
						this.AddData.usable_ai_count = data.info.usable_ai_count
					}
				}
				axiosRequest(conf)
			},
			// 点击添加时获取话术
			AddInitSound(){
				const url = "/api_backend.php?r=template/template-list-all"
				const conf = {
					url,
					success:(data)=>{
						var arr = data.info
						arr.unshift({id:"0",name:"未选择话术"})
						this.AddData.templates = arr
						this.editData.templates = arr
					}
				}
				axiosRequest(conf)
			},
			// 点击获取短信
			AddInitSms(){
				const url = "/api_backend.php?r=sms-rule/list"
				const conf = {
					url,
					success:(data)=>{
						this.AddData.smsList = data.info
					}
				}
				axiosRequest(conf)
			},
			// 转分机数据
			addExtension(){
				const url = "/api_backend.php?r=asroperate/turn-extension"
				const conf = {
					url,
					success:(data)=>{
						this.AddData.ext_list = data.info
					}
				}
				axiosRequest(conf)
			},
			changeStatus1(){
				this.form1.not_connected_status = this.not_connected_status1.join(",")
			},
			changeStatus2(){
				this.form2.not_connected_status = this.not_connected_status2.join(",")
			},
		  	addTask(){
				this.addInit()
				if(this.AddData.usable_ai_count == 0){
					this.$alert("无可用机器人,无法进行添加!")
				}else{
					this.Index.addTask = true
				}
				this.AddInitSound()
				this.addExtension()
				this.AddInitSms()
			},
			clone(obj){
				return JSON.parse(JSON.stringify(obj))
			},
			 // 人机交互队列中选择坐席
            handleSelectionChangeQueue(val){
                this.AddQueueData.multipleSelection = val
            },
            // 转队列确定保存
            QueueSure(){
                if(this.AddQueueData.multipleSelection.length == 0){
                    this.$alert("选择接听坐席")
                    this.AddQueueData.QueueShow = true
                }else{
                    var x = this.AddQueueData.multipleSelection.map((item)=>{
                        return item.staff_id
                    })
                    this.AddQueueData.staff_id_queue = x.join(",")
                    this.form.strategy = this.AddQueueData.strategy
                    this.form.timeout = this.AddQueueData.timeout
                    this.form.maxlen = this.AddQueueData.maxlen
                    this.form.staff_id_queue = this.AddQueueData.staff_id_queue
                    this.AddQueueData.member = parseInt(this.AddQueueData.multipleSelection.length)
                    this.AddQueueData.QueueShow = false
                }
            },
			agentorqueueChangeWord(){
                if(this.form.agent_or_queue  == "queue"){
                    if(this.form.caller_id == ""){
                        this.$alert("请选择外线号码")
                        this.form.agent_or_queue = ""
                    }else{
                        this.AddQueueData.QueueShow = true
                        const caller_id = this.form.caller_id
                        const url = "/api_backend.php?r=asroperate/turn-queue"   //获取转队列弹框中的数据
                        const conf = {
                            url,
                            data:{caller_id},
                            success:(data)=>{
                                this.AddQueueData.Data = data.info
                            }
                        }
                        axiosRequest(conf)
                    }
                 
                }else{
                    this.$alert("未选择转队列")
                }
            },
			 // 添加时人机交互方式(队列)
            agentorqueueChange(val){
                if(val == "queue"){
                    if(this.form.caller_id == ""){
                        this.$alert("请选择外线号码")
                        this.form.agent_or_queue = ""
                    }else{
                        this.AddQueueData.QueueShow = true
                        const caller_id = this.form.caller_id
                        const url = "/api_backend.php?r=asroperate/turn-queue"
                        const conf = {
                            url,
                            data:{caller_id},
                            success:(data)=>{
                                this.AddQueueData.Data = data.info
                            }
                        }
                        axiosRequest(conf)
                        this.AddQueueData.caller_id = this.form.caller_id  
                        this.form.agent_or_queue = val
                    }
                }else{
                    this.AddQueueData.caller_id = ""
                    this.form.agent_or_queue = val
                }
            },
			// 保存添加
			onSubmit(){
				this.round_rule[0] = this.form1;
				this.round_rule[1] = this.form2;
				this.round_rule[2] = this.form3;
				const data = this.form
				if(this.form.agent_or_queue == "mobile"){
                    const x= this.form.asrtomobile
                    if(x){
                        data.exten_num = "mobile" + x
                    }else{
                        data.exten_num = 0
                    }
                    
                }else if(this.form.agent_or_queue == "ext"){
                    const x= this.form.exten
                    if(x){
                        data.exten_num =  "ext" + x
                    }else{
                        data.exten_num = 0
                    }
                    
                }else if(this.form.agent_or_queue == "queue"){
                   	data.exten_num = "queue" 
                    data.strategy = this.AddQueueData.strategy
                    data.timeout = this.AddQueueData.timeout
                    data.maxlen = this.AddQueueData.maxlen
                    data.staff_id_queue = this.AddQueueData.staff_id_queue
                }else{
                    data.exten_num = 0
                }
				data.start_time_am = this.form.start_time_am+':00'
        		data.end_time_am = this.form.end_time_am+":00"
				data.start_time_pm = this.form.start_time_pm+":00" 
        		data.end_time_pm = this.form.end_time_pm + ":00"
				data.round_rule = JSON.stringify(this.round_rule)
				const url = "/api_backend.php?r=asroperate/add-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode == 1){
							this.Index.addTask = false;
							this.form = this.clone(this.data1)
							this.form1 = this.clone(this.data2)
							this.form2 = this.clone(this.data3)
							this.form3 = this.clone(this.data4)
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
				this.addExtension()
				this.AddInitSound()
				this.AddInitSms()
				this.Index.editTask = true
				const url = "/api_backend.php?r=asroperate/info"
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
						// this.editData.templates = data.info.templates
						this.formEdit = data.info.info
						this.formEdit.usable_ai_count = data.info.usable_ai_count
						this.formEdit.ai_count = parseInt(data.info.info.ai_count)
						this.start_time_am = data.info.info.call_time.am.s
						this.end_time_am = data.info.info.call_time.am.e
						this.start_time_pm = data.info.info.call_time.pm.s
						this.end_time_pm = data.info.info.call_time.pm.e
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
						var x= data.info.info.exten_num
						if(x.indexOf("mobile") == 0){
							this.formEdit.agent_or_queue = "mobile"
							this.agent_or_queue = "mobile"
							this.formEdit.asrtomobile = x.substring(6)
							// this.editData.exten_num = ""
						}else if(x.indexOf("ext") == 0){
							this.formEdit.agent_or_queue = "ext"
							this.agent_or_queue = "ext"
							this.formEdit.extNum = x.substring(3)
						}else if(x.indexOf("queue") == 0){
							this.formEdit.agent_or_queue = "queue"
							this.agent_or_queue = "queue"
							this.EditQueueData.caller_id = this.formEdit.caller_id
						}else if(x == 0){
							this.formEdit.agent_or_queue = ""
							this.formEdit.exten_num = ""
							this.formEdit.asrtomobile = ""
						}
						this.EditQueueData.member = data.info.queue_count
						this.form1Edit = arr[0]
						this.form1Edit.template_id =arr[0].template_id
						this.form2Edit = arr1[0]
						this.form2Edit.template_id =arr1[0].template_id
						this.form3Edit = arr2[0]
						this.form3Edit.template_id = arr2[0].template_id
						this.not_connected_status1Edit = (arr[0].not_connected_status).split(",")
						this.not_connected_status2Edit = (arr1[0].not_connected_status).split(",")
					}
				}
				axiosRequest(conf)
			},
			// 编辑时人机交互方式(队列)
             agentorqueueChangeEdit(val){
                if(val == "queue"){
                    if(this.formEdit.caller_id == ""){
                        this.$alert("请选择外线号码")
                        this.formEdit.agent_or_queue = ""
                    }else{
                         this.EditQueueData.QueueShow = true
                        const url = "/api_backend.php?r=asroperate/edit-turn-queue"
                        const num = this.formEdit.caller_id
                        const conf = {
                            url,
                            data:{num},
                            success:(data)=>{
                                 this.EditQueueData.Data = data.info
                                this.EditQueueData.strategy = data.message.strategy
                                this.EditQueueData.timeout = data.message.timeout
                                this.EditQueueData.maxlen = data.message.maxlen
                                 this.EditQueueData.Data.forEach((row,index)=>{
                                    if(row.staff_id_selected == 1){
                                        setTimeout(()=>{
                                            this.$refs.multipleTables1.toggleRowSelection(  this.EditQueueData.Data[index])
                                        },1)
                                    }
                                })
                            }
                        }
                        axiosRequest(conf)
                         this.EditQueueData.caller_id = this.formEdit.caller_id  
                        this.formEdit.agent_or_queue = val
                    }
                 
                }else{
                     this.EditQueueData.caller_id = ""
                    this.formEdit.agent_or_queue = val
                    this.formEdit.strategy = ""
                    this.formEdit.timeout = ""
                    this.formEdit.maxlen = ""
                    this.formEdit.staff_id_queue = ""
                }
               
            },
            editQueue(){
                const url = "/api_backend.php?r=asroperate/edit-turn-queue"
                const num = this.formEdit.caller_id
                const conf = {
                    url,
                    data:{num},
                    success:(data)=>{
                        this.EditQueueData.Data = data.info
                        this.EditQueueData.strategy = data.message.strategy
                        this.EditQueueData.timeout = data.message.timeout
                        this.EditQueueData.maxlen = data.message.maxlen
                        var x =   this.EditQueueData.Data.filter((row,index)=>{
                            return row.staff_id_selected == 1 
                        })
                        const y =  x.map((row,index)=>{
                            return row.staff_id
                            
                        })
                        this.EditQueueData.staff_id_queue = y.join(",")
                    }
                }
                axiosRequest(conf)
            },
            // 人机交互队列中选择坐席
            handleSelectionChangeQueueEdit(val){
                this.EditQueueData.multipleSelection = val
            },
            // 转队列确定保存
            EditQueueSure(){
                if(this.EditQueueData.multipleSelection.length == 0){
                    this.$alert("选择接听坐席")
                     this.EditQueueData.QueueShow = true
                }else{
                    var x = this.EditQueueData.multipleSelection.map((item)=>{
                        return item.staff_id
                    })
                    this.EditQueueData.staff_id_queue = x.join(",")
                    this.formEdit.strategy = this.EditQueueData.strategy
                    this.formEdit.timeout = this.EditQueueData.timeout
                    this.formEdit.maxlen = this.EditQueueData.maxlen
                    this.formEdit.staff_id_queue = this.EditQueueData.staff_id_queue
                    this.EditQueueData.member = parseInt(this.EditQueueData.multipleSelection.length)
                    this.EditQueueData.QueueShow = false
                }
               
            },
            agentorqueueChangeWordEdit(){
                if( this.formEdit.agent_or_queue  == "queue"){
                    if(this.formEdit.caller_id == ""){
                        this.$alert("请选择外线号码")
                        this.formEdit.agent_or_queue = ""
                    }else{
                         this.EditQueueData.QueueShow = true
                        const url = "/api_backend.php?r=asroperate/edit-turn-queue"
                        const num = this.formEdit.caller_id
                        const conf = {
                            url,
                            data:{num},
                            success:(data)=>{
                                this.EditQueueData.Data = data.info
                                this.EditQueueData.strategy = data.message.strategy
                                this.EditQueueData.timeout = data.message.timeout
                                this.EditQueueData.maxlen = data.message.maxlen
                                 this.EditQueueData.Data.forEach((row,index)=>{
                                    if(row.staff_id_selected == 1){
                                        setTimeout(()=>{
                                            this.$refs.multipleTables1.toggleRowSelection(  this.EditQueueData.Data[index])
                                        },1)
                                    }
                                })
                            }
                        }
                        axiosRequest(conf)
                    }
                 
                }else{
                    this.$alert("未选择转队列")
                }
            },
			changeStatus1Edit(){
				this.form1Edit.not_connected_status = this.not_connected_status1Edit.join()
			},
			changeStatus2Edit(){
				this.form2Edit.not_connected_status = this.not_connected_status2Edit.join()
			},
			// 保存修改
			onSubmitSave(){
				this.round_rule_edit[0] = this.form1Edit;
				this.round_rule_edit[1] = this.form2Edit;
				this.round_rule_edit[2] = this.form3Edit;
				const data = this.formEdit
				if(this.start_time_am.split(":").length == 3){
					data.start_time_am = this.start_time_am
				}else{
					data.start_time_am = this.start_time_am+":00"
				}
				if(this.end_time_am.split(":").length == 3){
					data.end_time_am = this.end_time_am
				}else{
					data.end_time_am = this.end_time_am+":00"
				}
				if(this.start_time_pm.split(":").length == 3){
					data.start_time_pm = this.start_time_pm
				}else{
					data.start_time_pm = this.start_time_pm+":00"
				}
				if(this.end_time_pm.split(":").length == 3){
					data.end_time_pm = this.end_time_pm
				}else{
					data.end_time_pm = this.end_time_pm+":00"
				}
				if(this.agent_or_queue == "mobile"){
                    const x= this.formEdit.asrtomobile
                    if(x){
                        data.exten_num = "mobile" + x
                    }else{
                        data.exten_num = 0
                    }
                    
                }else if(this.agent_or_queue == "ext"){
                    const x= this.formEdit.extNum
                    if(x){
                        data.exten_num =  "ext" + x
                    }else{
                        data.exten_num = 0
                    }
                    
                }else if(this.agent_or_queue == "queue"){
                    this.formEdit.exten = "queue" 
                    data.strategy = this.EditQueueData.strategy
                    data.timeout = this.EditQueueData.timeout
                    data.maxlen = this.EditQueueData.maxlen
                    data.staff_id_queue = this.EditQueueData.staff_id_queue
                }else{
                    data.exten_num = 0
                }
              
                data.staff_id_queue = this.formEdit.staff_id_queue
				data.round_rule = JSON.stringify(this.round_rule_edit)
				const url = "/api_backend.php?r=asroperate/edit-handle"
				const conf = {
					url,
					data:data,
					success:(data)=>{
						this.$alert(data.message)
						if(data.statusCode == 1){
							this.Index.editTask = false;
							this.init()
							this.formEdit = {}
							this.form1Edit = {}
							this.form2Edit = {}
							this.form3Edit = {}
							this.not_connected_status1Edit = []
							this.not_connected_status2Edit = []
						}else{
							this.Index.editTask = true
						}
						message(data)
					}
				}
				axiosRequest(conf)
			},
			// 关闭或启动机器人
            close(id,status){
				var statusId = ""
				if(status == 0){
					statusId = 1
				}else{
					statusId = 2
				}
                const url = "/api_backend.php?r=asroperate/start-and-close"
                const conf = {
                	url,
                    data:{
                        id:id,
                        status:statusId
                    },
                    success:(data)=>{ 
						this.$alert(data.message)
                        this.init()
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
					const url = "/api_backend.php?r=asroperate/del"
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
			},
			// 队列
           queueAdd(){
                this.AddQueue.show = true
                this.AddQueue.name = ""
                const url = "/api_backend.php?r=asroperate/config-list"
                const conf = {
                    url,
                    success:(data)=>{
                        this.AddQueue.date = data.info
                    }
                }
                axiosRequest(conf)
            },
            handleSelectionChangeQueue(val){
                this.AddQueue.multipleSelection = val;
            },  
            queueSure(){
                const queue_name = this.AddQueue.name
                var ids = this.AddQueue.multipleSelection.map((item)=>{
                    return item.id
                })
                const configId = ids.join(",")
                const url = "/api_backend.php?r=asroperate/config-queue-add"
                const conf = {
                    url,
                    data:{
                        queue_name,
                        configId
                    },
                    success:(data)=>{
                        this.$alert(data.message)
                        if(data.statusCode == 1){
                            this.AddQueue.show = false
                        }else{
                            this.AddQueue.show = true
                        }
                    }
                }
                axiosRequest(conf)               
            },
            // 队列列表
            queueList(){
                this.showQueue.show = true
                const url = "/api_backend.php?r=asroperate/config-queue-list"
                const conf = {
                    url,
                    success:(data)=>{
                        this.showQueue.tableData = data.info
                    }
                }
                axiosRequest(conf)
            },
            // 删除队列
            delQueue(index,row){
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        const url = "/api_backend.php?r=asroperate/config-queue-list-del"
                        const conf = {
                            url,
                            data:{id:row.id},
                            success:(data)=>{
                                this.$alert(data.message)
                                if(data.statusCode == 1){
                                    this.showQueue.show = false
                                }else{
                                    this.showQueue.show = true
                                }
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
			 // 测试
            text(id){
                this.Call = true 
				this.callTest.telephone = ""
				this.callTest.template_id = ""
                this.callTest.id = id
				const url = "/api_backend.php?r=asroperate/test-template-list"
				const conf = {
					url,
					data:{
						id:this.callTest.id
					},
					success:(data)=>{
						this.test_tempalte_list = data.info
					}
				}
				axiosRequest(conf)
            },
            startText(){
				const data = this.callTest
                const url = "/api_backend.php?r=asroperate/test"
                const conf = {
                    url,
                    data:data,
                    success:(data)=>{
						if(data.statusCode == 1){
                           	this.$alert(data.message, '', {
								confirmButtonText: '确定'
							});
                        }else{
							this.$alert(data.message)
						}
                    }
                }
                axiosRequest(conf)
            },
		}
	}

</script>
<style lang="scss" scoped>
 @import '../../../static/css/taskManagement.scss'
</style>
<style>
 .TopForm .el-select__tags{overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
</style>