<template>
  <section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="CallCount"> 
          <div style="font-size:20px;margin-bottom:10px;">智能语音机器人执行状态明细 (交互中 <span style="color:red">{{call}}</span> 排队中 <span style="color:red">{{line}}</span>)</div>
            <!--数据列表-->    
            <div>
                <el-table ref="multipleTable" :data="infos" tooltip-effect="dark" style="width: 100%" border stripe>
                    <el-table-column type="index" label="序号" width="50" :index="index"></el-table-column>
                    <el-table-column prop="task_coding" label="机器人编号"> </el-table-column>
                    <el-table-column prop="caller_number" label="客户" ></el-table-column>
                    <el-table-column prop="status" label="状态">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status==0">排队中</span>
                        <span v-else-if="scope.row.status==1">交互中</span>
                      </template>
                    </el-table-column>
                </el-table>
                <div class="pagination" v-show="total">
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 20, 25]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
import {axiosRequest,getCookie} from '@/assets/js/Yt.js'
export default {
	data() {
		return {
      call:"",
      line:"",
      currentPage:1,
      infos:[],
      page:1,
      page_size:10,
      total:0
    }
	},
  mounted() {
    this.initData()
  },
	methods: {
    index(val){
      return val+1
    },
    initData(){
        setInterval(this.init,5000)
    },
    init() {
      if(getCookie("user")&&this.$route.path == '/callStatus'){
        const url = "/api/api/api_backend.php?r=asrcall-state/index"
        const conf = {
            url,
            success:(data)=>{
                if(data.statusCode == 1){
                    this.infos = data.info.data
                    this.call = parseInt(data.info.call)
                    this.line = parseInt(data.info.line)
                    this.total = parseInt(data.info.total_count)
                }else{
                    this.call = 0
                    this.line = 0
                    this.total = 0
                    this.infos = []
                }
            }
        }
        axiosRequest(conf)
      }
    },
    handleSizeChange(val){
      this.page = val
      this.init()
    },
    handleCurrentChange(val){
      this.page_size = val
      this.init()
    },
    }
	}
</script>