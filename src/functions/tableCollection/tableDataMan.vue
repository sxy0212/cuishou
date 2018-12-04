<template>
    <el-table
        border
        :data="tableData"
        style="width: 98%"
        @selection-change="handleSelectionChange"
    >
         <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
          label="资料编号"
          prop="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="batch_name"
          label="批次名称"
          >
        </el-table-column>
        <el-table-column
          prop="collection_area"
          label="催收区域"
          >
        </el-table-column>
        <el-table-column
          prop="client"
          label="委托方"
          >
        </el-table-column>
        <el-table-column
          prop="case_type"
          label="案件类型"
          >
        </el-table-column>
        <el-table-column
          prop="row_count"
          label="户数"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="总金额"
          >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="上传时间"
          >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="批次备注"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size="mini" type="success" plain round @click="editFn(scope.row)">追加</el-button>
            <el-button size="mini" type="danger" plain round @click="deleteFn(scope.row)">删除</el-button>
            <el-button size="mini" type="info" plain round @click="deleteFn(scope.row)">导出</el-button>
            <el-button size="mini" type="primary" plain round @click="deleteFn(scope.row)">添加到任务</el-button>
          </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableDataMan',
    props:[
        'tableData'
    ],
    methods:{
        handleSelectionChange(val){
            this.$emit('handleSelectionChange',val)
        }
    }
}
</script>

