<template>
  <div class="cover templateMan">
    <div> 
        <el-button @click='addFn(true)'>添加模板</el-button>
    </div>
    <div class="tableCover">
        <div-table
            :templateUse='templateUse'
            :templateList='tableData'
            :page="page"
            :page_size ="page_size"
            v-on:editFn='editFn($event)'
            v-on:deleteFn='deleteFn($event)'
            v-on:downloadFn='downloadFn($event)'
        >
        </div-table>
            <page-change 
            :total="total"
            :page="page"
            :page_size ="page_size"
            v-on:pageSizeChange='pageSizeChangeFn($event)'
            v-on:currentPageChange='currentPageChangeFn($event)'
        ></page-change>
    </div>
    <el-dialog :title="bannerTitle" :visible.sync="addNow" v-move>
        <edit-dialog
            v-on:addNowChange="addFn($event)"
            v-on:saveFn="init($event)"
            v-on:clearId="changeId($event)"
            v-on:clearFormTitle="clearFormTitle($event)"
            :id="id"
            :title="bannerTitle"
            :formTitle="formTitle"
            :fieldsList="fieldsList"
            :selfInfo="selfInfo"
        ></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/styles/css/templateManagement.css'
import addTemplate from '@/functions/editDialog/addTemplate.vue'
import tableTemplate from '@/functions/tableCollection/tableTemplate.vue'
import pageChange from '@/components/pageChange.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
import  { axiosParams } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'


