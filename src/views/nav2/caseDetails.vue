<template>
    <div>
        <div-info
            :selfInfo='selfInfo'
            v-on:totalCaseFn='init($event)'
            v-on:changeLevelFn='changeLevelFn($event)'
            v-on:callFn='callFn($event,arguments)'
            v-on:sendLetter='sendLetter($event,arguments)'
            v-on:caseLog="caseLog($event)"
        ></div-info>
        
        <div class="tableCover">
            <div-table
                :tableData='caseRecord'
                v-on:doubleClickFn='doubleClickFn($event)'
            ></div-table>
        </div>
        <div class='info otherI'>
            <h3>其他信息<span><el-button v-show='!otherInfo' type="primary" @click="callOtherInfo(true)" size="mini">展开</el-button>
            <el-button type="primary" v-show='otherInfo' @click="callOtherInfo(false)" size="mini">关闭</el-button></span></h3>
            <div-other
                :selfInfo='selfInfo'
                v-show='otherInfo'
            >
            </div-other>
        </div>
        <div class="info">
            <div class="coverMiddle">
                <div class='middle'>
                    <div-form
                        :formTitle='formTitle'
                        :relationList='relationList'
                        :endList='endList'
                    ></div-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveFn" :disabled='selfInfo.case_status == 3' size="mini">保存</el-button>
                        <el-button type="info" @click="clearFn" size="mini">清空</el-button>
                    </div>
                </div>
                <div class='middle'>
                    <second-table
                        :tableSecond='tableSecond'
                        :selfInfo='selfInfo'
                        v-on:checkFn='checkFn($event)'
                        v-on:addRemarkFn='addRemarkFn($event)'
                    ></second-table>
                </div>
            </div>
        </div>
        <div class="coverDialog">
            <el-dialog title="通话详情" :visible.sync="checkNow" 
                :before-close="beforeCloseFn"
                >
                <check-dialog
                    :audioData='audioData'
                    :detail='detail'
                    ref='middleRef'
                    v-on:download='downloadFn($event)'
                ></check-dialog>
            </el-dialog>
        </div>
        <el-dialog title="修改等级" :visible.sync="changeLevel" >
            <change-dialog
                :levelList='levelList'
                :formLevel='formLevel'
                v-on:protectFn='saveLevelFn($event)'
                v-on:cancelFn='cancelChangeLevel($event)'
            ></change-dialog>
        </el-dialog>
        <el-dialog :title="remarkTitle" :visible.sync="remarkShow" >
            <remark-dialog
                :formRemark='formRemark'
                :remarkLabel='remarkLabel'
                v-on:protectFn='sendInfoSave($event)'
                v-on:cancelFn='cancelInfoSave($event)'
            ></remark-dialog>
        </el-dialog>
        <!--案件日志弹框-->
        <div class="dial-header  bind" >
            <el-dialog title="操作日志" :visible.sync="logDio">
                <ul style="height:200px;overflow-y: scroll;mergin-bottom:20px;">
                    <li v-for="(item,index) in caseDioData" style="position:relative">
                        {{item.create_time}} {{item.name}}
                        <img :src="item.img" style="width:40px;height:40px;" v-show="item.img"  @mouseenter="enter(index)" @mouseleave="leave()">
                        <img :src="item.img" style="width:200px;height:200px;position:fixed;z-index:10000;top:30%;left:60%;margin-left:-100px;" v-show="img&&item.id== showId">
                    </li>
                </ul>
                <div style="float:left;margin-right:10px;"> 案件名称:<el-input v-model="addCaseFile.name" style="width:200px;"></el-input></div>
               
                <el-upload style="float:left"
                    class="upload-demo"
                    ref="upload"
                    action="/api/api_backend.php?r=asrcall-case-batch-data/add-case-log"
                    :before-remove="beforeRemoveFile"
                    :before-upload="beforeUploadFile"
                    :limit="1"
                    :auto-upload="false"
                    list-type="picture"
                    :data="addCaseFile" :file-list="fileList">
                    <el-button type="primary" plain ><i class="fa fa-upload" style="width:40px">选择</i></el-button>
            </el-upload>
            <div slot="footer" class="dialog-footer">     
                <el-button type="primary" @click="addDioSave">保存</el-button>
                <el-button type="primary" @click="logDio = false">取消</el-button>
            </div>  
        </el-dialog>
    </div>
    </div>
  
