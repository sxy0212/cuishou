<template>
  <div>
    <el-table
        border
        :data="tableData"
        style="width: 98%"
      >
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
        prop="money"
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
        width='250'
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain round @click="addToFn(scope.row)">追加</el-button>
          <el-button size="mini" type="danger" plain round @click="deleteFn(scope.row)">删除</el-button>
          <el-button size="mini" type="info" plain round @click="exportFn(scope.row)">导出</el-button>
          <el-button size="mini" type="primary" plain round @click="addToTask(scope.row)">添加到任务</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加到外呼任务" :visible.sync="addTask" >
        <div>
            <el-select v-model="taskValue" placeholder="请选择">
              <el-option
                v-for="item in taskList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
          </el-select>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="sureToAddTask">确认添加</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:'tableDataMan',
    props:[
        'tableData',
        'taskValue',
        'taskList',
        'addTask'
    ],
    methods:{
      deleteFn(val){
        this.$emit('deleteFn',val)
      },
      exportFn(val){
        this.$emit('exportFn',val)
      },
      addToFn(val){
        this.$emit('addToFn',val)
      },
      addToTask(val){
        this.$emit('addToTask',val)
      },
      sureToAddTask(val){
        this.$emit('sureToAddTask',val)
      }
    }
}
</script>

