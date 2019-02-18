<template>
    <el-form :model="exportTask" >
        <el-form-item label="请输入任务名称" label-width="150px">
            <el-input v-model="exportTask.export_task_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label-width="150px">
            <el-button type="primary" @click="readyToExport">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'addExportFourth',
    props:[
        'exportTask',//任务名称
    ],
    methods:{
        readyToExport(){
            this.$emit('readyToExport')
        },
   }
}
</script>

