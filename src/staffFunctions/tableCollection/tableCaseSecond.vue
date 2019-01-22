<template>
    <el-table border :data="tableSecond" style="width: 98%">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="关系" prop="relation" width='91'></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="创建者" prop="creater"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="160"></el-table-column>
        <el-table-column label="催收类型" prop="type">
            <template slot-scope='scope'>
                <span v-show='scope.row.type==1'>呼叫 </span>
                <span v-show='scope.row.type==2'>信函 </span>
                <span v-show='scope.row.type==3'>外访 </span>
                <span v-show='scope.row.type==4'>录入 </span>
                <span v-show='scope.row.type==6'>机器人呼叫 </span>
            </template>
        </el-table-column>
        <el-table-column prop="record_status" label="呼叫状态"></el-table-column>
        <el-table-column label="语音查询" prop="type" width="77">
            <template slot-scope='scope' >
                <el-button  :disabled ='scope.row.type != 6 && scope.row.type != 1' type="primary" size='mini' @click="checkFn(scope.row)" >查看</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="call_billsec" label="通话时长"></el-table-column>
        <el-table-column label="催收记录" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="case_id_num">
            <template slot-scope='scope'>
                <el-button type="success" :disabled='selfInfo.case_status==3||scope.row.id ==""' size='mini' @click="addRemarkFn(scope.row)" >修改备注</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableCaseSecond',
    props:[
        'tableSecond',
        'selfInfo'
    ],
    methods:{
        checkFn(column){
            this.$emit('checkFn',column)
        },
        addRemarkFn(column){//添加备注
            console.log(column)
            this.$emit('addRemarkFn',column)
        }
    }
}
</script>

