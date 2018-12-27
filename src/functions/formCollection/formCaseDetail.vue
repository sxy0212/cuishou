<template>
    <el-form :inline="true" :model="formTitle" label-width="67px" class="caseForm">   
        <el-form-item label="电话号码">
            <el-input v-model="formTitle.phone" placeholder="请输入电话号码" :style="width"></el-input>
        </el-form-item>
        <el-form-item label="关系">
            <el-select v-model="formTitle.relation" placeholder="请选择关系" :style="width">
                <el-option 
                    v-for='item in relationList'
                    :label="item.name" 
                    :value="item.name"
                    :key="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="formTitle.name" placeholder="请输入姓名" :style="width"></el-input>
        </el-form-item>
        <el-form-item label="催收结果">
            <el-select v-model="formTitle.record_status" placeholder="请选择结果" :style="width">
                <el-option 
                    v-for='item in endList'
                    :label="item.name" 
                    :value="item.value"
                    :key="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="通话备注">
            <el-input type="textarea" v-model="formTitle.remark" placeholder="请输入通话备注" :style="width"></el-input>
        </el-form-item>
        <el-form-item label="下次跟进">
            <el-date-picker
                v-model="formTitle.next_time"
                type="datetime"
                value-format='yyyy-MM-dd HH:mm:ss'
                placeholder="选择日期" :style="width">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="saveFn" :disabled='selfInfo.case_status == 3' size="mini">保存</el-button>
            <el-button type="info" @click="clearFn" size="mini">清空</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    name:'formCaseDetail',
    props:[
        'formTitle',
        'relationList',
        'selfInfo',
        'endList'
    ],
    data(){
        return{
            width:"width:180px;"
        }
    },
    methods:{
        saveFn(){
            this.$emit('saveFn')
        },
        clearFn(){
            this.$emit('clearFn')
        }
    }
}
</script>
<style>
.caseForm .el-form-item{margin-bottom:10px;}
</style>
