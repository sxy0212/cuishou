<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:20px;">
      <el-button type="success" @click="addProduct">添加产品</el-button>
    </div>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total?550:100"  v-loading="loading" >
          <el-table-column type="index" label="序号" width="60" :index="index" align="center"></el-table-column>
          <el-table-column prop="pro_name" label="产品名称" align="center"></el-table-column>  
          <el-table-column prop="pro_num" label="产品编号" align="center"></el-table-column>
          <el-table-column prop="pro_spec" label="产品规格" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" align="center"></el-table-column> 
          <el-table-column prop="sale_price" label="批发价" align="center"></el-table-column> 
          <el-table-column prop="detail" label="产品描述" align="center"></el-table-column> 
          <el-table-column prop="file_info" label="文件" align="center">
            <template slot-scope="scope">
              <a  v-for="(item,index) in scope.row.file_info" :key="index" :href="item.save_path" download style="color:#409EFF;display:block" >{{item.upload_name}}</a> 
              <el-upload style="float:left"
                  class="upload-demo"
                  ref="upload"
                  action="/api_backend.php?r=product-info/file-upload"
                  :show-file-list="false"
                  :on-success="successFile"
                  :before-upload="beforeUploadFile"
                  multiple
                  :data="files">
                  <el-button type="primary" plain @click="uploadFile(scope.row.id)">添加文档</el-button>
              </el-upload>
            </template>
          </el-table-column> 
          <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
          <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="pagination" v-show="!!total" style="margin:0 auto;width:300px;">
        <div class="block"> 
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
    <div>
    </div>
     <!--添加产品弹出层-->
      <div class="dial-header  addMins">
          <el-dialog title="产品添加" :visible.sync="addTask" :close-on-click-modal="false">
              <el-form :model="form" label-width="100px" ref="forms">
                  <el-form-item label="产品名称">
                      <el-input v-model="form.pro_name" ></el-input>
                  </el-form-item>
                  <el-form-item label="产品编号:">
                        <el-input v-model="form.pro_num" ></el-input>
                  </el-form-item>
                  <el-form-item label="产品规格:">
                        <el-input v-model="form.pro_spec" ></el-input>                       
                  </el-form-item>
                  <el-form-item label="单价:">
                    <el-input v-model="priceO" style="width:100px;"></el-input> 元
                    <el-input v-model="priceT"  style="width:100px;"></el-input> 个                                               
                  </el-form-item>
                  <el-form-item label="批发价:">
                    <el-input v-model="sale_priceO" style="width:100px;"></el-input> 元
                    <el-input v-model="sale_priceT"  style="width:100px;"></el-input> 个    
                  </el-form-item>
                  <el-form-item label="产品描述:">
                        <el-input v-model="form.detail"  type="textarea"></el-input>                       
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="onSubmit">确定</el-button>
                  <el-button type="primary" @click="addTask = false">关闭</el-button>
              </div>
          </el-dialog>
      </div>
      <!--编辑-->
       <div class="dial-header  addMins">
          <el-dialog title="产品添加" :visible.sync="editTask" :close-on-click-modal="false">
              <el-form :model="editData" label-width="100px" ref="forms">
                  <el-form-item label="产品名称">
                      <el-input v-model="editData.pro_name" ></el-input>
                  </el-form-item>
                  <el-form-item label="产品编号:">
                        <el-input v-model="editData.pro_num" ></el-input>
                  </el-form-item>
                  <el-form-item label="产品规格:">
                        <el-input v-model="editData.pro_spec" ></el-input>                       
                  </el-form-item>
                  <el-form-item label="单价:">
                    <el-input v-model="edit_priceO" style="width:100px;"></el-input> 元
                    <el-input v-model="edit_priceT"  style="width:100px;"></el-input> 个                                               
                  </el-form-item>
                  <el-form-item label="批发价:">
                    <el-input v-model="edit_sale_priceO" style="width:100px;"></el-input> 元
                    <el-input v-model="edit_sale_priceT"  style="width:100px;"></el-input> 个    
                  </el-form-item>
                  <el-form-item label="产品描述:">
                        <el-input v-model="editData.detail"  type="textarea"></el-input>                       
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="saveChange">确定</el-button>
                  <el-button type="primary" @click="editTask = false">关闭</el-button>
              </div>
          </el-dialog>
      </div>
  </section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
  export default {
		data() {
			return {
        // 添加产品
        addTask:false,
        form:{
          pro_name:"",
          pro_num:"",
          pro_spec:"",
          price:"",
          sale_price:"",
          detail:""
        },
        priceO:"",
        priceT:"",
        sale_priceO:"",
        sale_priceT:"",
        // 上传文档
        files:{
          id:"",
          file:""
        },
        // 数据列表
        currentPage:1,
        page:1,
        page_size:10,
        total:"",
        infos:[],
        loading:true,
        // 编辑信息
        editTask:false,
        editData:{

        },
        edit_priceO:"",
        edit_priceT:"",
        edit_sale_priceO:"",
        edit_sale_priceT:"",
			}
		},
    beforeMount() {
      this.init()
    },
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      init(){
        this.loading = true
        const url = "/api_backend.php?r=product-info/product-list"
        const conf = {
          url,
          data:{
            page:this.page,
            page_size:this.page_size
          },
          success:(data)=>{
            this.loading = false
            this.infos = data.info.info
            this.total = parseInt(data.info.total_count)
          }
        }
        axiosRequest(conf)
      },
      handleSizeChange(val){
        this.page_size = val
        this.init()
      },
      handleCurrentChange(val){
        this.page = val
        this.init()
      },
      addProduct(){
        this.addTask = true
      },
      onSubmit(){
        const url = "/api_backend.php?r=product-info/product-add"
        const data = this.form
        if(this.priceO == ''&&this.priceT == ''){
          data.price = ""
        }else{
          data.price = this.priceO+'元'+","+this.priceT+'个'
        }
        if(this.sale_priceO == '' && this.sale_priceT == ''){
          data.sale_price = ""
        }else{
          data.sale_price = this.sale_priceO+'元'+','+this.sale_priceT+'个'
        }
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.addTask = false
              this.init()
            }else{
              this.addTask = true
            }
          }
        }
        axiosRequest(conf)
      },
      // 上传文件
      uploadFile(id){
        this.files.id = id
      },
      beforeUploadFile(response) {
        var testmsg=response.name.substring(response.name.lastIndexOf('.')+1)                 
        const extension = testmsg === 'xls'  
        const extension2 = testmsg === 'xlsx'  
        const extension3 = testmsg === 'doc'  
        const extension4 = testmsg === 'txt'  
        const extension5 = testmsg === 'pdf'  
        const isJPG = response.type === 'image/jpeg';
        const isPNG = response.type === 'image/png';
        if (!isJPG&&!isPNG&&!extension&&!extension2&&!extension3&&!extension4&&!extension5) {
          this.$message.error('上传文件格式需要是.jpeg/.png/.xls/.xlsx/.doc/.txt/.pdf!');
          return false;
        }
        this.files.file = response.name
      },
      successFile(response,file,files){ 
          this.$alert(response.message)
          if(response.statusCode == 1){
           this.init()
          }
      },
      handleExceedFile(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`);
      },
      //编辑信息
      edit(a){
        this.editTask = true
        const id = a
        const url = "/api_backend.php?r=product-info/product-change"
        const conf = {
          url,
          data:{
            id:id,
            action:"show"
          },
          success:(data)=>{
            this.editData = data.info
            var x = data.info.price
            this.edit_priceO = x.split(",")[0].split('元')[0]
            this.edit_priceT = x.split(",")[1].split('个')[0]
            var y = data.info.sale_price
            this.edit_sale_priceO = y.split(",")[0].split('元')[0]
            this.edit_sale_priceT = y.split(",")[1].split('个')[0]
          }
        }
        axiosRequest(conf)
      },
      saveChange(){
        const url = "/api/api_backend.php?r=product-info/product-change"
        const data = this.editData
        data.action = "edit"
        if(this.edit_priceO == ''&&this.edit_priceT == ''){
          data.price = ""
        }else{
          data.price = this.edit_priceO+'元'+","+this.edit_priceT+'个'
        }
        if(this.edit_sale_priceO == '' && this.edit_sale_priceT == ''){
          data.sale_price = ""
        }else{
          data.sale_price = this.edit_sale_priceO+'元'+','+this.edit_sale_priceT+'个'
        }
        const conf = {
          url,
          data:data,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.editTask = false
              this.init()
            }else{
              this.editTask = true
            }
          }
        }
        axiosRequest(conf)
      }
	  }
	}
</script>
<style lang="scss">
  .addMins{
    .el-dialog{
      min-width:500px;
      width:500px;
      max-width:500px;
    }
  }  
</style>