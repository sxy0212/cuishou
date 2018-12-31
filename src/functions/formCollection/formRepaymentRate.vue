<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="催收员">
            <el-select v-model="formInline.monthValue" multiple placeholder="请选择催收员">
                <el-option 
                    label="请选择催收员"
                    value=""
                ></el-option>
                <el-option
                    v-for="item in staff_list"
                    :key="item.id"
                    :label="item.true_name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="催收区域">
            <el-select v-model="formInline.area_id" placeholder="请选择催收区域">
                <el-option 
                    label="请选择催收区域"
                    value=""
                ></el-option>
                <el-option  
                    v-for="item in area_list"
                    :key="item.id"
                    :label="item.name" 
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="委托方">
            <el-select v-model="formInline.client_id" placeholder="请选择委托方">
                <el-option 
                    label="请选择委托方"
                    value=""
                ></el-option>
                <el-option 
                    v-for="item in client_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <el-date-picker
                v-model="formInline.start_time"
                value-format='yyyy-MM-dd'
                type="date"
                placeholder='请选择开始日期'>
            </el-date-picker>
        </el-form-item>
        <el-form-item label="-">
            <el-date-picker
                v-model="formInline.end_time"
                value-format='yyyy-MM-dd'
                type="date"
                placeholder='请选择结束日期'>
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="countFn" size='mini'>开始统计</el-button>
            <el-button type="primary" @click="exportStatement" size='mini'>导出报表</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'formMonthly',
    props:[
        'area_list',
        'client_list',
        'staff_list',
        'formInline'
    ],
    methods:{
        countFn(){
            this.$emit('countFn')
        },
        exportStatement(){
            this.$emit('exportStatement')
        },
    }
}
</script>
