<template>
    <div>
        <div class="info">
            <h3 style="margin-bottom:10px;display:inline-block;">个人信息 <div class="redS" style="display:inline-block;"><span>案件序列号：{{selfInfo.case_code}}</span><span><el-button type="primary" @click="totalCaseFn('total')" size="mini">（有{{selfInfo.case_total}}条共案）</el-button></span><span>案件等级：{{selfInfo.case_level}}</span><span><el-button type="primary" v-show="selfInfo.case_status!='3'" @click="changeLevelFn" size="mini">修改等级</el-button></span></div></h3>
            <el-button type="primary" size="mini" @click="caseLog">案件日志</el-button>
            <el-button type="primary" size="mini" @click="caseMemorandum">案件备忘录</el-button>
            <div class="coverLevel">
                <div class="average">
                    <span style="display: inline-block;width: 270px;">证件号码：{{selfInfo.case_id_num}}</span>
                    <span style="display: inline-block;width: 220px;">联系方式：{{selfInfo.case_mobile}}</span>
                    <i class="fa fa-phone" style="color:#09CC5B;cursor:pointer;" v-show="selfInfo.case_status!='3'" @click="callFn(selfInfo.case_mobile,'本人')"></i>
                    <!--<el-button  type="primary" v-show="selfInfo.case_status!='3'" @click="callFn(selfInfo.case_mobile,'本人')" size="mini">呼叫</el-button>-->
                    <span>家庭住址：{{selfInfo.case_home_address}}</span>
                    <i class="fa fa-envelope" style="color:#F5952D;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="sendLetter(2,selfInfo.case_mobile,'本人')"></i>
                   <!-- <el-button   v-show="selfInfo.case_status!='3'" type="success" @click="sendLetter(2,selfInfo.case_mobile,'本人')" size="mini">信函</el-button> -->
                   <i class="fa fa-eye" style="color:#62A1EF;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="sendLetter(3,selfInfo.case_mobile,'本人')"></i>
                  <!-- <el-button  v-show="selfInfo.case_status!='3'"  type="danger" @click="sendLetter(3,selfInfo.case_mobile,'本人')" size="mini">外访</el-button>-->
                </div>
            </div>
            <div class="coverLevel">
               <span style="display: inline-block;width: 270px;">工作单位：{{selfInfo.case_organization_name}}</span>
               <span style="display: inline-block;width: 220px;">公司电话：{{selfInfo.case_work_phone}}</span>
                <i class="fa fa-phone" style="color:#09CC5B;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_work_phone,'公司')"></i>
               <!--<el-button  type="primary" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_work_phone,'公司')" size="mini">呼叫</el-button>-->
               <span>公司地址：{{selfInfo.case_work_address}} </span>
               <i class="fa fa-envelope" style="color:#F5952D;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="sendLetter(2,selfInfo.case_work_phone,'公司')"></i>
               <i class="fa fa-eye" style="color:#62A1EF;cursor:pointer;" v-show="selfInfo.case_status!='3'" @click="sendLetter(3,selfInfo.case_work_phone,'公司')"></i>
               <!--<el-button  type="success" v-show="selfInfo.case_status!='3'"  @click="sendLetter(2,selfInfo.case_work_phone,'公司')" size="mini">信函</el-button>
               <el-button  v-show="selfInfo.case_status!='3'"  type="danger" @click="sendLetter(3,selfInfo.case_work_phone,'公司')" size="mini">外访</el-button>-->
            </div>
            <div class="coverLevel">
               <span style="display: inline-block;width: 255px;">第一联系人:{{selfInfo.case_mobile1}} </span>
                <i class="fa fa-phone" style="color:#09CC5B;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_mobile1,'第一联系人')"></i>
               <!--<span><el-button  type="primary" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_mobile1,'第一联系人')" size="mini">呼叫</el-button></span>-->
                <span style="display: inline-block;width: 220px;">第二联系人：{{selfInfo.case_mobile2}} </span>
                 <i class="fa fa-phone" style="color:#09CC5B;cursor:pointer;" v-show="selfInfo.case_status!='3'"  @click="callFn(selfInfo.case_mobile2,'第二联系人')"></i>
                <!--<span><el-button  v-show="selfInfo.case_status!='3'" type="primary" @click="callFn(selfInfo.case_mobile2,'第二联系人')" size="mini">呼叫</el-button></span>-->
            </div>
            <div class="info">
                <h3 style="margin-bottom:10px;">案件信息</h3>
                <div><span>委案金额：{{selfInfo.case_money}}  </span><span>还款金额：{{selfInfo.case_paid}}  </span><span>委托方：{{selfInfo.client}}  </span><span>逾期账龄：{{selfInfo.case_exceed_limit}}  </span><span>利息：{{selfInfo.case_interest}}  </span><span>退案日期：{{selfInfo.case_back_date}}  </span></div>
            </div>
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
<style scoped>

</style>


