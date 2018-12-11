<template> 
	<section>
        <div class="CenterMain  MainHp">
            <div class="TopForm">
                <div class="CallCount">  
                    <div style="float:left">
                      <el-form :inline="true"  class="demo-form-inline" style="float:left;margin-left:10px" @submit.native.prevent>
                        <el-form-item label="关键字搜索:">
                          <el-input v-model="init.keywords" placeholder="关键字"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="search">搜索</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="AIadd" style="float:right">
                        <el-button type="success" @click="addMessage"><i class="fa fa-plus"></i>添加基本信息</el-button> 
                        <!-- <el-button type="success">测试</el-button> -->
                    </div>
                    <div class="TableList">
                      <el-table ref="multipleTable" :data="init.InitData" style="width:100%" border v-loading="loading" :height="init.total>=2?600:300">
                          <el-table-column type="index" label="序号" width="60" :index="index" fixed="left"></el-table-column>
                          <el-table-column  label="自定义话术">
                            <template slot-scope="scope">
                              <p>名称:{{scope.row.show_name}}</p>
                              <p>内容:{{scope.row.answer}}</p>
                              <p>触发词:{{scope.row.condition}}</p>
                              <p v-show="scope.row.is_interrupt == 1">类型: <span style="color:#0099FF">{{scope.row.type}}</span> <span style="color:#FF6600">可以打断</span> </p>
                              <p v-show="scope.row.is_interrupt == 0">类型: <span style="color:#0099FF"> {{scope.row.type}}</span> <span style="color:#FF6600">不可以打断</span> </p>
                            </template>
                          </el-table-column>
                          <el-table-column prop="record" label="录音状况">
                            <template slot-scope="scope">
                                <el-button type="primary" plain @click="listen(item)" v-if="scope.row.record.length>0" v-for="(item,index) in scope.row.record" :key="index">试听</el-button>
                                <el-button type="danger" plain v-else-if="scope.row.record.length == 0">等待录音</el-button>
                            </template>
                          </el-table-column>
                          <el-table-column  label="操作" width="350">
                              <template slot-scope="scope">
                                  <el-button type="primary" plain @click="editInit(scope.$index,scope.row)">编辑</el-button>
                                  <el-button type="danger" plain @click="delInit(scope.$index,scope.row)">删除</el-button>
                              </template>
                          </el-table-column>
                      </el-table>
                      <audio style="width:100%" :src="init.textAudio" id="audioPlay" autoplay></audio> 
                    </div>
                    <div class="pagination">
                        <div class="block"> 
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="curr"
                                :page-sizes="[15, 20, 25, 30]"
                                :page-size="init.page_size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="init.total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加基本信息弹框 -->
        <div class="dial-header tag-dial padding">
          <el-dialog title="基本信息" :visible.sync="baseMessage.Add" v-move>
            <el-form label-width="100px" :model="baseMessageData">
              <el-form-item label="名称:">
                  <el-input  class="width" v-model="baseMessageData.show_name"></el-input>
              </el-form-item>
              <el-form-item label="是否可打断:">
                <el-select placeholder="请选择" v-model="baseMessageData.is_interrupt" class="width" >
                  <el-option label="可被打断" value="1"></el-option>
                  <el-option label="不可被打断" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:">
                <el-select placeholder="请选择" v-model="baseMessageData.type" @change="changeType" class="width">
                  <el-option label="普通" value="0"></el-option>
                  <el-option label="主线" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主线序列:"  v-show="baseMessageData.type=='1'">
                  <el-input   v-model="baseMessageData.name" class="width" disabled></el-input>
              </el-form-item>
              <el-form-item label="下个节点:" >
                <el-select placeholder="请选择" v-model="baseMessageData.nextname" class="width">
                  <el-option label="请选择" value=".null"></el-option>
                  <el-option label="终止" value="#"></el-option>
                  <el-option label="转人工" value="#####"></el-option>
                  <!-- <el-option label="挽回" value=".wanhui"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="等待时长(秒):">
                  <el-input class="width"  v-model="baseMessageData.wait_time" disabled></el-input>
              </el-form-item>
              <el-form-item label="可重复次数:">
                  <el-input class="width" v-model="baseMessageData.max_repeat" disabled></el-input>
              </el-form-item>
              <el-form-item label="话术内容:">
                <el-select placeholder="选择语音" v-model="baseMessageData.record" @change="changeSoundWord" class="width">
                  <el-option v-for="(item,index) in baseMessage.Sound" :value="item.id" :title="item.word" :label="item.spath" :key="index">{{item.spath}}-{{item.word}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="baseMessageData.record != '-100'">
                <el-input type="textarea" class="width" :rows="5" v-model="baseMessageData.answer" :disabled="baseMessageData.record!=0"></el-input>
              </el-form-item>
               <el-form-item label="组合方式:" v-show="baseMessageData.record == '-100'">
                <el-input type="textarea" class="width" :rows="5" v-model="baseMessageData.compose_record" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AddMessageSave">确认保存</el-button>
                <el-button @click="baseMessage.Add = false">关闭</el-button>  
            </div>
          </el-dialog>
        </div>
       <!--编辑-->
			  <div class="dial-header DialogueMain tag-dial1">
            <el-dialog title="编辑" :visible.sync="baseMessage.Edit" v-move>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <el-form label-width="100px">
                            <el-form-item label="名称:">
                                <el-input  class="width" v-model="baseMessageDataEdit.show_name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否可打断:">
                                <el-select placeholder="请选择" v-model="baseMessageDataEdit.is_interrupt" class="width">
                                <el-option label="可被打断" value="1"></el-option>
                                <el-option label="不可被打断" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类型:" v-show="baseMessageDataEdit.type != '3'">
                                <el-select placeholder="请选择" v-model="baseMessageDataEdit.type" @change="changeType" class="width">
                                <el-option label="普通" value= '0'></el-option>
                                <el-option label="主线" value='1'></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主线序列:"  v-show="baseMessageDataEdit.type=='1' || baseMessageDataEdit.type=='3'">
                                <el-input  class="width" v-model="baseMessageDataEdit.name"  disabled></el-input>
                            </el-form-item>
                            <el-form-item label="下个节点:">
                                <el-select placeholder="请选择" v-model="baseMessageDataEdit.nextname" class="width">
                                <el-option label="请选择" value=".null"></el-option>
                                <el-option label="终止" value="#"></el-option>
                                <el-option label="转人工" value="#####"></el-option>
                                <!-- <el-option label="挽回" value=".wanhui"></el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item label="等待时长(秒):">
                                <el-input  class="width" v-model="baseMessageDataEdit.wait_time" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="可重复次数:">
                                <el-input  class="width" v-model="baseMessageDataEdit.max_repeat" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="话术内容:">
                                <el-select placeholder="选择语音" v-model="baseMessageDataEdit.record" @change="changeSoundWord" class="width">
                                <el-option v-for="(item,index) in baseMessage.Sound" :value="item.id" :title="item.word" :label="item.spath" :key="index">{{item.spath}}-{{item.word}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="textarea" class="width" :rows="5" v-model="baseMessageDataEdit.answer" :disabled="baseMessageDataEdit.record!=0" v-if="baseMessageDataEdit.answer != ''"></el-input>
                                <el-input type="textarea" class="width" :rows="5" v-model="baseMessageDataEdit.record_description" :disabled="baseMessageDataEdit.record!=0" v-else></el-input>
                            </el-form-item>
                            <el-form-item label="组合方式:" v-show="baseMessageDataEdit.record == '-100'">
                              <el-input type="textarea" class="width" :rows="5" v-model="baseMessageDataEdit.compose_record" ></el-input>
                            </el-form-item>
                        </el-form>
                        <div style="float: right;">
                            <el-button type="primary" @click="EditMessageSave">确认保存</el-button>
                            <el-button @click="baseMessage.Edit = false">关闭</el-button>  
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="触发词" name="second">
                        <el-form :inline="true"  class="demo-form-inline"  @submit.native.prevent>
                            <el-form-item label="关键字搜索:">
                            <el-input  placeholder="关键字" v-model="touch.keyword"></el-input>
                            </el-form-item>
                            <el-form-item>
                            <el-button type="primary" @click="touchSearch">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <div  style="width:170px;float:left">
                            <el-table ref="multipleTable" :data="touch.Data"  style="100%" border :height="touch.Data.length>=1?300:'100'" @row-dblclick="dblclickTouchEdit">
                            <el-table-column prop="type" label="通用关键词" >      
                                <template slot-scope="scope">
																	<span v-show="scope.row.type=='private'" style="color:#FF0000;cursor: pointer;" >{{scope.row.show}}</span>
																	<span v-show="scope.row.type=='system'" style="color:#0099FF;cursor: pointer;">{{scope.row.show}}</span>
                                </template>                     
                            </el-table-column>
                            <el-table-column  width="30">
                                <template slot-scope="scope">
                                    <span @click="touchLeftPlus(scope.$index,scope.row)" style="cursor: pointer">+</span>
                                </template>
                            </el-table-column>
                            </el-table>
                            <el-button type="success" @click="touchAdd" style="padding:15px 52px;margin-top:10px">添加关键词</el-button>
                        </div>
                        <div style="width:1260px;float:left;margin-left:10px">
                            <el-table ref="multipleTable" :data="touch.DataRight"  border :height="touch.total>0?300:'200'">
                            <el-table-column type="index" label="序号"  fixed="left" width="50"></el-table-column>
                            <el-table-column prop="name" label="来源"> 
                                <template slot-scope="scope">
                                <span v-show="scope.row.type=='private'" style="color:#FF0000">{{scope.row.name}}</span>
                                <span v-show="scope.row.type=='system'" style="color:#0099FF">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="condition" label="关键词" ></el-table-column>
                            <el-table-column prop="is_interrupt" label="是否可打断" width="100">
                                <template slot-scope="scope">
                                <span v-show="scope.row.is_interrupt == 0">不可打断</span>
                                <span v-show="scope.row.is_interrupt == 1">可打断</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain @click="touchEdit(scope.$index,scope.row)" :disabled="scope.row.type=='system'">修改</el-button>
                                    <el-button type="danger" plain @click="touchEdl(scope.$index,scope.row)" :disabled="scope.row.type=='system'">删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table> 
                            <div class="pagination" v-show="touch.total>0" style="padding-top:0">
                                <div class="block"> 
                                    <el-pagination
                                        @size-change="handleSizeChangeTouch"
                                        @current-change="handleCurrentChangeTouch"
                                        :current-page="curr"
                                        :page-sizes="[15, 20, 25, 30]"
                                        :page-size="touch.page_size"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="touch.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="touch.touchShow = false">关闭</el-button>  
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="语境设置" name="third">
                        <div style="width:230px;float:left;">
                            <el-form label-width="10px" style="width:300px;float:left;">
                                <el-form-item>
                                    <el-select placeholder="请选择" v-model="contextData.content_type">
                                    <el-option label="关键字触发" value=".content"></el-option>
                                    <el-option label="直接跳转" value=".jump"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item >
                                    <el-select placeholder="请选择下个话术" v-model="contextData.nextId">
                                    <el-option label="选择下个话术" value=""></el-option>
                                    <el-option v-for="(item,index) in context.nextData" :label="item.answer" :value="item.id" :key="index">{{item.show}}</el-option>                         
                                    </el-select>
                                </el-form-item>
                                <el-form-item >
                                    <el-select placeholder="请选择触发词(可输入)" v-model="contextData.condition" @change="changeTouchInput" v-show="contextData.content_type!='.jump'">
                                    <el-option v-for="(item,index) in context.touchData" :label="item.condition" :value="item.name" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item v-show="context.custom&&contextData.content_type!='.jump'" >
                                    <el-input v-model="contextData.newCondition" style="width:217px"></el-input>
                                </el-form-item>
                                <el-form-item >
                                    <el-select placeholder="请选择" v-model="contextData.is_interrupt">
                                    <el-option label="可被打断" value="1"></el-option>
                                    <el-option label="不可被打断" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item >
                                    <el-button type="success" style="padding:15px 52px;margin-top:10px;" @click="contextSave">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="width:1200px;float:left;margin-left:10px">
                        <el-table ref="multipleTable" :data="context.Data"  border height="500">
                            <el-table-column type="index" label="序号"  :index="index" fixed="left"></el-table-column>
                            <el-table-column prop="type" label="类型" ></el-table-column>
                            <el-table-column prop="nextName" label="下个话术" ></el-table-column>
                            <el-table-column prop="condition" label="触发词" ></el-table-column>
                            <el-table-column prop="is_interrupt" label="是否可打断" width="80">
                            <template slot-scope="scope">
                                <span v-show="scope.row.is_interrupt == '0'">不可打断</span>
                                <span v-show="scope.row.is_interrupt == '1'">可打断</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="wait_time" label="等待时长(秒)" disabled></el-table-column>
                            <el-table-column  label="操作" width="180">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain @click="editContext(scope.$index,scope.row)">修改</el-button>
                                    <el-button type="danger" plain @click="delContext(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination" v-show="context.total>0" style="padding:0">
                            <div class="block"> 
                            <el-pagination
                                @current-change="handleCurrentChangeContext"
                                :current-page="curr"
                                :page-size="context.page_size"
                                layout="total,  prev, pager, next, jumper"
                                :total="context.total">
                            </el-pagination>
                            </div>
                        </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div>
         <!-- 触发词中添加关键词弹框 -->
         <div class="dial-header tag-dial">
          <el-dialog title="添加关键词" :visible.sync="touch.AddTouch" :close-on-click-modal="false" v-move>
              <el-form label-width="100px" :model="touchAddData">
                  <el-form-item label="关键词标签:">
                    <el-input style="width:200px" v-model="touchAddData.name"></el-input>
                  </el-form-item>
                  <el-form-item label="关键词">
                      <el-input style="width: 200px" type="textarea" placeholder="请输入关键词(多个关键词可用逗号隔开)" v-model="touchAddData.condition"></el-input>
                  </el-form-item>
									 <el-form-item label="是否可被打断:">
                    <el-select placeholder="请选择" v-model="touchAddData.is_interrupt">
                      <el-option label="可被打断"  value="1"></el-option>
                      <el-option label="不可被打断"  value="0"></el-option>
                    </el-select>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="touchAddSave">添加</el-button>
                  <el-button @click="touch.AddTouch = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
				 <!-- 触发词中左侧数据的编辑弹框 -->
        <div class="dial-header tag-dial">
          <el-dialog title="编辑" :visible.sync="touch.EditTouchLeft" :close-on-click-modal="false" v-move>
              <el-form label-width="90px">
								<el-form-item label="名称:">
                  <el-input style="width: 300px" type="textarea" :rows="4" v-model="touchEditDataLeft.name"></el-input>
                </el-form-item>
                  <el-form-item label="关键词:">
                      <el-input style="width: 300px" type="textarea" :rows="4" v-model="touchEditDataLeft.condition"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="touchEditSaveLeft">确认修改</el-button>
                  <el-button @click="touch.EditTouchLeft = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
        <!-- 触发词中右侧数据的编辑弹框 -->
        <div class="dial-header tag-dial">
          <el-dialog title="编辑" :visible.sync="touch.EditTouch" :close-on-click-modal="false" v-move>
              <el-form label-width="100px">
                  <el-form-item label="关键词">
                      <el-input style="width: 300px" type="textarea" :rows="4" v-model="touchEditData.condition"></el-input>
                  </el-form-item>
                  <el-form-item label="是否可被打断:">
                    <el-select placeholder="请选择" v-model="touchEditData.is_interrupt">
                      <el-option label="可被打断" value="1"></el-option>
                      <el-option label="不可被打断" value="0"></el-option>
                    </el-select>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="touchEditSave">确认修改</el-button>
                  <el-button @click="touch.EditTouch = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
         <!-- 语境设置里编辑弹框-->
         <div class="dial-header tag-dial">
          <el-dialog title="编辑" :visible.sync="context.EditContext">
            <el-form label-width="100px">
              <el-form-item label="触发类型:">
                <el-select placeholder="请选择" v-model="editContextData.type" disabled>
                  <el-option label="关键字触发" value=".content"></el-option>
                  <el-option label="直接跳转" value=".jump"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下个话术:">
                <el-select placeholder="请选择下个话术" v-model="editContextData.answer">
                  <el-option label="选择下个话术" value=""></el-option>
                  <el-option v-for="(item,index) in context.nextData" :label="item.show_name" :value="item.id" :key="index"></el-option>                         
                </el-select>
              </el-form-item>
              <el-form-item label="打断话术:">
                <el-select placeholder="请选择" v-model="editContextData.is_interrupt">
                  <el-option label="可被打断" value="1"></el-option>
                  <el-option label="不可被打断" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关键字设置:">
                <el-input type="textarea" v-model="editContextData.condition" :disabled="editContextData.isEdit == 0"> </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editContextSave">确认修改</el-button>
              <el-button @click="context.EditContext = false">关闭</el-button>
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
        template_id:"",      //点击话术方案带过来的id
				req_id:"",						//话术库中点击编辑获取到的每行的id
          curr:1,
          loading:false,
          init:{                //页面初始化时用到的参数
            page:1,
            page_size:15,
            total:0,
            keywords:"",
            InitData:[],
            textAudio:""
          },
          baseMessage:{         //添加基本信息用到数据
            Add:false, 
            Sound:[],      //添加基本信息是话术内容
            Edit:false      //编辑基本信息
          },
           baseMessage:{         //添加基本信息用到数据
            Add:false, 
            Sound:[],      //添加基本信息是话术内容
            Edit:false      //编辑基本信息
          },
          baseMessageData:{           //添加基本信息用到的参数
            show_name:"",
            is_interrupt:"1",
            type:"0",
            name:"",
            nextname:".null",
            max_repeat:"3",
            wait_time:'3',
            record:"",
            answer:"",
            compose_record:""     //组合方式内容
          },
          baseMessageDataEdit:{         //编辑基本信息用到的参数
            show_name:"",
            is_interrupt:"",
            type:"",
            name:"",
            nextname:"",
            wait_time:"",
            max_repeat:"",
            record:"",
            answer:"",
            record_description:"",
            compose_record:""     //组合方式内容
          },
          activeName2:'first',
					touchAddData:{
						condition:"",            //添加关键词
            name:"" ,                 //添加关键词
						is_interrupt:"1",          //添加中是否可被打断
					},
          touch:{                   //触发词中用到的参数
            touchShow:false,        //点击触发词出现的弹框
            EditTouch:false,        //点击触发词右侧数据编辑按钮出现的弹框
            EditTouchLeft:false,        //点击触发词左侧数据编辑按钮出现的弹框
            AddTouch:false,         //点击触发词中添加关键词出现的弹框
            Data:[],
            keyword:"",              //搜索
            DataRight:[],             //右侧数据
            total:0,
            page:1,
            page_size:10, 
            req_id:"",                //需要存起来的每一行的id
            levalData:[]             //等级
          },
					touchEditDataLeft:{      //点击触发词左侧数据编辑用到参数
            condition:"",
            name:""
          },
          touchEditData:{         //点击触发词右侧数据编辑用到的参数
            condition:"",
            is_interrupt:""
          },
          context:{              //语境设置中用到的参数
            EditContext:false,
            custom:true,         //自定义触发词
            ShowContext:false,   //点击语境设置时出现的弹框
            nextData:[],       //下个话术的数据
            touchData:[],     //触发词的数据
            Data:[],
            req_id:"",
            page:1,
            page_size:10,
            total:0,
          },
          contextData:{             //添加保存
            content_type:".content",
            is_interrupt:'1',
            nextId:"",
            condition:"0",
            newCondition:"",
          },
          editContextData:{},  //编辑

            // 添加语音节点
            audioList:[],      //添加语音节点的时候选择录音的数据列表
            add:{
              show:false,
              audio:""
            },
            edit:{
                show:false,
                addNext:false,
                title:false,
                audioList:[],     //编辑中的录音数据
                audio:""  ,        //编辑中的试听地址
                nextList:[],         //编辑中的下个节点数据
                addNextList:[]        //编辑中的添加新的下级节点中的数据
            },
            obj:[],
            target:"",
            ops:"",
            show:false
      }
		},
			activated(){
				this.getId() 
				this.initData()
			},
        beforeMount() {
					
				},
        methods: {
            index(val){
              return (this.init.page-1)*this.init.page_size+val+1
            },
            // 获取cookie
            getId(){
              this.template_id = this.$route.params&&this.$route.params.id
            },
            // 页面数据初始化
            initData(){
							this.getId()
              this.loading = true
              const template_id = this.template_id
              const page = this.init.page;
              const page_size = this.init.page_size
              const keywords = this.init.keywords
              const url = "/api/api_backend.php?r=template/req-ans-data-list"
              const conf = {
                url,
                data:{
                  template_id,
                  page,
                  page_size,
                  keywords
                },
                success:(data)=>{
                  this.loading = false
                  this.init.InitData = data.info.info
                  if(data.statusCode == 1){
                    this.init.total = parseInt(data.info.total);
                  }else{
                    this.init.total = 0;
                  }
                }
              }
               axiosRequest(conf)
            },
            // 页面搜索
            search(){
              this.loading = true
              this.init.page = "1"
              this.init.page_size = "15"
              this.curr = "1"
              this.initData()
            },
            handleSizeChange(val){
              this.init.page_size = val
              this.initData()
              document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop = 0
            },
            handleCurrentChange(val){
              this.init.page = val
              this.initData()
              document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop = 0
            },
            // 录音试听
            listen(index){
              this.init.textAudio = index
                if(document.getElementById("audioPlay").paused){
                    document.getElementById("audioPlay").play()
                }else{
                    document.getElementById("audioPlay").pause()
                }
            },
            // 编辑时获取数据
            editInit(index,row){
							this. activeName2 = 'first'
							this.req_id = row.id
              this.baseMessage.Edit = true
              this.getSoundContent()
              const url = "/api/api_backend.php?r=template/template-base-info"
              const conf = {
                  url,
                  data:{
                    template_id:this.template_id,
                    req_id:row.id
                  },
                  success:(data)=>{
                    this.baseMessageDataEdit = data.info
                    if( data.info.type == '0'){
                      this.baseMessageDataEdit.type = '0'
                    }else if(data.info.type == '1'){
                      this.baseMessageDataEdit.type = '1'
                    }
                  }
              }
               axiosRequest(conf)
            },
            // 保存编辑
            EditMessageSave(){ 
              if(!this.baseMessageDataEdit.max_repeat||!this.baseMessageDataEdit.wait_time){
                this.$alert("等待时长和可重复次数为必填")
              }else{
                var data = {}
                if(this.baseMessageDataEdit.record == '0'){
                  data.answer = this.baseMessageDataEdit.record_description
                }else{
                  data.answer = this.baseMessageDataEdit.answer
                }
                data.template_id = this.template_id
                data.req_id = this.baseMessageDataEdit.id
                data.show_name = this.baseMessageDataEdit.show_name
                data.is_interrupt = this.baseMessageDataEdit.is_interrupt
                data.type = this.baseMessageDataEdit.type
								if(this.baseMessageDataEdit.type == 0){
									data.name = ".question"
								}else {
									data.name = this.baseMessageDataEdit.name
								}
                data.nextname = this.baseMessageDataEdit.nextname
                data.max_repeat = this.baseMessageDataEdit.max_repeat
                data.wait_time = this.baseMessageDataEdit.wait_time
                data.record = this.baseMessageDataEdit.record
                data.compose_record = this.baseMessageDataEdit.compose_record
                const url = "/api/api_backend.php?r=template/template-base-info-edit"
                const conf = {
                  url,
                  data:data,
                  success:(data)=>{
                    this.$alert(data.message)
                    if(data.statusCode == 1){ 
                      this.baseMessage.Edit = false
                      this.initData()
                    }else{
                      this.baseMessage.Edit = true
                    }
                  }
                }
                 axiosRequest(conf)
                }
            },
            // 页面数据删除
            delInit(index,row){
              this.$confirm('确定删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const template_id = this.template_id
                  const req_id = row.id
                  const url = "/api/api_backend.php?r=template/template-base-info-delete"
                  const conf = {
                    url,
                    data:{
                      template_id,
                      req_id
                    },
                    success:(data)=>{
                      this.$alert(data.message)
                      this.initData()
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
            
            // 添加话术基本信息
            // 点击添加的时候请求接口获取话术内容
            getSoundContent(){
              const url = "/api/api_backend.php?r=template/sound-content"
              const conf = {
                url,
                data:{
                  template_id:this.template_id
                },
                success:(data)=>{
                  if(data.statusCode == 1){
                     this.baseMessage.Sound = data.info
                  }else{
                    this.baseMessage.Sound = []
                  }
                  this.baseMessage.Sound.push({id:"0",spath:"无录音,填写描述"})
                  this.baseMessage.Sound.unshift({id:"-100",spath:"组合录音"})
                }
              }
               axiosRequest(conf)
            },
            // 获取主线序列
            getMainLine(){
              const conf = {
                url:"/api/api_backend.php?r=template/max-main-line",
                data:{
                  template_id:this.template_id
                },
                success:(data)=>{
                  this.baseMessageData.name = data.info
                  this.baseMessageDataEdit.name = data.info
                  if(!this.baseMessageData.show_name.trim()){
                    this.baseMessageData.show_name = '主线'+data.info
                  }
                }
              }
               axiosRequest(conf)
            },
            changeType(val){
              if(val == 1){
                this.getMainLine()
              }
            },
            //改变话术内容 
            changeSoundWord(val){
             const x =  this.baseMessage.Sound.filter((item)=>{
                if(item.id == val){
                  return item
                }
              })
              this.baseMessageData.answer = x.map(item=>{
                return item.word
              })
              this.baseMessageDataEdit.answer = x.map(item=>{
                return item.word
              })
            },
            addMessage(){
              this.baseMessage.Add = true
              this.baseMessageData.show_name = ""
              this.baseMessageData.is_interrupt = "1"
              this.baseMessageData.type = "0"
              this.baseMessageData.name = ""
              this.baseMessageData.nextname = ".null"
              this.baseMessageData.max_repeat = "3"
              this.baseMessageData.wait_time = "3"
              this.baseMessageData.record = ""
              this.baseMessageData.answer = ""
              this.getSoundContent()
            },
            // 确认保存添加基本信息
            AddMessageSave(){
              if(!this.baseMessageData.max_repeat||!this.baseMessageData.wait_time){
                this.$alert("等待时长和可重复次数为必填")
              }else{
                const data = this.baseMessageData
								if(this.baseMessageData.type == 0){
									data.name = ".question"
								}
                data.template_id = this.template_id
                const url = "/api/api_backend.php?r=template/template-base-info-add"
                const conf = {
                  url,
                  data:data,
                  success:(data)=>{
                    if(data.statusCode == 1){
                        this.baseMessage.Add = false
                        this.initData() 
                        this.$alert(data.message)
                      }else{
                        this.baseMessage.Add = true
                        this.$message({
                          showClose: true,
                          message: data.message,
                          duration:5000,
                          type: 'error'
                        });
                      }
                  }
                }
                 axiosRequest(conf)
                }
            },
						handleClick(tab, event) {
                if(tab.index == 1){     //触发词
                    this.touch.req_id = this.req_id
                    this.touch.keyword = ""
                    this.touchInit()                //左侧数据
                    this.touchDataRight()     //右侧数据
                }else if(tab.index == 2){     //语境设置
                    this.contextData.req_id = this.req_id
                    this.contextTouch()
                    this.contextNext()
                    this.contextInit()
                }
            },
            // 点击触发词请求到的数据(左侧)
            touchInit(){
              const url = "/api/api_backend.php?r=template/trigger-usable-list"
              const conf = {
                url,
                data:{
                 template_id : this.template_id
                },
                success:(data)=>{
                  this.touch.Data = data.info
                }
              }
               axiosRequest(conf)
            },
						// 触发词左侧数据双击进行编辑
						dblclickTouchEdit(row,event){
							this.touch.EditTouchLeft = true;
							const url = "/api/api_backend.php?r=template/trigger-info"
							const conf = {
								url,
								data:{
									template_id:this.template_id,
									trigger_id:row.id
								},
								success:(data)=>{
									this.touchEditDataLeft = data.info
								}
							}
							axiosRequest(conf)
						},
						//  触发词左侧数据编辑保存
						touchEditSaveLeft(){
							const url = "/api/api_backend.php?r=template/trigger-edit"
							const conf = {
								url,
								data:{
									template_id:this.template_id,
									name:this.touchEditDataLeft.name,
									condition:this.touchEditDataLeft.condition,
									trigger_id:this.touchEditDataLeft.id
								},
								success:(data)=>{
									this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.touch.EditTouchLeft = false
                    this.touchInit()
                  }else{
                    this.touch.EditTouchLeft = true
                  }
								}
							}
							axiosRequest(conf)
						},
            // 触发词中搜索
            touchSearch(){
              const url = "/api/api_backend.php?r=template/trigger-search"
              const conf = {
                url,
                data:{
                 template_id : this.template_id,
                 keywords:this.touch.keyword
                },
                success:(data)=>{
                  if(data.statusCode == 1){
                    this.touch.Data = data.info
                  }else{
                    this.$alert(data.message)
                  }
                }
              }
               axiosRequest(conf)
            },
            // 触发词中添加关键词
            touchAdd (){
              this.touch.AddTouch = true
              this.touchAddData.condition = ""
              this.touchAddData.name = ""
              this.touchAddData.is_interrupt = "1"
            },
            touchAddSave(){
							const data = this.touchAddData
							data.template_id = this.template_id
              const url = "/api/api_backend.php?r=template/trigger-add"
              const conf = {
                url,
                data:data,
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.touchInit()
                    this.touch.AddTouch = false
                  }else{
                    this.touch.AddTouch = true
                  }
                }
              }
               axiosRequest(conf)
            },
            // 左侧点击+号
            touchLeftPlus(index,row){
              const url = "/api/api_backend.php?r=template/req-ans-trigger-add"
              const conf = {
                url,
                data:{
                  template_id : this.template_id,
                  req_id:this.req_id,
                  trigger_id:row.id,
                },
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.touchDataRight()
                    this.initData()
                    this.touchInit()
                  }
                }
              }
               axiosRequest(conf)
            },
            // 触发词中请求到的数据(右侧)
            touchDataRight(){
              const url = "/api/api_backend.php?r=template/req-ans-trigger-list"
              const page = this.touch.page
              const page_size = this.touch.page_size
              const conf = {
                url,
                data:{
                  template_id:this.template_id,
                  req_id:this.req_id,
                  page:page,
                  page_size:page_size
                },
                success:(data)=>{
                  if(data.statusCode == 1){
                    this.touch.total = parseInt(data.info.total)
                  }else{
                    this.touch.total = 0
                  }
                  this.touch.DataRight = data.info.info
                }
              }
               axiosRequest(conf)
            },
            //分页
            handleSizeChangeTouch(val){
              this.touch.page_size = val
              this.touchDataRight()
            },
            handleCurrentChangeTouch(val){
              this.touch.page = val
              this.touchDataRight()
            },
            // 右侧数据编辑
            touchEdit(index,row){
              this.touch.EditTouch = true
							this.touchEditData = row
            },
            // 编辑保存
            touchEditSave(){
              const url = "/api/api_backend.php?r=template/req-ans-trigger-edit"
              const conf = {
                url,
                data:{
									template_id:this.template_id,
									req_id :this.req_id,
									trigger_id : this.touchEditData.id,
									is_interrupt :this.touchEditData.is_interrupt,
									condition:this.touchEditData.condition
								},
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.touch.EditTouch = false
                    this.touchDataRight()
                  }else{
                    this.touch.EditTouch = true
                  }
                }
              }
               axiosRequest(conf)
            },  
            // 右侧数据删除
            touchEdl(index,row){
              this.$confirm('确定删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const url = "/api/api_backend.php?r=template/req-ans-trigger-delete"
                  const conf = {
                    url,
                    data:{
                      template_id : this.template_id,
											req_id:this.req_id,
                      trigger_id:row.id
                    },
                    success:(data)=>{
                      this.$alert(data.message)
                      if(data.statusCode == 1){
                        this.touchDataRight()
												this.touchInit()
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

            // 点击语境设置
            // 获取下个话术列表
            contextNext(){
              const url = "/api/api_backend.php?r=template/content-next-list"
              const conf = {
                url,
                data:{
                  template_id : this.template_id,
									req_id:this.req_id
                },
                success:(data)=>{
                  this.context.nextData = data.info
                }
              }
               axiosRequest(conf)
            },
            // 获取触发词列表
            contextTouch(){
              const url = "/api/api_backend.php?r=template/content-common-type-list"
              const conf = {
                url,
                data:{
                  template_id : this.template_id,
                  req_id:this.req_id
                },
                success:(data)=>{
                  this.context.touchData = data.info
                  this.context.touchData.unshift({condition:"自定义触发词",name:"0"})
                }
              }
               axiosRequest(conf)
            },
            // 可手动输入触发词
            changeTouchInput(val){
              if(val == '0'){
                this.context.custom = true
              }else{
                this.context.custom = false
              }
            } ,    
            //  保存
            contextSave(){
              const data = this.contextData
              data.template_id = this.template_id
              data.req_id = this.req_id
              const url = "/api/api_backend.php?r=template/content-add"
              const conf = {
                url,
                data:data,
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.contextInit()
										this.contextTouch()
                    this.contextData.content_type = ".content"
                    this.contextData.is_interrupt = '1'
                    this.contextData.nextId = ""
                    this.contextData.condition = "0"
                    this.contextData.newCondition = ""
                    this.context.custom = true
                  }
                }
              }
               axiosRequest(conf)
            },
            // 右侧数据列表
            contextInit(){
              const url = "/api/api_backend.php?r=template/content-list"
              const page = this.context.page
              const page_size = this.context.page_size
              const conf = {
                url,
                data:{
                  template_id : this.template_id,
                  req_id:this.req_id,
                  page:page,
                  page_size:page_size
                },
                success:(data)=>{
                  if(data.statusCode == 1){
                    this.context.Data = data.info.info
                    this.context.total = parseInt(data.info.total)
                  }else{
                    this.context.Data = []
                    this.context.total = 0
                  }
                }
              }
               axiosRequest(conf)
            },
            // 分页
            handleCurrentChangeContext(val){
              this.context.page = val
              this.contextInit(this.contextData.req_id)
            },
            // 编辑
            editContext(index,row){
              this.context.EditContext = true
              const url = "/api/api_backend.php?r=template/content-info"
              const conf = {
                url,
                data:{
                  template_id : this.template_id,
									req_id:this.req_id,
                  content_id:row.id
                },
                success:(data)=>{
                  this.editContextData = data.info
                }
              }
               axiosRequest(conf)
            },
            // 保存编辑
            editContextSave(){
              const url = "/api/api_backend.php?r=template/content-edit"
              const conf = {
                url,
                data:{
                  template_id:this.template_id,
                  req_id:this.req_id,
									content_id:this.editContextData.id,
                  content_type: this.editContextData.type,
                  nextId: this.editContextData.answer,
                  is_interrupt: this.editContextData.is_interrupt,
									newCondition:this.editContextData.newCondition,
                  condition:this.editContextData.condition
                },
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.context.EditContext = false
                    this.contextInit(this.contextData.req_id)
                  }else{
                    this.context.EditContext = true
                  }
                }
              }
               axiosRequest(conf)
            },
            // 删除
            delContext(index,row){
              this.$confirm('确定删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const url = "/api/api_backend.php?r=template/content-delete"
                  const conf = {
                    url,
                    data:{
                      template_id:this.template_id,
                      id:row.id
                    },
                    success:(data)=>{
                      this.$alert(data.message)
                      if(data.statusCode == 1){
                        this.contextInit()
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
            }
        },
	}

</script>
<style lang="scss">
  .over .el-dialog__body{overflow:hidden;}
  .el-select-dropdown__item{width:215px;}
  .padding .el-dialog__body{padding:10px 60px;}
  .width{width:260px}
	.TableList .el-table .el-table_1_column_2 >.cell{text-align:left;}
	.TableList .el-table .el-table__row td:nth-of-type(2) .cell{text-align:left}
</style>