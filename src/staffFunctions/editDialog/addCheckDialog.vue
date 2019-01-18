<template>
    <div class="checkDialog">
        <div class="dial-header  speci DialogueMain2">
            <div class="info_title">被叫号码:{{detail.dst}}</div>   
            <div class="info_details">
                <div class="infoCover" >
                    <span class="info_span">姓名:</span>{{detail.name}}
                </div>
                <div class="infoCover">
                    <span class="info_span">通话时长:</span> {{detail.billsec}}s
                </div>
                <div class="infoCover">
                    <span class="info_span">使用话术:</span> {{detail.template_name}}
                </div>
                <div class="infoCover">
                    <span class="info_span"> 所属批次: </span>  {{detail.batch_name}}
                </div>
            </div>
            <div class="dialogue call_details"> 
                <div class="totalRe">
                    <span> 完整录音 </span> 
                    <el-button type="primary" @click="download" :disabled="!detail.path">下载录音</el-button> 
                </div>
                <audio style="width:100%" ref="audio" :src="detail.path" controls="controls"  @click="playOne(detail.path)"></audio>  
                <div class="dialogueList" >
                    <ul id="messageBox">
                        <li 
                            style="font-size:14px;"
                            v-for="(item,index) in audioData"
                            :class="[{ 'layim-chat-mine':item.user==1 }, {'layim-chat-mine1':item.user==0}]" 
                            :key="index" 
                            >
                            <div class="layim-chat-user">
                                <img src="@/assets/images/yantong.png" v-if="item.user==1">
                                <img src="@/assets/images/user.png" v-if="item.user==0">                                    
                            </div>
                            <div v-if="item.user==0" class="everyone floatL" >
                                <p  style="margin:0">言小通 <i>{{item.create_time}}</i></p>
                                <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                            </div> 
                            <div v-if="item.user==1" class="everyone floatR" >
                                <p style="margin:0"><i>{{item.create_time}} </i>用户</p>
                                <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                            </div> 
                                <div v-if="item.user==0" class='floatL marginT'  v-show="item.path">
                                <img src="@/assets/images/textListen.png"  @click="textListen(item.path)" style="width:23px">
                            </div>
                            <div v-if="item.user==1" class="floatR marginT" v-show="item.path">
                                <img src="@/assets/images/textListen.png"  @click="textListen(item.path)" style="width:23px">
                            </div>
                        </li> 
                        <li>
                            <audio style="width:100%" ref="audioPlay"  autoplay></audio> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    name:'addCheckDialog',
    props:[
        'audioData',
        'detail'
    ],
    data(){
        return{
            spath:'',
        }
    },
    methods:{
        download(){
            this.$emit('download')
        },
        playOne(){
            if( !this.$refs.audioPlay.paused ){//其他播放,其他暂停
                this.$refs.audioPlay.pause()
            }
        },
        textListen(path){//单句录音播放
            this.$refs.audioPlay.src = path
            if( !this.$refs.audio.paused ){//其他播放，其他暂停
                this.$refs.audio.pause()
            }
        }
    }
}
</script>
<style >

.checkDialog .info div{line-height:30px;}
.checkDialog .info h3{margin-left:10px;font-size:18px;font-weight:400;}
.checkDialog .info span{margin-left:10px;}
.checkDialog .el-button span{margin-left:0;}
.checkDialog .info{ padding:10px 0; font-size:14px;background-color:rgba(0, 204, 255, 0.0980392156862745);}
.checkDialog .coverMiddle .middle{display:inline-block;vertical-align:top;}
.checkDialog .coverMiddle .middle:nth-of-type(1){width:18%;}
.checkDialog .coverMiddle .middle:nth-of-type(2){width:77%;}
.checkDialog .tableCover{margin: 15px 0;}
.checkDialog .redS{color:red;}
.checkDialog .el-button--mini, .el-button--mini.is-round{padding:4px 15px;}
.checkDialog .middle{margin:0 10px;}
.checkDialog .el-form--inline .el-form-item{margin-right:0;}
.checkDialog .el-form-item{margin-bottom:10px;}
.checkDialog .otherI{margin-bottom:15px;}
.checkDialog .el-date-editor span{margin-left:0;}
.checkDialog .middle .caseForm .el-form-item__label{font-size:12px;}
.checkDialog .middle .caseForm .el-form-item{margin-right:0;margin-bottom:5px;}






