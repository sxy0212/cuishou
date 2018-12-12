<template>
  <section>
    <div class="smssend">
      <div style="float:left;width:40%">
        <el-form ref="form" :model="form" label-width="100px" :inline="true" @submit.native.prevent>
          <div>
            <el-form-item label="发送号码：">
              <el-input v-model="form.mobile" style="width:300px;"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="短信内容：">
                <el-input type="textarea" v-model="form.content" style="width:300px;" :rows="5"></el-input>
                <div style="color:red">提示：当前一次只能发送一条短信</div>
            </el-form-item>
          </div>
          <div>
            <el-button type="primary" @click="sendNow" style="margin-left:200px;">立即发送</el-button>
          </div>
        </el-form> 
      </div>
      <div style="float:left;width:45%;border:1px solid #409EFF;border-radius:5px">
        <div style="font-size: 18px;text-align: center;margin-bottom: 10px;">短信模板</div>
          <el-tabs tab-position="left" style="height: 200px;"  @tab-click="handleClick" v-model="active">
              <el-tab-pane :label="item.name" v-for = "(item,index) in messageList" :name="item.id" :key="index">
              </el-tab-pane> 
              <ul style="display:block;">
                <li v-for="(item,index) in rightList" style="border:1px solid #eee;background:#fff;cursor: pointer;height:30px;line-height:30px;text-align:center" @click="getContent(index)">{{item.content}}</li>
              </ul>
          </el-tabs>
      </div>
  </div>
    </div>
    
    
        </section>
    </template>
    <script>
import {axiosRequest,formatDate} from '@/assets/js/Yt.js'
import { MessageBox } from 'element-ui';
export default {
		data() {
			return {
       userList:[],
       active:"",
            messageList:[],
            form: {
              id:"",
              mobile:"",
              content:'',
              sms_id:""
            },
            rightList:[]
      }
		},
	
    beforeMount() {
      this.AddInitSms()
    },
		methods: {
      //获取短信模板
      // 点击获取短信
			AddInitSms(){
				const url = "/api/api_backend.php?r=sms-rule/list"
				const conf = {
					url,
					success:(data)=>{
            if(data.info.length>0){
             	this.messageList = data.info
              this.rightData(this.messageList[0].id)
              this.active = this.messageList[0].id 
            }else{
              this.rightList = []
            }
					
					}
				}
				axiosRequest(conf)
			},
      getContent(index){
        this.form.content = this.rightList[index].content
        this.form.sms_id = this.rightList[index].id
      },
      sendNow(){
        const data = this.form
        data.id = this.active
        const conf = {
            url:"/api/api_backend.php?r=sms-rule/send-sms",
            data:data,
            success:(data)=>{
              this.$alert(data.message)
                if( data.statusCode == 1 ){
                    this.active = this.messageList[0].id
                    this.form.mobile = ""
                    this.form.content = ""
                }
            }
          }
          axiosRequest(conf)
      },
             // 改变左侧的卡片获取右边数据
            handleClick(tab, event) {
              this.form.id = tab.name
              this.rightData(tab.name)
            },
            rightData(node){ 
                this.rightList = []
                const url = "/api/api_backend.php?r=sms-rule/round-list"
                const conf = {
                    url,
                    data:{id:node},
                    success:(data)=>{
                        this.rightList = data.info
                    }
                }
                axiosRequest(conf)
            },
    }
	}

</script>
<style lang="scss">
.smssend .el-tabs__content{margin-left:60px;margin-top:-10px;overflow:visible}
</style>