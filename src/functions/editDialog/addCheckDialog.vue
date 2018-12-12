<template>
    <div>
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
        }
    },
    methods:{
        textListen(path){

        },
        download(){

        },
        playOne(){

        }
    }
}
</script>

