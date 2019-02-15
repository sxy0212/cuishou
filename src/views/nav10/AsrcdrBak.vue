 <template>
      <section>
        <div class="CenterMain  MainHp">
            <div class="TopForm">
                <div class="CallCount"> 
                    <!--条件查询form提交-->
                    <el-form ref="form" :model="form" label-width="90px" :inline="true">
                        <el-form-item label="案件编号：">
                            <el-select v-model="form.case_id" placeholder="请选择任务编号" @change="changeSrc" style="width:200px;" filterable>
                                <el-option  v-for="(item,index) in initSearchData.case_name" :key="index" :label="item.case_code" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="通话时长：">
                            <el-input v-model="form.min_billsec" placeholder="请输入内容" style="width:103px"></el-input>~
                            <el-input v-model="form.max_billsec" placeholder="请输入内容" style="width:103px"></el-input>
                        </el-form-item>  
                        <el-form-item label="线路号码：">
                            <el-input v-model="form.clid" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item label="客户号码：">
                            <el-input v-model="form.dst" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item label="所属批次：">
                            <el-select v-model="form.batch_id" placeholder="所属批次" @change="changeBatch" filterable style="width:200px;">
                                <el-option :label="item.batch_name" :value="item.id" v-for="(item,index) in initSearchData.batch" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="服务客服：">
                            <el-select v-model="form.staff_id" placeholder="服务客服" @change="changeStaff">
                                <el-option v-for="item in initSearchData.staff"   :label="item.user_name"  :value="item.staff_id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <!-- <el-form-item label="转人工：">
                            <el-select v-model="form.to_staff_status" placeholder="呼叫类型" style="width:220px;">
                                <el-option label="不查询" value=""></el-option>
                                <el-option label="全部" value="3"></el-option>
                                <el-option label="接通" value="1"></el-option>
                                <el-option label="未接通" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="呼叫类型：">
                            <el-select v-model="form.dcontext" placeholder="呼叫类型" style="width:220px;">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="呼出" value="call_out"></el-option>
                                <el-option label="呼入" value="public"></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="通话类型：">
                            <el-select v-model="form.call_result_number" placeholder="通话类型" style="width:220px;">
                                <el-option :label="item.name" :value="item.val" v-for="(item,index) in call_results" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="通话日期：">
                            <el-date-picker v-model="form.fromdate" type="datetime" placeholder="通话开始日期" default-time="00:00:00" :picker-options="pickerOptions0" :clearable="false" style="width:210px;" ></el-date-picker>~
                            <el-date-picker v-model="form.todate" type="datetime" placeholder="通话结束日期"  default-time="23:59:59" :picker-options="pickerOptions1" :clearable="false" style="width:210px;" ></el-date-picker>
                        </el-form-item> 
                        <!--<el-form-item label="关键字：">
                            <el-input v-model="form.key" style="width:220px;"></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称：">
                            <el-input v-model="form.company_name" style="width:220px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="form.busy_tel" @change="filter">排队未通话客户</el-checkbox>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="init(1)">立即查询</el-button>   
                        </el-form-item>           
                    </el-form>
                     <!--客户分类及一些常用操作-->
                    <!--<div class="rev-operation">
                        <div class="fl">
                            <el-form ref="form" :model="options" label-width="120px">
                                <el-form-item label="客户类型分类检索：">
                                    <el-select v-model="value4" clearable placeholder="请选择" @change="changeClientType">
                                        <el-option v-for="item in options" :label="item.name" :value="item.id"></el-option>
                                    </el-select>   
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="fl" style="margin-left:20px" v-show="showType == 1">
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('联系方式')">联系方式</el-button></div>
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('公司情况')">公司情况</el-button></div>
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('询价')">询价</el-button></div>
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('嫌贵')">嫌贵</el-button></div>
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('产品情况')">产品情况</el-button></div>
                            <div class="fl" style="margin-left:5px"><el-button  type="primary" @click="tag('')">全部</el-button></div>
                        </div>
                        <div class="fl" style="margin-left:20px" v-show="showType == 0">
                            <div class="fl">
                                <el-button type="primary" plain  @click="CallCount.TagClick = true">标签管理</el-button>
                            </div>
                            <div class="fl" v-for="(item,index) in tagData">
                                <el-button @click="tagOld(index)" style="margin-left:5px">{{item.name}}</el-button>
                            </div>
                            <div class="fl">
                                <el-button type="primary" @click="tagAll" style="margin-left:5px">全部</el-button>
                            </div>
                        </div>
                        <div class="button-right fr">    
                            <ul class="ButtonList fr">
                                <li style="margin-top:10px;"> <el-checkbox v-model="checked" @change="checkDio">不导出对话</el-checkbox></li>
                                <li><el-button type="primary" @click="open(0)" :disabled="total == 0">导出</el-button></li>
                                <li><el-button type="primary" @click="recycle">回收资料</el-button></li>
                                <li><el-button type="primary" @click="startDistribution">资料分配坐席</el-button></li>
                                <li><el-button type="primary" @click="open(1)">打包下载语音</el-button></li>
                            </ul>  
                        </div>
                    </div>-->
                    <!--数据列表-->    
                    <div class="TableList">
                        <el-table ref="multipleTable" :data="infos" style="width:100%" border @selection-change="handleSelectionChange"  v-loading="loading">
                            <el-table-column type="index" label="序号" width="60" :index="index" fixed="left"></el-table-column>
                            <el-table-column prop="case_name" label="案件编号" > </el-table-column>
                            <el-table-column prop="clid" label="线路号码"></el-table-column>
                            <el-table-column prop="dst" label="客户号码" width="120"></el-table-column>
                            <el-table-column prop="name" label="姓名" ></el-table-column>
                            <el-table-column prop="rounds" label="关系" >
                               <template slot-scope="scope">
                                    <span v-if="scope.row.rounds== 0">本人</span>
                                    <span v-else-if="scope.row.rounds==1">第一联系人</span>
                                    <span v-else-if="scope.row.rounds==2">第二联系人 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="gender" label="性别" width="80"> 
                                <template slot-scope="scope">
                                    <span v-if="scope.row.gender==0">未识别</span>
                                    <span v-if="scope.row.gender==1">女</span>
                                    <span v-if="scope.row.gender==2">男 </span>
                                    <span v-if="scope.row.gender==4">未知</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="call_result_number" label="通话状态" >
                                <template slot-scope="scope">
                                    <span v-if='scope.row.call_result_number == 1'>接通</span>
                                    <span v-else-if = "scope.row.call_result_number == 0">未接通</span>
                                    <span v-else-if = "scope.row.call_result_number == 2">关机</span>
                                    <span v-else-if = "scope.row.call_result_number == 3">空号</span>
                                    <span v-else-if = "scope.row.call_result_number == 4">停机</span>
                                    <span v-else-if = "scope.row.call_result_number == 5">正在通话中</span>
                                    <span v-else-if = "scope.row.call_result_number == 6">用户拒接</span>
                                    <span v-else-if = "scope.row.call_result_number == 7">无法接通</span>
                                    <span v-else-if = "scope.row.call_result_number == 8">暂停服务</span>
                                    <span v-else-if = "scope.row.call_result_number == 9">用户正忙</span>
                                    <span v-else-if = "scope.row.call_result_number == 10">拨号方式不正确</span>
                                    <span v-else-if = "scope.row.call_result_number == 11">呼入限制</span>
                                    <span v-else-if = "scope.row.call_result_number == 12">来电提醒</span>
                                    <span v-else-if = "scope.row.call_result_number == 13">呼叫转移失败</span>
                                    <span v-else-if = "scope.row.call_result_number == 14">网络忙</span>
                                    <span v-else-if = "scope.row.call_result_number == 15">无人接听</span>
                                    <span v-else-if = "scope.row.call_result_number == 16">欠费</span>
                                    <span v-else-if = "scope.row.call_result_number == 17">无法接听</span>
                                    <span v-else-if = "scope.row.call_result_number == 18">改号</span>
                                    <span v-else-if = "scope.row.call_result_number == 19">服务暂停</span>
                                    <span v-else-if = "scope.row.call_result_number == 20">稍后再拨</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="call_date" label="通话时间"></el-table-column>
                            <el-table-column prop="billsec" label="通话时长"></el-table-column>
                            <el-table-column prop="batch_name" label="所属批次" ></el-table-column>
                            <el-table-column prop="call_result_number" label="操作"  fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain  @click="detail(scope.$index,scope.row)" :class="ButtonList.indexOf(scope.row.id)!=-1 ? 'active' : '' " >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination" v-show="!!total">
                        <div class="block"> 
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[15, 20, 25, 30]"
                                :page-size="form.pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--资料回收弹出层-->
        <div class="dial-header tag-dial">
            <el-dialog title="资料回收" :visible.sync="CallCount.Recycling" :close-on-click-modal="false">
            <div style="margin-bottom:10px;font-size:14px;">去重后可回收数据条数: <span style="color:red"> {{ava_count}}条</span></div>
                <el-input v-model="distributionTask.batch_name" placeholder="请输入批次名称"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureRecycle" v-show="huishou">确认回收</el-button>
                    <el-button type="primary" v-show="!huishou">正在回收中</el-button>
                    <el-button @click="CallCount.Recycling = false">取消</el-button>  
                </div>
            </el-dialog>
        </div>
        <!--资料分配坐席-->
        <div class="dial-header tag-dial">
            <el-dialog title="分配客户资料" :visible.sync="CallCount.Seats">
                分配 <span style="color:red">{{distributionTask.allotnums}}</span> 条
                <el-input v-model="distributionTask.num" style="width:200px"  placeholder="请输入分配条数"></el-input>
                <el-select v-model="distributionTask.task_id" placeholder="请选择任务">
                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in distributionTask.tableData" :key="index"></el-option>
                </el-select>
                <el-table ref="multipleTable" :data="distributionTask.staffIdList" height="300" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChangeTask">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column  prop="user_name" label="真实姓名" ></el-table-column>
                    <el-table-column  prop="staff_id" label="工号" ></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="startDistributionTask" v-show="fenpei">开始分配</el-button>
                    <el-button type="primary" v-show="!fenpei">正在分配中</el-button>
                    <el-button @click="CallCount.Seats = false">取消</el-button>  
                </div>
            </el-dialog>
        </div>
        <!-- 导出弹框 -->
        <div class="dial-header tag-dial">
            <el-dialog title="任务名称" :visible.sync="exportData.show">
                <span style="color:red;display: block;padding-bottom: 10px;">导出数据超过1000条,会在后台导出,任务名称最好以日期命名!</span>
                <el-input v-model="exportData.name" placeholder="请输入导出任务名称"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="exportSave(0)">确定导出</el-button>
                    <el-button @click="exportData.show = false">关闭</el-button>  
                </div>
            </el-dialog>
        </div>
         <!-- 导出Zip弹框 -->
         <div class="dial-header tag-dial">
            <el-dialog title="任务名称" :visible.sync="exportZip.show">
                <span style="color:red;display: block;padding-bottom: 10px;">数据超过1000条,会在后台下载语音,任务名称最好以日期命名!</span>
                <el-input v-model="exportData.name" placeholder="请输入任务名称"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="exportSave(1)">确定</el-button>
                    <el-button @click="exportZip.show = false">关闭</el-button>  
                </div>
            </el-dialog>
        </div>
         <!--标签弹出层--> 
         <div class="dial-header tag-dial">
            <el-dialog title="标签管理" :visible.sync="CallCount.TagClick">
                    <el-table  :data="tagData" style="width: 100%" >
                            <el-table-column prop="name" label="标签名称"></el-table-column>
                            <el-table-column prop="keyword" label="关键字"> </el-table-column>
                            <el-table-column prop="mainphone" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain @click="editTag(scope.$index,scope.row)">编辑</el-button>
                                    <el-button type="danger" plain @click="delTag(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addTag">添加标签</el-button>
                    <el-button @click="CallCount.TagClick = false">关闭</el-button>  
                </div>
            </el-dialog>
        </div>     
        <!--标签修改弹出层-->
        <div class="dial-header tag-dial">
            <el-dialog title="标签修改" :visible.sync="CallCount.Tagedit">
                <el-form>
                    <el-form-item label="标签名称：">
                        <el-input v-model="editTagData.name" style="width: 478px"></el-input>
                    </el-form-item>
                    <el-form-item label="写关键字：">
                            <el-input v-model="editTagData.key" style="width: 478px"></el-input>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editTagSave">确认保存</el-button>
                    <el-button @click="CallCount.Tagedit = false">关闭弹窗</el-button>  
                </div>
            </el-dialog>
        </div>
        <!--标签添加弹出层-->
        <div class="dial-header tag-dial">
            <el-dialog title="标签添加" :visible.sync="CallCount.Tagadd">
                <el-form>
                    <el-form-item label="标签名称：">
                        <el-input v-model="addTagData.name" style="width: 478px"></el-input>
                    </el-form-item>
                    <el-form-item label="写关键字：">
                        <el-input v-model="addTagData.key" style="width: 478px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addTagSave">确认保存</el-button>
                    <el-button @click="CallCount.Tagadd = false">关闭弹窗</el-button>  
                </div>
            </el-dialog>
        </div>
        <!--详情-->
        <div class="dial-header DialogueMain2">
          <el-dialog title="通话详情" :visible.sync="CallCount.Plays" v-move :before-close="handleClose" style="padding:0px;">
            <div style="padding-bottom:10px;padding-left:40px;font-size:24px;">被叫号码:{{phone}}</div>   
            <el-row>
              <el-col :span="6" style="padding-left:40px">
                <div class="grid-content bg-purple">
                  <div style="height:30px;">
                    <span style="color:#409EFF">客户姓名:</span>{{user_name}}
                  </div>
                  <div style="height:30px;">
                      <span style="color:#409EFF">号码归属地:</span>{{numberAssigned}}
                  </div>
                  <!--<div style="margin-top:10px">
                        <p style="color:#409EFE;margin:0;padding-bottom:10px">客户意向分类</p>
                        <div style="width:240px;">
                            <el-button v-for="(item,index) in options" type="primary" :plain="item.start != radio1" style="padding: 6px 0px;margin-left:5px;margin-bottom:5px;width:100px" @click="RedistributionSave(item.start)" :key="index">{{item.name}}</el-button>
                        </div>
                  </div> -->
                </div>
              </el-col>
              <el-col :span="18" style="padding-right:10px;">
                <div class="grid-content bg-purple-light">
                  <div style="display:flex;justify-content:space-between;margin-bottom:10px">
                    <span> 完整录音 </span> 
                    <el-button type="primary" @click="download" >下载录音</el-button> 
                  </div>
                  <audio style="width:100%" :src="spath" controls="controls" id="play1" @click="playOne"></audio> 
                  <div class="dialogueList" style="border-bottom:none">
                    <ul id="messageBox">
                      <li :class="[{ 'layim-chat-mine':item.user==1 }, {'layim-chat-mine1':item.user==0}]" v-for="(item,index) in audioData" :key="index" style="font-size:14px;display:block" >
                        <div class="layim-chat-user">
                          <img src="static/image/yantong.png" v-if="item.user==1">
                          <img src="static/image/user.png" v-if="item.user==0">                                    
                        </div>
                        <div v-if="item.user==0" style="max-width:420px;float:left">
                          <p style="margin:0">言小通 <i>{{item.create_time}}</i></p>
                          <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                        </div> 
                        <div v-if="item.user==1" style="max-width:420px;float:right">
                          <p style="margin:0"><i>{{item.create_time}} </i>用户</p>
                          <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                        </div> 
                        <div v-if="item.user==0" style="float:left;margin-top:20px" v-show="item.path">
                          <img src="static/image/textListen.png"  @click="textListen(item.path)" style="width:23px">
                        </div>
                        <div v-if="item.user==1" style="float:right;margin-top:20px" v-show="item.path">
                          <img src="static/image/textListen.png"  @click="textListen(item.path)" style="width:23px">
                        </div>
                      </li> 
                      <li>
                        <audio style="width:100%" :src="textAudio" id="audioPlay" autoplay></audio> 
                      </li>
                    </ul>
                  </div>    
                </div>
              </el-col>
            </el-row>
          </el-dialog>
        </div>
        </section>
    </template>

   <script>
