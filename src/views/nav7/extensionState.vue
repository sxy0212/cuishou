<template>
  <section>
    <div class="TopForm">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" :index="index" label="序号" width="60"></el-table-column>                   
        <el-table-column prop="exten" label="分机号" ></el-table-column>
        <el-table-column prop="status" label="分机状态">
            <template slot-scope="scope">
                <span v-if="scope.row.status == -1" style="color:#e38028">分机找不到</span>
                <span v-else-if="scope.row.status == 0" style="color:#60b549">空闲</span>
                <span v-else-if="scope.row.status == 2" style="color:#0093fa">分机忙</span>
                <span v-else-if="scope.row.status == 4" style="color:#0093fa">不可用</span>
                <span v-else-if="scope.row.status == 8" style="color:#0093fa">振铃</span>
                <span v-else-if="scope.row.status == 9" style="color:#0093fa">振铃</span>
                <span v-else-if="scope.row.status == 16" style="color:#0093fa">正等待</span>
                <span v-else-if="scope.row.status == 1" style="color:#0093fa">通话中</span>
                <span v-else-if="scope.row.status == 18" style="color:#0093fa">小休</span>
                <span v-else-if="scope.row.status == 19" style="color:#0093fa">正忙</span> 
            </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP地址"></el-table-column>
        <el-table-column prop="port" label="端口号"></el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="scope">
                <el-button type="success" plain @click="changePass(scope.$index,scope.row)">修改密码</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="block"  v-show="!!total">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
          </el-pagination>
      </div>
    </div>
      <!--修改密码-->
      <div class="dial-header DialogueMain1">
        <el-dialog title="修改密码" :visible.sync="changePassword" :close-on-click-modal="false">
          <el-form  label-width="100px"  @submit.native.prevent>
            <el-form-item label="输入新密码：">
              <el-input type="password" v-model="editPassword.password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changePassSure">确认</el-button>
          </div>
        </el-dialog>
    </div>
  </section>
</template>
<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
export default {
	data() {
		return {
		  currentPage:1,     
      page:1,
      page_size:10,
      total:0,
      tableData: [],
      changePassword:false,
      editPassword:{
        exten:"", 
        password:""
      },
		}
	},
	activated() {
		this.init()   //页面数据初始化 
  },
	methods: {
		index(val){
      return (this.page-1)*this.page_size + val + 1
    },
    // 坐席状态数据初始化
    init(){
      const url = '/api/api_backend.php?r=seat-manage/seat-list'
      const page = this.page
      const page_size = this.page_size
      const conf = {
        url,
        data:{page,page_size},
        success:(data)=>{
          if(data.statusCode == 1){
            this.tableData = data.info.info
            this.total = parseInt(data.info.total)
          }else{
            this.tableData = []
            this.total = 0
          }
        }
      }
      axiosRequest(conf)
    },
    handleSizeChange(val) {
        this.page_size = val
        this.init()
    },
    handleCurrentChange(val) {
        this.page = val
        this.init()
    },
    // 修改密码
    changePass(index,row){
        this.editPassword.exten = row.exten
        this.editPassword.password = ""
        this.changePassword = true
    },
    changePassSure(){
        const password = (this.editPassword.password).trim()
        const exten = this.editPassword.exten
        const url = "/api/api_backend.php?r=seat-manage/change-pwd"
        const conf = {
            url,
            data:{exten,password},
            success:(data)=>{
              this.$alert(data.message)
                if(data.statusCode == 1){
                  this.changePassword = false
                }else{
                  this.changePassword = true
                }
            }
        }
        axiosRequest(conf)
    },
		}
	}

</script>