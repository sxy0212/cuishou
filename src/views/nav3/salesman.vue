<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务员信息录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="210px" @submit.native.prevent style="padding:30px 300px 30px 30px;background:#fff;">
      <div style="margin-bottom:10px;">
        <span style="border-left: 2px solid #3798e8;padding-left: 10px;font-size: 16px;">必填信息</span>
      </div>
      <el-form-item label="业务员姓名:"> 
        <span style="color:red">*</span>
        <el-input v-model="form.user_name" style="width:216px;"></el-input> 
      </el-form-item>
      <el-form-item label="所属部门:"> 
        <span style="color:red">*</span> 
        <el-select v-model="form.depart_id" placeholder="请选择">
          <el-option v-for="(item,index) in department" :key="index" :label="item.depart_name" :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码:">
        <span style="color:red">*</span>
        <el-input v-model="form.password" style="width:216px;"></el-input> 
      </el-form-item>
      <div style="margin-bottom:30px;">
        <span style="border-left: 2px solid #3798e8;padding-left: 10px;font-size: 16px;">选填信息</span>
      </div>
      <el-form-item label="性别:">     
        <el-radio v-model="form.sex" label="1">男</el-radio>
        <el-radio v-model="form.sex" label="2">女</el-radio>
      </el-form-item>
       <el-form-item label="电话:">
        <el-input  v-model="form.phone" style="width:216px;"></el-input>
      </el-form-item>
       <el-form-item label="邮箱:">
        <el-input  v-model="form.email" style="width:216px;"></el-input>
      </el-form-item>
       <el-form-item label="个人介绍:">
        <el-input  v-model="form.comment" style="width:216px;" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="头像:">
          <div style="width:100px;height:100px;float:left" v-show="show">
            <img :src="src" style="display: block;width: 100%;height: 100%;border-radius: 50%;">
          </div>
          
          <el-upload style="float:left"
                  class="upload-demo"
                  ref="upload"
                  action="/api_backend.php?r=crm-user-info/upload"
                  :show-file-list="false"
                  :on-success="successFile"
                  :before-upload="beforeUploadFile"
                  :on-exceed="handleExceed"
                  multiple
                  :limit="1"
                  :data="files" >
                  <el-button type="primary" plain ><i class="fa fa-upload" style="width:40px">选择</i></el-button>
          </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click.native.prevent>取消</el-button>
      </el-form-item>
    </el-form>
  </section>

</template>

<script>
import {axiosRequest} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
        src : "",
				form: {
          user_name:"",
          depart_id:"",
          password:"",
          pic:"",
          sex:"1",
          phone:"",
          email:"",
          comment:"",
         }, 
        show:true,
        department:[],     //业务员
        files:{
          file:""
        },
			}
		},
    beforeMount() {
      if(this.src == ""){
        this.show = false
      }
      this.getDepartment()
    },
		methods: {
      // 业务员所属部门列表
      getDepartment(){
        const url = "/api_backend.php?r=crm-user-info/depart-info"
        const conf = {
          url,
          success:(data)=>{
            this.department = data.info
            console.log(data)
          }
        }
        axiosRequest(conf)
      },
      // 上传文件
      beforeUploadFile(response) {
        const isJPG = response.type === 'image/jpeg';
        const isPNG = response.type === 'image/png';
        if (!isJPG&&!isPNG) {
          this.$message.error('上传文件格式需要是.jpeg/.png!');
          return false;
        }
        this.files.file = response.name
      },
      successFile(response,file,files){ 
          this.$alert(response.message)
          if(response.statusCode == 1){
            this.form.pic = response.info 
            this.src = URL.createObjectURL(file.raw)
            this.show = true
          }else{
              this.form.pic = ""
          }
      },
      handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`);
      },
      // 保存添加
      save(){
        const url = "/api_backend.php?r=crm-user-info/user-add"
        const data = this.form
        const conf = {
          url,
          data:this.form,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.form = {}
            }
          }
        }
        axiosRequest(conf)
      }
		
  }
	}

</script>