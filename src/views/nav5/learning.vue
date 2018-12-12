<template>
  <section>
    <div class="CenterMain  MainHp">
        <div class="seachForm">
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
                <el-form-item label="方案名称:">
                    <el-select v-model="form.template_id" placeholder="">
                    <el-option v-for="(item,index) in templateList" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词：">
                    <el-input v-model="form.keywords"></el-input>
                </el-form-item>
                <el-button type="primary" @click="init(1)">查询</el-button> 
            </el-form>     
        </div>
        <div class="TableList TextLeft">
            <el-table  :data="tableData" style="width: 100%" border stripe  v-loading="loading">
                <el-table-column  label="序号" width="50" :index="index" type="index"></el-table-column>
                <el-table-column prop="asr_number" label="语音识别线路" width="150"> </el-table-column>
                <el-table-column prop="caller_num" label="客户电话" ></el-table-column>
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
                    :page-size="form.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
    <!--节点添加弹窗-->
    <div class="dial-header  tag-node-add" style="max-width:680px">
      <el-dialog title="节点添加" :visible.sync="Knowledge.NodeAdd" v-move>
          <el-form :model="addForm" label-width="120px" >
              <el-form-item label="属性/关键词：">
                  <el-input v-model="addForm.condition" :style="Knowledge.width"></el-input>
              </el-form-item>
              <el-form-item label="标签：">
                  <el-input v-model="addForm.name" :style="Knowledge.width"></el-input>
              </el-form-item>
              <el-form-item label="应答语音：">
                  <el-select v-model="addForm.answerid" placeholder="请选择应答语音" :style="Knowledge.width" >
                      <el-option :value="item.id" v-for="(item,index) in addNode.list" :key="index" :label="item.spath"  style="width:500px"> {{item.spath}} {{item.word}} </el-option>
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
            total:0,
            templateList:[],
            tableData:[],
            form:{
                page:1,
                page_size:10,
                template_id:"", 
                keywords:"",
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
		activated() {
            this.templateListData() //方案名称
        },
		methods: {
            // 序号
            index(val){
                return (this.form.page-1)*this.form.page_size+val+1
            },
            // 方案名称初始化
            templateListData(){
                const url = "/api/api_backend.php?r=asrcall-record-noanswer/template-name"
                const conf = {
                    url,
                    success:(data)=>{
                        if(data.info.length>0){
                            this.templateList = data.info
                            this.form.template_id = data.info[0].id
                            this.init(0)
                        }
                    }
                }
                axiosRequest(conf)
            },
            //页面数据初始化
            init(num){
                const data = this.form
                if(num == 0){
                    data.page = this.form.page
                    data.page_size = this.form.page_size
                }else if(num == 1){
                    data.page = 1;
                    data.page_size = 10
                }
                const url = "/api/api_backend.php?r=asrcall-record-noanswer/no-answer-list"
                const conf = {
                    url,
                    data:data,
                    success:(data)=>{
                        this.loading = false
                        this.tableData = data.info.info
                        this.total =parseInt( data.info.total)
                    }
                }
              axiosRequest(conf)
            },
            handlePageChange(val) {
                this.form.page = val
                this.init(0)
            },
            handleSizeChange(val) {
                this.form.page_size = val
                this.init(0)        
            },
             // 添加节点语音下拉框数据
             addNodeInit(index,row){
                this.Knowledge.NodeAdd = true
                this.addForm.name = row.msg
                this.addForm.condition = row.msg
                this.addForm.noAnsId = row.id
                const id = row.id
                const url = "/api/api_backend.php?r=asrcall-record-noanswer/answer-sound"
                const conf = {
                    url,
                    data:{
                        id
                    },
                    success:(data)=>{
                        this.addNode.list = data.info
                    }
                }
               axiosRequest(conf)
            },
            addNodeSave(){
                const url ="/api/api_backend.php?r=asrcall-record-noanswer/add-node"
                const data = this.addForm
                const conf = {
                    url,
                    data:data,
                    success:(data)=>{
                        this.$alert(data.message)
                        if(data.statusCode == 1){
                            this.Knowledge.NodeAdd = false
                            this.addForm.name = ""
                            this.addForm.condition = ""
                            this.addForm.noAnsId = ""
                            this.addForm.nextname = ""
                            this.addForm.answerid = ""
                            this.init(0)  
                        }else{
                            this.Knowledge.NodeAdd = true
                        }
                    }
                }
                axiosRequest(conf)
            },
		 
		}
	}

</script>
<style scoped >
</style>