<template>
    <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="date"
            label="催收员"
            width="100">
            </el-table-column>
            <el-table-column label="2018-09">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="2018-10">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="2018-11">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="2018-12">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="合计">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
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

