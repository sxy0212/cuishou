<template>
    <div>
        <el-form :model="formExport" >
            <el-form-item label="请选择字段" label-width="100px">
                <el-checkbox v-model="item.choose"
                    v-for="item in fieldsList"
                    :key="item.id"
                    :disabled='item.is_required =="1"'
                    :class="item.is_required =='1'?'red':''">
                    {{item.field_name}}
                </el-checkbox>
            </el-form-item>
            <el-form-item  label-width="100px">
                <el-button type="primary" @click="exportTo">确定导出</el-button>
                <el-button  @click="cancelExport">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'addExportChoose',
    props:[
        'formExport',//表单
        'fieldsList'//多选选项
    ],
    methods:{
        exportTo(){
            this.$emit('exportTo')
        },
        cancelExport(){
            this.$emit('cancelExport')
        }
    }
}
</script>
<style scoped>
.el-checkbox{ margin-left: 30px; min-width: 110px;}
</style>




