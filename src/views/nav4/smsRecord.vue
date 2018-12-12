<template>
  <section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="seachForm">
          <el-form ref="formRecord" :model="formRecord" label-width="100px" :inline="true" >
             <el-form-item label="接受号码:">
                <el-input v-model="formRecord.mobile" :style="width"></el-input>
              </el-form-item>
              <el-form-item label="发送状态：">
                <el-select v-model="formRecord.status" placeholder="请选择状态" :style="width">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="发送成功" value="1"></el-option>
                  <el-option label="发送失败" value="0"></el-option>  
                </el-select>
              </el-form-item>
              <el-form-item label="发送时间：">
                <el-date-picker v-model="formRecord.start_time" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" :picker-options="pickerOptions0" :clearable="false" :style="width"></el-date-picker>~
                <el-date-picker v-model="formRecord.end_time" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"  :picker-options="pickerOptions1" :clearable="false" :style="width"></el-date-picker>
              </el-form-item> 
              <el-button type="primary" @click="sendRecord(1)">立即搜索</el-button>
          </el-form>
        </div>
        <div class="TableList">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%" :height="total>0?500:100">
            <el-table-column type="index" :index="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="mobile" label="接收号码"> </el-table-column>
            <el-table-column prop="content" label="发送内容"></el-table-column>
            <!-- <el-table-column prop="user_id" label="发送者"></el-table-column> -->
            <el-table-column prop="status" label="发送状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">成功</span>
                    <span v-else>失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="发送时间"></el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-show="!!total">
            <div class="block"> 
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 15, 20, 25]"
                    :page-size="formRecord.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {axiosRequest,formatDate} from '@/assets/js/Yt.js'
import { MessageBox } from 'element-ui';
export default {
		data() {
			return {
        width:"width:160px",
        pickerOptions0: {
          disabledDate: (time) => {                 
            return time.getTime() > Date.now()
          }
        },
        pickerOptions1: {
          disabledDate:(time) => {
            if(this.formRecord.start_time != ""){
              let currentTime = this.formRecord.start_time;
                return time.getTime() < currentTime || time.getTime() > Date.now();
            }else{
              return time.getTime() > Date.now()
            }
          }
        } ,  
        total:0,
        currentPage:1,
        formRecord:{
          page:1,
          page_size:10,
          start_time:"",
          end_time:""
        },
        tableData:[],
      }
		},
		activated(){
      this.sendRecord(0)
    },
		methods: {
      index(val){
        return  (this.formRecord.page-1)*this.formRecord.page_size+val+1
      },
      //数据列表
      sendRecord(num){
        const data = this.formRecord
        if(num == 0){
          data.page = this.formRecord.page
          data.page_size = this.formRecord.page_size
        }else if(num == 1){
          data.page = 1;
          data.page_size = 10
        }
        const conf = {
          url:"/api/api_backend.php?r=sms-log/sms-log",
          data:data,
          success:(data)=>{
            if( data.statusCode == 1 ){
              this.tableData = data.info.info
              this.total = parseInt(data.info.total)
            }else{
                this.tableData = []
                this.total = 0
            }
          }
        }
        axiosRequest(conf)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.formRecord.page_size = val
        this.sendRecord(0)
      },
      handleCurrentChange(val) {
        this.formRecord.page = val
        this.sendRecord(0)
      },
		}
	}

</script>
<style lang="scss" >
</style>