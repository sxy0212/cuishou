<template>
    <el-table
        border
        :data="templateList"
        style="width: 98%">
        <el-table-column
          label="序号"
          type='index'
          :index="methodIndex"
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
import indexMethod  from '@/utils/indexMethod.js'
export default {
    name:'tableTemplate',
    props:[
        'templateList',
        'templateUse',//决定给哪个模块使用
        'page',
        'page_size'
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
        },
        methodIndex(val){
            return indexMethod(val,this.page,this.page_size)
        },
        
    }
}
</script>

