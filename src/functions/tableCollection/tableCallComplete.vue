<template>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column  type="index" :index="indexMethod" label="序号" width="50">
        </el-table-column>
        <el-table-column prop='batch_name' label="批次名称">
        </el-table-column>
        <el-table-column prop='count' label="案件总数">
        </el-table-column>
        <el-table-column prop='self_call_count' label="本人呼叫数">
        </el-table-column>
        <el-table-column prop='self_call_in_count' label="本人接通数">
        </el-table-column>
        <el-table-column prop='self_count_in_rate' label="本人接通率">
        </el-table-column>
        <el-table-column prop='first_call_count' label="第一联系人呼叫数">
        </el-table-column>
        <el-table-column prop='first_call_in_count' label="第一联系人接通数">
        </el-table-column>
        <el-table-column prop='first_count_in_rate' label="第一联系人接通率">
        </el-table-column>
        <el-table-column prop='second_call_count' label="第二联系人呼叫数">
        </el-table-column>
        <el-table-column prop='second_call_in_count' label="第二联系人接通数">
        </el-table-column>
        <el-table-column prop='second_count_in_rate' label="第二联系人接通率">
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableCallComplete',
    props:[
        'tableData',
        'page',
        'page_size',
    ],
    methods:{
        indexMethod(index){
            return this.page_size*(this.page-1) + index + 1
        },
    }
}
</script>

