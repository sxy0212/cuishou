<template>
    <div>
        <div ><span>性别(0:未知 1:男 2:女):{{selfInfo.case_gender}}  </span><span>家庭号码:{{selfInfo.case_home_phone}}</span><span>案人职位：{{selfInfo.case_position}}</span><span>案人部门:{{selfInfo.case_department}}</span></div>
        <div ><span>单位邮编:{{selfInfo.case_work_postcode}}  </span><span>家庭地址:{{selfInfo.case_home_address}}</span><span>家庭邮编:{{selfInfo.case_home_postcode}}</span></div>
        <div ><span>对账单地址:{{selfInfo.case_mail_address}}  </span><span>对账单邮编:{{selfInfo.case_mail_postcode}}</span><span>户籍地址:{{selfInfo.case_register_address}}</span><span>户籍地邮编:{{selfInfo.case_register_postcode}}</span></div>
        <div ><span>qq:{{selfInfo.case_qq}}  </span><span>电子邮箱:{{selfInfo.case_email}}</span><span>生日:{{selfInfo.case_birthday}}</span><span>年龄:{{selfInfo.case_age}}</span><span>省份:{{selfInfo.case_province}}</span><span>城市:{{selfInfo.case_city}}</span><span>区县:{{selfInfo.case_district}}</span></div>
        <div ><span>备注1:{{selfInfo.case_remark1}}  </span><span>社保电脑号:{{selfInfo.case_social_number}}</span><span>社保卡号:{{selfInfo.case_social_card}}</span><span>开户行:{{selfInfo.case_card_bank}}</span></div>
        <div ><span>联系人1姓名:{{selfInfo.case_name1}}  </span><span>联系人1证件号:{{selfInfo.case_card1}}</span><span>联系人1关系:{{selfInfo.case_relation1}}</span><span>联系人1家庭电话:{{selfInfo.case_home_phone1}}</span></div>
        <div ><span>联系人1单位电话:{{selfInfo.case_work_phone1}}  </span><span>联系人1手机号:{{selfInfo.case_mobile1}}</span><span>联系人1地址:{{selfInfo.case_address1}}</span><span>联系人1单位地址:{{selfInfo.case_work_address1}}</span></div>
        <div ><span>联系人2姓名:{{selfInfo.case_name2}}  </span><span>联系人2证件号:{{selfInfo.case_card2}}</span><span>联系人2关系:{{selfInfo.case_relation2}}</span><span>联系人2家庭电话:{{selfInfo.case_home_phone2}}</span></div>
        <div ><span>联系人2单位电话:{{selfInfo.case_work_phone2}}  </span><span>联系人2手机号:{{selfInfo.case_mobile2}}</span><span>联系人2地址:{{selfInfo.case_address2}}</span><span>联系人2单位地址:{{selfInfo.case_work_address2}}</span></div>
        <div ><span>分配给坐席的工号 (0:未分配):{{selfInfo.staff_id}}  </span><span>案件标记 (0:未做标记，正常状态 1:暂停 2:关闭 3:退案):{{selfInfo.case_status}}</span></div>
        <div ><span> 坐席名称:{{selfInfo.staff_name}}  </span><span>案件分配时间:{{selfInfo.allocate_time}}</span></div>
        <div ><span> 上次通话时间:{{selfInfo.last_call}}  </span><span>呼叫次数:{{selfInfo.call_times}}</span></div>
        <div ><span> 更新时间:{{selfInfo.update_time}}  </span><span>创建时间:{{selfInfo.create_time}}</span><span>共案记录数:{{selfInfo.case_total}}</span></div>
        <div><span>最后跟进日期：{{selfInfo.case_last_collection_date}}  </span><span>机器人呼叫次数：{{selfInfo.case_gender}}</span><span>案件标色(0:没有颜色 1-6:其他颜色)：{{selfInfo.case_color}}</span></div>
        <div><span>委案日期：{{selfInfo.case_organization_name}}  </span><span>委案期限：{{selfInfo.case_called_times}}</span><span>委托方档案号：{{selfInfo.case_client_num}}</span><span>委托方单号:{{selfInfo.case_client_code}}</span></div>
        <div><span>M值系数：{{selfInfo.case_m}}  </span><span>公司佣金比率：{{selfInfo.case_commission_rate}}</span><span>公司佣金金额：{{selfInfo.case_commission}}</span></div>
        <div><span>委案金额：{{selfInfo.case_money}}  </span><span>币种：{{selfInfo.case_currency}}</span></div>
        <div><span>证件类型：{{selfInfo.case_num_type}}  </span><span>卡号:{{selfInfo.case_card_num}}</span></div>
        <div><span>账号：{{selfInfo.case_account}}  </span><span>账号名称:{{selfInfo.case_account_name}}</span></div>
        <div><span>委托方卡类：{{selfInfo.case_client_card_type}}  </span></div>
        <div><span>本金：{{selfInfo.case_principal}}  </span><span>剩余本金:{{selfInfo.case_left_principal}}</span><span>每月还款额：{{selfInfo.case_month_paid}}  </span><span>最低还款额:{{selfInfo.case_minimum_paid}}</span></div>
        <div><span>账单日:{{selfInfo.case_bill_date}}</span><span>账单周期：{{selfInfo.case_bill_cycle}}天  </span><span>未出账金额:{{selfInfo.case_no_out}}</span><span>贷款利率:{{selfInfo.case_loan_rate}}</span><span>信用额度:{{selfInfo.case_credit_limit}}</span></div>
        <div><span>固定额度：{{selfInfo.case_mobile1}}  </span><span>拖欠级别:{{selfInfo.case_delay_level}}</span><span>最后还款金额:{{selfInfo.case_last_paid}}</span><span>最后还款日期:{{selfInfo.case_paid_date}}</span><span>最后消费日期:{{selfInfo.case_consumption_date}}</span></div>
        <div><span>最后提现日：{{selfInfo.case_raise_date}}  </span><span>停卡日:{{selfInfo.case_stop_date}}</span><span>开卡日:{{selfInfo.case_create_date}}</span><span>是否主副卡(0:主卡 1:副卡):{{selfInfo.case_main_card}}</span><span>副卡卡人:{{selfInfo.case_secondary_holder}}</span></div>
        <div><span>贷款日期：{{selfInfo.case_loan_date}}  </span><span>贷款截止日:{{selfInfo.case_loan_end_date}}</span><span>逾期日期:{{selfInfo.case_overdue_date}}</span><span>逾期期数:{{selfInfo.case_overdue_num}}</span><span>逾期天数:{{selfInfo.case_overdue_days}}</span></div>
        <div><span>曾逾期次数：{{selfInfo.case_overdue_times}}  </span><span>委案期数:{{selfInfo.case_count}}</span><span>还款期限:{{selfInfo.case_paid_limit}}</span><span>已还期数:{{selfInfo.case_paid_count}}</span></div>
        <div><span>信贷分类：{{selfInfo.case_loan_type}}  </span><span>催收分类:{{selfInfo.case_coll_type}}</span><span>逾期金额:{{selfInfo.case_overdue_money}}</span><span>逾期本金:{{selfInfo.case_overdued_principal}}</span></div>
        <div><span>逾期利息：{{selfInfo.case_interest}}  </span><span>逾期管理费:{{selfInfo.case_manage_cost}}</span><span>逾期罚息:{{selfInfo.case_fine_interest}}</span><span>违约金:{{selfInfo.case_overdued_penalty}}</span><span>滞纳金:{{selfInfo.case_late_fee}}</span></div>
        <div><span>超限费：{{selfInfo.case_over_limit}}  </span><span>保证金:{{selfInfo.case_deposit}}</span><span>原催收记录:{{selfInfo.case_previous_record}}</span></div>
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

