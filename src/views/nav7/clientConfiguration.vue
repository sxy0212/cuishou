<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn'>添加委托方</el-button>
    </div>
    <div class="tableCover">
      <el-table
        border
        :data="tableData"
        style="width: 98%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="miniImage"
          label="委托方名称"
          >
        </el-table-column>
        <el-table-column
          prop="miniImage"
          label="前缀"
          >
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="bannerTitle" :visible.sync="addNow" >
        <edit-dialog></edit-dialog>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/system.css'
import addClient from '@/components/editDialog/addClient.vue'
export default {
    components:{
        'edit-dialog':addClient
    },
    data() {
    
        return {
            bannerTitle:"区域添加",
            addNow:false,
            tableData: [{
                miniImage: '上海市普陀区'
            }, {
                miniImage: '闵行区'
            }]
            
        }
    },
    created() {
        
    },
    methods: {
        addFn(){
            this.addNow = true
        },
        handleEdit(){

        },
        handleDelete(){
        
        }
    }
}
</script>
<style>
</style>

