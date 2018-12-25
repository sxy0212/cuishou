<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="催收员">
            <el-select v-model="formInline.monthValue" multiple placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="催收区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="委托方">
            <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <el-date-picker
                v-model="formInline.value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">开始统计</el-button>
            <el-button type="primary" @click="onSubmit">导出报表</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'formMonthly',
    props:[
        'options',
        'formInline'
    ]
}
</script>
