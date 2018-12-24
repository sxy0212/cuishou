<template>
    <div class="formCase">
        <el-form :inline="true" :model="conditions" class="demo-form-inline" label-width="85px">   
            <el-form-item label="姓名">
                <el-input v-model="conditions.case_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="conditions.case_id_num" placeholder="请输入证件号"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="conditions.case_mobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="conditions.keywords" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="案件序列号">
                <el-input v-model="conditions.case_code" placeholder="请输入案件序列号"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                 <el-select v-model="conditions.depart_id" @change="changeFn" placeholder="请选择部门">
                    <el-option 
                        label="请选择部门" 
                        value=""
                    ></el-option>
                    <el-option
                        v-for="item in departmentList"
                        :class="item.class_name"
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
                        :key='item.id'
                        :label="item.batch_name" 
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="委托方">
                <el-select v-model="conditions.client_id" filterable :filter-method='filterFn'  placeholder="请选择委托方">
                    <el-option
                        v-for="item in clientList"
                        :label="item.name" 
                        :value="item.id"
                        :key='item.id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标色搜索">
                <el-select v-model="conditions.case_color" placeholder="标色搜索" class="colorCover">
                    <el-option label="正常色" class='one' value="1"></el-option>
                    <el-option label="翠绿色" class="two" value="2"></el-option>
                    <el-option label="天蓝色" class='three' value="3"></el-option>
                    <el-option label="紫色" class="four" value="4"></el-option>
                    <el-option label="红色" class="five" value="5"></el-option>
                    <el-option label="黄色" class="six" value="6"></el-option>
                    <el-option label="枣红色" class="seven" value="7"></el-option>
                </el-select>
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
                        v-for='item in caseLevelList'
                        :key='item.id'
                        :label='item.name'
                        :value='item.id'
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通话时长">
                <el-input v-model="conditions.min_talk_time" type='number' placeholder="最小时长"></el-input>
            -<el-input  v-model="conditions.max_talk_time" type='number' placeholder="最大时长"></el-input>
            </el-form-item>
            <el-form-item label="委案金额">
                <el-input v-model="conditions.min_case_money" type='number' placeholder="最低金额"></el-input>
            - <el-input  v-model="conditions.max_case_money" type='number'  placeholder="最高金额"></el-input>
            </el-form-item>
            <el-form-item label="委案时间">
                <el-date-picker
                    v-model="conditions.min_case_date"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择委案开始日期">
                </el-date-picker>
            - <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="conditions.max_case_date"
                    type="date"
                    placeholder="请选择委案开始日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="退案时间">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="conditions.min_case_back_date"
                    type="date"
                    placeholder="请选择最小退案时间">
                </el-date-picker>-
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="conditions.max_case_back_date"
                    type="date"
                    placeholder="请选择最大退案时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最后跟进">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="conditions.min_case_last_collection_date"
                    type="date"
                    placeholder="请选择最小跟进时间">
                </el-date-picker>
            -<el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="conditions.max_case_last_collection_date"
                    type="date"
                    placeholder="请选择最大跟进时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="searchFn" size='mini'>查询</el-button>
                <el-button type="info" @click="clearFn" size='mini'>清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import '@/styles/css/other.css'
export default {
    name:'formCaseFirst',
    props:[
        'conditions',
        'caseLevelList',
        'batchList',
        'departmentList',
        'staffList',
        'clientList',
        'caseStatusList',
    ],
    methods:{
        filterFn(val){
            this.$emit('filterFn',val)
        },
        changeFn(val){
            this.$emit('changeFn',val)
        },
        searchFn(){
            this.$emit('searchFn')
        },
        clearFn(){
            this.$emit('clearFn')
        }
    }
}
</script>








    