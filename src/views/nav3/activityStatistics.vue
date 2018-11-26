<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活跃度统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-form ref="form" :model="form" label-width="90px" >
        <ul class="up">
            <li>
              <div class="grid-content bg-purple">
                <el-form-item label="平台:">
                  <el-select placeholder="请选择" v-model="form.plat_form">
                      <el-option :label="item.key" :value="item.value" v-for="(item,index) in platform" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </li>
            <li>
              <div class="grid-content bg-purple">
                <el-form-item label="未活跃周期:">
                  <el-select placeholder="请选择" v-model="form.type">
                      <el-option label="连续一周" value="1" ></el-option>
                      <el-option label="连续一月" value="2" ></el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </li>
            <li style="margin-left:10px;">
              <el-button type="success" @click="search(1)">查询</el-button>
            </li>
             <li style="margin-left:10px;">
              <el-button type="success" @click="exportData" :disabled="!form.plat_form">导出</el-button>
            </li>
        </ul>  
      </el-form>
      <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total?550:100"  v-loading="loading" >
        <el-table-column type="index" label="序号" width="60" :index="index" align="center"></el-table-column>
        <el-table-column prop="servers" label="平台" align="center"></el-table-column>  
        <el-table-column prop="company_name" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="robot" label="是否有即将过期机器人" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.robot == null">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="账户是否过期" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.account == null">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-show="!!total" style="margin:0 auto;width:400px;">
        <div class="block"> 
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :current-page.sync = "page"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
  export default {
		data() {
			return {
        form:{
          plat_form:"",
          type:"",
          action:""
        },
        currentPage:1,
        page:1,
        page_size:10,
        total:0,
        infos:[],
        loading:true,
        platform:[],    //平台
        
			}
		},
    beforeMount() {
      this.initData()
      this.search(0)
    }, 
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      initData(){
        const url = "/api_backend.php?r=call-statics/platform"
        const conf = {
          url,
          success:(data)=>{
           this.platform = data.info.ai;
          }
        }
        axiosRequest(conf)
      },
      search(num){ 
        this.loading = true
        const url = "/api_backend.php?r=call-statics/no-call-list"
        const data = this.form;
        if(num == 0){
          data.page = this.page;
          data.page_size = this.page_size;
        }else{
          this.page = 1;
          this.page_size = 10;
          data.page = this.page;
          data.page_size = this.page_size
        }
        const conf = {
            url,
            data:data,
            success:(data)=>{
              this.loading = false
              this.infos = data.info.info
              this.total = parseInt(data.info.total_count)
            }
          }
          axiosRequest(conf)
       
      },
      handleSizeChange(val){
        this.page_size = val
        this.search(0)
      },
      handleCurrentChange(val){
        this.page = val  
        this.search(0)
      },
      // 导出
      exportData(){
        window.open('/api_backend.php?r=call-statics/no-call-list&action=excel&plat_form='+this.form.plat_form+'&type='+this.form.type+"&page="+this.page+"&page_size="+this.page_size)
      }
	  }
	}
</script>
<style lang="scss" scoped>
  .up {
    li{
      list-style:none;
      float:left;
    }
  }
  
</style>