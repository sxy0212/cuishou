<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户开通</el-breadcrumb-item>
      <el-breadcrumb-item>公司设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total?550:100"  v-loading="loading" >
          <el-table-column type="index" label="序号" width="60" :index="index" align="center"></el-table-column>
          <el-table-column prop="domain_name" label="域名" align="center"></el-table-column>  
          <el-table-column prop="ip" label="IP地址" align="center"></el-table-column>
          <el-table-column prop="root_pwd" label="root密码" align="center"></el-table-column>
          <el-table-column prop="server_type" label="服务器类别" align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in device" :key="index" v-show="scope.row.server_type == item.key">
                {{item.value}}
              </span>
            </template> 
          </el-table-column> 
          <el-table-column prop="plat_form" label="平台" align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in software" :key="index" v-show="scope.row.plat_form == item.key">
                {{item.value}}
              </span>
            </template> 
          </el-table-column> 
          <el-table-column prop="ssh_port" label="ssh端口" align="center"></el-table-column> 
          <el-table-column prop="os" label="操作系统" align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in os" :key="index" v-show="scope.row.os == item.key">
                {{item.value}}
              </span>
            </template> 
          </el-table-column> 
          <el-table-column prop="pro_version" label="产品版本" align="center">
              <template slot-scope="scope">
              <span v-for="(item,index) in version" :key="index" v-show="scope.row.pro_version == item.key">
                {{item.value}}
              </span>
            </template> 
          </el-table-column>
          <el-table-column prop="specificate" label="规格参数" align="center"></el-table-column> 
          <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      </el-table>
      <div class="pagination" v-show="!!total" style="margin:0 auto;width:300px;">
        <div class="block"> 
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
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
        currentPage:1,
        page:1,
        page_size:10,
        total:"",
        infos:[],
        loading:true,
        device:[],    //服务器
        software:[],   //平台
        os:[],       //操作系统
        version:[]    //产品版本
			}
		},
    beforeMount() {
      this.initData()
      this.init()
    },
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      initData(){
        const url = "/api_backend.php?r=customer-device/select-data"
        const conf = {
          url,
          success:(data)=>{
           this.device = data.info.device;
           this.software = data.info.software;
           this.os = data.info.os;
           this.version = data.info.version;
          }
        }
        axiosRequest(conf)
      },
      init(){
        this.loading = true
        const url = "/api_backend.php?r=customer-device/devices"
        const conf = {
          url,
          data:{
            page:this.page,
            page_size:this.page_size
          },
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
        this.init()
      },
      handleCurrentChange(val){
        this.page = val
        this.init()
      }
	  }
	}
</script>