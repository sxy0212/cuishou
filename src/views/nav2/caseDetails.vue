<template>
    <div>
        <div class="info">
            <h3>个人信息</h3>
            <div class="redS"><span>案件序列号：{{selfInfo.case_code}}</span><span><el-button type="primary" @click="totalCaseFn" size="mini">（有{{selfInfo.case_total}}条共案）</el-button></span><span>案件等级：{{selfInfo.case_level}}</span><span><el-button type="primary" @click="changeLevelFn" size="mini">修改等级</el-button></span></div>
            <div><span>证件号码：{{selfInfo.case_id_num}}  </span><span>联系方式：{{selfInfo.case_mobile}}</span><span><el-button  type="primary" @click="callFn(selfInfo.case_mobile,'本人')" size="mini">呼叫</el-button></span><span>家庭住址：{{selfInfo.case_home_address}}  </span><span><el-button  type="success" @click="sendLetter(2,selfInfo.case_mobile,'本人')" size="mini">信函</el-button></span><span><el-button  type="danger" @click="sendLetter(3,selfInfo.case_mobile,'本人')" size="mini">外访</el-button></span></div>
            <div><span>工作单位：{{selfInfo.case_organization_name}}  </span><span>公司电话：{{selfInfo.case_work_phone}}</span><span><el-button  type="primary" @click="callFn(selfInfo.case_work_phone,'公司')" size="mini">呼叫</el-button></span><span>公司地址：{{selfInfo.case_work_address}}  </span><span><el-button  type="success" @click="sendLetter(2,selfInfo.case_work_phone,'公司')" size="mini">信函</el-button></span><span><el-button  type="danger" @click="sendLetter(3,selfInfo.case_work_phone,'公司')" size="mini">外访</el-button></span></div>
            <div><span>第一联系人：{{selfInfo.case_mobile1}}  </span><span><el-button  type="primary" @click="callFn(selfInfo.case_mobile1,'第一联系人')" size="mini">呼叫</el-button></span><span>第二联系人：{{selfInfo.case_mobile2}}  </span><span><el-button type="primary" @click="callFn(selfInfo.case_mobile2,'第二联系人')" size="mini">呼叫</el-button></span></div>
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
                        :relationList='relationList'
                        :endList='endList'
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
                        v-on:addRemarkFn='addRemarkFn($event)'
                    ></second-table>
                </div>
            </div>
        </div>
        <div class="coverDialog">
            <el-dialog title="" :visible.sync="checkNow" >
                <check-dialog
                    :audioData='audioData'
                    :detail='detail'
                ></check-dialog>
            </el-dialog>
        </div>
        <el-dialog title="修改等级" :visible.sync="changeLevel" >
            <change-dialog
                :levelList='levelList'
                :formLevel='formLevel'
                v-on:protectFn='saveLevelFn($event)'
                v-on:cancelFn='cancelChangeLevel($event)'
            ></change-dialog>
        </el-dialog>
        <el-dialog :title="remarkTitle" :visible.sync="remarkShow" >
            <remark-dialog
                :formRemark='formRemark'
                :remarkLabel='remarkLabel'
                v-on:protectFn='sendInfoSave($event)'
                v-on:cancelFn='cancelInfoSave($event)'
            ></remark-dialog>
        </el-dialog>
    </div>
</template>
<script>
import tableCaseDetail from '@/functions/tableCollection/tableCaseDetail.vue'
import tableCaseSecond from '@/functions/tableCollection/tableCaseSecond.vue'
import formCaseDetail from '@/functions/formCollection/formCaseDetail.vue'
import addCheckDialog from '@/functions/editDialog/addCheckDialog.vue'
import addRemark from '@/functions/editDialog/addRemark.vue'
import addChangeLevel from '@/functions/editDialog/addChangeLevel.vue'
import divOther from '@/functions/normalDiv/divOther.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import '@/assets/css/dialog.css'

