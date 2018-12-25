<template>
    <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="回收催收员"
            width="150"
        ></el-table-column>
        <el-table-column
            prop="name"
            label="委案金额"
        ></el-table-column>
        <el-table-column
            prop="address"
            label="还款额"
        ></el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableDayRepayment',
    props:[
        'tableData'
    ]
}
</script>

