<template>
    <el-form :inline="true" :model="formTitle" label-width="70px">   
            <el-form-item label="电话号码">
                <el-input v-model="formTitle.case_name" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="关系">
                <el-select v-model="formTitle.case_status" placeholder="请选择关系">
                    <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for='item in conditionList'
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formTitle.case_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="催收结果">
                <el-select v-model="formTitle.case_status" placeholder="请选择结果">
                    <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for='item in endList'
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通话备注">
                <el-input type="textarea" v-model="formTitle.id" placeholder="请输入通话备注"></el-input>
            </el-form-item>
            <el-form-item label="下次跟进">
                <el-select v-model="formTitle.case_status" placeholder="请选择">
                    <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for='item in nextList'
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
</template>
<script>
export default {
    name:'formCaseDetail',
    props:[
        'formTitle',
        'endList',
        'nextList',
        'conditionList'
    ]
}
</script>
