<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户开通</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-table ref="multipleTable" :data="infos" style="width:100%" border :height="total?550:100"  v-loading="loading" >
          <el-table-column type="index" label="序号" width="60" :index="index" align="center"></el-table-column>
          <el-table-column prop="custom_name" label="客户姓名" align="center"></el-table-column>  
          <el-table-column prop="src_info" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="custom_type" label="客户类型" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.custom_type==1">个人</span>
                <span v-else-if="scope.row.custom_type==2">企业</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="企业地址" align="center"></el-table-column> 
          <el-table-column prop="industry_type" label="行业类型" align="center"></el-table-column> 
          <el-table-column prop="price" label="单价" align="center"></el-table-column> 
          <el-table-column prop="total_price" label="总金额" align="center"></el-table-column> 
          <el-table-column prop="certificate_url" label="企业资质" align="center">
            <template slot-scope="scope">
              <a :href="scope.row.certificate_url" download style="color:#409EFF" v-show="scope.row.certificate_url">下载</a>
            </template>
          </el-table-column>
          <el-table-column prop="is_payoff" label="付款详情" align="center"></el-table-column> 
          <el-table-column prop="line" label="使用线路" align="center"></el-table-column>
          <el-table-column prop="contact" label="联系人" align="center">
          </el-table-column>
          <el-table-column prop="sales_name" label="业务员姓名"align="center"></el-table-column> 
          <el-table-column prop="after_sale" label="售后小组" align="center"></el-table-column>
          <el-table-column prop="use_period" label="使用期限" align="center"></el-table-column>
          <el-table-column prop="signed_time" label="签订时间" align="center"></el-table-column>
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
			}
		},
    beforeMount() {
      this.init()
    },
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      init(){
        this.loading = true
        const url = "/api_backend.php?r=customer-device/custom-list"
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