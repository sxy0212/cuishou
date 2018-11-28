<template>
  <div class="cover">
    <div> 
        <el-button @click='addFn'>添加区域</el-button>
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
          label="区域名称"
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
import addArea from '@/components/editDialog/addArea.vue'
import  { axiosRequest } from '@/assets/js/Yt.js'
export default {
    components:{
        'edit-dialog':addArea
    },
    data() {
        return {
            page:1,
            pageSize:10,
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
        this.init()
    },
    methods: {
        init(){
            // let url,data
            let conf = {
                url : '/api/api_backend.php?r=system-setting/area-list',
                data : {
                    page:this.page,
                    pageSize:this.pageSize
                },
                success:(data)=>{
                    console.log(data)

                }
            }
            axiosRequest(conf)
        },
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

