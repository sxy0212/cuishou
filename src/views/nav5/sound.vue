 <template>
  <section>
        <div class="CenterMain  MainHp" style="background:#fff">
            <div class="TopForm">
                <div class="Voice">
                    <el-tabs v-model="Voice.tabs" type="card" @tab-click="handleClick">
                        <el-tab-pane label="语音管理" name="first">
                            <!--顶部操作-->
                            <div class="VoiceTop">
                                <ul>
                                    <li style="float:left;margin-right:20px;">
                                        <el-form ref="form" :model="form" label-width="80px">
                                            <el-form-item label="语音库：">
                                                <el-select v-model="asr_number" placeholder="请选择语音库" @change="changeAsr">
                                                    <el-option v-for="(item,index) in soundList"  :label="item.name" :value="item.id" :key="index"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-form>
                                    <li>
                                    <li>        
                                        <el-button type="primary" @click="soundAdd ">语音文件添加</el-button>
                                        <el-button type="primary" @click="zipAdd ">语音包添加</el-button>
                                    </li>
                                </ul>
                            </div>
                            <!--列表-->
                            <div class="TableList TextLeft">
                                <audio style="width:100%" :src="audio" controls="controls" id="audioPlay" hidden autoplay></audio>  
                                <el-table  :data="infos" style="width: 100%" border>
                                    <el-table-column  type="index" label="序号" :index="index1"  width="60"></el-table-column>
                                    <el-table-column prop="word" label="语言描述" ></el-table-column>
                                    <el-table-column prop="spath" label="语音文件" ></el-table-column>
                                    <el-table-column  label="操作" width="400">
                                        <template slot-scope="scope">
                                            <el-button  plain @click="play(scope.$index, scope.row)">试听</el-button>
                                            <el-button type="success" plain @click="editUpdate(scope.$index, scope.row)" v-if="scope.row.status==0" disabled>重录中</el-button>
                                            <el-button type="success" plain @click="editUpdate(scope.$index, scope.row)" v-else>修改描述</el-button>                                          
                                            <el-button type="success" plain @click="upLoad(scope.$index, scope.row)">语音替换</el-button>
                                            <!-- <el-button type="success" plain @click="editDescribe(scope.$index, scope.row)">修改描述</el-button> -->
                                            <el-button type="danger" plain  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>   
                                </el-table>
                            </div>
                            <!--分页-->   
                            <div class="pagination">
                                <div class="block"> 
                                    <el-pagination 
                                      @size-change="handleSizeChange" 
                                      @current-change="handleCurrentChange" 
                                      :current-page="currentPage"
                                      :page-sizes="[10, 20, 30, 40]" 
                                      :page-size="10" 
                                      layout="total, sizes, prev, pager, next, jumper" :total="total">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="新建语音库" name="second">
                            <el-form :inline="true"  class="demo-form-inline">
                                <el-form-item label="语音库名称:">
                                  <el-input v-model="soundName"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmitVoice">保存</el-button>
                                </el-form-item>
                                </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!--语音文件添加弹窗-->
        <div class="dial-header tag-dial">
            <el-dialog title="语音文件上传" :visible.sync="Voice.UploadFile" v-move>
                    <el-form :model="files" label-width="120px">
                        <el-form-item label="选择语音库：">
                        <el-select v-model="asr_number" placeholder="请选择语音库">
                            <el-option v-for="(item,index) in soundList"  :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="文字说明：">
                            <el-input v-model="files.word" :style="Voice.width"></el-input>
                        </el-form-item>
                        <el-form-item label="选择语音文件：">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="/api_backend.php?r=sound/word-to-sound-add"
                                :before-remove="beforeRemoveFile"
                                :on-success="successFile"
                                :before-upload="beforeUploadFile"
                                multiple
                                :limit="1"
                                :auto-upload="false"
                                :on-exceed="handleExceed" :data="files" :file-list="fileList">
                                <el-button type="primary" plain ><i class="fa fa-upload" style="width:40px">选择</i></el-button>
                                <span style="color:red">文件必选</span>
                        </el-upload>
                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addFile">添加</el-button>
                        <el-button @click="Voice.UploadFile = false">取消</el-button>
                    </div>
             </el-dialog>
        </div>
        <!--语音包上传弹窗-->
        <div class="dial-header tag-dial">
            <el-dialog title="语音包上传" :visible.sync="Voice.UploadZip" v-move>
                <el-form :model="form" label-width="120px">
                    <el-form-item label="选择语音库：">
                      <el-select v-model="asr_number" placeholder="请选择语音库">
                          <el-option v-for="(item,index) in soundList"  :label="item.name" :value="item.id" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="选择语音包：">
                        <el-upload
                                class="upload-demo" 
                                action="/api_backend.php?r=sound/sound-file-package-upload"
                                :before-remove="beforeRemoveZip"
                                :on-success="successZip"
                                ref="uploads"
                                :before-upload="beforeUploadZip"
                                multiple
                                :limit="1"
                               :auto-upload="false"
                                :on-exceed="handleExceed" :data="zip" :file-list="fileListZip">
                                <el-button type="primary" plain size="small" ><i class="fa fa-upload" style="width:40px">选择</i></el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addZip">确定</el-button>
                    <el-button @click="Voice.UploadZip = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--修改描述文本弹窗层-->
        <div class="dial-header">
            <el-dialog title="修改描述" :visible.sync="Voice.Retake" v-move>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="原来文本：">
                        <div class="ConentText">{{Voice.text}}</div>
                    </el-form-item>
                    <el-form-item label="修改文本：">
                        <el-input type="textarea" v-model="rerecord.word"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">确定修改</el-button>
                    <el-button @click="Voice.Retake = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--语音替换-->
        <div class="dial-header upload">
            <el-dialog title="上传重录语音:" :visible.sync="Voice.upLoad" v-move>
            <el-form>
                <el-form-item label="选择上传语音：">
                    <el-upload
                        class="upload-demo"
                        action="/api_backend.php?r=sound/word-to-sound-instead"
                        :before-remove="beforeRemove"
                        :on-success="success"
                        :before-upload="beforeUpload"
                        ref="uploadss"
                        multiple
                        :limit="1"
                        :auto-upload="false"
                        :on-exceed="handleExceed" :data="updata" :file-list="rerecord.fileList">
                        <el-button type="primary" plain style="width:70px"><i class="fa fa-upload" styte="width:40px">选择</i></el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
                   
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <!-- <el-button @click="Voice.upLoad = false">取消</el-button> -->
                </div>
            </el-dialog>
        </div>
          </section>
    </template>