.checkDialog .dialogueList ul li{position: relative;font-size: 0;margin-bottom: 10px;padding-left: 60px;min-height: 68px; height: auto; overflow: hidden;}
.checkDialog .dialogueList ul li .el-button{ padding: 5px 10px;font-size: 12px}
.checkDialog .layim-chat-text, .layim-chat-user {display: inline-block;vertical-align: top;font-size: 14px;}
.checkDialog .layim-chat-user {position: absolute;left: 3px;}
.checkDialog .layim-chat-user img {width: 40px;height: 40px;border-radius: 100%;}
.checkDialog .layim-chat-user cite {position: absolute;left: 60px;top: -2px;width: 500px;line-height: 24px;font-size: 12px;white-space: nowrap;color: #999;text-align: left;font-style: normal;}
.checkDialog .layim-chat-user cite i {padding-left: 15px;font-style: normal;}
.checkDialog .layim-chat-text {position: relative;line-height: 22px;margin-top: 25px;padding: 8px 15px;background-color: #e2e2e2; border-radius: 3px;color: #333;word-break: break-all;max-width: 462px\9;}
.checkDialog .layim-chat-text:after {content: '';position: absolute;
    left: -10px;top: 13px;width: 0;height: 0;border-style: solid dashed dashed;border-color: #e2e2e2 transparent transparent;overflow: hidden;border-width: 10px;
}
.checkDialog .dialogueList{ height: 422px; border-bottom:1px solid #ececec;max-height: 452px; border-bottom:none;
    overflow-y: auto;  padding: 15px; background-size:cover;  }
.checkDialog .DialogueMain .dialogue {height:500px; background: #FFF}
.checkDialog .DialogueInput{ padding-top: 10px}
.checkDialog .dialogueList ul .layim-chat-mine {text-align: right;padding-left: 0;padding-right: 60px;min-height:100px}
.checkDialog .dialogueList ul .layim-chat-mine1 {min-height:120px}
.checkDialog .dialogueList ul .layim-chat-mine .layim-chat-user {left: auto;right: 3px;}
.checkDialog .dialogueList ul .layim-chat-mine .layim-chat-user cite {left: auto;right: 60px;text-align: right;}
.checkDialog .dialogueList ul .layim-chat-mine .layim-chat-user cite i {padding-left: 0;padding-right: 15px;}
.checkDialog .dialogueList ul .layim-chat-mine .layim-chat-text {margin-left: 0;text-align: left;background-color: #5FB878;color: #fff;}
.checkDialog .dialogueList ul .layim-chat-mine .layim-chat-text:after {left: auto;right: -10px;border-top-color: #5FB878;}

.checkDialog .DialogueMain .el-dialog__body{ padding: 10px 20px;}
.checkDialog .coverDialog .el-dialog__wrapper .el-dialog{width:90%;}
.checkDialog .coverDialog .el-dialog__body{overflow:hidden;}

.checkDialog .infoCover{max-height:50px;}
.checkDialog .info_span{color:#409EFF;}
.checkDialog .infoCover{font-size:17px;line-height:35px;}
.checkDialog .info_title{color:red;font-size:18px;margin-bottom:10px;}
.checkDialog .info_details{width:30%;height:561px;background:#fff;float:left;}
.checkDialog .call_details{width:60%;float:left;background:#fff;}
.checkDialog .everyone{max-width:80%;}
.checkDialog .floatL{float:left;}
.checkDialog .floatR{float:right;}
.checkDialog .marginT{margin-top:20px;}
.checkDialog .totalRe{display:flex;justify-content:space-between;margin-bottom:10px;}
</style>





