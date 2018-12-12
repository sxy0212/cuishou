<template>
    <div>
        <div class="info">
            <h3>个人信息</h3>
            <div class="redS"><span><el-button type="primary" @click="totalCaseFn" size="mini">（有{{selfInfo.case_total}}条共案）</el-button></span><span>案件等级：{{selfInfo.case_level}}</span><span><el-button type="primary" @click="callFn" size="mini">修改等级</el-button></span></div>
            <div><span>证件号码：{{selfInfo.case_id_num}}  </span><span>联系方式：{{selfInfo.case_gender}}</span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span><span>家庭住址：{{selfInfo.case_home_address}}  </span><span><el-button type="success" @click="callFn" size="mini">信函</el-button></span><span><el-button type="danger" @click="callFn" size="mini">外访</el-button></span></div>
            <div><span>工作单位：{{selfInfo.case_organization_name}}  </span><span>公司电话：{{selfInfo.case_work_phone}}</span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span><span>公司地址：{{selfInfo.case_work_address}}  </span><span><el-button type="success" @click="callFn" size="mini">信函</el-button></span><span><el-button type="danger" @click="callFn" size="mini">外访</el-button></span></div>
            <div><span>第一联系人：{{selfInfo.case_mobile1}}  </span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span><span>第二联系人：{{selfInfo.case_mobile2}}  </span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span></div>
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
    </div>
</template>
<script>
import tableCaseDetail from '@/functions/tableCollection/tableCaseDetail.vue'
import tableCaseSecond from '@/functions/tableCollection/tableCaseSecond.vue'
import formCaseDetail from '@/functions/formCollection/formCaseDetail.vue'
import addCheckDialog from '@/functions/editDialog/addCheckDialog.vue'
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
        'second-table':tableCaseSecond
    },
    activated(){
        this.id = this.$route.query.id
		this.init()
	},
    created(){
        // this.init()
    },
    data(){
        return {
            otherInfo:false,//其他信息
            selfInfo:{//个人信息

            },
            id:'',//具体某个案件
            checkNow:false,//查看通话记录
            id_num:0,//证件号码
            tel_num:0,// 联系方式：
            address:'闵行',// 家庭住址：
            work:'公务员',//工作单位：
            company_num:'789',//公司电话：
            company_address:'浦东',//公司地址：
            first_contact:'miin',//第一联系人：
            second_contact:'hii',//第二联系人：
            money_num:'50',//委案金额：
            pay_num:'50',//还款金额：
            client:'50',//委托方：
            out_day:'50',//逾期账龄：
            interest:'50',//利息：
            out_date:'50',//退案日期：
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
                    money:'20'
                }
            ],
            formTitle:{//其他详细信息

            },
            conditionList:[],//关系列表
            endList:[],//结果列表
            nextList:[],//下次跟进
        }
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
        callFn(){//呼叫

        },
        saveFn(){//保存

        },
        clearFn(){//清空

        },
        checkFn(){//查看

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
</style>