import axios from "axios"
import {axiosRequest,getCookie,setCookie,message,formatDate,clone} from '@/assets/js/Yt.js'


export default {
  data() {
    return { 
      loading:true,
       radio1:"",    //默认选中
            redistributionId:"" ,  //重新分类的id
            checked:false,      //是否导出对话内容
            without_detail:"0",
            // 通话类型的数组
            call_results: [{val:'',name:'全部'},{val:'0',name:'未接通'},{val:'1',name:'接通'},{val:'2',name:'关机'},{val:'3',name:'空号'},{val:'4',name:'停机'},{val:'5',name:'正在通话中'},{val:'6',name:'用户拒接'},{val:'7',name:'无法接通'},{val:'8',name:'暂停服务'},{val:'9',name:'用户正忙'},{val:'10',name:'拨号方式不正确'},{val:'11',name:'呼入限制'},{val:'12',name:'来电提醒'},{val:'13',name:'呼叫转移失败'},{val:'14',name:'网络忙'},{val:'15',name:'无人接听'},{val:'16',name:'欠费'},{val:'17',name:'无法接听'},{val:'18',name:'改号'},{val:'19',name:'服务暂停'},{val:'20',name:'稍后再拨'}],
            textAudio:"",   //试听播放路径
            options: [],    //客户分类的数据
            value4: '',
            total:0,
            ButtonList:[],    //播放变颜色
            downButtonList:[], //下载后按钮变颜色
            CallCount: {
                TagClick: false , //控制标签管理弹出层
                Tagadd: false, //标签添加弹出层
                Tagedit:false, //标签修改弹出层
                Recycling: false, //资料回收弹出层
                Seats: false, //坐席资料分配
                Prompt: false, //下载之前打包资料提示窗
                PromptDown: false ,//语音资料打包完成提供下载 
                Plays: false, //音频播放 
                status:false,
            }, 
            showOpen:true,   //导出是否出现弹框  
            pickerOptions0: {
            disabledDate: (time) => {                 
                   return time.getTime() > Date.now()
                }
            },
            pickerOptions1: {
              disabledDate:(time) => {
                if(this.form.fromdate != ""){
                  let currentTime = this.form.fromdate;
                  return time.getTime() < currentTime || time.getTime() > Date.now();
                }else{
                  return time.getTime() > Date.now()
                }
                }
              } ,    
            form: {
                page:"1",
                page_size:"15",
                case_id: '' ,  //案件编号
                batch_id:"", //所属批次
                min_billsec: '' ,//通话时长最小值
                max_billsec: '' ,//通话时长最大值
                clid: '' , //线路号码
                dst: '',//客户号码
                // staff_id: '', //服务客服
                call_type: '', //呼叫状态
                dcontext:"",    //呼叫类型
                // key:"",   //关键字
                // busy_tel:false,//未接通
                fromdate:new Date(new Date().setHours(0, 0, 0, 0)), //通话时间最小范围
                todate: new Date(new Date().setHours(23, 59,59, 59)), //通话时间最大范围 
                // keyword:"" ,//标签关键字
                call_result_number:"1",   //通话类型
                // followup_id:"",
                // to_staff_status:"",//转人工
                // company_name:""   //公司名称
            },
            initSearchData:{
                case_name:[],//案件编号 
                batch:[], //所属批次
                asrType: [],//标签
                staff : [{user_name: "全部", staff_id: ""}], //服务客服
                entType: [], //客户分类
            },
            value1: '',
            value2: '',
            infos: [],     //页面初始化时数据
            tagData:[],    //标签管理中数据初始化
            distributionTask:{
                task_id:"",
                batch_name:"",
                num:"",
                tableData:[],      //下拉列表的数据
                staffIdList:[],    //分配坐席里面的工号数据
                multipleSelection:[],
                allotnums:""
            },   //分配坐席里面的数据
            multipleSelection: [],
            currentPage4: 1,
            spath:"",    //播放语音地址
            audioData:[], //播放语音时的信息展示
            cycle:{},      //资料回收
            huishou:true,    //确认回收
            ava_count:"",   //回收资料的时候提示用户去重后的条数
            phone:"",     //点击详情的时候出现的信息
            user_name:"",
            index1:"0",
            user_scores:"",
            numberAssigned:"",
            downloadDate:{      //下载录音
               path:"",
               dst:""
            },
            addTagData:{
                name:"",
                key:""
            },    //添加标签
            editTagData:{
                name:"",
                key:""
            },   //添加编辑
            loading:false,
            fenpei:true,    //正在分配中
            // 群发短信
            sendMes:false,
            userList:[],
            messageList:[],
            form1: {
                content:'',
                sms_id:""
            },
            exportData:{
                show:false,
                name:""
            },
            exportZip:{
                show:false,
                name:""
            },
            showType:"",     //判断标签管理处显示什么    0是不固定标签，1是固定标签
    };
  },
        created(){
            this.init(0);
            // this.initShow()
        },
      methods: {
          initShow(){
                const url = "/api/api_backend.php?r=asroperate/code-detection"
                const conf = {
                    url,
                    success:(data)=>{
                        this.showType = data.info
                    }
                }
               axiosRequest(conf)
            },
            handleClose(done){
                done()
                document.getElementById("play1").pause()
                document.getElementById("audioPlay").pause()
                this.CallCount.Play = false
                document.getElementsByClassName('dialogueList')[0].scrollTop=0
                this.textAudio = ""
            },
            index(val){
                return (this.form.page-1)*this.form.page_size+val+1
            },
            initStaff(){
                let data = clone(this.form)
                if(this.form.fromdate == null){
                    data.fromdate = ""
                }else {
                    data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                }
                if(this.form.todate == null){
                    data.todate = ""
                }else{
                    data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                }
                data.level_id = this.value4
                data.type = "0"
                const url = "/api/api_backend.php?r=asrcdr-allot/index"
                const conf = {
                    url,
                    data,   
                    success:(data)=>{
                        this.distributionTask.allotnums = data.info.allotnum    //坐席中可分配
                        this.distributionTask.num = data.info.allotnum 
                    }
                }
                axiosRequest(conf)
            },
            // 排队未接通客户
            filter(val){
                console.log(val)
            },
			      //加载页面获取相应数据// 搜索
            init(num){
                this.loading = true
                let data = clone(this.form)
                if(num == 0){
                  data.page = this.form.page
                  data.page_size = this.form.page_size
                }else if(num == 1){
                  data.page = 1;
                  data.page_size = 15
                }
                var index = this.index1
                if(this.form.fromdate == null){
                    data.fromdate = ""
                }else {
                    data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                }
                if(this.form.todate == null){
                    data.todate = ""
                }else{
                    data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                }
                data.level_id = this.value4
                data.action = ""
                const conf = {
                    url:"/api/api_backend.php?r=asrcdr-bak/records" ,
                    data:data,
                    success:(data)=>{
                        this.loading = false
                        this.infos = data.info.data
                        this.initSearchData.case_name = data.info.case_data      //案件编号
                        this.initSearchData.case_name.unshift({id:"",case_code:"全部"})
                        this.initSearchData.batch = data.info.batch_data         //批次
                        this.initSearchData.batch.unshift({batch_name: "全部",id:"" })
                        this.total = parseInt(data.info.total_count)
                        if(data.info.data.length>0){
                            this.scores = this.infos[index].scores
                            this.user_scores = this.infos[index].user_scores
                            this.radio1 = this.infos[index].start_scores
                        
                        }
                        this.options = data.info.level_list
                        this.tagData = data.info.asrType     //标签管理里数据
                        for(let i = 0;i <data.info.staff.length;i++){
                            this.initSearchData.staff.push(data.info.staff[i])
                        }
                        this.distributionTask.tableData = data.info.task  //分配坐席里面的下拉列表的数据
                        this.distributionTask.staffIdList = data.info.staff    //坐席中数据
                        this.distributionTask.tableData.unshift({id:"",name:"请选择任务"})
                        if( !this.form.fromdate ){
                            this.form.fromdate = new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        if( !this.form.todate ){
                            this.form.todate =  new Date(new Date().setHours(23, 59, 59, 59))
                        }
                    }
                }
                axiosRequest(conf)
            },
            // 搜索时任务编号
            changeSrc(val){
                this.form.task_coding = val
            },
            // 搜索时批次
            changeBatch(val){
                this.form.batch_id = val
            },
            // 搜索时服务客服
            changeStaff(val){
                this.form.staff_id = val
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.form.page_size = val
                this.init(0)
            },
            handleCurrentChange(val) {
                this.form.page = val
                this.init(0)
                document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop = 0
            },
            // 客户分类搜索
            changeClientType(){
                var index = this.index1
                let data = clone(this.form)
                if(this.form.fromdate == null){
                    data.fromdate = ""
                }else {
                    data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                }
                if(this.form.todate == null){
                    data.todate = ""
                }else{
                    data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                }
                data.level_id = this.value4
                const url = "/api/api_backend.php?r=asrcdr-log/records"
                const conf = {
                    url,
                    data,
                    success:(data)=>{
                        this.message(data)
                        this.infos = data.info.data
                        this.total = parseInt(data.info.total_count)
                        if(this.infos.length>0){
                            this.scores = this.infos[index].scores
                            this.user_scores = this.infos[index].user_scores
                            this.radio1 = this.infos[index].start_scores
                        }
                    }
                }
                axiosRequest(conf)
            },
            // 点击标签处搜索(新)
            tag(word){
                this.form.keyword = word
                this.form.page = "1"
                this.form.page_size = "15"
                this.init(0)
            },
             // 点击标签处搜索(老)
             tagOld(index){
                this.form.keyword = this.tagData[index].keyword
                this.form.page = "1"
                this.form.page_size = "15"
                this.init(0)
            },
            tagAll(){
                this.form.keyword = ""
                this.form.page = "1"
                this.form.page_size = "15"
                this.init(0)
            },
            // 添加标签
            addTag(){
                if( this.tagData.length >=5 ){
                    this.CallCount.Tagadd = false
                    alert("标签不能超过5个")
                }else{
                    this.CallCount.Tagadd = true
                }
            },
            addTagSave(){
                const url = "/api/api_backend.php?r=asrcdr-log/lable"
                const conf = {
                    url,
                    data:{
                        action:"add",
                        name:this.addTagData.name,
                        key:this.addTagData.key
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.CallCount.Tagadd = false
                            this.$alert(data.message)
                            this.init()
                        }else{
                            this.$alert(data.message)
                        }
                        this.message(data)
                    }
                }
                axiosRequest(conf)
            },
            // 删除标签
            delTag(index,row){
                this.$confirm('确定删除标签?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        const url = "/api/api_backend.php?r=asrcdr-log/lable"
                        const conf = {
                            url,
                            data:{
                                action:"del",
                                id: row.id
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
            // 修改标签
            editTag(index,row){ 
                this.editTagData.name = row.name
                this.editTagData.key = row.keyword
                this.CallCount.Tagedit = true
                this.editTagData.id = row.id              
            },
            editTagSave(){
                const url = "/api/api_backend.php?r=asrcdr-log/lable"
                const conf = {
                    url,
                    data:{
                        action:"edit",
                        id:this.editTagData.id,
                        name:this.editTagData.name,
                        key:this.editTagData.key
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            alert("修改成功")
                            this.CallCount.Tagedit = false
                            this.init()
                        }  
                        this.message(data)                      
                    }
                }
                axiosRequest(conf)
            },
            // 分配坐席
            handleSelectionChangeTask(val) {
               this.distributionTask.multipleSelection = val;
            },
            startDistribution(){
                this.CallCount.Seats = true
                this.initStaff()
            },
            startDistributionTask(){
                this.CallCount.Seats = true
                if(this.distributionTask.num > this.distributionTask.allotnums){
                    this.$alert("输入的分配条数不能大于可分配数")
                }else if(this.distributionTask.num == "" && this.distributionTask.num != "0"){
                    this.$alert("请填写分配条数")
                }else{
                    this.fenpei = false
                    let staffid= []
                for(let i = 0;i<this.distributionTask.multipleSelection.length;i++){
                    staffid.push(this.distributionTask.multipleSelection[i].staff_id)
                }
                let data = clone(this.form)
                if(this.form.fromdate == null){
                    data.fromdate = ""
                }else {
                    data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                }
                if(this.form.todate == null){
                    data.todate = ""
                }else{
                    data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                }
                data.task_id = this.distributionTask.task_id
                data.num = this.distributionTask.num
                data.staffid = staffid
                data.level_id = this.value4
                data.type = "0"
                const conf = {
                    url:"/api/api_backend.php?r=asrcdr-allot/allot",
                    data,
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.CallCount.Seats = false
                            this.$message({
                                message: "分配成功!已分配的条数为:"+data.info.alotnum,
                                type: 'success',
                            })
                            this.init()
                        }else{
                            this.$alert(data.message)
                        }
                        this.fenpei = true
                        this.message(data)
                    }
                }
                axiosRequest(conf)
                }
            },
             // 打包语音
            //  open1(){
            //     this.$confirm('将导出在搜索条件下的打包语音文件', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //         }).then(() => {
            //             const fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
            //             const todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
            //             window.open('/api/api_backend.php?r=asrcdr-log/records&action=zipwav&task_coding='+this.form.task_coding+'&staff_id='+this.form.staff_id+'&clid='+this.form.clid+'&dst='+this.form.dst+'&call_type='+this.form.call_type+'&batch_id='+this.form.batch_id+'&fromdate='+fromdate+'&todate='+todate+'&min_billsec='+this.form.min_billsec+'&max_billsec='+this.form.max_billsec+'&level_id='+this.value4+"&keyword="+this.form.keyword+'&call_result_number='+this.form.call_result_number+'&key='+this.form.key+"&dcontext="+this.form.dcontext+"&to_staff_status="+this.form.to_staff_status+"&followup_id="+this.form.followup_id+"&busy_tel="+this.form.busy_tel)
            //     })
            // },
            // open1() {
            //     if(this.total>5){
            //         this.exportZip.show = true
            //     }else{
            //         this.$confirm('将导出在搜索条件下的全部资料', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //         }).then(() => {
            //             var fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
            //             var todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
            //             window.open('/api/api_backend.php?r=asrcdr-log/records&action=zipwav&task_coding='+this.form.task_coding+'&call_result_number='+this.form.call_result_number+"&without_detail="+this.without_detail+'&staff_id='+this.form.staff_id+'&clid='+this.form.clid+'&dst='+this.form.dst+'&call_type='+this.form.call_type+'&batch_id='+this.form.batch_id+'&fromdate='+fromdate+'&todate='+todate+'&min_billsec='+this.form.min_billsec+'&max_billsec='+this.form.max_billsec+'&level_id='+this.value4+"&keyword="+this.form.keyword+'&key='+this.form.key+"&dcontext="+this.form.dcontext+"&to_staff_status="+this.form.to_staff_status+"&followup_id="+this.form.followup_id+"&busy_tel="+this.form.busy_tel)
            //     })
            //     }
            // },
            checkDio(val){
                this.checked = val
                if(this.checked){
                    this.without_detail = 1
                }else{
                    this.without_detail = 0
                }
            },
            // 导出(判断条数)
            open(num) {
                var y = ""
                if(num == 0){
                    y ='data_export'
                }else if(num == 1){
                    y ='zipwav'
                }
                if(this.total>1000){
                    if(num == 0){
                        this.exportData.show = true 
                    }else if(num == 1){
                        this.exportZip.show = true 
                    }
                }else{
                    this.$confirm('将导出在搜索条件下的全部资料', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        var fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                        var todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                        window.open('/api/api_backend.php?r=asrcdr-log/records&action='+y+'&task_coding='+this.form.task_coding+'&call_result_number='+this.form.call_result_number+"&without_detail="+this.without_detail+'&staff_id='+this.form.staff_id+'&clid='+this.form.clid+'&dst='+this.form.dst+'&call_type='+this.form.call_type+'&batch_id='+this.form.batch_id+'&fromdate='+fromdate+'&todate='+todate+'&min_billsec='+this.form.min_billsec+'&max_billsec='+this.form.max_billsec+'&level_id='+this.value4+"&keyword="+this.form.keyword+'&key='+this.form.key+"&dcontext="+this.form.dcontext+"&to_staff_status="+this.form.to_staff_status+"&followup_id="+this.form.followup_id+"&busy_tel="+this.form.busy_tel+'&company_name='+this.form.company_name)
                })
                }
            },
            exportSave(num){
                var x = ''
                if((this.exportData.name).trim()){
                    if(num == 0){
                        x = "export_queue"
                    }else if(num == 1){
                        x = "zipwav_queue"
                    }
                        var fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                        var todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                        var _this = this
                            axios.get('/api/api_backend.php?r=asrcdr-log/records', {
                                params: {
                                    action: x,
                                    task_coding:this.form.task_coding,
                                    call_result_number:this.form.call_result_number,
                                    without_detail:this.without_detail,
                                    staff_id:this.form.staff_id,
                                    clid:this.form.clid,
                                    dst:this.form.dst,
                                    call_type:this.form.call_type,
                                    batch_id:this.form.batch_id,
                                    fromdate:fromdate,
                                    todate:todate,
                                    min_billsec:this.form.min_billsec,
                                    max_billsec:this.form.max_billsec,
                                    level_id:this.value4,
                                    keyword:this.form.keyword,
                                    key:this.form.key,
                                    dcontext:this.form.dcontext,
                                    to_staff_status:this.form.to_staff_status,
                                    followup_id:this.form.followup_id,
                                    export_task_name:this.exportData.name,
                                    busy_tel:this.form.busy_tel,
                                    company_name:this.form.company_name
                                }
                            }).then(function (response) {
                                _this.exportData.show = false
                                _this.exportZip.show = false
                                _this.exportData.name = ""
                                if(response.data.statusCode == 1){
                                    _this.$alert(response.data.message+',稍后请到后台任务中的导出任务中下载文件')
                                }else{
                                    _this.$alert(response.data.message)
                                }
                        })
                }else{
                    this.$alert('任务名称不能为空')
                }
            },
            // 播放的试听
            textListen(index){
                this.textAudio = index
                if(document.getElementById("audioPlay").paused){
                    document.getElementById("audioPlay").play()
                    document.getElementById("play1").pause()
                }else{
                    document.getElementById("audioPlay").pause()
                    document.getElementById("play1").pause()
                }
            },
             // 点击播放整段录音
            playOne(){
                document.getElementById("audioPlay").pause()
            },
               //点击详情
            detail(index, row){  
                this.numberAssigned = ""
                this.ButtonList.push(row.id)
                this.redistributionId = row.id
                this.index1 = index
                this.phone = row.dst
                this.user_name = row.name
                // this.address = row.address
                // this.billsec = row.billsec
                // this.scores = row.scores
                // this.company_name=row.company_name
                // this.radio1 = row.start_scores
                // this.user_scores = row.user_scores
                this.downloadDate.path = row.path
                this.downloadDate.dst  = row.dst
                this.CallCount.Plays = true
                var _this = this
                axios.get('/api/api_backend.php?r=asrcdr-bak/wave-record', {
                  params: {
                      action: "play",
                      path:row.path,
                      phone:row.dst,
                      unique_id:row.unique_id
                  }
                }).then(function (response) {
                    if(response.data.statusCode == 1){ 
                        _this.spath = response.data.info.path
                        _this.audioData = response.data.info.asrdata
                        if( response.data.info.state == 1){
                            _this.numberAssigned = response.data.info.home.province +"-"+ response.data.info.home.city
                        }else{
                            _this.numberAssigned = response.data.info.home
                        } 
                    }else{
                        _this.spath = ""
                        _this.audioData = ""
                    }
                })
            },
            // 下载语音(详情里的整条的)
            download(){
                if(this.downloadDate.path){
                    window.open("/api/api_backend.php?r=asrcdr-bak/wave-record&action=download&path="+this.downloadDate.path+"&phone="+this.downloadDate.dst)
                }else{
                    this.$alert("暂无录音")
                }
            },
            // 确定重新分类
            RedistributionSave(score){
                if(score == '0'){
                    score = 1
                }
                const url = "/api/api_backend.php?r=asrcdr-log/edit"
                const conf = {
                    url,
                    data:{
                        id:this.redistributionId,
                        scores:score  
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                           if(this.value4){
                                this.changeClientType()
                            } else{
                                this.init()
                            }
                            this.$alert(data.message)
                        }else{
                            this.$alert(data.message)
                        }
                        this.message(data)
                    }
                }
                axiosRequest(conf)
            },
            //回收资料
            recycle(){
                this.CallCount.Recycling = true
                this.distributionTask.batch_name = ""
                let data = clone(this.form)
                if(this.form.fromdate == null){
                    data.fromdate = ""
                }else {
                    data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                }
                if(this.form.todate == null){
                    data.todate = ""
                }else{
                    data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                }
                data.batch_name = this.distributionTask.batch_name
                data.level_id = this.value4
                data.type = "0"
                data.ava_count = "1"
                const url = "/api/api_backend.php?r=asrcdr-recycle/records"
                const conf = {
                url,
                data,
                success:(data)=>{
                    this.ava_count = Number(data.info.ava_count)
                }
            }
            axiosRequest(conf)
            },
            sureRecycle(){
                if(this.distributionTask.batch_name){
                    this.$confirm('将回收在搜索条件下的全部资料', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.huishou = false
                        let data = clone(this.form)
                        if(this.form.fromdate == null){
                            data.fromdate = ""
                        }else {
                            data.fromdate = formatDate(this.form.fromdate,"yyyy-MM-dd hh:mm:ss")
                        }
                        if(this.form.todate == null){
                            data.todate = ""
                        }else{
                            data.todate = formatDate(this.form.todate,"yyyy-MM-dd hh:mm:ss")
                        }
                        data.batch_name = this.distributionTask.batch_name
                        data.level_id = this.value4
                        data.type = "0"
                        const url = "/api/api_backend.php?r=asrcdr-recycle/records"
                        const conf = {
                        url,
                        data,
                        success:(data)=>{
                            if(data.statusCode == 1){
                                this.CallCount.Recycling = false
                                this.$message({
                                    type: 'success',
                                    message: '成功回收'+Number(data.info.count) +"条"
                                });
                            }
                            this.huishou = true
                            this.message(data)
                        }
                    }
                    axiosRequest(conf)
                   
                })
                }else{
                    this.$alert("填写批次名称")
                }
               
            },          
         
         
  },
}
</script>
<style lang="scss" scoped>
.ButtonList li{ display: inline-block; margin-right: 10px}
.button-right{ float: right !important; text-align: right}
.button-right [class*=el-col-]{ float: right}
.ButtonList .el-button{ font-size: 12px; padding: 10px 15px;}
.TopForm .timep  .call-active .el-input__inner {min-width: 102px !important;}
.TopForm .timep .el-input__inner{ width: 180px}
.el-form-item{margin-bottom:10px;}
.tag-dial .el-form-item__label{ float: left; text-align: right}

