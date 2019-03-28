<template>
    <div>
        <div class="info infoCss">
            <h3>
                <span></span>
                个人信息 
            </h3>
            <div class="coverU">
                <ul class="info_ul">
                    <li>
                        <div>案件序列号：<span class="colorFul">{{selfInfo.case_code}}</span></div>
                        <div>
                            <el-button type="warning" round plain @click="totalCaseFn('total')" size="mini">（有{{selfInfo.case_total}}条共案）</el-button>
                        </div>
                     </li>
                    <li>
                        <div>案件等级：<span  class="colorFul">{{selfInfo.case_level}}</span></div>
                        <div> 
                            <el-button type="warning"  round v-show="selfInfo.case_status!='3'" @click="changeLevelFn" size="mini">修改等级</el-button>
                            <el-button type="warning" plain round size="mini" @click="caseLog">案件日志</el-button>
                            <el-button type="warning" plain round size="mini" @click="caseMemorandum">案件备忘录</el-button>
                        </div>
                    </li>
                </ul>
                <ul class="info_ul">
                    <li>
                        <div>证件号码：<span class="deepColor">{{selfInfo.case_id_num}}</span></div>
                        <div>
                            工作单位： <span class="deepColor">{{selfInfo.case_organization_name}}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            公司电话：<span class="deepColor">{{selfInfo.case_work_phone}}</span>
                            <el-button type="primary" round v-show="(selfInfo.case_status!='3')&&selfInfo.case_work_phone"  @click="callFn(selfInfo.case_work_phone,'公司')" size='mini'>呼叫</el-button>
                        </div>
                        <div>
                            联系方式：<span class="deepColor">{{selfInfo.case_mobile}}</span>
                            <el-button type="primary" round v-show="(selfInfo.case_status!='3')&&selfInfo.case_mobile" @click="callFn(selfInfo.case_mobile,'本人')" size='mini'>呼叫</el-button>
                        </div>
                    </li>
                    <li>
                        <div>
                            第一联系人:<span class="deepColor">{{selfInfo.case_mobile1}} </span>
                            <el-button type="primary" round v-show="(selfInfo.case_status!='3')&&selfInfo.case_mobile1"  @click="callFn(selfInfo.case_mobile1,'第一联系人')" size='mini'>呼叫</el-button>
                        </div>
                        <div>
                            第二联系人：<span class="deepColor">{{selfInfo.case_mobile2}} </span>
                            <el-button type="primary"  round v-show="(selfInfo.case_status!='3')&&selfInfo.case_mobile2"  @click="callFn(selfInfo.case_mobile2,'第二联系人')" size='mini'>呼叫</el-button>
                        </div>
                    </li>
                    <li>
                        <div>
                            公司地址：<span class="deepColor">{{selfInfo.case_work_address}} </span>
                            <el-button type="success" round v-show="(selfInfo.case_status!='3')&&selfInfo.case_work_phone"  @click="sendLetter(2,selfInfo.case_work_phone,'公司')"  size='mini'>信函</el-button>
                            <el-button type="success" plain round v-show="(selfInfo.case_status!='3')&&selfInfo.case_work_phone" @click="sendLetter(3,selfInfo.case_work_phone,'公司')" size='mini'>外访</el-button>
                        </div>
                        <div>
                            家庭住址：<span class="deepColor">{{selfInfo.case_home_address}}</span>
                            <el-button type="success" round v-show="(selfInfo.case_status!='3')&&selfInfo.case_mobile"  @click="sendLetter(2,selfInfo.case_mobile,'本人')" size='mini'>信函</el-button>
                            <el-button type="success" plain round v-show="(selfInfo.case_status!='3')&&selfInfo.case_mobile"  @click="sendLetter(3,selfInfo.case_mobile,'本人')" size='mini'>外访</el-button>
                        </div>
                        
                    </li>
                </ul>
            </div>
            <h3 ><span></span>案件信息</h3>
            <div class="coverCaseU">
                <ul class="caseU">
                    <li>
                        <div  class="colorFul">{{selfInfo.case_money}} </div>
                        <div>委案金额</div>
                    </li>
                    <li>
                        <div  class="colorFul">{{selfInfo.case_paid}} </div>
                        <div>还款金额</div>
                    </li>
                    <li>
                        <div class="colorFul">{{selfInfo.client}}</div>
                        <div>委托方</div>
                    </li>
                    <li>
                        <div  class="colorFul">{{selfInfo.case_exceed_limit}}</div>
                        <div>逾期账龄</div>
                    </li>
                    <li>
                        <div  class="colorFul">{{selfInfo.case_interest}} </div>
                        <div>利息</div>
                    </li>
                    <li>
                        <div  class="colorFul">{{selfInfo.case_back_date}} </div>
                        <div>退案日期</div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'divInfo',
    props:[
        'selfInfo'
    ],
    methods:{
        totalCaseFn(str){
            this.$emit('totalCaseFn',str)
        },
        changeLevelFn(){
            this.$emit('changeLevelFn')
        },
        callFn(val,num){
            this.$emit('callFn',val,num)
        },
        sendLetter(val1,val2,val3){
            this.$emit('sendLetter',val1,val2,val3)
        },
        caseLog(){
            this.$emit('caseLog')
        },
        caseMemorandum(){
            this.$emit("caseMemorandum")
        }
    }
}
</script>