<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
        sound_id:"",
        soundList:[],    //语音库下拉列表
        asr_number:"",
        page:1,
        page_size:10,
        total:0,
        currentPage:1,
        infos:[],
			  value:"",
            name:"",
            Data:[],
            options:[],
            audio:"", //录音播放的地址
            updata:{id:"",sound_file:""}, //语音重录上传的参数
            DescribeText: '',
            rerecord:{
                asr_number: '',
                word:"",
                index:"",
                fileList:[]
            },//修改描述
            files:{
              sound_id: '',
              word:"",
              sound_file:""
            }, //语音文件上传参数
            zip:{sound_id: '',zip_file:""}, //语音包上传参数
            Voice: {
                tabs: 'first',
                width: 'width: 478px;',
                UploadFile: false , //上传语音文件
                UploadZip : false, //上传压缩包文件
                Retake: false , //语音重录
                upLoad:false,   //语音上传
                Describe: false ,  //语音描述修改
                desc: '',
                text:"",
                id:"",
                index:""
            },
            form: {},
           
            path:"",
            data:{}, 
            fileList: [],
            fileListZip: [],
            index:"0",    //tab切换时的序号
            soundName:""
			}
		},
        activated(){
            this.getId() 
            this.init()
            this.initList()
        },
	methods: {
      // 获取到下拉列表数据
      initList(){
        const url = "/api_backend.php?r=sound/sound-list-all"
        const conf = {
          url,
          success:(data)=>{
            this.soundList = data.info
          }
        }
        axiosRequest(conf)
      },
			// 序号
      index1(val){
        return (this.page-1)*this.page_size+val+1
      },
      // 获取cookie
      getId(){
        this.sound_id = this.$route.params&&this.$route.params.id
        this.asr_number = this.$route.params&&this.$route.params.id
      },
      //获取到数据列表
      init(){
          const url =  "/api_backend.php?r=sound/word-to-sound-list";
          const conf = {
              url,
              data:{
                page:this.page,
                page_size:this.page_size,
                sound_id:this.sound_id
              },
              success:(data) => {
                this.infos = data.info
                this.total = parseInt(data.total_count)           
              }
          }
          axiosRequest(conf);
      },
            // 重录文本中的选择语音线路的
            rerecordData(val){
               this.rerecord.asr_number = val
            },

            // 改变语音线路页面数据改变
            changeAsr(val){
                this.asr_number = val
                this.init()
            },
            // 播放录音
            play(index,row){
                this.audio = row.sound_dir;
                if(document.getElementById("audioPlay").paused){
                    document.getElementById("audioPlay").play()
                }else{
                    document.getElementById("audioPlay").pause()
                }
            },
            handleClick(tab, event) {
                this.index = tab.index
                if(this.index == 1){
                  this.soundName = ""
                }
            }, 
            handleSizeChange(val) {
                this.page_size = val;
                this.init();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.init();
            },
            // 删除操作
            handleDelete(index,row) {
                this.$confirm('您确定要删除此项记录吗？','提示信息',{
                    confirmButtonText: "确定删除",
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    const id= row.id;
                    const url = '/api_backend.php?r=sound/word-to-sound-del'
                    const conf = {
                        url,
                        data:{id},
                        success:(data)=>{
                          this.$alert(data.message)
                          this.init()
                        }
                    }
                     axiosRequest(conf)
                }).catch(() =>{
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    })
                })
            },
            //修改描述
            editUpdate(index,row){
                this.rerecord.index = index
                this.updata.id = row.id
                this.Voice.Retake = true
                this.Voice.text = row.word
            },
            onSubmit(){  
                const url = "/api_backend.php?r=sound/word-to-sound-desc-update"
                const id = this.updata.id
                const word = this.rerecord.word
                const conf = {
                    url,
                    data:{id,word},
                    success:(data)=>{
                      this.$alert(data.message)
                      if(data.statusCode == 1){
                          this.Voice.Retake = false 
                          this.init()
                          this.rerecord.word = ""
                      }else{
                        this.Voice.Retake = true
                      }
                    }
                }
                 axiosRequest(conf)
            },
            // 语音重录
            upLoad(index,row){
                this.rerecord.fileList = []
                this.rerecord.index = index
                this.updata.id = row.id       
                this.Voice.upLoad = true
            },
            beforeUpload (file) {
                this.updata.sound_file = file
            },
            success(response,file,files){ 
              this.$alert(response.message)
              if(response.statusCode == 1){
                  this.Voice.upLoad = false 
                  this.init()
              }else{
                this.Voice.upLoad = true
              }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            sure(){
                 this.$refs.uploadss.submit();
            },
            // 语音文件上传
            soundAdd(){
                this.Voice.UploadFile = true
                this. files.sound_id =  ''
                this.files.word = ""
                this.files.sound_file = ""
                this.fileList = []
            },
            addFile(){
                this.$refs.upload.submit(); 
                this.init()
            },

            beforeUploadFile(file) {
                this.files.sound_file = file
                this.files.sound_id = this.asr_number
            },
            successFile(response,file,files){ 
                this.$alert(response.message)
                if(response.statusCode == 1){
                    this.Voice.UploadFile = false
                    this.init()
                }else{
                    this.Voice.UploadFile = true
                }
            },
            handleExceedFile(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            beforeRemoveFile(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 语音包上传
            zipAdd(){
                this.Voice.UploadZip = true
                this.zip.sound_id = ""
                this.fileListZip = []
            },
            addZip(){  
               this.$refs.uploads.submit(); 
               this.init()
            },
            beforeUploadZip(file) {
                this.zip.zip_file = file
                this.zip.sound_id = this.asr_number
            },
            successZip(response,file,files){
              this.$alert(response.message)
                if(response.statusCode == 0){
                  this.fileListZip = []
                  this.Voice.UploadZip = true
                }else{
                  this.Voice.UploadZip = false
                }
            },
            handleExceedZip(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            beforeRemoveZip(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 新建语音库
            onSubmitVoice(){
              const name = this.soundName
              const url = "/api_backend.php?r=template/sound-add"
              const conf = {
                url,
                data:{name},
                success:(data)=>{
                  this.$alert(data.message)
                  if(data.statusCode == 1){
                    this.init()
                    this.initList()
                    this.soundName = ""
                  }
                }
              }
               axiosRequest(conf)
            }
		}
	}

</script>