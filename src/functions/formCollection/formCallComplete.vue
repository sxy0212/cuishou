<template>
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="请选择批次" label-width="100px">
            <el-checkbox 
                v-model="item.choose"
                v-for="item in batchList"
                :key="item.id"
                >{{item.batch_name}}</el-checkbox>
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
<style scoped>
.el-checkbox{margin-left:30px;}
</style>

