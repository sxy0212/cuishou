<template>
    <div>
        <el-form :inline="true" :model="conditions" class="demo-form-inline">   
            <el-form-item label="姓名">
                <el-input v-model="conditions.case_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="conditions.case_mobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="conditions.case_id_num" placeholder="请输入证件号"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="conditions.talk_recode" placeholder="请输入关键词"></el-input>
            </el-form-item>
            
             <el-form-item label="案件序列号">
                <el-input v-model="conditions.id" placeholder="请输入案件id"></el-input>
            </el-form-item>
            <el-form-item label="案件状态">
                <el-select v-model="conditions.case_status" placeholder="请选择案件状态">
                    <el-option 
                        label="请选择案件状态" 
                        value=""
                    ></el-option>
                    <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for='item in caseStatusList'
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件等级">
                <el-select v-model="conditions.case_level" placeholder="案件等级">
                    <el-option 
                        label="请选择案件等级" 
                        value=""
                    ></el-option>
                    <el-option 
                        v-for='item in levelList'
                        :key='item.id'
                        :label='item.name'
                        :value='item.id'
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="委托方">
                <el-select v-model="special" filterable :filter-method = 'filterFn' @change="filterFn" placeholder="请选择委托方">
                    <el-option
                        v-for="item in filterList"
                        :label="item.name" 
                        :value="item.name"
                        :key='item.id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="委案金额">
                <el-input v-model="conditions.case_money1" type='number' placeholder="最低金额"></el-input>
            </el-form-item>
            <el-form-item label="-">
                <el-input  v-model="conditions.case_money2" type='number'  placeholder="最高金额"></el-input>
            </el-form-item>
            <el-form-item label="通话时长">
                <el-input v-model="conditions.talk_time1" type='number' placeholder="最小时长"></el-input>
            </el-form-item>
            <el-form-item label="-">
                <el-input  v-model="conditions.talk_time2" type='number' placeholder="最大时长"></el-input>
            </el-form-item>
            <el-form-item label="委案时间">
                <el-date-picker
                    v-model="conditions.case_date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="退案时间">
                <el-date-picker
                    v-model="conditions.case_back_date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="部门">
                 <el-select v-model="conditions.depart_id" @change="changeFn" placeholder="请选择部门">
                    <el-option 
                        label="请选择部门" 
                        value=""
                    ></el-option>
                    <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.depart_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="催收员">
                <el-select v-model="conditions.staff_id" placeholder="请选择催收员">
                    <el-option 
                        label="请选择催收员" 
                        value=""
                    ></el-option>
                    <el-option
                        v-for="item in staffList"
                        :key="item.id"
                        :label="item.true_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属批次">
                <el-select v-model="conditions.batch_id" placeholder="请选择批次">
                    <el-option 
                        label="请选择批次" 
                        value=""
                    ></el-option>
                    <el-option 
                        v-for="item in batchList"
                        :key='item'
                        :label="item" 
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标色搜索">
                <el-select v-model="conditions.case_color" placeholder="标色搜索">
                    <el-option label="正常色" value="1"></el-option>
                    <el-option label="玫红色" value="2"></el-option>
                    <el-option label="天蓝色" value="3"></el-option>
                    <el-option label="紫色" value="4"></el-option>
                    <el-option label="翠绿色" value="5"></el-option>
                    <el-option label="棕色" value="6"></el-option>
                    <el-option label="黄色" value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="最后跟进">
                <el-date-picker
                    v-model="conditions.case_last_collection_date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name:'formCaseFirst',
    props:[
        'conditions',
        'levelList',
        'batchList',
        'departmentList',
        'staffList',
        'filterList',
        'caseStatusList',
    ],
    data(){
        return{
           special:''//委托方
        }
    },
    methods:{
        changeFn(val){
            this.$emit('changeFn',val)
            this.$emit('getDepartmentList',2)
        },
        filterFn(val){
            this.$emit('filterFn',val)
        },
        
    }
}
</script>
<style>
.el-date-editor .el-range-separator,.el-date-editor .el-range__icon{line-height:24px;}
</style>




    