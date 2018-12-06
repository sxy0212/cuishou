<template>
	<section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="CallCount">  
					<div class="AIadd" style="float:left">
							<el-button type="success" @click="addTpl">
							<i class="fa fa-plus"></i>新建模板</el-button> 
					</div>
					<el-form :inline="true"  class="demo-form-inline" style="float:left;margin-left:10px" @submit.native.prevent>
						<el-form-item label="关键字搜索:">
							<el-input v-model="keyword" placeholder="关键字"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">查询</el-button>
						</el-form-item>
					</el-form>
					<div class="TableList">
							<el-table ref="multipleTable" :data="infos" style="width:100%" border  v-loading="loading" :height="parseInt(total)>0?500:100">
									<el-table-column type="index" label="序号" width="60" :index="index" fixed="left"></el-table-column>
									<el-table-column prop="name" label="方案名称"> </el-table-column>
									<el-table-column prop="sound_type" label="语言模式"></el-table-column>
									<el-table-column prop="create_time" label="创建时间" ></el-table-column>
									<el-table-column prop="sound_type" label="操作"  width="350">
											<template slot-scope="scope">
													<el-button type="primary" plain @click="sound(scope.row)">语音库</el-button>
													<el-button type="primary" plain @click="asrSound(scope.row)">话术库</el-button>
													<a href="backend.php?r=asr-voice-repository/tree">
														<el-button type="primary" plain @click="flow(scope.$index,scope.row)">流程图</el-button>
													</a>
													<el-button type="primary" plain @click="edit(scope.$index,scope.row)">修改</el-button>
													<el-button type="danger" plain @click="del(scope.$index,scope.row)">删除</el-button>
											</template>
									</el-table-column>
							</el-table>
					</div>
					<page-change 
						:total="total"
						:page="page"
						v-on:pageSizeChange='pageSizeChangeFn($event)'
						v-on:currentPageChange='currentPageChangeFn($event)'
						v-show="total!=0"></page-change>
        </div>
      </div>
    </div>
        <!-- 新建模板弹框 -->
        <div class="dial-header tag-dial">
          <el-dialog title="新建模板" :visible.sync="AddTpl" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="!saving" v-move>
              <el-form label-width="100px">
                  <el-form-item label="方案名称：">
                      <el-input v-model="AddTplData.name" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="语音模式:">
                    <el-select v-model="AddTplData.sound_type"  placeholder="请选择语音模式" >
                      <el-option :label="item.sound_type" :value="item.sound_type" v-for="(item,index) in AddData.sound_type" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="选择模板:">
                    <el-select v-model="AddTplData.template_id" placeholder="请选择模板">
                      <el-option label="空模板" value="0"></el-option>
                      <el-option :label="item.tpl_name" :value="item.id" v-for="(item,index) in  AddData.select_tpl_id" disabled :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="语音库:">
                    <el-select v-model="AddTplData.sound_id"  placeholder="请选择语音库" >
                      <el-option  :label="item.name" :value="item.id" v-for="(item,index) in  AddData.sound" :key="index"></el-option>
                    </el-select>
                    <el-button type="primary" @click="addSound">新建语音库</el-button>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="AddSave" v-show="!saving">确认保存</el-button>
                  <el-button type="primary" v-show="saving">保存中</el-button>
                  <el-button @click="AddTpl = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
        <!-- 新建语音库的弹框 -->
        <div class="dial-header tag-dial">
          <el-dialog title="新建语音库" :visible.sync="AddSound" v-move>
              <el-form label-width="100px">
                  <el-form-item label="语音库名称：">
                      <el-input v-model="AddSoundData.name" style="width: 400px"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="AddSoundSave">确认保存</el-button>
                  <el-button @click="AddSound = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
        <!-- 修改弹框 -->
        <div class="dial-header tag-dial">
          <el-dialog title="修改模板" :visible.sync="EditTpl" v-move>
              <el-form label-width="100px">
                  <el-form-item label="方案名称：">
                      <el-input v-model="EditTplData.name" style="width: 450px"  ></el-input>
                  </el-form-item>
                  <el-form-item label="语音模式:">
                    <el-input v-model="EditTplData.sound_type" style="width: 450px"  :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="语音库:">
                    <el-input v-model="EditTplData.sound_name" style="width: 450px"  :disabled="true"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="EditSave">确认修改</el-button>
                  <el-button @click="EditTpl = false">关闭</el-button>  
              </div>
          </el-dialog>
        </div>
				</section>
    </template>

