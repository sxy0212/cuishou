<template>
    <div>
       <table style="width:100%" class="messageTable">
        <tr>
            <td>性别:</td><td>{{selfInfo.case_gender}}</td>
            <td>家庭号码:</td><td>{{selfInfo.case_home_phone}}</td>
            <td>案人职位:</td><td>{{selfInfo.case_position}}</td>
            <td>案人部门:</td><td>{{selfInfo.case_department}}</td>
        </tr>
        <tr>
            <td>单位邮编:</td><td>{{selfInfo.case_work_postcode}}</td>
            <td>家庭地址:</td><td>{{selfInfo.case_home_address}}</td>
            <td>家庭邮编:</td><td>{{selfInfo.case_home_postcode}}</td>
            <td>对账单地址:</td><td>{{selfInfo.case_mail_address}}</td>
        </tr>
        <tr>
            <td>对账单邮编:</td><td>{{selfInfo.case_mail_postcode}}</td>
            <td>户籍地址:</td><td>{{selfInfo.case_register_address}}</td>
            <td>户籍地邮编:</td><td>{{selfInfo.case_register_postcode}}</td>
            <td>qq:</td><td>{{selfInfo.case_qq}}</td>
        </tr>
        <tr>
            <td>电子邮箱:</td><td>{{selfInfo.case_email}}</td>
            <td>生日:</td><td>{{selfInfo.case_birthday}}</td>
            <td>年龄:</td><td>{{selfInfo.case_age}}</td>
            <td>省份:</td><td>{{selfInfo.case_province}}</td>
        </tr>
        <tr>
            <td>城市:</td><td>{{selfInfo.case_city}}</td>
            <td>区县:</td><td>{{selfInfo.case_district}}</td>
            <td>备注1:</td><td>{{selfInfo.case_remark1}}</td>
            <td>社保电脑号:</td><td>{{selfInfo.case_social_number}}</td>
        </tr>
        <tr>
            <td >社保卡号:</td><td>{{selfInfo.case_social_card}}</td>
            <td >开户行:</td><td>{{selfInfo.case_card_bank}}</td>
            <td >联系人1姓名:</td><td>{{selfInfo.case_name1}}</td>
            <td >联系人1证件号:</td><td>{{selfInfo.case_card1}}</td>
        </tr>
        <tr>
            <td>联系人1关系:</td><td>{{selfInfo.case_relation1}}</td>
            <td>联系人1家庭电话:</td><td>{{selfInfo.case_home_phone1}}</td>
            <td>联系人1单位电话:</td><td>{{selfInfo.case_work_phone1}}</td>
            <td>联系人1手机号:</td><td>{{selfInfo.case_mobile1}}</td>
        </tr>
        <tr>
            <td>联系人1地址:</td><td>{{selfInfo.case_address1}}</td>
            <td>联系人1单位地址:</td><td>{{selfInfo.case_work_address1}}</td>
            <td>联系人2姓名:</td><td>{{selfInfo.case_name2}}</td>
            <td>联系人2证件号:</td><td>{{selfInfo.case_card2}}</td>
        </tr>
        <tr>
            <td>联系人2关系:</td><td>{{selfInfo.case_relation2}}</td>
            <td>联系人2家庭电话:</td><td>{{selfInfo.case_home_phone2}}</td>
            <td>联系人2单位电话:</td><td>{{selfInfo.case_work_phone2}}</td>
            <td>联系人2手机号:</td><td>{{selfInfo.case_mobile2}}</td>
        </tr>
        <tr>
            <td>联系人2地址:</td><td>{{selfInfo.case_address2}}</td>
            <td>联系人2单位地址:</td><td>{{selfInfo.case_work_address2}}</td>
            <td>分配给坐席的工号:</td><td>{{selfInfo.staff_id}} </td>
            <td>案件标记:</td><td>{{selfInfo.case_status}}</td>
        </tr>
        <tr>
            <td> 坐席名称:</td><td>{{selfInfo.staff_name}}</td>
            <td>案件分配时间:</td><td>{{selfInfo.allocate_time}}</td>
            <td> 上次通话时间:</td><td>{{selfInfo.last_call}}  </td>
            <td>呼叫次数:</td><td>{{selfInfo.call_times}}</td>
        </tr>
        <tr>
            <td> 更新时间:</td><td>{{selfInfo.update_time}}</td>
            <td>创建时间:</td><td>{{selfInfo.create_time}}</td>
            <td>共案记录数:</td><td>{{selfInfo.case_total}}</td>
            <td>最后跟进日期:</td><td>{{selfInfo.case_last_collection_date}}</td>
        </tr>
        <tr>
            <td>机器人呼叫次数:</td><td>{{selfInfo.case_called_times}}</td>
            <td>案件标色:</td><td>{{selfInfo.case_color}}</td>
            <td>委案日期:</td><td>{{selfInfo.case_organization_name}}</td>
            <td>委案期限:</td><td>{{selfInfo.case_called_times}}</td>
        </tr>
        <tr>
            <td>委托方档案号:</td><td>{{selfInfo.case_client_num}}</td>
            <td>委托方单号:</td><td>{{selfInfo.case_client_code}}</td>
            <td>M值系数:</td><td>{{selfInfo.case_m}}</td>
            <td>公司佣金比率:</td><td>{{selfInfo.case_commission_rate}}</td>
        </tr>
        <tr>
            <td>公司佣金金额:</td><td>{{selfInfo.case_commission}}</td>
            <td>委案金额:</td><td>{{selfInfo.case_money}}</td>
            <td>币种:</td><td>{{selfInfo.case_currency}}</td>
            <td>证件类型:</td><td>{{selfInfo.case_num_type}}</td>
        </tr>
        <tr>
            <td>卡号:</td><td>{{selfInfo.case_card_num}}</td>
            <td>账号:</td><td>{{selfInfo.case_account}}</td>
            <td>账号名称:</td><td>{{selfInfo.case_account_name}}</td>
            <td>委托方卡类:</td><td>{{selfInfo.case_client_card_type}}</td>
        </tr>
        <tr>
            <td>本金:</td><td>{{selfInfo.case_principal}}</td>
            <td>剩余本金:</td><td>{{selfInfo.case_left_principal}}</td>
            <td>每月还款额:</td><td>{{selfInfo.case_month_paid}}  </td>
            <td>最低还款额:</td><td>{{selfInfo.case_minimum_paid}}</td>
        </tr>
        <tr>
            <td>账单日:</td><td>{{selfInfo.case_bill_date}}</td>
            <td>账单周期:</td><td>{{selfInfo.case_bill_cycle}}天</td>
            <td>未出账金额:</td><td>{{selfInfo.case_no_out}}</td>
            <td>贷款利率:</td><td>{{selfInfo.case_loan_rate}}</td>
        </tr>
        <tr>
            <td>信用额度:</td><td>{{selfInfo.case_credit_limit}}</td>
            <td>固定额度:</td><td>{{selfInfo.case_mobile1}}</td>
            <td>拖欠级别:</td><td>{{selfInfo.case_delay_level}}</td>
            <td>最后还款金额:</td><td>{{selfInfo.case_last_paid}}</td>
        </tr>
        <tr>
            <td>最后还款日期:</td><td>{{selfInfo.case_paid_date}}</td>
            <td>最后消费日期:</td><td>{{selfInfo.case_consumption_date}}</td>
            <td>最后提现日:</td><td>{{selfInfo.case_raise_date}}</td>
            <td>停卡日:</td><td>{{selfInfo.case_stop_date}}</td>
        </tr>
        <tr>
            <td>开卡日:</td><td>{{selfInfo.case_create_date}}</td>
            <td>是否主副卡:</td><td>{{selfInfo.case_main_card}}</td>
            <td>副卡卡人:</td><td>{{selfInfo.case_secondary_holder}}</td>
            <td>贷款日期:</td><td>{{selfInfo.case_loan_date}}</td>
        </tr>
        <tr>
            <td>贷款截止日:</td><td>{{selfInfo.case_loan_end_date}}</td>
            <td>逾期日期:</td><td>{{selfInfo.case_overdue_date}}</td>
            <td>逾期期数:</td><td>{{selfInfo.case_overdue_num}}</td>
            <td>逾期天数:</td><td>{{selfInfo.case_overdue_days}}</td>
        </tr>
        <tr>
            <td>曾逾期次数:</td><td>{{selfInfo.case_overdue_times}}</td>
            <td>委案期数:</td><td>{{selfInfo.case_count}}</td>
            <td>还款期限:</td><td>{{selfInfo.case_paid_limit}}</td>
            <td>已还期数:</td><td>{{selfInfo.case_paid_count}}</td>
        </tr>
        <tr>
            <td>信贷分类:</td><td>{{selfInfo.case_loan_type}}</td>
            <td>催收分类:</td><td>{{selfInfo.case_coll_type}}</td>
            <td>逾期金额:</td><td>{{selfInfo.case_overdue_money}}</td>
            <td>逾期本金:</td><td>{{selfInfo.case_overdued_principal}}</td>
        </tr>
        <tr>
            <td>逾期利息:</td><td>{{selfInfo.case_interest}}</td>
            <td>逾期管理费:</td><td>{{selfInfo.case_manage_cost}}</td>
            <td>逾期罚息:</td><td>{{selfInfo.case_fine_interest}}</td>
            <td>违约金:</td><td>{{selfInfo.case_overdued_penalty}}</td>
        </tr>
        <tr>
            <td>滞纳金:</td><td>{{selfInfo.case_late_fee}}</td>
            <td>超限费:</td><td>{{selfInfo.case_over_limit}}</td>
            <td>保证金:</td><td>{{selfInfo.case_deposit}}</td>
            <td>原催收记录:</td><td>{{selfInfo.case_previous_record}}</td>
        </tr>
        </table>
    </div>
</template>
<script>
export default {
    name:'divOther',
    props:[
        'selfInfo'
    ]
}
</script>
<style>
.messageTable tr td:nth-child(odd){width:9%;background:#f2f2f2}
.messageTable tr td:nth-child(even){width:16%}
 .messageTable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    margin-top:10px;
 }
 .messageTable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
 }
 .messageTable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
 }
</style>

