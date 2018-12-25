 <template>
  <section>
    <div style="margin-bottom:10px;">
      <el-button type="success" @click="addBranch" style="diaplay:inline-block;float:left"><i class="fa fa-plus"></i>添加部门</el-button>
      <el-button type="success" @click="addMember" style="diaplay:inline-block;float:left">添加成员</el-button>
       <el-button type="success" @click="exportMember" style="diaplay:inline-block;float:left">导出成员</el-button>
       <el-upload style="diaplay:inline-block;float:left"
            class="upload-demo"
            action="/api/api_backend.php?r=collect-depart/staff-batch-add"
            :on-success="successFile"
            :before-upload="beforeUploadFile"
            multiple
            :limit="1" :file-list="fileList">
            <el-button type="success" style="margin-left:18px;">批量添加</el-button>
      </el-upload>
      <a href="/upload/staffTemplate.xlsx" download="模板.xlsx" style="display: inline-block;color: rgb(64, 158, 255);margin-left: 18px;width: 100px;line-height: 40px;height: 40px;border: 1px solid;border-radius: 5px;text-align: center;">
        下载模板
      </a>
    </div>
    <div style="margin-top:25px;">
      <div style="width:18%;float:left;" class="deparTree">
        <el-tree :data="Dates" node-key="id"  accordion :expand-on-click-node="false" :props="defaultProps2">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <el-input v-model="showName" v-show="data.id == showId" style="width:80%;height:20px;" @keyup.enter.native="editSave"></el-input>
                <span v-show="data.id != showId" class="node-word" :title="node.label">{{ node.label }}</span>
                <span style="display:inline-block">
                    <el-button type="text" size="mini" @click="edit(node, data)" style="padding:0">
                      <i class="fa fa-pencil"></i>编辑
                    </el-button>
                    <el-button type="text" size="mini" @click="remove(data.id)" style="padding:0">
                      <i class="el-icon-delete"></i>删除
                    </el-button>
                </span>
            </span>
        </el-tree>
      </div>
      <div style="float:left;width:81%;padding-left:3px;background:#fff;margin-left:10px;padding-left:10px;padding-right:10px;">
        <p style="padding:20px 0 10px 5px">剩余可添加催收员人数 <span style="color:red">{{rest_num}}</span>人</p>
        <el-table ref="multipleTable" :data="infos" style="width:100%" border height="600">
          <el-table-column type="index" label="序号" width="60"  fixed="left" :index="index"></el-table-column>
          <el-table-column prop="true_name" label="姓名" width="100"></el-table-column>  
          <el-table-column prop="depart_name" label="所在部门"></el-table-column>  
          <el-table-column prop="login_name" label="账号"></el-table-column>  
          <el-table-column prop="phone" label="联系方式"></el-table-column>  
          <el-table-column  label="操作" width="350">
            <template slot-scope="scope">
              <el-button type="primary" plain  @click="addMemberEdit(scope.$index,scope.row)" style="padding:10px">编辑</el-button>
              <el-button type="primary" plain  @click="editPassword(scope.$index,scope.row)" style="padding:10px">修改密码</el-button>
              <el-button type="primary" plain  @click="copyName(scope.$index,scope.row)" style="padding:10px">复制账号</el-button>
              <el-button type="primary" plain  @click="del(scope.row.id)" style="padding:10px">删除</el-button>
            </template>
          </el-table-column>
				</el-table>
			 <div class="block"> 
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="curr"
              :page-sizes="[10, 20, 25, 30]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
      </div>
      </div>
    </div>
    
    <!-- 添加部门弹框 -->
    <div class="dial-header DialogueMain2">
      <el-dialog title="添加部门" :visible.sync="node_operate" v-move>
        <el-form ref="form" :inline="true"  label-width="80px" >
          <div>
            <el-form-item label="上级部门:">
              <el-select v-model="form.parent_id" placeholder="请选择类型">
                <el-option label="一级目录" value="0"></el-option>
                <el-option v-for="(item,index) in Dates" :label="item.depart_name" :value="item.id" :key="index"></el-option>
              </el-select> 
            </el-form-item>
          </div>
          <div>
            <el-form-item label="部门名称:">
                <el-input v-model="form.depart_name"></el-input>
            </el-form-item> 
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">     
            <el-button type="primary" @click="addBranchSave">确认保存</el-button>
            <el-button type="primary" @click="node_operate = false">取消</el-button>
        </div>   
      </el-dialog>
    </div> 
     <!-- 添加成员弹框 -->
    <div class="dial-header DialogueMain2">
      <el-dialog title="添加成员" :visible.sync="addMemberDio" v-move>
        <el-form ref="formMember" :inline="true"  label-width="80px" >
          <div>
            <el-form-item label="上级部门:">
              <el-select v-model="formMember.depart_id" placeholder="请选择类型">
                <el-option v-for="(item,index) in Dates" :label="item.depart_name" :value="item.id" :key="index"></el-option>
                <el-option v-for="item in Dates" v-if="item.child.length>0" :label="item.child[0].depart_name" :value="item.child[0].id" :key="item.id"></el-option>
              </el-select> 
            </el-form-item>
          </div>
          <div>
            <el-form-item label="真实姓名:">
                <el-input v-model="formMember.true_name"></el-input>
            </el-form-item> 
          </div>
          <div>
            <el-form-item label="联系方式:">
                <el-input v-model="formMember.phone"></el-input>
            </el-form-item> 
          </div>
          <div>
            <el-form-item label="登录密码:">
                <el-input v-model="formMember.password"></el-input>
            </el-form-item> 
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">     
            <el-button type="primary" @click="addMemberSave">确认保存</el-button>
            <el-button type="primary" @click="addMemberDio = false">取消</el-button>
        </div>   
      </el-dialog>
    </div> 
     <!-- 右侧编辑 -->
    <div class="dial-header DialogueMain2">
      <el-dialog title="编辑" :visible.sync="addMemberDioEdit" v-move>
        <el-form ref="formMemberEdit" :inline="true"  label-width="80px" >
          <div>
            <el-form-item label="上级部门:">
              <el-select v-model="formMemberEdit.depart_id" placeholder="请选择类型">
                <el-option v-for="(item,index) in DatesEdit" :label="item.depart_name" :value="item.id" :key="index"></el-option>
                 <el-option v-for="item in Dates" v-if="item.child.length>0" :label="item.child[0].depart_name" :value="item.child[0].id" :key="item.id"></el-option>
              </el-select> 
            </el-form-item>
          </div>
          <div>
            <el-form-item label="真实姓名:">
                <el-input v-model="formMemberEdit.true_name"></el-input>
            </el-form-item> 
          </div>
          <div>
            <el-form-item label="联系方式:">
                <el-input v-model="formMemberEdit.phone"></el-input>
            </el-form-item> 
          </div>
          <div>
            <el-form-item label="登录账号:">
                <el-input v-model="formMemberEdit.login_name" disabled></el-input>
            </el-form-item> 
          </div>
          <div>
            <el-form-item label="登录密码:">
                <el-input v-model="formMemberEdit.password"></el-input>
            </el-form-item> 
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">     
            <el-button type="primary" @click="addMemberSaveEdit">确认保存</el-button>
            <el-button type="primary" @click="addMemberDioEdit = false">取消</el-button>
        </div>   
      </el-dialog>
    </div> 
    <!-- 修改密码弹框 -->
    <div class="dial-header DialogueMain2">
      <el-dialog title="修改密码" :visible.sync="editPasswordDio" v-move>
        <el-form ref="form" :inline="true"  label-width="80px" >
          <div>
            <el-form-item label="新密码:">
                <el-input v-model="editPasswordForm.password"></el-input>
            </el-form-item> 
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">     
            <el-button type="primary" @click="editPasswordSave">确认保存</el-button>
            <el-button type="primary" @click="editPasswordDio = false">取消</el-button>
        </div>   
      </el-dialog>
    </div> 
  </section>
