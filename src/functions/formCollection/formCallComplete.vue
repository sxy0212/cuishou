<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="批次">
            <el-select v-model="formInline.monthValue" multiple placeholder="请选择批次">
                <el-option 
                    label="请选择批次"
                    value=""
                ></el-option>
                <el-option
                    v-for="item in batchList"
                    :key="item.id"
                    :label="item.batch_name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="countFn" size='mini'>开始统计</el-button>
            <el-button type="primary" @click="exportStatement" size='mini'>导出报表</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'formCallComplete',
    props:[
        'batchList',
        'formInline',
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
