<template>
    <el-table
        border
        :data="tableSecond"
        style="width: 98%"
        >
        <el-table-column
        label="姓名"
        prop="id">
        </el-table-column>
        <el-table-column
        label="关系"
        prop="case_name">
        </el-table-column>
        <el-table-column
        label="电话"
        prop="collection_area">
        </el-table-column>
        <el-table-column
        prop="case_status"
        label="通话记录"
        >
            <template slot-scope='scope'>
                <el-button type="primary" size='mini' @click="checkFn(scope.column)" >查看</el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="staff_id"
        label="通话时长"
        >
        </el-table-column>
        <el-table-column
        label="通话备注"
        prop="batch_id">
        </el-table-column>
        <el-table-column
        label="操作"
        prop="case_id_num">
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableCaseSecond',
    props:[
        'tableSecond'
    ],
    methods:{
        checkFn(column){
            this.$emit('checkFn',column)
        }
    }
}
</script>

