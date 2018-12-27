<template>
    <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="true_name"
            label="催收员"
            width="100">
            </el-table-column>
            <el-table-column label="2018-09">
                <el-table-column  prop="valid_8" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量" prop='total_8'>
                </el-table-column>
                <el-table-column label="个案量" prop='case_8'>
                </el-table-column>>
            </el-table-column>
            <el-table-column label="2018-10">
                <el-table-column  prop="valid8_12" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量" prop='total8_12'>
                </el-table-column>
                <el-table-column label="个案量" prop='case8_12'>
                </el-table-column>
            </el-table-column>
            <el-table-column label="2018-11">
                <el-table-column  prop="valid12_18" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量" prop='total12_18'>
                </el-table-column>
                <el-table-column label="个案量" prop='case12_18'>
                </el-table-column>
                </el-table-column>
            <el-table-column label="2018-12">
                <el-table-column  prop="valid18_" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量" prop='total18_'>
                </el-table-column>
                <el-table-column label="个案量" prop='case18_'>
                </el-table-column>>
            </el-table-column>
            <el-table-column label="合计">
                <el-table-column  prop="sum_valid" label="有效通电" >
                </el-table-column>
                <el-table-column prop="sum_total" label="总通电量">
                </el-table-column>
                <el-table-column prop="sum_case" label="个案量">
                </el-table-column>
            </el-table-column>
        </el-table>
</template>
<script>
export default {
    name:'tableRepaymentRate',
    props:[
        'tableData'
    ]
}
</script>

