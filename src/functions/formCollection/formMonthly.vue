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
                    :key="item.staff_id"
                    :label="item.true_name"
                    :value="item.staff_id"
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
                    :key="item.area_id"
                    :label="item.name" 
                    :value="item.area_id"
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
                    :key="item.client_id"
                    :label="item.name"
                    :value="item.client_id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <el-date-picker
                v-model="formInline.collection_date"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="countFn">开始统计</el-button>
            <el-button type="primary" @click="exportStatement">导出报表</el-button>
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

        },
    }
}
</script>
