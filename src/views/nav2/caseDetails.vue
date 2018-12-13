<template>
    <div>
        <div class="info">
            <h3>个人信息</h3>
            <div class="redS"><span><el-button type="primary" @click="totalCaseFn" size="mini">（有{{selfInfo.case_total}}条共案）</el-button></span><span>案件等级：{{selfInfo.case_level}}</span><span><el-button type="primary" @click="changeLevelFn" size="mini">修改等级</el-button></span></div>
            <div><span>证件号码：{{selfInfo.case_id_num}}  </span><span>联系方式：{{selfInfo.case_mobile}}</span><span><el-button type="primary" @click="callFn(selfInfo.case_mobile)" size="mini">呼叫</el-button></span><span>家庭住址：{{selfInfo.case_home_address}}  </span><span><el-button type="success" @click="sendLetter(2,selfInfo.case_mobile)" size="mini">信函</el-button></span><span><el-button type="danger" @click="sendLetter(3)" size="mini">外访</el-button></span></div>
            <div><span>工作单位：{{selfInfo.case_organization_name}}  </span><span>公司电话：{{selfInfo.case_work_phone}}</span><span><el-button type="primary" @click="callFn(selfInfo.case_work_phone)" size="mini">呼叫</el-button></span><span>公司地址：{{selfInfo.case_work_address}}  </span><span><el-button type="success" @click="sendLetter(2)" size="mini">信函</el-button></span><span><el-button type="danger" @click="sendLetter(3)" size="mini">外访</el-button></span></div>
            <div><span>第一联系人：{{selfInfo.case_mobile1}}  </span><span><el-button type="primary" @click="callFn(selfInfo.case_mobile1)" size="mini">呼叫</el-button></span><span>第二联系人：{{selfInfo.case_mobile2}}  </span><span><el-button type="primary" @click="callFn(selfInfo.case_mobile2)" size="mini">呼叫</el-button></span></div>
        </div>
        <div class="info">
            <h3>案件信息</h3>
            <div><span>委案金额：{{selfInfo.case_money}}  </span><span>还款金额：{{selfInfo.case_paid}}  </span><span>委托方：{{selfInfo.client}}  </span><span>逾期账龄：{{selfInfo.case_exceed_limit}}  </span><span>利息：{{selfInfo.case_interest}}  </span><span>退案日期：{{selfInfo.case_back_date}}  </span></div>
        </div>
        <div class="tableCover">
            <div-table
                :tableData='caseRecord'
                v-on:doubleClickFn='doubleClickFn($event)'
            ></div-table>
        </div>
        <div class='info otherI'>
            <h3>其他信息<span><el-button v-show='!otherInfo' type="primary" @click="callOtherInfo(true)" size="mini">展开</el-button><el-button type="primary" v-show='otherInfo' @click="callOtherInfo(false)" size="mini">关闭</el-button></span></h3>
            <div-other
                :audioData='audioData'
                :selfInfo='selfInfo'
                v-show='otherInfo'
            >
            </div-other>
        </div>
        <div class="info">
            <div class="coverMiddle">
                <div class='middle'>
                    <div-form
                        :formTitle='formTitle'
                        :nextList='nextList'
                        :endList='endList'
                        :conditionList='conditionList'
                    ></div-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveFn" size="mini">保存</el-button>
                        <el-button type="info" @click="clearFn" size="mini">清空</el-button>
                    </div>
                </div>
                <div class='middle'>
                    <second-table
                        :tableSecond='tableSecond'
                        v-on:checkFn='checkFn($event)'
                    ></second-table>
                </div>
            </div>
        </div>
        <el-dialog title="" :visible.sync="checkNow" >
            <check-dialog
            ></check-dialog>
        </el-dialog>
        <el-dialog title="修改等级" :visible.sync="changeLevel" >
            <change-dialog
                :levelList='levelList'
                :formLevel='formLevel'
                v-on:protectFn='saveLevelFn($event)'
                v-on:cancelFn='cancelChangeLevel($event)'
            ></change-dialog>
        </el-dialog>
    </div>
</template>
<script>
import tableCaseDetail from '@/functions/tableCollection/tableCaseDetail.vue'
import tableCaseSecond from '@/functions/tableCollection/tableCaseSecond.vue'
import formCaseDetail from '@/functions/formCollection/formCaseDetail.vue'
import addCheckDialog from '@/functions/editDialog/addCheckDialog.vue'
import addChangeLevel from '@/functions/editDialog/addChangeLevel.vue'
import divOther from '@/functions/normalDiv/divOther.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'