</template> 
<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
	export default {
		data(){
      return {
        fileList:[],
        node_operate:false,
        showInput:false,     //左侧点击编辑变成输入框
        showId:"",
        showName:"",
				defaultProps2: {
          children: 'child',
          value:'parent_id',
          label: 'depart_name',
        },
        form:{
          parent_id:"0",
          depart_name:"",
          parent_str:""
        },
        Dates:[],
        addMemberDio:false,    //添加成员
        formMember:{
          depart_id :"",
          true_name:"",
          password:"",
          phone:"",
          depart_str:""
        },
        infos:[],
        rest_num:"",
        curr:1,
        total:0,
        page:1,
        page_size:10,
        // 编辑
        addMemberDioEdit:false,    //编辑
        DatesEdit:[],
        formMemberEdit:{
          depart_id :"",
          login_name:"",
          true_name:"",
          password:"",
          phone:"",
          depart_str:""
        },
        // 修改密码
        editPasswordDio:false,
        editPasswordForm:{
          password:"",
          id:""
        }
      }
		},
		activated() {
      this.initTree()
      this.init()
    },
		methods: {
      index(val){
        return  (this.page-1)*this.page_size+val+1
      },
      initTree(){
        const url = "/api/api_backend.php?r=collect-depart/sort-list"
        const conf = {
          url,
          success:(data)=>{
            this.Dates = data.info
          }
        }
        axiosRequest(conf)
      },
      // 添加部门
      addBranch(){
        this.node_operate = true
      },
      // 保存添加部门
      addBranchSave(){
        const url = "/api/api_backend.php?r=collect-depart/depart-add"
        const data = this.form;
        if(this.form.parent_id == 0){
          data.parent_str = '0'
        }else{
          data.parent_str = 0 + ',' +this.form.parent_id
        }
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.node_operate = false
              this.initTree()
              this.form.parent_id = "0"
              this.form.depart_name = ""
              this.form.parent_str = ""
            }else{
              this.node_operate = true
            }
            message(data)
          }
        }
        axiosRequest(conf)
      },
      // 左侧部门编辑
      edit(node,data){
        const id = data.id
        const url = "/api/api_backend.php?r=collect-depart/depart-show"
        const conf = {
          url,
          data:{id:id},
          success:(data)=>{
            this.showId = data.info.id
            this.showName = data.info.depart_name
          }
        }
        axiosRequest(conf)
      },
      // 左侧编辑保存
      editSave(){
        const url = "/api/api_backend.php?r=collect-depart/depart-edit"
        const conf = {
          url,
          data:{
            id:this.showId,
            depart_name:this.showName
          },
          success:(data)=>{
            this.$alert(data.message)
              this.showId = ""
              this.showName = "" 
              this.initTree()
          }
        }
        axiosRequest(conf)
      },
      // 添加成员
      addMember(){
        this.addMemberDio = true;
      },
      addMemberSave(){
        const url = "/api/api_backend.php?r=collect-depart/staff-add"
        const data = this.formMember
        data.depart_str = 0 + "," +data.depart_id
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.formMember.depart_id = ""
              this.formMember.true_name = ""
              this.formMember.password = ""
              this.formMember.phone = ""
              this.formMember.depart_str = ""
              this.addMemberDio = false
              this.init()
            }else{
              this.addMemberDio = true
            }
          }
        }
        axiosRequest(conf)
      },
      // 批量添加
      beforeUploadFile(file) {
        this.file = file.name
      },
            successFile(response,file,files){
              this.fileList = []
                if(response.statusCode == 1){
                    alert(response.message)
                }else{
                    this.$alert(response.message)
                    this.fileList = []
                }
            },
            handleExceedFile(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            
      // 删除部门
      remove(id){
        this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              const url = "/api/api_backend.php?r=collect-depart/depart-del"
              const conf = {
                url,
                data:{
                  id:id
                },
                success:(data)=>{
                  this.$alert(data.message)
                  this.initTree()
                }
              }
              axiosRequest(conf)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
        });
      },
      // 右侧数据
      init(){
        const url = "/api/api_backend.php?r=collect-depart/staff-list"
        const conf = {
          url,
          data:{
            page:this.page,
            page_size:this.page_size
          },
          success:(data)=>{
            this.infos = data.info.info
            this.total = parseInt(data.info.total)
            this.rest_num = data.info.rest_num
          }
        }
        axiosRequest(conf)
      },
      // 右侧编辑
      addMemberEdit(index,row){
        this.addMemberDioEdit = true
        const url = "/api/api_backend.php?r=collect-depart/staff-show"
        const conf = {
          url,
          data:{id:row.id},
           success:(data)=>{
            this.formMemberEdit = data.info.info
            this.DatesEdit = data.info.tree
          }
        }
        axiosRequest(conf)
      },
      addMemberSaveEdit(){
        const url = "/api/api_backend.php?r=collect-depart/staff-edit"
        const data = this.formMemberEdit
        data.depart_str = 0 + "," +data.depart_id
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.addMemberDioEdit = false
              this.init()
            }else{
              this.addMemberDioEdit = true
            }
          }
        }
        axiosRequest(conf)
      },
      // 修改密码
      editPassword(index,row){
        this.editPasswordDio = true;
        this.editPasswordForm.id = row.id
      },
      editPasswordSave(){
        const url = "/api/api_backend.php?r=collect-depart/staff-change-pwd"
        const data = this.editPasswordForm
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode==1){
              this.editPasswordDio = false
              this.editPasswordForm.id = ""
              this.editPasswordForm.password = ""
              this.init()
            }else{
              this.editPasswordDio = true
            }
          }
        }
        axiosRequest(conf)
      },
      // 复制
      exportMember(){
        window.open('/api/api_backend.php?r=collect-depart/staff-export')
      },
      copyName(index,row){
        this.Copy(row.login_name)
      },  
      Copy(str){ 
        var save = function(e){ 
        e.clipboardData.setData('text/plain', str); 
        e.preventDefault(); 
        } 
        document.addEventListener('copy', save); 
        document.execCommand('copy'); 
        document.removeEventListener('copy',save); 
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      },
      // 删除
			del(id){
        this.$confirm('确定删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  	const url = "/api/api_backend.php?r=collect-depart/staff-del"
                    const conf = {
                      url,
                      data:{
                        id:id
                      },
                      success:(data)=>{
                        this.$alert(data.message)
                        this.init()
                      }
                    }
                   axiosRequest(conf)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
              });
			},
      downloadWord(){
        window.open("/upload/staffTemplate.xlsx")
      },
      handleCurrentChange(val){
        this.page = val
        this.init()
      },
      handleSizeChange(val){
        this.page_size = val
        this.init()
      }
    }
  }
</script>
<style lang="scss" >
.DialogueMain2 .el-dialog{width:35%}
.el-tree .el-tree-node{background:#fff}
.deparTree .el-tree{height:650px;padding-top:20px;}
.node-word{max-width: 101px;float:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>   