<template>
    <el-table
        border
        :data="tableData"
        style="width: 98%">
        <el-table-column
          label="序号"
          type='index'
          :index='methodIndex'
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
import indexMethod  from '@/utils/indexMethod.js'
export default {
    name:'tableCaseCon',
    props:[
        'tableData',
        'page',
        'page_size'
    ],
    methods:{
        editFn(val){
            this.$emit('editFn',val)
        },
        deleteFn(val){
            this.$emit('deleteFn',val)
        },
        methodIndex(val){
            return indexMethod(val,this.page,this.page_size)
        },
        
    }
}
</script>
