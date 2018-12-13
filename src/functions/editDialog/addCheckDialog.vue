<template>
    <div>
         <div class="dial-header  DialogueMain2">
        
                <div style="padding-bottom:10px;padding-left:5%">被叫号码:{{detail.phone}}</div>   
                <div style="width:30%;height:561px;background:#fff;float:left;padding-left:5%">
                   <div style="max-height:50px;">
                        <span style="color:#409EFF">客户姓名:</span>{{detail.user_name}}
                   </div>
                   <div style="max-height:100px;">
                       <span style="color:#409EFF">客户地址:</span> {{detail.address}}
                   </div>
                   <div style="max-height:50px;">
                       <span style="color:#409EFF">通话时长:</span> {{detail.billsec}}
                   </div>
                   <div data="detail.scores" style="max-height:50px;">
                        <span style="color:#409EFF"> 客户分类: </span>
                        <span v-if='detail.scores <= 49 && detail.scores >=0'>E类客户</span>
                        <span v-else-if='detail.scores <= 69 && detail.scores >=60'>C类客户</span>
                        <span v-else-if='detail.scores <= 59 && detail.scores >=50'>D类客户</span>
                        <span v-else-if='detail.scores <= 79 && detail.scores >=70'>B类客户</span>
                        <span v-else-if='detail.scores >=80'>A类客户</span>
                   </div>
                   <div style="max-height:50px;">
                       <span style="color:#409EFF">号码归属地:</span> {{detail.numberAssigned}}
                   </div>
                </div>
                   <div class="dialogue" style="width:60%;float:left;background:#fff;padding-right:5%"> 
        <div style="display:flex;justify-content:space-between;margin-bottom:10px">
            <span> 完整录音 </span> 
            <el-button type="primary" @click="download" >下载录音</el-button> 
        </div>
        <audio style="width:100%" :src="spath" controls="controls" id="play1" @click="playOne"></audio>  
        <div class="dialogueList" style="border-bottom:none">
            <ul id="messageBox">
                <li 
                    style="font-size:14px;"
                    v-for="item in audioData"
                    :class="[{ 'layim-chat-mine':item.user==1 }, {'layim-chat-mine1':item.user==0}]" 
                    :key="item.uniqueid" 
                    >
                    <div class="layim-chat-user">
                        <img src="<?=STATIC_BACKEND?>/images/yantong.png" v-if="item.user==1">
                        <img src="<?=STATIC_BACKEND?>/images/user.png" v-if="item.user==0">                                    
                    </div>
                    <div v-if="item.user==0" style="max-width:420px;float:left">
                        <p  style="margin:0">言小通 <i>{{item.create_time}}</i></p>
                        <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                    </div> 
                    <div v-if="item.user==1" style="max-width:420px;float:right">
                        <p style="margin:0"><i>{{item.create_time}} </i>用户</p>
                        <div class="layim-chat-text" style="margin-top:0px">{{item.msg}}</div>
                    </div> 
                        <div v-if="item.user==0" style="float:left;margin-top:20px" v-show="item.path">
                        <img src="<?=STATIC_BACKEND?>/images/textListen.png"  @click="textListen(item.path)" style="width:23px">
                    </div>
                    <div v-if="item.user==1" style="float:right;margin-top:20px" v-show="item.path">
                        <img src="<?=STATIC_BACKEND?>/images/textListen.png"  @click="textListen(item.path)" style="width:23px">
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
export default {
    name:'addCheckDialog',
    props:[
        'audioData'
    ],
    data(){
        return{
            spath:'',
            textAudio:'',
            
            detail:{},
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

