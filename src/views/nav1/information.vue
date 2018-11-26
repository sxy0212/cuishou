<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户开通</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="210px" @submit.native.prevent style="padding:30px 300px 30px 30px;background:#fff;">
      <div style="margin-bottom:10px;">
        <span style="border-left: 2px solid #3798e8;padding-left: 10px;font-size: 16px;">基本信息</span>
      </div>
      <el-form-item label="客户名称:"> 
        <span style="color:red">*</span>
        <el-input v-model="form.custom_name" style="width:216px;"></el-input> 
      </el-form-item>
      <el-form-item label="客户类型:"> 
        <span style="color:red">*</span> 
        <el-radio v-model="form.custom_type" label="1">个人</el-radio>
        <el-radio v-model="form.custom_type" label="2">企业</el-radio>
      </el-form-item>
      <el-form-item label="行业分类:">
        <span style="color:red">*</span>
        <el-input v-model="form.industry_type" style="width:216px;"></el-input> 
      </el-form-item>
      <el-form-item label="企业注册地址:">
        <span style="color:red">*</span> 
        <el-cascader :options="cityLists" change-on-select @change="getCity" :props="props"></el-cascader>
      </el-form-item>
      <el-form-item label="信息来源:">
        <span style="color:red">*</span> 
        <el-input v-model="form.src_info" style="width:216px;"></el-input>			
      </el-form-item>
      <el-form-item label="业务员:">
        <span style="color:red">*</span> 
        <el-select v-model="form.sales_man" placeholder="请选择">
          <el-option v-for="(item,index) in sales" :key="index" :label="item.user_name" :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人:">
        <span style="color:red">*</span> 
        <el-input  v-model="form.contact" style="width:216px;"></el-input>
      </el-form-item>
      <el-form-item label="单价(一次付清或者月付):">
        <span style="color:red">*</span> 
        <el-input  v-model="form.price" style="width:216px;"></el-input>
      </el-form-item>
      <el-form-item label="总金额:">
        <span style="color:red">*</span> 
        <el-input  v-model="form.total_price" style="width:216px;"></el-input>
      </el-form-item>
      <el-form-item label="是否付清(已付多少,未付多少):">
        <span style="color:red">*</span> 
        <el-input  v-model="form.is_payoff" style="width:216px;"></el-input>
      </el-form-item>
      <el-form-item label="使用期限:">
        <span style="color:red;float:left">*</span> 
        <ul style="list-style:none;float:left;margin-top:5px;margin-left:-35px;">
         <li style="float:left"><el-date-picker v-model="fromdate" type="datetime" placeholder="开始日期" default-time="00:00:00" :picker-options="pickerOptions0" :clearable="false" ></el-date-picker></li>
        <li style="float:left">~</li>
        <li style="float:left"><el-date-picker v-model="todate" type="datetime" placeholder="结束日期"  default-time="23:59:59" :picker-options="pickerOptions1" :clearable="false" ></el-date-picker></li>
        </ul>
       
      </el-form-item>
      <el-form-item label="签订时间:">
        <span style="color:red">*</span> 
        <el-date-picker v-model="signTime" type="datetime" placeholder="签订" default-time="00:00:00" :picker-options="pickerOptions0" :clearable="false" ></el-date-picker></li>
      </el-form-item>
      <el-form-item label="呼叫线路（客户自己提供voip线路/客户goip/言通提供）:">
        <span style="color:red">*</span> 
        <el-input  v-model="form.line" style="width:216px;"></el-input>
      </el-form-item>
      <el-form-item label="售后小组:">
        <span style="color:red">*</span> 
        <el-input  v-model="form.after_sale" style="width:216px;"></el-input>
      </el-form-item>
      <div style="margin-bottom:30px;">
        <span style="border-left: 2px solid #3798e8;padding-left: 10px;font-size: 16px;">企业资质</span>
      </div>
      </el-form-item>
      <el-form-item label="营业执照:">
        <span style="color:red;float:left">*</span> 
          <el-upload style="float:left"
                  class="upload-demo"
                  ref="upload"
                  action="/api_backend.php?r=customer-device/upload"
                  :on-success="successFile"
                  :before-upload="beforeUploadFile"
                  multiple
                  :data="files" :file-list="fileList">
                  <el-button type="primary" plain ><i class="fa fa-upload" style="width:40px">选择</i></el-button>
                  <span style="color:red">文件必选</span>
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
import {formatDate} from "@/assets/js/Yt.js"
	export default {
		data() {
			return {
        pickerOptions0: {
          disabledDate: (time) => {                 
                  return time.getTime() > Date.now()-24*60*60*1000
              }
          },
        pickerOptions1: {
          disabledDate:(time) => {
            if(this.fromdate != ""){
              let currentTime = this.fromdate;
              return time.getTime() < currentTime || time.getTime() > Date.now()-24*60*60*1000 ;
            }else{
              return time.getTime() > Date.now()-24*60*60*1000
            }
          }
        } , 
				form: {
          src_info:"",
          sales_man:"",
          custom_type:"",
          custom_name:"",
          contact:"",
          address:"",
          certificate_url:"",
          industry_type:"",
          price:"",
          total_price:"",
          is_payoff:"",
          use_period:"",
          signed_time:"",
          line:"",
          after_sale:"",
          address:"",
				}, 
        fromdate:new Date(new Date().setHours(0, 0, 0, 0)), //通话时间最小范围
        todate: new Date(new Date().setHours(23, 59,59, 59)+24*60*60*1000*30), //通话时间最大范围 
        signTime:new Date(new Date().setHours(0, 0, 0, 0)),      //签订时间
        city:'',      //获取当前地区
        cityLists: [],
        sales:[],     //业务员
        props: {
          value: 'label',
          children: 'child'
        },
        fileList: [],     //上传文件
        files:{
          certificate_url:""
        },
        certificate_url:[]
			}
		},
    beforeMount() {
      this.getCityLists()
      this.getSales()
    },
		methods: {
      // 城市列表
      getCityLists(){
         const url ="/api_backend.php?r=customer-device/citys"
          const conf = {
            url,
            success:(data)=>{
              this.cityLists = data.info
            }
          }
          axiosRequest(conf)
      },
      getCity(val){
        this.form.address = val.join("")
      },
      // 业务员列表
      getSales(){
        const url = "/api_backend.php?r=customer-device/sales"
        const conf = {
          url,
          success:(data)=>{
            this.sales = data.info
            console.log(data)
          }
        }
        axiosRequest(conf)
      },
      // 上传文件
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
        this.files.certificate_url = response.name
      },
      successFile(response,file,files){ 
          this.$alert(response.message)
          if(response.statusCode == 1){
            this.certificate_url.push(response.info)
          }else{
              this.certificate_url = []
              this.fileList= []
          }
          this.form.certificate_url = this.certificate_url.join(",")
      },
      handleExceedFile(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`);
      },
      // 保存添加
      save(){
        const url = "/api_backend.php?r=customer-device/custom-add"
        const data = this.form
        data.use_period =formatDate(this.fromdate,"yyyy-MM-dd hh:mm:ss") + "-" +formatDate(this.todate,"yyyy-MM-dd hh:mm:ss") 
        data.signed_time = formatDate(this.signTime,"yyyy-MM-dd hh:mm:ss")
        const conf = {
          url,
          data:this.form,
          success:(data)=>{
            this.$alert(data.message)
            if(data.statusCode == 1){
              this.form = {}
              this.fromdate = new Date(new Date().setHours(0, 0, 0, 0))
              this.todate = new Date(new Date().setHours(23, 59,59, 59)-24*60*60*1000*30)
              this.signTime = new Date(new Date().setHours(0, 0, 0, 0))
              this.fileList = []
            }
          }
        }
        axiosRequest(conf)
      }
		
  }
	}

</script>