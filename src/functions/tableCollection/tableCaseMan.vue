<template>
    <el-table
        border
        :data="tableData"
        style="width: 98%"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        @row-dblclick="doubleClickFn"
        >
        <el-table-column
        label="选框"
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        label="案件序列号"
        prop="case_code"
        width="140">
        </el-table-column>
        <el-table-column
        label="姓名"
        prop="case_name">
        </el-table-column>
        <el-table-column
        label="催收区域"
        prop="collection_area">
        </el-table-column>
        <el-table-column
        prop="case_status"
        label="催收状态"
        >
            <template slot-scope="scope">
                <span v-show="scope.row.case_status == 0">正常状态</span>
                <span v-show="scope.row.case_status == 1">暂停</span>
                <span v-show="scope.row.case_status == 2">关闭</span>
                <span v-show="scope.row.case_status == 3">退案</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="staff_id"
        label="是否分配"
        >
        </el-table-column>
        <el-table-column
        label="所属批次"
        prop="batch_id">
        </el-table-column>
        <el-table-column
        label="证件号码"
        prop="case_id_num"
        width="220">
        </el-table-column>
        <el-table-column
        label="委案金额"
        prop="case_money">
        </el-table-column>
        <el-table-column
        label="已还款"
        prop="case_paid">
        </el-table-column>
        <el-table-column
        label="通话时长"
        prop="last_call_billsec_int">
        </el-table-column>
        <el-table-column
        label="上次通话"
        prop="last_call">
        </el-table-column>
        <el-table-column
        label="委案日期"
        prop="case_date">
        </el-table-column>
    </el-table>
</template>
<script>
import router from '@/router.js'
export default {
    name:'tableCaseMan',
    props:[
        'tableData'
    ],
    data(){
        return{
            tableRowClassName({row, rowIndex}) {
                if (row.case_color == 1) {
                    return 'one'
                } else if (row.case_color == 7 ) {
                    return 'seven'
                } else if(row.case_color == 2){
                    return 'two'
                }else if(row.case_color == 3){
                    return 'three'
                }else if(row.case_color == 4){
                    return 'four'
                }else if(row.case_color == 5){
                    return 'five'
                }else if(row.case_color == 6){
                    return 'six'
                }
            }
        }
    },
    methods:{
        handleSelectionChange(val){
            this.$emit('handleSelectionChange',val)
        },
        doubleClickFn(row,event){
            router.push({
                path:'/caseDetails/',
                query:{
                    id:row.id
                }
            })
        }
    }
}
</script>



