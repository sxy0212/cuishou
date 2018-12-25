<template>
    <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="date"
            label="催收员"
            width="100">
            </el-table-column>
            <el-table-column label="8:00以前">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="8:00-12:00">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="12:00-18:00">
                <el-table-column  prop="name" label="有效通电" >
                </el-table-column>
                <el-table-column label="总通电量">
                </el-table-column>
                <el-table-column label="个案量">
                </el-table-column>
            </el-table-column>
            <el-table-column label="18:00以后">
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
    name:'tableMonthly',
    props:[
        'tableData'
    ]
}
</script>

