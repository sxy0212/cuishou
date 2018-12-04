<template>
    <el-table
        border
        :data="tableData"
        style="width: 98%">
        <el-table-column
          label="序号"
          prop="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="区域名称"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size="mini" type="success" round @click="editFn(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" round @click="deleteFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name:'tableDataMan',
    props:[
        'tableData'
    ]
}
</script>