export default {
    components:{
        'edit-dialog':addTemplate,
        'page-change':pageChange,
        'div-table':tableTemplate
    },
    data() {
        return {
            id:'',//编辑还是添加
            templateUse:true,
            page:1,
            page_size:10,
            total:0,
            bannerTitle:"模板添加",
            addNow:false,
            tableData: [],
            formTitle:{//添加或是修改模块的数据
                name:'',
            },
            fieldsList:[],//多选选项
            selfInfo:{},//每个字段详细信息
            basicInfo:[ //客户基本信息
                "case_name",    // 姓名:
                "case_num_type",    // 证件类型:
                "case_id_num",    // 证件号:
                "case_gender",    // 性别:
                "case_mobile",    // 本人手机:
                "case_home_phone",    // 家庭号码:
                "case_home_address",    // 家庭地址:
                "case_home_postcode",    // 家庭邮编:
                "case_mail_address",    // 对账单地址:
                "case_mail_postcode",    // 对账单邮编:
                "case_register_address",    // 户籍地址:
                "case_register_postcode",    //户籍地邮编:
                "case_email"    //邮箱:
            ],
            workInfo:[   //职业信息
                "case_work_phone",    // 单位号码:
                "case_organization_name",    // 单位名称:
                "case_work_address",    // 单位地址:
                "case_work_postcode",    // 单位邮编:
                "case_position",    //案人职位:
                "case_department"    //案人部门:
            ],
            otherCustomerInfo:[    //其他客户信息
                "case_remark1",    //备注1:
                "case_social_number",    // 社保电脑号:
                "case_social_card",    // 社保卡号:
                "case_card_bank",    // 开户行:
                "case_qq",    //QQ:
                "case_birthday",    //生日:
                "case_age",    // 年龄:
                "case_province",    // 省份:
                "case_city",    // 城市:
                "case_district"    // 区县:
            ],
            contactInfo:[    //联系人信息
                "case_name1",    // 联系人1姓名:
                "case_card1",    // 联系人1证件号:
                "case_relation1",    // 联系人1关系:
                "case_home_phone1",    // 联系人1家庭电话:
                "case_work_phone1",    // 联系人1单位电话:
                "case_mobile1",    // 联系人1手机:
                "case_address1",    // 联系人1地址:
                "case_work_address1",    //联系人1单位:
                "case_name2",    // 联系人2姓名:
                "case_card2",    //联系人2证件号:
                "case_relation2",    // 联系人2关系:
                "case_home_phone2",    // 联系人2家庭电话:
                "case_work_phone2",    // 联系人2单位电话:
                "case_mobile2",    // 联系人2手机:
                "case_address2",    // 联系人2地址:
                "case_work_address2"    //联系人2单位:
            ],
            accountMoney:[    //账户金额
                "case_account",    // 账号:
                "case_account_name",    // 账户名称:
                "case_client_card_type",    //委托方卡类:
                "case_card_num",    // 卡号:
                "case_currency",    // 币种:
                "case_principal",    // 本金:
                "case_left_principal",    //剩余本金:
                "case_overdue_date",    // 逾期日期:
                "case_overdue_num",    // 逾期期数:
                "case_overdue_days",    //逾期天数:
                "case_overdue_times",    // 曾逾期次数:
                "case_overdue_money",    // 逾期金额:
                "case_overdued_principal",    // 逾期本金:
                "case_interest",    // 逾期利息:
                "case_manage_cost",    // 逾期管理费:
                "case_fine_interest",    // 逾期罚息:
                "case_overdued_penalty",    //违约金:
                "case_late_fee",    // 滞纳金:
                "case_over_limit",    // 超限费:
                "case_deposit"   // 保证金:
            ],
            commissionInfo:[    //委托信息
                "case_count",    // 委案期数:
                "case_money",    // 委案金额:
                "case_date",    //委案日期:
                "case_limit",    // 委案期限:
                "case_back_date",    // 退案日期:
                "case_client_num",    // 委托方档案号:
                "case_client_code",    // 委托方单号:
                "case_delay_level"    // 拖欠级别:
            ],
            productInfo:[    //产品信息
                "case_loan_rate",    //贷款利率:
                "case_credit_limit",    // 信用额度:
                "case_fixed_credit",    // 固定额度:
                "case_loan_date",    // 贷款日期:
                "case_loan_end_date",    // 贷款截止日:
                "case_loan_type",    //信贷分类:
                "case_paid_limit",    // 还款期限:
                "case_paid_count",    // 已还期数:
                "case_month_paid",    // 每月还款额:
                "case_minimum_paid",    //最低还款额:
                "case_bill_date",    // 账单日:
                "case_bill_cycle",    // 账单周期:
                "case_no_out",    // 未出账金额:
                "case_main_card",    // 是否主副卡:
                "case_secondary_holder",    // 副卡卡人:
                "case_stop_date",    // 停卡日:
                "case_create_date",    // 开卡日:
                "case_last_paid",    // 最后还款金额:
                "case_paid_date",    // 最后还款日期:
                "case_paid",    // 已还金额:
                "case_consumption_date",    // 最后消费日期:
                "case_raise_date"   // 最后提现日:
            ],
            otherAccountInfo:[     //其他账户信息
                "case_m",    // M值系数:
                "case_commission_rate",    // 公司佣金比率:
                "case_commission",    // 公司佣金金额:
                "case_coll_type",    // 催收分类:
                "case_previous_record",    // 原催收记录:
                "case_exceed_limit"    // 逾期账龄:
            ],
        }
    },
    activated(){
        this.init()
	},
    methods: {
        init(){
            let conf = {
                url : '/api/api_backend.php?r=system-setting/template-list',
                data : {
                    page:this.page,
                    page_size:this.page_size
                },
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.tableData = data.info
                        this.total = Number( data.total )
                    }
                }
            }
            axiosRequest(conf)
        },
        askFields(val,str,alias){//调取多选选项
            let conf = {
                url : '/api/api_backend.php?r=system-setting/template-all-fields-list',
                success:(data)=>{
                    if( data.statusCode == 1 ){
                        this.fieldsList = data.info
                        if( val == 2 ){
                            this.selfInfo = {
                                'case_account': {input: "", checked: false,id:'18'},
                                'case_account_name': {input: "", checked: false,id:'19'},
                                'case_address1': {input: "", checked: false,id:'95'},
                                'case_address2': {input: "", checked: false,id:'103'},
                                'case_age': {input: "", checked: false,id:'81'},
                                'case_back_date': {input: "", checked: false,id:'7'},
                                'case_bill_cycle': {input: "", checked: false,id:'26'},
                                'case_bill_date': {input: "", checked: false,id:'25'},
                                'case_birthday': {input: "", checked: false,id:'80'},
                                'case_card1': {input: "", checked: false,id:'90'},
                                'case_card2': {input: "", checked: false,id:'98'},
                                'case_card_bank': {input: "", checked: false,id:'88'},
                                'case_card_num': {input: "", checked: false,id:'3'},
                                'case_city': {input: "", checked: false,id:'83'},
                                'case_client_card_type': {input: "", checked: false,id:'20'},
                                'case_client_code': {input: "", checked: false,id:'9'},
                                'case_client_num': {input: "", checked: false,id:'8'},
                                'case_coll_type': {input: "", checked: false,id:'51'},
                                'case_commission': {input: "", checked: false,id:'12'},
                                'case_commission_rate': {input: "", checked: false,id:'11'},
                                'case_consumption_date': {input: "", checked: false,id:'35'},
                                'case_count': {input: "", checked: false,id:'47'},
                                'case_create_date': {input: "", checked: false,id:'38'},
                                'case_credit_limit': {input: "", checked: false,id:'29'},
                                'case_currency': {input: "", checked: false,id:'105'},
                                'case_date': {input: "", checked: false,id:'5'},
                                'case_delay_level': {input: "", checked: false,id:'31'},
                                'case_department': {input: "", checked: false,id:'73'},
                                'case_deposit': {input: "", checked: false,id:'60'},
                                'case_district': {input: "", checked: false,id:'84'},
                                'case_email': {input: "", checked: false,id:'79'},
                                'case_exceed_limit': {input: "", checked: false,id:'62'},
                                'case_fine_interest': {input: "", checked: false,id:'56'},
                                'case_fixed_credit': {input: "", checked: false,id:'30'},
                                'case_gender': {input: "", checked: false,id:'63'},
                                'case_home_address': {input: "", checked: false,id:'70'},
                                'case_home_phone': {input: "", checked: false,id:'69'},
                                'case_home_phone1': {input: "", checked: false,id:'92'},
                                'case_home_phone2': {input: "", checked: false,id:'100'},
                                'case_home_postcode': {input: "", checked: false,id:'71'},
                                'case_id_num': {input: "", checked: false,id:'2'},
                                'case_interest': {input: "", checked: false,id:'54'},
                                'case_last_paid': {input: "", checked: false,id:'32'},
                                'case_late_fee': {input: "", checked: false,id:'58'},
                                'case_left_principal': {input: "", checked: false,id:'22'},
                                'case_limit': {input: "", checked: false,id:'6'},
                                'case_loan_date': {input: "", checked: false,id:'41'},
                                'case_loan_end_date': {input: "", checked: false,id:'42'},
                                'case_loan_rate': {input: "", checked: false,id:'28'},
                                'case_loan_type': {input: "", checked: false,id:'50'},
                                'case_m': {input: "", checked: false,id:'10'},
                                'case_mail_address': {input: "", checked: false,id:'74'},
                                'case_mail_postcode': {input: "", checked: false,id:'75'},
                                'case_main_card': {input: "", checked: false,id:'39'},
                                'case_manage_cost': {input: "", checked: false,id:'55'},
                                'case_minimum_paid': {input: "", checked: false,id:'24'},
                                'case_mobile': {input: "", checked: false,id:'64'},
                                'case_mobile1': {input: "", checked: false,id:'94'},
                                'case_mobile2': {input: "", checked: false,id:'102'},
                                'case_money': {input: "", checked: false,id:'4'},
                                'case_month_paid': {input: "", checked: false,id:'23'},
                                'case_name': {input: "", checked: false,id:'1'},
                                'case_name1': {input: "", checked: false,id:'89'},
                                'case_name2': {input: "", checked: false,id:'97'},
                                'case_no_out': {input: "", checked: false,id:'27'},
                                'case_num_type': {input: "", checked: false,id:'17'},
                                'case_organization_name': {input: "", checked: false,id:'66'},
                                'case_over_limit': {input: "", checked: false,id:'59'},
                                'case_overdue_date': {input: "", checked: false,id:'43'},
                                'case_overdue_days': {input: "", checked: false,id:'45'},
                                'case_overdue_money': {input: "", checked: false,id:'52'},
                                'case_overdue_num': {input: "", checked: false,id:'44'},
                                'case_overdue_times': {input: "", checked: false,id:'46'},
                                'case_overdued_penalty': {input: "", checked: false,id:'57'},
                                'case_overdued_principal': {input: "", checked: false,id:'53'},
                                'case_paid': {input: "", checked: false,id:'34'},
                                'case_paid_count': {input: "", checked: false,id:'49'},
                                'case_paid_date': {input: "", checked: false,id:'33'},
                                'case_paid_limit': {input: "", checked: false,id:'48'},
                                'case_position': {input: "", checked: false,id:'72'},
                                'case_previous_record': {input: "", checked: false,id:'61'},
                                'case_principal': {input: "", checked: false,id:'21'},
                                'case_province': {input: "", checked: false,id:'82'},
                                'case_qq': {input: "", checked: false,id:'78'},
                                'case_raise_date': {input: "", checked: false,id:'36'},
                                'case_register_address': {input: "", checked: false,id:'76'},
                                'case_register_postcode': {input: "", checked: false,id:'77'},
                                'case_relation1': {input: "", checked: false,id:'91'},
                                'case_relation2': {input: "", checked: false,id:'99'},
                                'case_remark1': {input: "", checked: false,id:'85'},
                                'case_secondary_holder': {input: "", checked: false,id:'40'},
                                'case_social_card': {input: "", checked: false,id:'87'},
                                'case_social_number': {input: "", checked: false,id:'86'},
                                'case_stop_date': {input: "", checked: false,id:'37'},
                                'case_work_address': {input: "", checked: false,id:'67'},
                                'case_work_address1': {input: "", checked: false,id:'96'},
                                'case_work_address2': {input: "", checked: false,id:'104'},
                                'case_work_phone': {input: "", checked: false,id:'65'},
                                'case_work_phone1': {input: "", checked: false,id:'93'},
                                'case_work_phone2': {input: "", checked: false,id:'101'},
                                'case_work_postcode': {input: "", checked: false,id:'68'}
                            }
                            for( let m in this.selfInfo ){
                                let cod = "," + str + ","
                                if( cod.indexOf(','+m+',') != -1 ){
                                    this.selfInfo[m].checked = true
                                    this.selfInfo[m].input = alias.split( this.selfInfo[m].id+ '":"' )[1].split('"')[0]
                                }
                            }
                            // this.fieldsList = data.info.map(item=>{
                            //     let cod = "," + str + ","
                            //     if( cod.indexOf(","+item.id+",") != -1 ){
                            //         item["choose"] = true   //编辑时原来选中的选项
                            //         let min = '"'+item.id+'"' +':"'
                            //         let mid = alias.split(min)[1].split('"')[0] 
                            //         item['otherName'] = mid //编辑时原来更改的别名
                            //     }
                            //     return item 
                            // })
                        }
                    }
                }
            }
            axiosRequest(conf)
        },
        clearSelfInfo(){//还原所有字段信息
            this.selfInfo = {
                'case_account': {input: "", checked: false,id:'18'},
                'case_account_name': {input: "", checked: false,id:'19'},
                'case_address1': {input: "", checked: false,id:'95'},
                'case_address2': {input: "", checked: false,id:'103'},
                'case_age': {input: "", checked: false,id:'81'},
                'case_back_date': {input: "", checked: false,id:'7'},
                'case_bill_cycle': {input: "", checked: false,id:'26'},
                'case_bill_date': {input: "", checked: false,id:'25'},
                'case_birthday': {input: "", checked: false,id:'80'},
                'case_card1': {input: "", checked: false,id:'90'},
                'case_card2': {input: "", checked: false,id:'98'},
                'case_card_bank': {input: "", checked: false,id:'88'},
                'case_card_num': {input: "", checked: false,id:'3'},
                'case_city': {input: "", checked: false,id:'83'},
                'case_client_card_type': {input: "", checked: false,id:'20'},
                'case_client_code': {input: "", checked: false,id:'9'},
                'case_client_num': {input: "", checked: false,id:'8'},
                'case_coll_type': {input: "", checked: false,id:'51'},
                'case_commission': {input: "", checked: false,id:'12'},
                'case_commission_rate': {input: "", checked: false,id:'11'},
                'case_consumption_date': {input: "", checked: false,id:'35'},
                'case_count': {input: "", checked: false,id:'47'},
                'case_create_date': {input: "", checked: false,id:'38'},
                'case_credit_limit': {input: "", checked: false,id:'29'},
                'case_currency': {input: "", checked: false,id:'105'},
                'case_date': {input: "", checked: false,id:'5'},
                'case_delay_level': {input: "", checked: false,id:'31'},
                'case_department': {input: "", checked: false,id:'73'},
                'case_deposit': {input: "", checked: false,id:'60'},
                'case_district': {input: "", checked: false,id:'84'},
                'case_email': {input: "", checked: false,id:'79'},
                'case_exceed_limit': {input: "", checked: false,id:'62'},
                'case_fine_interest': {input: "", checked: false,id:'56'},
                'case_fixed_credit': {input: "", checked: false,id:'30'},
                'case_gender': {input: "", checked: false,id:'63'},
                'case_home_address': {input: "", checked: false,id:'70'},
                'case_home_phone': {input: "", checked: false,id:'69'},
                'case_home_phone1': {input: "", checked: false,id:'92'},
                'case_home_phone2': {input: "", checked: false,id:'100'},
                'case_home_postcode': {input: "", checked: false,id:'71'},
                'case_id_num': {input: "", checked: false,id:'2'},
                'case_interest': {input: "", checked: false,id:'54'},
                'case_last_paid': {input: "", checked: false,id:'32'},
                'case_late_fee': {input: "", checked: false,id:'58'},
                'case_left_principal': {input: "", checked: false,id:'22'},
                'case_limit': {input: "", checked: false,id:'6'},
                'case_loan_date': {input: "", checked: false,id:'41'},
                'case_loan_end_date': {input: "", checked: false,id:'42'},
                'case_loan_rate': {input: "", checked: false,id:'28'},
                'case_loan_type': {input: "", checked: false,id:'50'},
                'case_m': {input: "", checked: false,id:'10'},
                'case_mail_address': {input: "", checked: false,id:'74'},
                'case_mail_postcode': {input: "", checked: false,id:'75'},
                'case_main_card': {input: "", checked: false,id:'39'},
                'case_manage_cost': {input: "", checked: false,id:'55'},
                'case_minimum_paid': {input: "", checked: false,id:'24'},
                'case_mobile': {input: "", checked: false,id:'64'},
                'case_mobile1': {input: "", checked: false,id:'94'},
                'case_mobile2': {input: "", checked: false,id:'102'},
                'case_money': {input: "", checked: false,id:'4'},
                'case_month_paid': {input: "", checked: false,id:'23'},
                'case_name': {input: "", checked: false,id:'1'},
                'case_name1': {input: "", checked: false,id:'89'},
                'case_name2': {input: "", checked: false,id:'97'},
                'case_no_out': {input: "", checked: false,id:'27'},
                'case_num_type': {input: "", checked: false,id:'17'},
                'case_organization_name': {input: "", checked: false,id:'66'},
                'case_over_limit': {input: "", checked: false,id:'59'},
                'case_overdue_date': {input: "", checked: false,id:'43'},
                'case_overdue_days': {input: "", checked: false,id:'45'},
                'case_overdue_money': {input: "", checked: false,id:'52'},
                'case_overdue_num': {input: "", checked: false,id:'44'},
                'case_overdue_times': {input: "", checked: false,id:'46'},
                'case_overdued_penalty': {input: "", checked: false,id:'57'},
                'case_overdued_principal': {input: "", checked: false,id:'53'},
                'case_paid': {input: "", checked: false,id:'34'},
                'case_paid_count': {input: "", checked: false,id:'49'},
                'case_paid_date': {input: "", checked: false,id:'33'},
                'case_paid_limit': {input: "", checked: false,id:'48'},
                'case_position': {input: "", checked: false,id:'72'},
                'case_previous_record': {input: "", checked: false,id:'61'},
                'case_principal': {input: "", checked: false,id:'21'},
                'case_province': {input: "", checked: false,id:'82'},
                'case_qq': {input: "", checked: false,id:'78'},
                'case_raise_date': {input: "", checked: false,id:'36'},
                'case_register_address': {input: "", checked: false,id:'76'},
                'case_register_postcode': {input: "", checked: false,id:'77'},
                'case_relation1': {input: "", checked: false,id:'91'},
                'case_relation2': {input: "", checked: false,id:'99'},
                'case_remark1': {input: "", checked: false,id:'85'},
                'case_secondary_holder': {input: "", checked: false,id:'40'},
                'case_social_card': {input: "", checked: false,id:'87'},
                'case_social_number': {input: "", checked: false,id:'86'},
                'case_stop_date': {input: "", checked: false,id:'37'},
                'case_work_address': {input: "", checked: false,id:'67'},
                'case_work_address1': {input: "", checked: false,id:'96'},
                'case_work_address2': {input: "", checked: false,id:'104'},
                'case_work_phone': {input: "", checked: false,id:'65'},
                'case_work_phone1': {input: "", checked: false,id:'93'},
                'case_work_phone2': {input: "", checked: false,id:'101'},
                'case_work_postcode': {input: "", checked: false,id:'68'}
            }
        },
        addFn(val){//添加弹框的打开与关闭
            this.bannerTitle = "模板添加"
            this.addNow = val
            this.id = ''
            this.formTitle = {
                name:''
            }
            this.clearSelfInfo()
            this.askFields(1)
        },
        changeId(){//清空编辑的具体项
            this.id = ''
        },
        clearFormTitle(){//清除子组件的数据
            this.formTitle = {
                name:''
            }
            this.fieldsList = []
            this.clearSelfInfo()
        },
        editFn(row){//编辑弹框的打开与关闭
            this.bannerTitle = "模板编辑"
            this.id = row.id
            this.addNow = true
            this.formTitle = {
                name:row.name
            }
            this.clearSelfInfo()
            this.askFields(2,row.fields,row.alias)
        },
        pageSizeChangeFn(val){
            this.page_size = val
            this.init()
        },
        currentPageChangeFn(val){
            this.page = val
            this.init()
        },
        deleteFn(row){
             this.$confirm('确定删除这一条？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let conf = {
                    url : '/api/api_backend.php?r=system-setting/template-del',
                    data : {
                        id:row.id
                    },
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.init()
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
            }).catch( () =>{
                Message({
                    message:'取消删除',
                    type: 'erro',
                    duration: 3 * 1000
                })
            })
        },
        downloadFn(row){
            window.open('/api/api_backend.php?r=system-setting/template-download&id=' + row.id)
        }
    }
}
</script>


