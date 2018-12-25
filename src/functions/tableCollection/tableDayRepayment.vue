<template>
    <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="staff_name"
            label="回收催收员"
            width="150"
        ></el-table-column>
        <el-table-column
            prop="case_money"
            label="委案金额"
        ></el-table-column>
        <el-table-column
            prop="case_paid"
            label="还款额"
        ></el-table-column>
        <el-table-column
            prop="per_paid"
            label="还款率"
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