.Prompt-dial .el-dialog{ width: 320px} 
.Prompt-dial .el-dialog span{font-size: 14px; line-height: 18px}
.Prompt-dial .el-dialog span i{font-size: 18px; float: left;}
.PromptDown .el-dialog span.successText{ text-align:center; display: block}
.PromptDown .el-dialog__body{text-align: center}
.PromptDown .el-button{ margin-top: 15px; padding: 8px 20px;}
.rev-operation{ margin-bottom: 15px; height: auto; overflow: hidden}
.CallCount ul.up,.CallCount ul.down{ height: auto; overflow: hidden; display: block}
.CallCount ul.up li,.CallCount ul.down li{ float: left;}
.CallCount ul.down li .timep .el-input__inner{ width: 190px}
/*测试对话样式*/
.dialogueList ul li{position: relative;font-size: 0;margin-bottom: 10px;padding-left: 60px;min-height: 68px; height: auto; overflow: hidden;}
.dialogueList ul li .el-button{ padding: 5px 10px;font-size: 12px}
.layim-chat-text, .layim-chat-user {display: inline-block;vertical-align: top;font-size: 14px;}
.layim-chat-user {position: absolute;left: 3px;}
.layim-chat-user img {width: 40px;height: 40px;border-radius: 100%;}
.layim-chat-user cite {position: absolute;left: 60px;top: -2px;width: 500px;line-height: 24px;font-size: 12px;white-space: nowrap;color: #999;text-align: left;font-style: normal;}
.layim-chat-user cite i {padding-left: 15px;font-style: normal;}
.layim-chat-text {position: relative;line-height: 22px;margin-top: 25px;padding: 8px 15px;background-color: #e2e2e2; border-radius: 3px;color: #333;word-break: break-all;max-width: 462px\9;}
.layim-chat-text:after {content: '';position: absolute;
    left: -10px;top: 13px;width: 0;height: 0;border-style: solid dashed dashed;border-color: #e2e2e2 transparent transparent;overflow: hidden;border-width: 10px;
}
.dialogueList{ height: 422px; border-bottom:1px solid #ececec;max-height: 452px;
    overflow-y: auto;  padding: 15px; background-size:cover;  }
.dialogueList ul{padding:0}
.dialogueList ul .layim-chat-mine {text-align: right;padding-left: 0;padding-right: 60px;min-height:100px}
.dialogueList ul .layim-chat-mine1 {min-height:120px}
.dialogueList ul .layim-chat-mine .layim-chat-user {left: auto;right: 3px;}
.dialogueList ul .layim-chat-mine .layim-chat-user cite {left: auto;right: 60px;text-align: right;}
.dialogueList ul .layim-chat-mine .layim-chat-user cite i {padding-left: 0;padding-right: 15px;}
.dialogueList ul .layim-chat-mine .layim-chat-text {margin-left: 0;text-align: left;background-color: #5FB878;color: #fff;}
.dialogueList ul .layim-chat-mine .layim-chat-text:after {left: auto;right: -10px;border-top-color: #5FB878;}
.PredictAdd{height: auto; overflow: hidden; margin-bottom: 20px;}
.TableList .play{color:red;}
.cell .active{ background:#f56c6c !important;border-color:#f56c6c !important;color:#fff !important;}
</style>

  