</template>
<script>
import tableCaseDetail from '@/functions/tableCollection/tableCaseDetail.vue'
import tableCaseSecond from '@/functions/tableCollection/tableCaseSecond.vue'
import formCaseDetail from '@/functions/formCollection/formCaseDetail.vue'
import addCheckDialog from '@/functions/editDialog/addCheckDialog.vue'
import addRemark from '@/functions/editDialog/addRemark.vue'
import addChangeLevel from '@/functions/editDialog/addChangeLevel.vue'
import divOther from '@/functions/normalDiv/divOther.vue'
import divInfo from '@/functions/normalDiv/divInfo.vue'

import  { axiosRequest } from '@/assets/js/Yt.js'
import { Message } from 'element-ui'
import '@/assets/css/dialog.css'

export default {
    name:'caseDetails',
    components:{
        'div-table':tableCaseDetail,
        'div-form':formCaseDetail,
        'check-dialog':addCheckDialog,
        'div-other':divOther,
        'div-info':divInfo,
        'change-dialog':addChangeLevel,
        'remark-dialog':addRemark,
        'second-table':tableCaseSecond
    },
    data(){
        return {
            middleRef:{
                audioPlay:'',
                audio:''
            },
            whichOne:'',//具体查看对象
            remarkTitle:'',
            changeLevel:false,//修改 等级
            levelList:[],//等级列表
            formLevel:{//等级信息
                case_level:''
            },
            remarkShow:false,//
            formRemark:{
                remark:''
            },
            audioData:[//录音内容
                // {
                //     "msg": "喂，您好！（两秒空音）",                

                     //语音内容
                //     "record": "/home/robot_sound_ai23/root23199_lisuijiahui/A1.wav",    //语音路径
                //     "user": "0",                                    

                    //对象(0:言小通,1:客户)
                //     "uniqueid":"6_7600109_331a9fc78f474ac9e9254567295bffb8",           //唯一标识id
                //     "create_time": "2018-09-11 01:21:19",           

                    //创建时间
                //     "path": ""                                      

                    //语音全路径
                // },
                // {
                //     "msg": "状态（两秒空音）",                      

               //语音内容
                //     "record":"/home/robot_sound_ai23/root23199_lisuijiahui/A1.wav",    //语音路径
                //     "user": "1",                                    

                    //对象(0:言小通,1:客户)
                //     "uniqueid": "6_7600109_331a9fc78f474ac9e9254567295bff98",           //唯一标识id
                //     "create_time": "2018-09-9 01:21:19",            

                   //创建时间
                //     "path": ""                                      

                    //语音全路径
                // },
            ],
            detail:{//录音详情
            },
            otherInfo:false,//其他信息
            selfInfo:{//个人信息
            },
            id:'',//具体某个案件
            checkNow:false,//查看通话记录
            middleCaseRecord:[],//暂存列表
            caseRecord:[//个人信息列表
            ],
            tableSecond:[//催收记录
            ],
            formTitle:{//手动录入详细信息
            },
            relationList:[
                {
                    name:'父亲',
                    value:'1'
                },
                {
                    name:'母亲',
                    value:'2'
                },
                {
                    name:'家人',
                    value:'3'
                },
                {
                    name:'配偶',
                    value:'4'
                },
                {
                    name:'朋友',
                    value:'5'
                },
                {
                    name:'亲戚',
                    value:'6'
                },
                {
                    name:'上司或老板',
                    value:'7'
                },
                {
                    name:'同事',
                    value:'8'
                },
                {
                    name:'同学',
                    value:'9'
                }
            ],//关系列表
            endList:[
                {
                    name:'查询还款',
                    value:'1'
                },
                {
                    name:'电话拒接',
                    value:'2'
                },
                {
                    name:'电话易主',
                    value:'3'
                },
                {
                    name:'空号',
                    value:'4'
                },
                {
                    name:'停机',
                    value:'5'
                },
                {
                    name:'网络查找',
                    value:'6'
                },
                {
                    name:'无法接通',
                    value:'7'
                },
                {
                    name:'无力偿还',
                    value:'8'
                },
                {
                    name:'无效电话',
                    value:'9'
                },
                {
                    name:'已还款',
                    value:'10'
                },
                {
                    name:'语音信箱',
                    value:'11'
                }
            ],
            remarkLabel:'',//备注名称
            logDio:false,
            img:false,
            showId:"",
            caseDioData:[],
            fileList:[],
            addCaseFile:{
                file:"" ,
                name:"",
                case_id:""
            }
        }
    },
    activated(){
        this.id = this.$route.query.id
        this.init()
        this.getTableSecond()
        this.formTitle = {}
    },
    methods:{
        beforeCloseFn(done){
            if( !this.$refs.middleRef.$refs.audioPlay.paused ){
                this.$refs.middleRef.$refs.audioPlay.pause()
            }
            if( !this.$refs.middleRef.$refs.audio.paused ){
                this.$refs.middleRef.$refs.audio.pause()
            }
            done()
        },
        init(str){
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/case-info',
                data:{
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.selfInfo = data.info.selfInfo
                        this.middleCaseRecord = data.info.caseRecord
                        this.caseRecord = [{
                            "id": data.info.selfInfo.id,//案件编号id       
                            "case_name": data.info.selfInfo.case_name,                 //姓名
                            "case_money": data.info.selfInfo.case_money,                  //委案金额
                            "case_currency":data.info.selfInfo.case_currency,             //币种
                            "case_paid": data.info.selfInfo.case_paid,                     //已还金额
                            "case_exceed_limit":data.info.selfInfo.case_exceed_limit,              //逾期账龄
                            "last_call": data.info.selfInfo.last_call,
                     //上次通话时间
                            "call_times":data.info.selfInfo.call_times   
                        }]
                        if( str == 'total' ){//查询共案
                            this.caseRecord = this.caseRecord.concat(this.middleCaseRecord )
                        }
                    }
                }
            }
            axiosRequest(conf)
        },
        getTableSecond(){//获取催收记录
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/collection-record-list',
                data:{
                    case_id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.tableSecond = data.info
                    }else if(data.statusCode == 0 ){
                        this.tableSecond = []
                    }
                }
            }
            axiosRequest(conf)
        },
        callFn(phone,relation){//呼叫
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/call-out',
                data:{
                    phone:relation[0],
                    case_id:this.id,
                    relation:relation[1]
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.getTableSecond()
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if(data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        sendLetter(type,group){//信函
            this.remarkTitle = '新增记录'
            this.remarkShow= true
            this.remarkLabel = '备注'
            this.formRemark = {
                type:group[0],
                phone:group[1],
                remark:'',
                relation:group[2]
            }
        },
        saveFn(){//保存
            this.formTitle.case_id = this.id
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/add-collection-record',
                data:this.formTitle,
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.formTitle = {}
                        this.getTableSecond()
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if( data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 2 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        clearFn(){//清空
            this.formTitle = {}
        },
        checkFn(column){//查看
            this.checkNow = true
            this.whichOne = column.id
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/look-over',
                data:{
                    id:column.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.audioData = data.info.info
                        this.detail = data.info.call_record
                    }
                }
            }
            axiosRequest(conf)
        },
        doubleClickFn(id){
            this.id = id
            this.init()
            this.getTableSecond()
        },
        callOtherInfo(val){//展开或关闭其他信息
            this.otherInfo = val
        },
        changeLevelFn(){//修改等级
            this.changeLevel = true
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/level-list',
                data:{
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.levelList = data.info
                        data.info.forEach(item=>{
                            if( item.is_selected == 1 ){
                                this.formLevel.case_level = item.id
                            }
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        saveLevelFn(){//提交更改
            let conf = {
                url : '/api/api_backend.php?r=asrcall-case-batch-data/edit-level',
                data:{
                    case_level:this.formLevel.case_level,
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.changeLevel = false
                        this.formLevel = {
                            case_level:''
                        }
                        this.init()
                        Message({
                            message: data.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else if( data.statusCode == 0 ){
                        Message({
                            message: data.message,
                            type: 'error',
                            duration: 2 * 1000
                        })
                    }
                }
            }
            axiosRequest(conf)
        },
        sendInfoSave(){//备注修改或是新增记录
            if( this.remarkTitle == '新增记录'){
                this.formRemark.case_id = this.id
                let conf = {
                    url : '/api/api_backend.php?r=asrcall-case-batch-data/letter-and-outbound',
                    data:this.formRemark,
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.remarkShow = false
                            this.formRemark = {
                                remark:''
                            }
                            this.getTableSecond()
                            Message({
                                message: data.message,
                                type: 'success',
                                duration: 2 * 1000
                            })
                        }else if(data.statusCode == 0 ){
                            Message({
                                message: data.message,
                                type: 'error',
                                duration: 3 * 1000
                            })
                        }
                    }
                }
                axiosRequest(conf)
            }else if( this.remarkTitle == '修改备注' ){
                let conf = {
                    url : '/api/api_backend.php?r=asrcall-case-batch-data/edit-remark',
                    data:this.formRemark,
                    success:(data)=>{
                        if( data.statusCode == 1 ){
                            this.formRemark = {}
                            this.remarkTitle = ''
                            this.remarkLabel =''
                            this.remarkShow = false 
                            this.getTableSecond()
                            Message({
                                message: data.message,
                                type: 'success',
                                duration: 2 * 1000
                            })
                        }else if(data.statusCode == 0 ){
                            Message({
                                message: data.message,
                                type: 'error',
                                duration: 3 * 1000
                            })
                        }
                    }
                }
                axiosRequest(conf)
            }
            
        },
        cancelInfoSave(){
            this.remarkShow = false
        },
        cancelChangeLevel(){//取消
            this.changeLevel = false
        },
        addRemarkFn(row){
            this.remarkTitle = '修改备注'
            this.remarkShow = true
            this.remarkLabel ='修改备注'
            this.formRemark = {
                remark:row.remark,
                id:row.id
            }
        },
        downloadFn(){//下载录音
            window.open('/api/api_backend.php?r=asrcall-case-batch-data/look-over&action=download&id=' + this.whichOne)
        },
        // 案件日志列表
        initDio(){
            const url = "/api/api_backend.php?r=asrcall-case-batch-data/case-log-list"
                const conf = {
                    url,
                    data:{
                        case_id:this.id
                    },
                    success:(data)=>{
                        this.caseDioData = data.info
                        console.log(data)
                    }
                }
                axiosRequest(conf)
        },
        // 点击出现弹框
        caseLog(){
            this.logDio = true
            this.initDio()
        },
        // 移入移出效果
        enter(index){
            this.showId = this.caseDioData[index].id
            this.img = true
        },
        leave(){
            this.img = false
        },
        // 保存日志
        addDioSave(){
            this.$refs.upload.submit(); 
        },
        beforeUploadFile(response) {
            var testmsg=response.name.substring(response.name.lastIndexOf('.')+1)                 
            const isJPG = response.type === 'image/jpeg';
            const isPNG = response.type === 'image/png';
            if (!isJPG&&!isPNG) {
            this.$message.error('上传文件格式需要是.jpeg/.png!');
            this.fileList = []
            }else{
                this.addCaseFile.file = response
                this.addCaseFile.case_id = this.id
            }
        },
        successFile(response,file,files){ 
            this.$alert(response.message)
            if(response.statusCode == 1){
                this.logDio = false
            }else{
                this.logDio = true
            }
        },
        beforeRemoveFile(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
    }
}
</script>



