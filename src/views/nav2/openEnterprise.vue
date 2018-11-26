<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>已开通企业</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding:30px;background:#fff;">
    
     <el-form ref="form" :model="form" label-width="90px" >
      <ul class="up">
          <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="企业名称:">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="线路号码：">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="线路号码：">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="线路号码：">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="线路号码：">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="线路号码：">
                    <el-input v-model="form.clid" style="width:190px;"></el-input>
                  </el-form-item>
              </div>
          </li>
           <li>
             <el-button type="success">搜索</el-button>
          </li>
      </ul>  
     
  </el-form>
     <el-table
      :data="tableData"
      style="width: 100%" height="300">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
   
  </section>

</template>

<script>
import {axiosRequest} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
           imageUrl: '',
					type: [],
					resource: '',
					desc: '',
          city:'',      //获取当前地区
          cityLists: [],
          props: {
                value: 'label',
                children: 'child'
            },
				},
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
			}
		},
    beforeMount() {
      this.getCityLists()
    },
		methods: {
			onSubmit() {
				console.log('submit!');
			},
       getCityLists(){
         const url ="/api/api_backend.php?r=mobile-export/init"
          const conf = {
            url,
            success:(data)=>{
              console.log(data)
              this.form.cityLists = data.info
            }
          }
          axiosRequest(conf)
      },
      getCity(val){
        console.log(val)
      },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
		
  }
	}

</script>
<style scoped lang="scss">
 @import '../../../static/css/openEnterprise.scss'
</style>