<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户开通</el-breadcrumb-item>
      <el-breadcrumb-item>公司设备</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="100px" @submit.native.prevent style="padding:30px 300px 30px 100px;background:#fff;">
      <el-form-item label="服务器类别:">
      <el-select v-model="form.server_type" placeholder="请选择">
        <el-option v-for="(item,index) in Data.device" :key="index" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="域名:">
        <el-input v-model="form.domain_name"></el-input>
      </el-form-item>
      <el-form-item label="ip:">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="root密码:">
        <el-input v-model="form.root_pwd"></el-input>			
      </el-form-item>
      <el-form-item label="硬件平台:">
        <el-select v-model="form.plat_form" placeholder="请选择">
        <el-option v-for="(item,index) in Data.software" :key="index" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="ssh端口:">
        <el-input  v-model="form.ssh_port"></el-input>
      </el-form-item>
        <el-form-item label="操作系统:">
         <el-select v-model="form.os"  placeholder="请选择">
        <el-option v-for="(item,index) in Data.os" :key="index" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="产品版本:">
         <el-select v-model="form.pro_version"  placeholder="请选择">
        <el-option v-for="(item,index) in Data.version" :key="index" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="规格:">
        <el-input  v-model="form.specificate"></el-input>
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
        Data:{
          device:[],
          software:[],
          os:[],
          version:[]
        },
				form: {
					server_type:"",
          domain_name:"",
          ip:"",
          root_pwd:"",
          plat_form:"",
          ssh_port:"",
          os:"",
          pro_version:"",
          specificate:""
				}
			}
		},
    beforeMount() {
      this.initData()
    },
		methods: {
      initData(){
        const url = "/api_backend.php?r=customer-device/select-data"
        const conf = {
          url,
          success:(data)=>{
           this.Data.device = data.info.device
           this.Data.software = data.info.software
           this.Data.os = data.info.os
           this.Data.version = data.info.version
          }
        }
        axiosRequest(conf)
      },
      save(){
        const url = "/api_backend.php?r=customer-device/device-add"
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