<script>
import {axiosRequest,clone,message} from '@/assets/js/Yt.js'
import pageChange from '@/components/pageChange.vue'
	export default {
		components:{
      'page-change':pageChange
    },
		data() {
			return {
				saving:false,
        page:1,
        total:0,
        page_size:10,
        loading:true,
        keyword:"",    //关键字搜索
        infos:[],
        AddTpl:false,     //新建模板弹框
        AddData:{
          sound_type:[],    //语音模式
          select_tpl_id:[],     //选择模板
          sound:[]             //语音库
        },
        select_tpl_id:"0",
        AddTplData:{       //新建模板里面的参数
          name:"",
          sound_type:"真人录音",
          sound_id:"",
          template_id:"0"      //选择模板
        },
				AddTplData1:{       //新建模板里面的参数
          name:"",
          sound_type:"真人录音",
          sound_id:"",
          template_id:"0"      //选择模板
        },
				dataClone:{},
        AddSound:false,     //新建语音库
        AddSoundData:{ name:""},
        EditTpl:false,               //修改
        EditTplData:{
          name:"",
          sound_type:"",
          sound_name:"",
          template_id:""
        }
			}
		},
		mounted() {
			this.init()
		},
		methods: {
		 	index(val){
          return (this.page-1)*this.page_size+val+1
      },
			// 页面数据初始化
			init(){
				const page = this.page;
				const page_size = this.page_size;
				const url = "/api/api_backend.php?r=template/template-list"
				const conf = {
					url,
					data:{
						page,
						page_size,
					},
					success:(data)=>{
						this.infos = data.info.info
						this.total = parseInt(data.info.total)
						this.loading = false
					}
				}
				axiosRequest(conf)
			},
				// 新建模板中选择模板中所有数据
			addListTpl(){
				const url = "/api/api_backend.php?r=template/template-list-all"
				const conf = {
					url,
					success:(data)=>{
						this.AddData.select_tpl_id = data.info.map((item)=>{
							return {
								id:item.id,
								tpl_name:item.name
							}
						})
					}
				}
				axiosRequest(conf)
			},
				//  新建模板中语音库中所有数据
				addListSound(){
					const url = "/api/api_backend.php?r=template/sound-list-all"
					const conf = {
						url,
						success:(data)=>{
							this.AddData.sound = data.info
						}
					}
					axiosRequest(conf)
				},
				// 点击添加模板按钮
				addTpl(){ 
					this.AddTpl = true
					this.AddData.sound_type = [{sound_type:"真人录音"},{sound_type:"人工合成"}]
					this.addListTpl()
					this.addListSound()
				},
				clone(obj){
					 return JSON.parse(JSON.stringify(obj))
				},	
				// 保存添加模板 
				AddSave(){
					this.saving = true
					const data = this.AddTplData
					if( this.AddTplData.sound_type == "人工合成"){
						data.sound_type = 0
					}else if( this.AddTplData.sound_type == "真人录音"){
						data.sound_type = 1
					}
					const url = "/api/api_backend.php?r=template/template-add"
					const conf = {
						url,
						data:data,
						success:(data)=>{ 
							this.$alert(data.message)
							if(data.statusCode == 1){
								this.AddTpl = false
								this.init()		
								this.AddTplData = this.clone(this.AddTplData1)
							}else{
								this.AddTpl = true
							}
							this.saving = false
						}
					}
					axiosRequest(conf)
				},
				// 新建语音库
				addSound(){
					this.AddSound = true
				},
				AddSoundSave(){
					const name = this.AddSoundData.name
					const url = "/api/api_backend.php?r=template/sound-add"
					const conf = {
						url,
						data:{name},
						success:(data)=>{ 
							this.$alert(data.message)
							if(data.statusCode == 1){
								this.AddSound = false
								this.addListSound()
							}else{
								this.AddSound = true
							}
						}
					}
					axiosRequest(conf)
				},
            // 修改模板
            edit(index,row){
              this.EditTpl = true
              const url = "/api/api_backend.php?r=template/template-info"
              const conf = {
                url,
                data:{template_id:row.id},
                success:(data)=>{
                  this.EditTplData = data.info
									this.EditTplData.template_id = data.info.id
                }
              }
              axiosRequest(conf)
            },
            EditSave(){
              var template_id = this.EditTplData.template_id
              const name = this.EditTplData.name
              const url = "/api/api_backend.php?r=template/template-edit"
              const conf = {
                url,
                data:{template_id,name},
                success:(data)=>{
                  if(data.statusCode == 1){
                    this.EditTpl = false
                    this.init()
                  }else{
                    this.EditTpl = true
                  }
                  this.$alert(data.message)
                }
              }
             axiosRequest(conf)
            },
            // 删除
            del(index,row){
              this.$confirm('确定删除语音模板?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const template_id = row.id
                  const url = "/api/api_backend.php?r=template/template-del"
                  const conf = {
                    url,
                    data:{template_id},
                    success:(data)=>{
                      if(data.statusCode == 1){
                        this.init()
                      } 
                      this.$alert(data.message)
                    }
                  }
                axiosRequest(conf)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },
            // 关键字搜索
            onSubmit(){
              const keywords = this.keyword
              const url = "/api/api_backend.php?r=template/template-search"
              const conf = {
                url,
                data:{keywords},
                success:(data)=>{
									this.total = 0
                  if(data.statusCode == 1){
                    this.infos = data.info
                  }else{
                    this.infos = []
                  }
                }
              }
              axiosRequest(conf)
            },
						pageSizeChangeFn(val){
            	this.page_size = val
            	this.init()
						},
						currentPageChangeFn(val){
							this.page = val
							this.init()
						},
						// 进入话术库
						asrSound(row){
							this.$router.push({path:'asrSoundScheme/'+row.id})
						},
            // 进入语音库
            sound(row){
              this.$router.push({path:"sound/"+row.sound_id})
            },
            detile(index,row){
              setCookie('telephone_detail',row.id)
            },
            flow(index,row){
              setCookie('flow_id',row.id)
            }
		}
	}

</script>
<style lang="scss" scoped>
.TableList .el-button{padding:8px 12px;}
.TableList .el-button+.el-button{margin-left:0}
</style>