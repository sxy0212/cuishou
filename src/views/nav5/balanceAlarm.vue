<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>告警</el-breadcrumb-item>
      <el-breadcrumb-item>余额告警</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="TableList" style="min-height: 550px; max-height: 650px; overflow: auto; padding:20px;background:#fff">
      <el-form ref="form" :model="form" label-width="90px" >
        <ul class="up">
            <li>
              <div class="grid-content bg-purple">
                <el-form-item label="余额:">
                  <el-input v-model="form.money"></el-input>
                </el-form-item>
              </div>
            </li>
            <li style="margin-left:10px;">
              <el-button type="success" @click="search(1)">查询</el-button>
            </li>
        </ul>  
      </el-form>
        <el-table :data="infos" stripe style="width: 100%" border stripe height="500" v-loading="loading">
                <el-table-column type="index" :index="index" label="序号" width="60" align="center"></el-table-column>                   
                <el-table-column prop="account" label="账户名" align="center"></el-table-column>
                <el-table-column prop="money" label="余额" align="center"></el-table-column>
        </el-table>
        </div>
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
    
  </section>
</template>

<script>
  import {axiosRequest} from '@/assets/js/Yt.js'
  export default {
		data() {
			return {
        form:{
          money:"",
        },
        currentPage:1,
        page:1,
        page_size:10,
        total:"",
        infos:[],
        loading:true,
        
			}
		},
    beforeMount() {
      this.search(0)
    },
		methods: {
      index(val){
        return (this.page-1)*this.page_size+val+1
      },
      search(num){ 
        this.loading = true
        this.infos = []
        const url = "/api_backend.php?r=call-statics/balance"
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
              for(var item in data.info.info){
             this.infos.push(data.info.info[item])
            }
             
        
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