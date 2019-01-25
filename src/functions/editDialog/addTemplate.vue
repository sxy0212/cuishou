<template>
    <div>
        <div class="addTemplateCheckCover">
            <!-- <el-form :model="formTitle">
                <el-form-item label="模板名称" label-width="80px">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择字段" label-width="80px">
                    <el-checkbox v-model="item.choose"
                        v-for="item in fieldsList"
                        :key="item.id"
                        :class="item.is_required =='1'?'red':''">
                        {{item.field_name}}

                        <el-input 
                            v-if="!!item.choose" 
                            v-model="item.otherName" 
                            placeholder='请输入别名'></el-input>
                    </el-checkbox>
                </el-form-item>
            </el-form> -->
            <!-- 需要将字段进行前端分类，单独参数写开 -->
            <el-form :model="formTitle">
                <el-form-item label="模板名称" label-width="80px">
                    <el-input v-model="formTitle.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form> 
            <div>
                <table style="width:100%" class="messageTable">
                    <tr style="font-size:20px;font-weight:800; line-height: 45px;height: 45px;">客户信息</tr>
                    <tr style="font-size:16px;font-weight:500;">基本信息</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_name.checked"></el-checkbox>姓名<el-input v-show="selfInfo.case_name.checked" v-model="selfInfo.case_name.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_num_type.checked"></el-checkbox>证件类型<el-input v-show="selfInfo.case_num_type.checked" v-model="selfInfo.case_num_type.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_id_num.checked"></el-checkbox>证件号<el-input v-show="selfInfo.case_id_num.checked" v-model="selfInfo.case_id_num.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_gender.checked"></el-checkbox>性别<el-input v-show="selfInfo.case_gender.checked" v-model="selfInfo.case_gender.input" placeholder="请输入别名"></el-input></td>
                     </tr>
                    <tr>    
                        <td><el-checkbox v-model="selfInfo.case_mobile.checked"></el-checkbox>本人手机<el-input v-show="selfInfo.case_mobile.checked" v-model="selfInfo.case_mobile.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_home_phone.checked"></el-checkbox>家庭号码<el-input v-show="selfInfo.case_home_phone.checked" v-model="selfInfo.case_home_phone.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_home_address.checked"></el-checkbox>家庭地址<el-input v-show="selfInfo.case_home_address.checked" v-model="selfInfo.case_home_address.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_home_postcode.checked"></el-checkbox>家庭邮编<el-input v-show="selfInfo.case_home_postcode.checked" v-model="selfInfo.case_home_postcode.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr> 
                        <td><el-checkbox v-model="selfInfo.case_mail_address.checked"></el-checkbox>对账单地址<el-input v-show="selfInfo.case_mail_address.checked" v-model="selfInfo.case_mail_address.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_mail_postcode.checked"></el-checkbox>对账单邮编<el-input v-show="selfInfo.case_mail_postcode.checked" v-model="selfInfo.case_mail_postcode.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_register_address.checked"></el-checkbox>户籍地址<el-input v-show="selfInfo.case_register_address.checked" v-model="selfInfo.case_register_address.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_register_postcode.checked"></el-checkbox>户籍地邮编<el-input v-show="selfInfo.case_register_postcode.checked" v-model="selfInfo.case_register_postcode.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_email.checked"></el-checkbox>邮箱<el-input v-show="selfInfo.case_email.checked" v-model="selfInfo.case_email.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr style="font-size:16px;font-weight:500;">职业信息</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_work_phone.checked"></el-checkbox>单位号码<el-input v-show="selfInfo.case_work_phone.checked" v-model="selfInfo.case_work_phone.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_organization_name.checked"></el-checkbox>单位名称<el-input v-show="selfInfo.case_organization_name.checked" v-model="selfInfo.case_organization_name.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_position.checked"></el-checkbox>案人职位<el-input v-show="selfInfo.case_position.checked" v-model="selfInfo.case_position.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_department.checked"></el-checkbox>案人部门<el-input v-show="selfInfo.case_department.checked" v-model="selfInfo.case_department.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_work_address.checked"></el-checkbox>单位地址<el-input v-show="selfInfo.case_work_address.checked" v-model="selfInfo.case_work_address.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_work_postcode.checked"></el-checkbox>单位邮编<el-input v-show="selfInfo.case_work_postcode.checked" v-model="selfInfo.case_work_postcode.input" placeholder="请输入别名"></el-input></td>
                    
                    </tr>
                    <tr style="font-size:16px;font-weight:500;">其他客户信息</tr>
                     <tr>
                       <td><el-checkbox v-model="selfInfo.case_social_number.checked"></el-checkbox>社保电脑号<el-input v-show="selfInfo.case_social_number.checked" v-model="selfInfo.case_social_number.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_social_card.checked"></el-checkbox>社保卡号<el-input v-show="selfInfo.case_social_card.checked" v-model="selfInfo.case_social_card.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_qq.checked"></el-checkbox>QQ<el-input v-show="selfInfo.case_qq.checked" v-model="selfInfo.case_qq.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_card_bank.checked"></el-checkbox>开户行<el-input v-show="selfInfo.case_card_bank.checked" v-model="selfInfo.case_card_bank.input" placeholder="请输入别名"></el-input></td>
                     
                     </tr>
                     <tr>
                        <td><el-checkbox v-model="selfInfo.case_birthday.checked"></el-checkbox>生日<el-input v-show="selfInfo.case_birthday.checked" v-model="selfInfo.case_birthday.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_age.checked"></el-checkbox>年龄<el-input v-show="selfInfo.case_age.checked" v-model="selfInfo.case_age.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_province.checked"></el-checkbox>省份<el-input v-show="selfInfo.case_province.checked" v-model="selfInfo.case_province.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_city.checked"></el-checkbox>城市<el-input v-show="selfInfo.case_city.checked" v-model="selfInfo.case_city.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_remark1.checked"></el-checkbox>备注1<el-input v-show="selfInfo.case_remark1.checked" v-model="selfInfo.case_remark1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_district.checked"></el-checkbox>区县<el-input v-show="selfInfo.case_district.checked" v-model="selfInfo.case_district.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr style="font-size:16px;font-weight:500;">联系人信息</tr>
                     <tr>
                        <td><el-checkbox v-model="selfInfo.case_name1.checked"></el-checkbox>联系人1姓名<el-input v-show="selfInfo.case_name1.checked" v-model="selfInfo.case_name1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_card1.checked"></el-checkbox>联系人1证件号<el-input v-show="selfInfo.case_card1.checked" v-model="selfInfo.case_card1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_relation1.checked"></el-checkbox>联系人1关系<el-input v-show="selfInfo.case_relation1.checked" v-model="selfInfo.case_relation1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_work_address1.checked"></el-checkbox>联系人1单位<el-input v-show="selfInfo.case_work_address1.checked" v-model="selfInfo.case_work_address1.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_home_phone1.checked"></el-checkbox>联系人1家庭电话<el-input v-show="selfInfo.case_home_phone1.checked" v-model="selfInfo.case_home_phone1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_work_phone1.checked"></el-checkbox>联系人1单位电话<el-input v-show="selfInfo.case_work_phone1.checked" v-model="selfInfo.case_work_phone1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_mobile1.checked"></el-checkbox>联系人1手机<el-input v-show="selfInfo.case_mobile1.checked" v-model="selfInfo.case_mobile1.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_address1.checked"></el-checkbox>联系人1地址<el-input v-show="selfInfo.case_address1.checked" v-model="selfInfo.case_address1.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_work_address2.checked"></el-checkbox>联系人2单位<el-input v-show="selfInfo.case_work_address2.checked" v-model="selfInfo.case_work_address2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_name2.checked"></el-checkbox>联系人2姓名<el-input v-show="selfInfo.case_name2.checked" v-model="selfInfo.case_name2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_card2.checked"></el-checkbox>联系人2证件号<el-input v-show="selfInfo.case_card2.checked" v-model="selfInfo.case_card2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_relation2.checked"></el-checkbox>联系人2关系<el-input v-show="selfInfo.case_relation2.checked" v-model="selfInfo.case_relation2.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_home_phone2.checked"></el-checkbox>联系人2家庭电话<el-input v-show="selfInfo.case_home_phone2.checked" v-model="selfInfo.case_home_phone2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_work_phone2.checked"></el-checkbox>联系人2单位电话<el-input v-show="selfInfo.case_work_phone2.checked" v-model="selfInfo.case_work_phone2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_mobile2.checked"></el-checkbox>联系人2手机<el-input v-show="selfInfo.case_mobile2.checked" v-model="selfInfo.case_mobile2.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_address2.checked"></el-checkbox>联系人2地址<el-input v-show="selfInfo.case_address2.checked" v-model="selfInfo.case_address2.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr style="font-size:20px;font-weight:800; line-height: 45px;height: 45px;">账户信息</tr>
                    <tr style="font-size:16px;font-weight:500;">账户金额</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_account.checked"></el-checkbox>账号<el-input v-show="selfInfo.case_account.checked" v-model="selfInfo.case_account.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_account_name.checked"></el-checkbox>账户名称<el-input v-show="selfInfo.case_account_name.checked" v-model="selfInfo.case_account_name.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_client_card_type.checked"></el-checkbox>委托方卡类<el-input v-show="selfInfo.case_client_card_type.checked" v-model="selfInfo.case_client_card_type.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_currency.checked"></el-checkbox>币种<el-input v-show="selfInfo.case_currency.checked" v-model="selfInfo.case_currency.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_overdue_money.checked"></el-checkbox>逾期金额<el-input v-show="selfInfo.case_overdue_money.checked" v-model="selfInfo.case_overdue_money.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_overdued_principal.checked"></el-checkbox>逾期本金<el-input v-show="selfInfo.case_overdued_principal.checked" v-model="selfInfo.case_overdued_principal.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_interest.checked"></el-checkbox>逾期利息<el-input v-show="selfInfo.case_interest.checked" v-model="selfInfo.case_interest.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_manage_cost.checked"></el-checkbox>逾期管理费<el-input v-show="selfInfo.case_manage_cost.checked" v-model="selfInfo.case_manage_cost.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_fine_interest.checked"></el-checkbox>逾期罚息<el-input v-show="selfInfo.case_fine_interest.checked" v-model="selfInfo.case_fine_interest.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_overdued_penalty.checked"></el-checkbox>违约金<el-input v-show="selfInfo.case_overdued_penalty.checked" v-model="selfInfo.case_overdued_penalty.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_late_fee.checked"></el-checkbox>滞纳金<el-input v-show="selfInfo.case_late_fee.checked" v-model="selfInfo.case_late_fee.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_over_limit.checked"></el-checkbox>超限费<el-input v-show="selfInfo.case_over_limit.checked" v-model="selfInfo.case_over_limit.input" placeholder="请输入别名"></el-input></td>
                        
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_overdue_date.checked"></el-checkbox>逾期日期<el-input v-show="selfInfo.case_overdue_date.checked" v-model="selfInfo.case_overdue_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_overdue_num.checked"></el-checkbox>逾期期数<el-input v-show="selfInfo.case_overdue_num.checked" v-model="selfInfo.case_overdue_num.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_overdue_days.checked"></el-checkbox>逾期天数<el-input v-show="selfInfo.case_overdue_days.checked" v-model="selfInfo.case_overdue_days.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_overdue_times.checked"></el-checkbox>曾逾期次数<el-input v-show="selfInfo.case_overdue_times.checked" v-model="selfInfo.case_overdue_times.input" placeholder="请输入别名"></el-input></td>
                    </tr>  
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_principal.checked"></el-checkbox>本金<el-input v-show="selfInfo.case_principal.checked" v-model="selfInfo.case_principal.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_left_principal.checked"></el-checkbox>剩余本金<el-input v-show="selfInfo.case_left_principal.checked" v-model="selfInfo.case_left_principal.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_card_num.checked"></el-checkbox>卡号<el-input v-show="selfInfo.case_card_num.checked" v-model="selfInfo.case_card_num.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_paid.checked"></el-checkbox>已还金额<el-input v-show="selfInfo.case_paid.checked" v-model="selfInfo.case_paid.input" placeholder="请输入别名"></el-input></td>
                    </tr> 
                    <tr> 
                        <td><el-checkbox v-model="selfInfo.case_deposit.checked"></el-checkbox>保证金<el-input v-show="selfInfo.case_deposit.checked" v-model="selfInfo.case_deposit.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr style="font-size:16px;font-weight:500;">委托信息</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_money.checked"></el-checkbox>委案金额<el-input v-show="selfInfo.case_money.checked" v-model="selfInfo.case_money.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_date.checked"></el-checkbox>委案日期<el-input v-show="selfInfo.case_date.checked" v-model="selfInfo.case_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_limit.checked"></el-checkbox>委案期限<el-input v-show="selfInfo.case_limit.checked" v-model="selfInfo.case_limit.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_back_date.checked"></el-checkbox>退案日期<el-input v-show="selfInfo.case_back_date.checked" v-model="selfInfo.case_back_date.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>   
                        <td><el-checkbox v-model="selfInfo.case_count.checked"></el-checkbox>委案期数<el-input v-show="selfInfo.case_count.checked" v-model="selfInfo.case_count.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_delay_level.checked"></el-checkbox>拖欠级别<el-input v-show="selfInfo.case_delay_level.checked" v-model="selfInfo.case_delay_level.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_client_num.checked"></el-checkbox>委托方档案号<el-input v-show="selfInfo.case_client_num.checked" v-model="selfInfo.case_client_num.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_client_code.checked"></el-checkbox>委托方单号<el-input v-show="selfInfo.case_client_code.checked" v-model="selfInfo.case_client_code.input" placeholder="请输入别名"></el-input></td>
                    </tr>  
                    <tr style="font-size:16px;font-weight:500;">产品信息</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_credit_limit.checked"></el-checkbox>信用额度<el-input v-show="selfInfo.case_credit_limit.checked" v-model="selfInfo.case_credit_limit.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_fixed_credit.checked"></el-checkbox>固定额度<el-input v-show="selfInfo.case_fixed_credit.checked" v-model="selfInfo.case_fixed_credit.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_loan_date.checked"></el-checkbox>贷款日期<el-input v-show="selfInfo.case_loan_date.checked" v-model="selfInfo.case_loan_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_loan_end_date.checked"></el-checkbox>贷款截止日<el-input v-show="selfInfo.case_loan_end_date.checked" v-model="selfInfo.case_loan_end_date.input" placeholder="请输入别名"></el-input></td>
                    </tr> 
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_loan_type.checked"></el-checkbox>信贷分类<el-input v-show="selfInfo.case_loan_type.checked" v-model="selfInfo.case_loan_type.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_paid_limit.checked"></el-checkbox>还款期限<el-input v-show="selfInfo.case_paid_limit.checked" v-model="selfInfo.case_paid_limit.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_paid_count.checked"></el-checkbox>已还期数<el-input v-show="selfInfo.case_paid_count.checked" v-model="selfInfo.case_paid_count.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_month_paid.checked"></el-checkbox>每月还款额<el-input v-show="selfInfo.case_month_paid.checked" v-model="selfInfo.case_month_paid.input" placeholder="请输入别名"></el-input></td>
                    </tr>  
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_loan_rate.checked"></el-checkbox>贷款利率<el-input v-show="selfInfo.case_loan_rate.checked" v-model="selfInfo.case_loan_rate.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_minimum_paid.checked"></el-checkbox>最低还款额<el-input v-show="selfInfo.case_minimum_paid.checked" v-model="selfInfo.case_minimum_paid.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_bill_date.checked"></el-checkbox>账单日<el-input v-show="selfInfo.case_bill_date.checked" v-model="selfInfo.case_bill_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_bill_cycle.checked"></el-checkbox>账单周期<el-input v-show="selfInfo.case_bill_cycle.checked" v-model="selfInfo.case_bill_cycle.input" placeholder="请输入别名"></el-input></td>
                    </tr>  
                    <tr> 
                        <td><el-checkbox v-model="selfInfo.case_consumption_date.checked"></el-checkbox>最后消费日期<el-input v-show="selfInfo.case_consumption_date.checked" v-model="selfInfo.case_consumption_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_last_paid.checked"></el-checkbox>最后还款金额<el-input v-show="selfInfo.case_last_paid.checked" v-model="selfInfo.case_last_paid.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_paid_date.checked"></el-checkbox>最后还款日期<el-input v-show="selfInfo.case_paid_date.checked" v-model="selfInfo.case_paid_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_raise_date.checked"></el-checkbox>最后提现日<el-input v-show="selfInfo.case_raise_date.checked" v-model="selfInfo.case_raise_date.input" placeholder="请输入别名"></el-input></td>
                    </tr>         
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_stop_date.checked"></el-checkbox>停卡日<el-input v-show="selfInfo.case_stop_date.checked" v-model="selfInfo.case_stop_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_create_date.checked"></el-checkbox>开卡日<el-input v-show="selfInfo.case_create_date.checked" v-model="selfInfo.case_create_date.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_main_card.checked"></el-checkbox>是否主副卡<el-input v-show="selfInfo.case_main_card.checked" v-model="selfInfo.case_main_card.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_secondary_holder.checked"></el-checkbox>副卡卡人<el-input v-show="selfInfo.case_secondary_holder.checked" v-model="selfInfo.case_secondary_holder.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_no_out.checked"></el-checkbox>未出账金额<el-input v-show="selfInfo.case_no_out.checked" v-model="selfInfo.case_no_out.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr style="font-size:16px;font-weight:500;">其他账户信息</tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_commission_rate.checked"></el-checkbox>公司佣金比率<el-input v-show="selfInfo.case_commission_rate.checked" v-model="selfInfo.case_commission_rate.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_commission.checked"></el-checkbox>公司佣金金额<el-input v-show="selfInfo.case_commission.checked" v-model="selfInfo.case_commission.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_previous_record.checked"></el-checkbox>原催收记录<el-input v-show="selfInfo.case_previous_record.checked" v-model="selfInfo.case_previous_record.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_exceed_limit.checked"></el-checkbox>逾期账龄<el-input v-show="selfInfo.case_exceed_limit.checked" v-model="selfInfo.case_exceed_limit.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-checkbox v-model="selfInfo.case_m.checked"></el-checkbox>M值系数<el-input v-show="selfInfo.case_m.checked" v-model="selfInfo.case_m.input" placeholder="请输入别名"></el-input></td>
                        <td><el-checkbox v-model="selfInfo.case_coll_type.checked"></el-checkbox>催收分类<el-input v-show="selfInfo.case_coll_type.checked" v-model="selfInfo.case_coll_type.input" placeholder="请输入别名"></el-input></td>
                    </tr>
                </table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="protectFn">保存</el-button>
            <el-button  @click="cancelFn">取消</el-button>
        </div>
    </div>
