<template>
  <section>
    <div class="CenterMain  MainHp">
      <div class="seachForm">
        <el-row :gutter="15">
          <el-form ref="form" :model="form" label-width="80px">
              <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <el-form-item label="方案名称:">
                        <el-select v-model="form.asr_number" placeholder="">
                          <el-option v-for="(item,index) in noAnswerData.voiceLine" :label="item.name" :value="item.asr_number" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                  </div>
              </el-col>
              <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <el-form-item label="关键词：">
                      <el-input v-model="form.keywords"></el-input>
                    </el-form-item>
                  </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="Search">查询</el-button>
                </div>
              </el-col>      
          </el-form>     
        </el-row>
      </div>
      <div class="TableList TextLeft">
          <el-table  :data="noAnswerData.tableData3" style="width: 100%" border stripe  v-loading="loading">
              <el-table-column  label="序号" width="50" :index="index" type="index"></el-table-column>
              <el-table-column prop="asr_number" label="语音识别线路" width="150"> </el-table-column>
              <el-table-column prop="caller_num" label="客户电话" width="100"></el-table-column>
              <el-table-column prop="msg" label="问题内容" ></el-table-column>
              <el-table-column prop="create_time" label="记录时间" width="200"></el-table-column>
              <el-table-column label="操作" width="200">
                  <template slot-scope = "scope">
                      <el-button type="danger" v-show="scope.row.type == 1" @click = "addNodeInit(scope.$index,scope.row)">添加节点</el-button>
                      <el-button type="primary" @click = "addNodeInit(scope.$index,scope.row)" v-show="scope.row.type == 0" style="margin-left:0">添加节点</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <!--分页-->   
      <div class="pagination">
          <div class="block"> 
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handlePageChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="noAnswerData.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="noAnswerData.total_count">
              </el-pagination>
          </div>
      </div>
    </div>
    <!--节点添加弹窗-->
    <div class="dial-header  tag-dials" style="max-width:680px">
      <el-dialog title="节点添加" :visible.sync="Knowledge.NodeAdd" >
          <el-form :model="addForm" label-width="120px">
              <el-form-item label="节点问题：">
                  <el-input :style="Knowledge.width" value="问题" lable="" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="属性/关键词：">
                  <el-input v-model="addForm.condition" :style="Knowledge.width"></el-input>
              </el-form-item>
              <el-form-item label="应答语音：">
                  <el-select v-model="addForm.answerid" placeholder="请选择应答语音" :style="Knowledge.width" @change="changeAnswer">
                      <el-option :value="item.id" v-for="(item,index) in addNode.list" :key="index" :label="item.spath"> {{item.spath}} {{item.word}} </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="下个节点：">
                  <el-select v-model="addForm.nextname"  :style="Knowledge.width" >
                      <el-option label="转人工" value="#####"></el-option>
                      <el-option label="无操作" value=".null"></el-option>
                      <el-option label="挂机" value="#"></el-option>
                  </el-select>
              </el-form-item>
          </el-form>         
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addNodeSave">立即添加</el-button>
              <el-button type="primary" @click="Knowledge.NodeAdd = false">取消</el-button>
          </div>
      </el-dialog>
    </div> 
	</section>
</template>
<script>
import {axiosRequest,message} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				 currentPage: 1,
            value:"",
            page:1,
            page_size:10,
            total:0,
            initData: {
              voiceLine: [],//无应答初始化语音线路
              tableData3:[],//无应答页面数据初始化
            },
            form:{
                asr_number:"", 
                keywords:"",
                nextname:".null"
            },
            addForm:{

            },
            Knowledge:{            //节点添加
                NodeAdd:false,
                width: 'width: 478px;', 
                widths: 'width: 300px;',
                InputWidth: "width:624px;",
            },
            addNode:{
                list:[]
            },
            loading:true,
            ButtonList:[],
            audioData:[],
            showButton:"",
           
			}
		},
		beforeMount() {
			// this.initBatch()
			// this.init()   //页面数据初始化 
    },
		methods: {
            // 序号
            index(val){
                return (this.page-1)*this.page_size+val+1
            },
            // 语音线路初始化
            voiceLines(){
                const url = ""
                const conf = {
                    url,
                    success:(data)=>{
                        init_voice.voiceLine = data.info
                    }
                }
                Yt.axiosRequest(conf)
            },
            //页面数据初始化
            init(){
                const url = ""
                const page_size = this.page_size
                const page = this.page
                const asr_number =  this.form.asr_number
                const keywords = this.form.keywords
                const conf = {
                    url,
                    data:{
                        page_size,
                        page,
                        asr_number,
                        keywords
                    },
                    success:(data)=>{
                        init_data.total_count = parseInt(data.info.total)
                        init_data.tableData3 = data.info.info;
                        this.loading = false
                    }
                }
                Yt.axiosRequest(conf)
            },
            //无应答搜索功能
            Search(){
                const url = ""
                this.page_size = 10;
                this.page = 1;
                this.init()
            },
            //无应答的该表页码和条数
            handlePageChange(val) {
              
            },
            handleSizeChange(val) {
              
            },
             // 添加节点
             addNodeInit(index,row){
                this.form.noAnsId = row.id
                this.form.condition = row.msg
                this.Knowledge.NodeAdd = true
                const id = row.id
                const url = "/api_backend.php?r=asrcall-record-noanswer/answer-sound"
                const conf = {
                    url,
                    data:{
                        id
                    },
                    success:(data)=>{
                        this.addNode.list = data.info
                    }
                }
                Yt.axiosRequest(conf)
            },
            changeAnswer(val){
                console.log(val)
            },
            addNodeSave(){
                const url ="/api_backend.php?r=asrcall-record-noanswer/add-node"
                const data = this.form
                const conf = {
                    url,
                    data:data,
                    success:(data)=>{
                        console.log(data)
                        if(data.statusCode == 1){
                            this.$alert("添加成功")
                            this.Knowledge.NodeAdd = false
                            this.form.condition = ""
                            this.form.answerid = ""
                            this.init("/api_backend.php?r=asrcall-record-noanswer/no-answer-list",this.noAnswerData);//无应答的页面数据初始化
                        }else{
                            this.$alert(data.message)
                            this.Knowledge.NodeAdd = true
                        }
                    }
                }
                Yt.axiosRequest(conf)
            },
		 
		}
	}

</script>
<style scoped >
</style>