<template>
  <section>
    <div class="CenterMain  MainHp">
      <div class="TopForm">
        <div class="TableList2">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border stripe>
              <el-table-column type="index" :index="index" label="序号"width="55"></el-table-column>
              <el-table-column prop="num" label="系统号码"></el-table-column>
              <el-table-column prop="type" label="号码类型">
                  <template slot-scope="scope">
                      <span v-if="scope.row.type==0">呼入呼出</span>
                      <span  v-if="scope.row.type==1">预测</span>
                      <span  v-if="scope.row.type==2">群呼</span>
                  </template>
              </el-table-column>
              <el-table-column prop="type" label="操作" width="330">
                  <template slot-scope="scope">
                      <el-button type="primary" plain size="mini" @click="callOutBound(scope.$index,scope.row,0)" v-show="scope.row.type==0">呼出绑定</el-button>
                      <el-button type="success" plain size="mini" @click="callInBound(scope.$index,scope.row)"  v-show="scope.row.type==0">呼入绑定</el-button>
                      <!-- <el-button type="danger" plain size="mini"  v-show="scope.row.type==0">振铃策略</el-button> -->
                  </template>
              </el-table-column> 
          </el-table>
          <div class="block" style="width:400px;margin:0 auto" v-show="!!total">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
              </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 呼出绑定数据 -->
    <div class="dial-header">
        <el-dialog title="呼出绑定" :visible.sync="callOut">
            <el-table ref="multipleTable" :data="callOutData" tooltip-effect="dark" style="width:100%"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" prop="id"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column prop="true_name" label="真实姓名"></el-table-column>
                <el-table-column prop="staff_id" label="工号"></el-table-column>
                <el-table-column prop="Num" label="电话号码"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="callOutSave">确定</el-button>
                <el-button type="primary" @click="callOut=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 呼入绑定数据 -->
    <div class="dial-header">
        <el-dialog title="呼入绑定" :visible.sync="callIn">
            <el-table ref="multipleTable1" :data="callInData" tooltip-effect="dark" style="width:100%"  @selection-change="handleSelectionChange1">
                <el-table-column type="selection" prop="id"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column prop="true_name" label="真实姓名"></el-table-column>
                <el-table-column  label="振铃顺序" prop="Penalty"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="callInSave">确定</el-button>
                <el-button type="primary" @click="callIn=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
  </section>
</template>

   <script>
import axios from "axios"
import {axiosRequest,getCookie,setCookie,message,formatDate,clone} from '@/assets/js/Yt.js'


export default {
  data() {
    return { 
       value:"",
            page:"1",
            page_size:"10",
            currentPage:1,
            total:0,
            tableData: [],
            callOut:false,
            callIn:false,
            callOutData:[],
            callInData:[],
            num:"",
            exts:[],
            multipleSelection: [],
            multipleSelection1: [],
            ext:"",
            extsIn:[],
            extIn:"",
            extsOut:[],
            extsOut:""
    };
  },
        mounted(){
            this.init()
        },
      methods: {
         
            index(val){
                return (this.page-1)*this.page_size + val+1
            },
            init(){
                const url = "/api/api_backend.php?r=system-route/index"
                const page = this.page
                const page_size = this.page_size
                const conf = {
                    url,
                    data:{
                        page,
                        page_size
                    },
                    success: (data)=>{
                        if(data.statusCode == 1){
                            this.tableData = data.info.info
                            this.total = parseInt(data.info.total) 
                        }
                    }
                }
                axiosRequest(conf)
            },
             // 呼出绑定
            callOutBound(index,row,num1){
                this.extsOut = []
                this.callOut = true
                this. num = row.num
                const num = this.num
                const io = num1
                const url = "/api/api_backend.php?r=system-route/bound"
                const conf = {
                    url,
                    data:{
                        io,
                        num
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.callOutData = data.info
                            this.callOutData.forEach((row,index)=>{
                                if(row.disable == "checked"){
                                    setTimeout(()=>{
                                        this.extsOut.push(row.staff_id)
                                        this.$refs.multipleTable.toggleRowSelection(this.callOutData[index])
                                    },1)
                                    
                                }
                            })
                        }
                    }
                }
                axiosRequest(conf)
            },
            callOutSave(){
                const url = "/api/api_backend.php?r=system-route/execute"
                const num = this.num
                const exts = this.extsOut
                const ids = []
                if(this.multipleSelection.length>=1){
                    for(var i = 0;i<this.multipleSelection.length;i++){
                        ids.push( this.multipleSelection[i].staff_id) 
                    } 
                }else{
                    this.extOut = ""
                }
                const ext = ids.join(",")
                const conf = {
                    url,
                    data:{
                        io:0,
                        num,
                        exts,
                        ext
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.$alert("绑定成功")
                            this.callOut = false
                        }else{
                            this.callOut = true
                        }
                    }
                }
                axiosRequest(conf)
               
            },
             // 呼入绑定
             callInBound(index,row){
                 console.log(this.exts,this.ext)
                this.callIn = true
                this.extsIn = []
                this.num = row.num
                const num = this.num
                const io = 1
                const url = "/api/api_backend.php?r=system-route/bound"
                const conf = {
                    url,
                    data:{
                        io,
                        num
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.callInData = data.info
                            this.callInData.forEach((row,index)=>{
                                if(row.disable == "checked"){
                                    setTimeout(()=>{
                                        this.extsIn.push(row.staff_id)
                                        this.$refs.multipleTable1.toggleRowSelection(this.callInData[index])
                                    },1)
                                    
                                }
                            })
                        }
                    }
                }
                axiosRequest(conf)
            },
            callInSave(){
                let url = "/api/api_backend.php?r=system-route/execute"
                let num = this.num
                console.log(this.extsIn)
                let exts = this.extsIn.join(",")
                let ids = []
                // if(this.multipleSelection.length>=1){
                //     for(var i = 0;i<this.multipleSelection1.length;i++){
                //         ids.push( this.multipleSelection1[i].staff_id) 
                //     } 
                // }else{
                //     this.extIn = ""
                // }
                let ext = this.multipleSelection1.map(item=>item.staff_id).join(",")
                let conf = {
                    url,
                    data:{
                        io:1,
                        num,
                        exts,
                        ext
                    },
                    success:(data)=>{
                        if(data.statusCode == 1){
                            this.$alert("绑定成功")
                            this.extsIn = []
                            this.callIn = false
                        }
                    }
                }
                axiosRequest(conf)
               
            },
            // 呼入，呼出绑定弹框中的数据
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection = val
            },
            handleSelectionChange1(val){
                console.log(val)
                this.multipleSelection1 = val
            },
            handleSizeChange(val) {
                this.page_size = val
                this.init()
            },
            handleCurrentChange(val) {
                this.page = val
                this.init()
            }         
         
         
  },
}
</script>
<style lang="scss" scoped>

</style>

  