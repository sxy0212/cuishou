<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
        <el-form-item label="催收员" >
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
        <el-form-item label="催收区域" >
            <el-select v-model="formInline.area" placeholder="请选择催收区域">
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
        <el-form-item label="委托方" >
            <el-select v-model="formInline.entrust" placeholder="请选择委托方">
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
        <el-form-item label="批次" >
            <el-select v-model="formInline.batch_id" placeholder="请选择批次">
                <el-option 
                    label="请选择批次"
                    value=""
                ></el-option>
                <el-option 
                    v-for="item in batch_list"
                    :key="item.id"
                    :label="item.batch_name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="包含已退案" >
            <el-radio v-model="formInline.is_cancel" label="1">是</el-radio>
            <el-radio v-model="formInline.is_cancel" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="案件类型" >
            <el-select v-model="formInline.case_type" placeholder="请选择案件类型">
                <el-option 
                    label="请选择案件类型"
                    value=""
                ></el-option>
                <el-option 
                    v-for="item in case_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size='mini' @click="countFn">开始统计</el-button>
            <el-button type="primary" size='mini' @click="exportStatement">导出报表</el-button>
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
        'case_list',
        'batch_list',
        'formInline'
    ],
    data(){
        return{
            labelWidth:'100px'
        }
    },
    methods:{
        countFn(){
            // this.$emit('countFn')
        },
        exportStatement(){
            // this.$emit('exportStatement')
        },
    }
}
</script>