</template>
<script>
import { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import '@/styles/css/addTemplate.css'
export default {
    name:"addArea",
    props:[
        'id',
        'title',//用于判断添加还是编辑
        'formTitle',//表单
        'selfInfo',//字段信息
        'fieldsList'//多选选项
    ],
    data(){
        return {
            
        }
    },
    methods:{
        cancelFn(){//更改菜单标题
            this.$emit("addNowChange",false)
            this.$emit("clearFormTitle")
        },
        protectFn(){
            let sureArrId = []
            let combineArrInputId = []
            for(let m in this.selfInfo ){
                if( this.selfInfo[m].checked ){
                    sureArrId.push(m)
                    if( !!this.selfInfo[m].input ){
                        combineArrInputId.push(this.selfInfo[m].id+':'+this.selfInfo[m].input)
                    }else {
                        combineArrInputId.push(this.selfInfo[m].id+':'+'')
                    }
                }
            }
            this.formTitle.fields = sureArrId.join(',')
            this.formTitle.alias = combineArrInputId.join(';')
            // let middleList = this.fieldsList.filter(item=>item.choose)
            // this.formTitle.fields = middleList.map(every=>every.id).join(",")
            // this.formTitle.alias = middleList.map(item=>{
            //     if( item.otherName ){
            //         return item.id + ':' + item.otherName
            //     }else{
            //         return item.id + ':'
            //     }
            // }).join(';')
            let data = this.formTitle
            let url 
            if( this.title == '模板添加' ){
                url = '/api/api_backend.php?r=system-setting/template-add'
            }else if( this.title == "模板编辑" ){
                url = '/api/api_backend.php?r=system-setting/template-edit'
                data.id = this.id
            }
            let conf = {
                url ,
                data,
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.cancelFn()
                        this.$emit('saveFn')
                        this.$emit('clearId')
                        this.$emit("clearFormTitle")
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 3 * 1000
                        })
                    }else if(data.statusCode == 0){
                        Message({
                            message: data.message,
                            type: 'erro',
                            duration: 3 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.messageTable{
    tr{
        height:30px;
        line-height:30px;
        td{
            width:230px;
            .el-checkbox{
                min-width:14px;
                max-width:14px;
                margin-left:0;
                margin-right:4px;
            }
            .el-input{
                width:130px;
                margin-left:4px;
            }
        }
       
    }
    
}
</style>




