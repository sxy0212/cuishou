<template>
    <div class="checkDialog" style="padding-left:20px;">
        <div-info
            :selfInfo='selfInfo'
            v-on:totalCaseFn='init($event)'
            v-on:changeLevelFn='changeLevelFn($event)'
            v-on:callFn='callFn($event,arguments)'
            v-on:sendLetter='sendLetter($event,arguments)'
            v-on:caseLog="caseLog($event)"
            v-on:caseMemorandum = 'caseMemorandum($event)'
        ></div-info>
        <div class="tableCover">
            <div-table
                :tableData='caseRecord'
                v-on:doubleClickFn='doubleClickFn($event)'
            ></div-table>
        </div>
        <div class='info otherI infoCss'>
            <h3>
                <span></span>其他信息
                <el-button v-if='!otherInfo' type="warning" @click="callOtherInfo(true)" size="mini">展开</el-button>
                <el-button type="warning" v-else @click="callOtherInfo(false)" size="mini">关闭</el-button>
            </h3>
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
                        :selfInfo='selfInfo'
                        v-on:clearFn='clearFn'
                        v-on:saveFn='saveFn'
                    ></div-form>
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
        <el-dialog title="修改等级" :visible.sync="changeLevel" v-move>
            <change-dialog
                :levelList='levelList'
                :formLevel='formLevel'
                v-on:protectFn='saveLevelFn($event)'
                v-on:cancelFn='cancelChangeLevel($event)'
            ></change-dialog>
        </el-dialog>
        <el-dialog :title="remarkTitle" :visible.sync="remarkShow" v-move>
            <remark-dialog
                :formRemark='formRemark'
                :remarkLabel='remarkLabel'
                v-on:protectFn='sendInfoSave($event)'
                v-on:cancelFn='cancelInfoSave($event)'
            ></remark-dialog>
        </el-dialog>
        <!--案件日志弹框-->
        <div class="dial-header  addDioFrom" >
            <el-dialog title="案件日志" :visible.sync="logDio" v-move>
                <ul style="height:200px;overflow-y: scroll;mergin-bottom:20px;">
                    <li v-for="(item,index) in caseDioData" :key="index" style="position:relative;border-bottom:1px solid #f2f2f2;height:40px;line-height:40px;">
                        {{item.create_time}} {{item.name}}
                        <img :src="item.img" style="width:40px;height:40px;" v-show="item.img"  @mouseenter="enter(index)" @mouseleave="leave()">
                        <img :src="item.img" style="width:200px;height:200px;position:fixed;z-index:10000;top:30%;left:60%;margin-left:-100px;" v-show="img&&item.id== showId">
                    </li>
                </ul> 
                <p style="font-size:16px;margin-bottom:10px;">案件日志内容:</p>
                <el-input v-model="addCaseFile.name" type="textarea" :rows="4"></el-input> 
                <el-upload 
                    class="upload-demo"
                    ref="upload"
                    action="/api/api_staff.php?r=asrcall-case-batch-data/upload-log-img"
                    :before-remove="beforeRemoveFile"
                    :before-upload="beforeUploadFile"
                    :on-success="successFile"
                    :limit="1"
                    list-type="picture"
                    :data="addCaseFile" :file-list="fileList">
                    <i class="fa fa-image" style="font-size:26px;"></i>
                </el-upload>
                <div slot="footer" class="dialog-footer">     
                    <el-button type="warning" round @click="addDioSave">保存</el-button>
                    <el-button type="info" round  @click="logDio = false">取消</el-button>
                </div>  
            </el-dialog>
        </div>
     <!--案件备忘录弹框-->
        <div class="dial-header  addDioFrom" >
            <el-dialog title="案件备忘录" :visible.sync="logDioMemorandum" v-move>
                <ul style="height:200px;overflow-y: scroll;mergin-bottom:20px;">
                    <li v-for="(item,index) in caseDioDataMemorandum" :key="index" style="position:relative;border-bottom:1px solid #f2f2f2;height:40px;line-height:40px;">
                        {{item.create_time}} {{item.content}}
                        <img :src="item.img" style="width:40px;height:40px;" v-show="item.img"  @mouseenter="enterMemorandum(index)" @mouseleave="leaveMemorandum()">
                        <img :src="item.img" style="width:200px;height:200px;position:fixed;z-index:10000;top:30%;left:60%;margin-left:-100px;" v-show="imgMemorandum&&item.id== showIdMemorandum">
                    </li>
                </ul>
                <p style="font-size:16px;margin-bottom:10px;">案件备忘录内容:</p>
                <el-input v-model="addCaseFileMemorandum.content" type="textarea" :rows="4"></el-input>
                 <el-upload 
                    class="upload-demo"
                    ref="uploads"
                    action="/api/api_staff.php?r=asrcall-case-batch-data/upload-memorandum-img"
                    :before-remove="beforeRemoveFileMemorandum"
                    :before-upload="beforeUploadFileMemorandum"
                    :on-success="successFileMemorandum"
                    :limit="1"
                    list-type="picture"
                    :data="addCaseFileMemorandum" :file-list="fileListMemorandum">
                    <i class="fa fa-image" style="font-size:26px;"></i>
                </el-upload>               
                <div slot="footer" class="dialog-footer">     
                    <el-button type="warning" round @click="addDioSaveMemorandum">保存</el-button>
                    <el-button type="info" round @click="logDioMemorandum= false">取消</el-button>
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
import '@/styles/css/dialog.css'


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
            audioData:[],
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
                    name:'本人',
                    value:'10'
                },
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
                },
                
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
            logDio:false,   //日志
            img:false,
            showId:"",
            caseDioData:[],
            fileList:[],
            addCaseFile:{
                img:"",
                name:"",
                case_id:""
            },
            logDioMemorandum:false,   //备忘录
            imgMemorandum:false,
            showIdMemorandum:"",
            caseDioDataMemorandum:[],
            fileListMemorandum:[],
            addCaseFileMemorandum:{
                img:"",
                content:"",
                case_id:""
            },
        }
    },
    created(){
        
    },
    activated(){ 
        this.id = this.$route.query.id
        this.init()
        this.formTitle = {}
        this.getTableSecond()
        this.otherInfo = false 
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
                url : '/api/api_staff.php?r=asrcall-case-batch-data/case-info',
                data:{
                    id:this.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.selfInfo = data.info.selfInfo
                        this.middleCaseRecord = data.info.caseRecord
                        this.caseRecord = [{
                            "id": data.info.selfInfo.id,    //案件编号id       
                            "case_name": data.info.selfInfo.case_name,  //姓名
                            "case_money": data.info.selfInfo.case_money,    //委案金额
                            "case_currency": data.info.selfInfo.case_currency,   //币种
                            "case_paid": data.info.selfInfo.case_paid,  //已还金额
                            "case_exceed_limit": data.info.selfInfo.case_exceed_limit,   //逾期账龄
                            "last_call": data.info.selfInfo.last_call,  //上次通话时间
                            "call_times": data.info.selfInfo.call_times   
                        }]
                        if( str == 'total' ){   //查询共案
                            if( !!this.middleCaseRecord ){
                                this.caseRecord = this.caseRecord.concat( this.middleCaseRecord )
                            }
                        }
                    }
                }
            }
            axiosRequest(conf)
        },
        getTableSecond(){//获取催收记录
            let conf = {
                url : '/api/api_staff.php?r=asrcall-case-batch-data/collection-record-list',
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
                url : '/api/api_staff.php?r=asrcall-case-batch-data/call-out',
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
            if( !this.formTitle.next_time ){
                this.formTitle.next_time = ''
            }
            this.formTitle.case_id = this.id
            let conf = {
                url : '/api/api_staff.php?r=asrcall-case-batch-data/add-collection-record',
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
                url : '/api/api_staff.php?r=asrcall-case-batch-data/look-over',
                data:{
                    id:column.id
                },
                success:(data)=>{
					if( data.statusCode == 1 ){
                        this.audioData = data.info.info
                        this.detail = data.info.call_record
                    }else if(data.statusCode == 0){
                        this.audioData = []
                        this.detail = {}
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
                url : '/api/api_staff.php?r=asrcall-case-batch-data/level-list',
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
                url : '/api/api_staff.php?r=asrcall-case-batch-data/edit-level',
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
                    url : '/api/api_staff.php?r=asrcall-case-batch-data/letter-and-outbound',
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
                    url : '/api/api_staff.php?r=asrcall-case-batch-data/edit-remark',
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
            window.open('/api/api_staff.php?r=asrcall-case-batch-data/look-over&action=download&id=' + this.whichOne)
        },
        // 案件日志列表
        initDio(){
            const url = "/api/api_staff.php?r=asrcall-case-batch-data/case-log-list"
            const conf = {
                url,
                data:{
                    case_id:this.id
                },
                success:(data)=>{
                    this.caseDioData = data.info
                }
            }
            axiosRequest(conf)
        },
        // 点击出现弹框
        caseLog(){
            this.logDio = true
            this.addCaseFile.name = ""
            this.addCaseFile.img = ""
            this.fileList = []
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
            const url = "/api/api_staff.php?r=asrcall-case-batch-data/add-case-log"
            const conf = {
                    url,
                    data:{
                        case_id:this.id,
                        name:this.addCaseFile.name,
                        img:this.addCaseFile.img
                    },
                    success:(data)=>{
                        this.$alert(data.message)
                        if(data.statusCode == 1){
                            this.addCaseFile.name = ""
                            this.fileList = []
                            this.addCaseFile.img = ""
                        } 
                        this.initDio()                       
                    }
                }
                axiosRequest(conf)
        },  
        beforeUploadFile(response) {
            var testmsg = response.name.substring(response.name.lastIndexOf('.')+1)                 
            const isJPG = response.type === 'image/jpeg'
            const isPNG = response.type === 'image/png'
            if (!isJPG&&!isPNG) {
            this.$message.error('上传文件格式需要是.jpeg/.png!')
            this.fileList = []
            return false;
            }
        },
        successFile(response,file,files){ 
            this.addCaseFile.img = response.info
        },
        beforeRemoveFile(file, fileList) {
             const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if(isJPG||isPNG){
                return this.$confirm(`确定移除 ${ file.name }？`)
            }
         },
        // 案件备忘录
        caseMemorandum(){
            this.logDioMemorandum = true
            this.addCaseFileMemorandum.content = ""
            this.addCaseFileMemorandum.img=""
            this.fileListMemorandum = []
            this.initDioMemorandum()
        },
        // 案件备忘录列表
        initDioMemorandum(){
            const url = "/api/api_staff.php?r=asrcall-case-batch-data/case-memorandum-list"
            const conf = {
                url,
                data:{
                    case_id:this.id
                },
                success:(data)=>{
                    this.caseDioDataMemorandum = data.info
                }
            }
            axiosRequest(conf)
        },
        // 移入移出效果
        enterMemorandum(index){
            this.showIdMemorandum = this.caseDioDataMemorandum[index].id
            this.imgMemorandum = true
        },
        leaveMemorandum(){
            this.imgMemorandum = false
        },
        // 保存日志
        addDioSaveMemorandum(){
            const url = "/api/api_staff.php?r=asrcall-case-batch-data/add-case-memorandum"
            const conf = {
                url,
                data:{
                    case_id:this.id,
                    content:this.addCaseFileMemorandum.content,
                    img:this.addCaseFileMemorandum.img
                },
                success:(data)=>{
                    this.$alert(data.message)
                    if(data.statusCode == 1){
                       this.addCaseFileMemorandum.content = ""
                       this.addCaseFileMemorandum.img = ""
                       this.fileListMemorandum = []
                    }
                    this.initDioMemorandum()
                }
            }
            axiosRequest(conf)
        },
        beforeUploadFileMemorandum(response) {
            var testmsg=response.name.substring(response.name.lastIndexOf('.')+1)                 
            const isJPG = response.type === 'image/jpeg'
            const isPNG = response.type === 'image/png'
            if (!isJPG&&!isPNG) {
            this.$message.error('上传文件格式需要是.jpeg/.png!')
            this.fileListMemorandum = []
            return false;
            }
        },
        successFileMemorandum(response,file,files){ 
           this.addCaseFileMemorandum.img = response.info
        },
        beforeRemoveFileMemorandum(file, fileList) {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if(isJPG||isPNG){
                return this.$confirm(`确定移除 ${ file.name }？`)
            }
            
        },
    }
}
</script>