<template>
    <div>
        <div class="info">
            <h3>个人信息</h3>
            <div class="redS"><span>案件序列号：{{selfInfo.case_code}}</span><span><el-button type="primary" @click="totalCaseFn" size="mini">（有{{selfInfo.case_total}}条共案）</el-button></span><span>案件等级：{{selfInfo.case_level}}</span><span><el-button type="primary" v-show="selfInfo.case_status!='3'" @click="changeLevelFn" size="mini">修改等级</el-button></span></div>
            <div><span>证件号码：{{selfInfo.case_id_num}}  </span><span>联系方式：{{selfInfo.case_mobile}}</span><span><el-button  type="primary" v-show="selfInfo.case_status!='3'" @click="callFn(selfInfo.case_mobile,'本人')" size="mini">呼叫</el-button></span><span>家庭住址：{{selfInfo.case_home_address}}  </span><span><el-button   v-show="selfInfo.case_status!='3'" type="success" @click="sendLetter(2,selfInfo.case_mobile,'本人')" size="mini">信函</el-button></span><span><el-button  v-show="selfInfo.case_status!='3'"  type="danger" @click="sendLetter(3,selfInfo.case_mobile,'本人')" size="mini">外访</el-button></span></div>
            <div><span>工作单位：{{selfInfo.case_organization_name}}  </span><span>公司电话：{{selfInfo.case_work_phone}}</span><span><el-button  type="primary" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_work_phone,'公司')" size="mini">呼叫</el-button></span><span>公司地址：{{selfInfo.case_work_address}}  </span><span><el-button  type="success" v-show="selfInfo.case_status!='3'"  @click="sendLetter(2,selfInfo.case_work_phone,'公司')" size="mini">信函</el-button></span><span><el-button   v-show="selfInfo.case_status!='3'"  type="danger" @click="sendLetter(3,selfInfo.case_work_phone,'公司')" size="mini">外访</el-button></span></div>
            <div><span>第一联系人：{{selfInfo.case_mobile1}}  </span><span><el-button  type="primary" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_mobile1,'第一联系人')" size="mini">呼叫</el-button></span><span>第二联系人：{{selfInfo.case_mobile2}}  </span><span><el-button  v-show="selfInfo.case_status!='3'" type="primary" @click="callFn(selfInfo.case_mobile2,'第二联系人')" size="mini">呼叫</el-button></span></div>
        </div>
        <div class="info">
            <h3>案件信息</h3>
            <div><span>委案金额：{{selfInfo.case_money}}  </span><span>还款金额：{{selfInfo.case_paid}}  </span><span>委托方：{{selfInfo.client}}  </span><span>逾期账龄：{{selfInfo.case_exceed_limit}}  </span><span>利息：{{selfInfo.case_interest}}  </span><span>退案日期：{{selfInfo.case_back_date}}  </span></div>
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
        totalCaseFn(){
            this.$emit('totalCaseFn')
        },
        changeLevelFn(){
            this.$emit('changeLevelFn')
        },
        callFn(val,num){
            this.$emit('callFn',val,num)
        },
        sendLetter(val1,val2,val3){
            this.$emit('sendLetter',val1,val2,val3)
        }
    }
}
</script>