export default {
    name:'caseDetails',
    components:{
        'div-table':tableCaseDetail,
        'div-form':formCaseDetail,
        'check-dialog':addCheckDialog,
        'div-other':divOther,
        'change-dialog':addChangeLevel,
        'remark-dialog':addRemark,
        'second-table':tableCaseSecond
    },
    data(){
        return {
            remarkTitle:'',
            changeLevel:false,//修改 等级
            levelList:[],//等级列表
            formLevel:{//等级信息
                case_level:''
            },
            remarkShow:false,//
            formRemark:{
                remark:''
            },
            audioData:[//录音内容
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
                    "user": "1",                                                        //对象(0:言小通,1:客户)
                    "uniqueid": "6_7600109_331a9fc78f474ac9e9254567295bff98",           //唯一标识id
                    "create_time": "2018-09-9 01:21:19",                               //创建时间
                    "path": ""                                                          //语音全路径
                },
            ],
            detail:{//录音详情
            },
            otherInfo:false,//其他信息
            selfInfo:{//个人信息
            },
            id:'',//具体某个案件
            checkNow:false,//查看通话记录
            middleCaseRecord:[],//暂存列表
            caseRecord:[//个人信息列表
            ],
            tableSecond:[//催收记录
            ],
            formTitle:{//手动录入详细信息
            },
            relationList:[
                {
                    name:'父亲',
                    value:'1'
                },
                {
                    name:'母亲',
                    value:'2'
                },
                {
                    name:'家人',
                    value:'3'
                },
                {
                    name:'配偶',
                    value:'4'
                },
                {
                    name:'朋友',
                    value:'5'
                },
                {
                    name:'亲戚',
                    value:'6'
                },
                {
                    name:'上司或老板',
                    value:'7'
                },
                {
                    name:'同事',
                    value:'8'
                },
                {
                    name:'同学',
                    value:'9'
                }
            ],//关系列表
            endList:[
                {
                    name:'查询还款',
                    value:'1'
                },
                {
                    name:'电话拒接',
                    value:'2'
                },
                {
                    name:'电话易主',
                    value:'3'
                },
                {
                    name:'空号',
                    value:'4'
                },
                {
                    name:'停机',
                    value:'5'
                },
                {
                    name:'网络查找',
                    value:'6'
                },
                {
                    name:'无法接通',
                    value:'7'
                },
                {
                    name:'无力偿还',
                    value:'8'
                },
                {
                    name:'无效电话',
                    value:'9'
                },
                {
                    name:'已还款',
                    value:'10'
                },
                {
                    name:'语音信箱',
                    value:'11'
                }
            ],
            remarkLabel:'',//备注名称
        }
    },
    activated(){
        this.id = this.$route.query.id
        this.init()
        this.getTableSecond()
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
        getTableSecond(){//获取催收记录
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/collection-record-list',
                data:{
                    case_id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.tableSecond = data.info
                    }
                }
            }
            axiosRequest(conf)
        },
        callFn(phone,relation){//呼叫
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/call-out',
                data:{
                    phone:phone,
                    case_id:this.id,
                    relation:relation
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.getTableSecond()
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
        sendLetter(type,phone,whichOne){//信函
            this.remarkTitle = '新增记录'
            this.remarkShow= true
            this.remarkLabel = '备注'
            this.formRemark = {
                type:type,
                phone:phone,
                remark:'',
                relation:whichOne
            }
        },
        saveFn(){//保存
            this.formTitle.case_id = this.id
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/add-collection-record',
                data:this.formTitle,
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.formTitle = {}
                        this.getTableSecond()
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
        clearFn(){//清空
            this.formTitle = {

            }
        },
        checkFn(column){//查看
            this.checkNow = true
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/look-over',
                data:{
                    id:column.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.audioData = data.info.info
                        this.detail = data.info.call_record
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
        sendInfoSave(){//备注修改或是新增记录
            if( this.remarkTitle == '新增记录'){
                this.formRemark.case_id = this.id
                let conf = {
                    url : '/api/api_backend.php?r=asrcall-case-batch-data/letter-and-outbound',
                    data:this.formRemark,
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.remarkShow = false
                            this.formRemark = {
                                remark:''
                            }
                            this.getTableSecond()
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
            }else if( this.remarkTitle == '修改备注' ){
                let conf = {
                    url : '/api/api_backend.php?r=asrcall-case-batch-data/edit-remark',
                    data:this.formRemark,
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.formRemark = {}
                            this.remarkTitle = ''
                            this.remarkLabel =''
                            this.remarkShow = false 
                            this.getTableSecond()
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
            }
            
        },
        cancelInfoSave(){
            this.remarkShow = false
        },
        cancelChangeLevel(){//取消
            this.changeLevel = false
        },
        addRemarkFn(row){
            this.remarkTitle = '修改备注'
            this.remarkShow = true
            this.remarkLabel ='修改备注'
            this.formRemark = {
                remark:row.remark,
                id:row.id
            }
            
        }
    }
}
</script>



