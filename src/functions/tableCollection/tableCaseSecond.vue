<template>
    <el-table
        border
        :data="tableSecond"
        style="width: 98%"
        >
        <el-table-column
        label="姓名"
        prop="name">
        </el-table-column>
        <el-table-column
        label="关系"
        prop="relation">
        </el-table-column>
        <el-table-column
        label="电话"
        prop="phone">
        </el-table-column>
        <el-table-column
        label="创建者"
        prop="creater">
        </el-table-column>
        <el-table-column
        label="创建时间"
        prop="create_time">
        </el-table-column>
        <el-table-column
        label="催收类型"
        prop="type">
        </el-table-column>
        <el-table-column
        prop="case_status"
        label="通话记录"
        >
            <template slot-scope='scope'>
                <el-button v-if='scope.column.type == 1||scope.column.type == 6' type="primary" size='mini' @click="checkFn(scope.column)" >查看</el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="staff_id"
        label="通话时长"
        >
        </el-table-column>
        <el-table-column
        label="通话备注"
        prop="remark">
        </el-table-column>
        <el-table-column
        label="操作"
        prop="case_id_num">
            <template slot-scope='scope'>
                <el-button type="success" size='mini' @click="addRemarkFn(scope.row)" >修改备注</el-button>
            </template>
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
        },
        addRemarkFn(column){//添加备注
            this.$emit('addRemarkFn',column)
        }
    }
}
</script>

