<template>
    <div>
        <div class="info">
            <h3>个人信息</h3>
            <div><span>案件id:{{id_num}}  </span><span>（有{{tel_num}}共案）</span><span>案件等级：{{tel_num}}</span><span><el-button type="primary" @click="callFn" size="mini">修改等级</el-button></span></div>
            <div><span>证件号码：{{id_num}}  </span><span>联系方式：{{tel_num}}</span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span><span>家庭住址：{{address}}  </span><span><el-button type="primary" @click="callFn" size="mini">信函</el-button></span><span><el-button type="primary" @click="callFn" size="mini">外访</el-button></span></div>
            <div><span>工作单位：{{work}}  </span><span>公司电话：{{company_num}}</span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span></div>
            <div><span>公司地址：{{company_address}}  </span><span><el-button type="primary" @click="callFn" size="mini">信函</el-button></span><span><el-button type="primary" @click="callFn" size="mini">外访</el-button></span></div>
            <div><span>第一联系人：{{first_contact}}  </span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span></div>
            <div><span>第二联系人：{{first_contact}}  </span><span><el-button type="primary" @click="callFn" size="mini">呼叫</el-button></span></div>
        </div>
        <div class="info">
            <h3>案件信息</h3>
            <div><span>委案金额：{{money_num}}  </span><span>还款金额：{{pay_num}}  </span></div>
            <div><span>委托方：{{client}}  </span><span>逾期账龄：{{out_day}}  </span><span>利息：{{interest}}}  </span><span>退案日期：{{out_date}}  </span></div>
        </div>
        <div class="tableCover">
            <div-table
                :tableData='tableData'
            ></div-table>
        </div>
        <div class="info">
            <h3>其他信息</h3>
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
                    ></second-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import tableCaseDetail from '@/functions/tableCollection/tableCaseDetail.vue'
import tableCaseSecond from '@/functions/tableCollection/tableCaseSecond.vue'
import formCaseDetail from '@/functions/formCollection/formCaseDetail.vue'
export default {
    name:'caseDetails',
    components:{
        'div-table':tableCaseDetail,
        'div-form':formCaseDetail,
        'second-table':tableCaseSecond
    },
    data(){
        return {
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
            tableData:[//个人信息
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

        },
        callFn(){//呼叫

        },
        saveFn(){//保存

        },
        clearFn(){//清空

        }
    }
}
</script>
<style>
.info h3{margin-left:10px;font-size:18px;font-weight:400;}
.info span{margin-left:10px;}
.el-button span{margin-left:0;}
.info{ padding:10px 0; font-size:14px;background-color:rgba(0, 204, 255, 0.0980392156862745);}
.coverMiddle{display:flex;}
.coverMiddle .middle:nth-of-type(1){flex:1}
.coverMiddle .middle:nth-of-type(2){flex:2}
.tableCover{margin: 15px 0;}
</style>


