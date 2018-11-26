<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息群发</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-form ref="form"  label-width="90px" >
        <ul class="up">
          <li> 
            <div :inline="true" style="height:50px;line-height:50px">
                    <el-radio v-model="radio" label="1"  style="float:left;line-height: 35px;" @change="changeRadio">全部平台</el-radio>
                </div>
               <div  :inline="true" style="height:50px;line-height:50px">
                    <el-radio v-model="radio" label="2" style="float:left;line-height:50px" @change="changeRadio">个别平台</el-radio>
                    <el-checkbox-group 
                        v-model="checked"
                        :min="1"
                        style="float:left;"  @change="changeCheck">
                        <el-checkbox :label="item.key" :value="item.value" v-for="(item,index) in platform" :key="index" >{{item.key}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </li>
            <li>
              <el-input v-model="content" placeholder="消息内容" type="textarea" row="5" style="width:500px;"></el-input>
            </li>
            <li style="margin-top:10px;">
              <el-button type="primary" @click="send">发送</el-button>
            </li>
        </ul>  
      </el-form>
      </div>
    
  </section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
  export default {
		data() {
			return {
        radio:'',
        platform:[],    //平台
        checked:[],
        content:""
			}
		},
    beforeMount() {
      this.initData()
     
    },
		methods: {
      initData(){
        const url = "/api_backend.php?r=call-statics/platform"
        const conf = {
          url,
          success:(data)=>{
           this.platform = data.info.ai;
          }
        }
        axiosRequest(conf)
      },
      changeRadio(val){
        this.radio = val
      },
      changeCheck(val){
        this.checked = val
      },
      send(){
        var x = ''
        if(this.radio == 1){
          x = 'all';
        }else{
          x = this.checked.join(',')
        }
        if(this.content.trim()){
          const url = "/api_backend.php?r=message-inform/send-msg"
          const conf = {
            url,
            data:{
              plat_form:x,
              content:this.content
            },
            success:(data)=>{
              this.$alert(data.message)
              if(data.statusCode == 1){
                this.radio = ""
                this.checked = []
                this.content = ""
              }
            }
          }
          axiosRequest(conf)
        }else{
          this.$alert("发送内容不能为空!")
        }
       
      },
	  }
	}
</script>
<style lang="scss" scoped>
  .up {
    li{
      list-style:none;
    
    }
  }
  .el-checkbox+.el-checkbox{margin-left:10px;}
  
</style>