export default {
    name:'caseDetails',
    components:{
        'div-table':tableCaseDetail,
        'div-form':formCaseDetail,
        'check-dialog':addCheckDialog,
        'div-other':divOther,
        'change-dialog':addChangeLevel,
        'second-table':tableCaseSecond
    },
    data(){
        return {
            changeLevel:false,//修改 等级
            levelList:[],//等级列表
            formLevel:{//等级信息
                case_level:''
            },
            audioData:[
                {
                    "msg": "喂，您好！（两秒空音）",                                     //语音内容
                    "record": "/home/robot_sound_ai23/root23199_lisuijiahui/A1.wav",    //语音路径
                    "user": "0",                                                        //对象(0:言小通,1:客户)
                    "uniqueid": "6_7600109_331a9fc78f474ac9e9254567295bffb8",           //唯一标识id
                    "create_time": "2018-09-11 01:21:19",                               //创建时间
                    "path": ""                                                          //语音全路径
                },
                {
                    "msg": "状态（两秒空音）",                                     //语音内容
                    "record": "/home/robot_sound_ai23/root23199_lisuijiahui/A1.wav",    //语音路径
                    "user": "0",                                                        //对象(0:言小通,1:客户)
                    "uniqueid": "6_7600109_331a9fc78f474ac9e9254567295bff98",           //唯一标识id
                    "create_time": "2018-09-9 01:21:19",                               //创建时间
                    "path": ""                                                          //语音全路径
                },
            ],
            otherInfo:false,//其他信息
            selfInfo:{//个人信息

            },
            id:'',//具体某个案件
            checkNow:false,//查看通话记录
            middleCaseRecord:[],//暂存列表
            caseRecord:[//个人信息列表
                {
                    name:'hah',
                    money:'20'
                }
            ],
            tableSecond:[//催收记录
                {
                    name:'hah',
                    money:'20',
                    id:'334'
                }
            ],
            formTitle:{//其他详细信息

            },
            conditionList:[],//关系列表
            endList:[],//结果列表
            nextList:[],//下次跟进
        }
    },
    activated(){
        this.id = this.$route.query.id
		this.init()
	},
    methods:{
        init(){
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/case-info',
                data:{
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.selfInfo = data.info.selfInfo
                        this.middleCaseRecord = data.info.caseRecord
                        this.caseRecord = [{
                            "id": data.info.selfInfo.id,                           //案件编号id       
                            "case_name": data.info.selfInfo.case_name,                  //姓名
                            "case_money": data.info.selfInfo.case_money,                  //委案金额
                            "case_currency": data.info.selfInfo.case_currency,             //币种
                            "case_paid": data.info.selfInfo.case_paid,                     //已还金额
                            "case_exceed_limit": data.info.selfInfo.case_exceed_limit,              //逾期账龄
                            "last_call": data.info.selfInfo.last_call,                      //上次通话时间
                            "call_times": data.info.selfInfo.call_times   
                        }]
                    }
                }
            }
            axiosRequest(conf)
        },
        callFn(phone){//呼叫
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/call-out',
                data:{
                    phone:phone,
                    case_id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if(data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        sendLetter(num,phone){//信函
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/letter-and-outbound',
                data:{
                    case_id: this.id,
                    type:num,
                    phone:phone
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if(data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        saveFn(){//保存

        },
        clearFn(){//清空

        },
        checkFn(column){//查看
            console.log(column)
            this.checkNow = true
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/look-over',
                data:{
                    id:column.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        
                    }
                }
            }
            axiosRequest(conf)
        },
        totalCaseFn(){//所有共案
            this.caseRecord = this.caseRecord.concat(this.middleCaseRecord )
        },
        doubleClickFn(id){
            this.id = id
            this.init()
        },
        callOtherInfo(val){//展开或关闭其他信息
            this.otherInfo = val
        },
        changeLevelFn(){//修改等级
            this.changeLevel = true
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/level-list',
                data:{
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.levelList = data.info
                        data.info.forEach(item=>{
                            if( item.is_selected == 1 ){
                                this.formLevel.case_level = item.id
                            }
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        saveLevelFn(){//提交更改
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/edit-level',
                data:{
                    case_level:this.formLevel.case_level,
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.changeLevel = false
                        this.formLevel = {
                            case_level:''
                        }
                        this.init()
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if( data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 2 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        cancelChangeLevel(){//取消
            this.changeLevel = false
        }
    }
}
</script>
<style>
.info div{line-height:30px;}
.info h3{margin-left:10px;font-size:18px;font-weight:400;}
.info span{margin-left:10px;}
.el-button span{margin-left:0;}
.info{ padding:10px 0; font-size:14px;background-color:rgba(0, 204, 255, 0.0980392156862745);}
.coverMiddle{display:flex;}
.coverMiddle .middle:nth-of-type(1){flex:1}
.coverMiddle .middle:nth-of-type(2){flex:2}
.tableCover{margin: 15px 0;}
.redS{color:red;}
.el-button--mini, .el-button--mini.is-round{padding:4px 15px;}
.middle{margin:0 10px;}
.el-form--inline .el-form-item{margin-right:0;}
.el-form-item{margin-bottom:10px;}
.otherI{margin-bottom:15px;}
.el-date-editor span{margin-left:0;}
</style>


