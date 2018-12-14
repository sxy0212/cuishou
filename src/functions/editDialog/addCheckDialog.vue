<template>
    <div>
        <div class="dial-header  speci DialogueMain2">
            <div class="info_title">被叫号码:{{detail.dst}}</div>   
            <div class="info_details">
                <div class="infoCover" >
                    <span class="info_span">姓名:</span>{{detail.name}}
                </div>
                <div class="infoCover">
                    <span class="info_span">通话时长:</span> {{detail.billsec}}
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
                    <el-button type="primary" @click="download" >下载录音</el-button> 
                </div>
                <audio style="width:100%" :src="spath" controls="controls" id="play1" @click="playOne"></audio>  
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
                                <div v-if="item.user==0" class='floatL marginT'  v-show="item.record">
                                <img src="@/assets/images/textListen.png"  @click="textListen(item.record)" style="width:23px">
                            </div>
                            <div v-if="item.user==1" class="floatR marginT" v-show="item.record">
                                <img src="@/assets/images/textListen.png"  @click="textListen(item.record)" style="width:23px">
                            </div>
                        </li> 
                        <li>
                            <audio style="width:100%" :src="textAudio" id="audioPlay" autoplay></audio> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/dialog.css'
export default {
    name:'addCheckDialog',
    props:[
        'audioData',
        'detail'
    ],
    data(){
        return{
            spath:'',
            textAudio:'',
        }
    },
    methods:{
        textListen(path){

        },
        download(){

        },
        playOne(){

        },
        handleClose(){

        }
    }
}
</script>
<style >


</style>





