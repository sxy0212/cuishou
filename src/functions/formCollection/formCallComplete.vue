<template>
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="请选择批次:" label-width="100px">
            <el-checkbox 
                v-model="item.choose"
                v-for="item in batchList"
                :key="item.id"
                >{{item.batch_name}}</el-checkbox>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'formCallComplete',
    props:[
        'batchList',
    ]
}
</script>
<style scoped>
.el-checkbox{margin-left:30px;}
</style>

