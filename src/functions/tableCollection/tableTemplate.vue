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
          label="模板名称"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          >
          <template slot-scope="scope">
            <el-button size="mini" type="success" round @click="editFn(scope.row)" v-show="templateUse">编辑</el-button>
            <el-button size="mini" type="primary" round @click="downloadFn(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" round @click="deleteFn(scope.row)" v-show="templateUse">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
</template>
<script>
export default {
    name:'tableTemplate',
    props:[
        'tableData',
        'templateUse'//决定给哪个模块使用
    ],
    methods:{
        editFn(val){
            this.$emit('editFn',val)
        },
        downloadFn(val){
            this.$emit('downloadFn',val)
        },
        deleteFn(val){
            this.$emit('deleteFn',val)
        }
    }
}
</script>

