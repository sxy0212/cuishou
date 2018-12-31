<template>
    <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="催收员"
                width="100"
                prop="name"
            ></el-table-column>
            <el-table-column 
                v-for="(item,index) in list"
                :label="item.date"
                :key="index"
            >
                <el-table-column   label="有效通电" >
                    <template slot-scope="scope">
                        <span>{{scope.row.list[index].valid_count}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="总通电量">
                    <template slot-scope="scope">
                        <span>{{scope.row.list[index].total_count}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="个案量">
                    <template slot-scope="scope">
                        <span>{{scope.row.list[index].case_count}}</span>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
</template>
<script>
export default {
    name:'tableRepaymentRate',
    props:[
        'tableData',
        'list'
    ]
}
</script>

