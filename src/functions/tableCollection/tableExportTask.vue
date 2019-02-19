<template>
    <el-table
        border
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
        label="序号"
        type="index"
        :index="index"
        width="55">
        </el-table-column>
        <el-table-column
        label="任务名称"
        prop="name"
        >
        </el-table-column>
        <el-table-column
        label="文件来源"
        prop="type">
            <template slot-scope="scope">
                <span v-if="scope.row.type == 1">通话记录</span>
                <span v-if="scope.row.type == 2">语音文件</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="文件状态"
          >
            <template slot-scope="scope">
                <span v-if="scope.row.status == 1">可下载</span>
                <span v-else-if="scope.row.status == 0">文件正在导出中</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="create_time"
        label="创建时间"
        >
        </el-table-column>
        <el-table-column prop="path" label="操作" fixed="right">
            <template slot-scope="scope">
                <a :href="scope.row.path" download style="color:#409EFF" v-show="scope.row.status == 1">下载</a>
            </template>
        </el-table-column>
        <el-table-column
        prop="case_status"
        label="操作"
        >
            <template slot-scope="scope">
               <el-button size="mini" type="danger" round @click="deleteFn(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import router from '@/router.js'
export default {
    name:'tableCaseMan',
    props:[
        'tableData',
        'page',
        'page_size'
    ],
    data(){
        return{
            
        }
    },
    methods:{
        deleteFn(row){
            this.$emit('deleteFn',row)
        },
        index(val){
            return (this.page-1)*this.page_size+val+1
        },
    }
}
</script>



