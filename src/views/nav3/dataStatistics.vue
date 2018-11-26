<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>呼叫量统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding:10px;background:#fff;">
    
     <el-form ref="form" :model="form" label-width="90px" >
      <ul class="up">
          <li>
              <div class="grid-content bg-purple">
                 <el-form-item label="平台:">
								 	 <el-select placeholder="请选择" v-model="form.plat_form">
											<el-option :label="item.key" :value="item.value" v-for="(item,index) in platformData" :key="index"></el-option>
										</el-select>
                  </el-form-item>
              </div>
          </li>
					 <li>
								<div class="grid-content bg-purple">
									<el-form-item label="开始日期：">
										<el-date-picker  type="date" placeholder="开始日期" default-time="00:00:00" @change="changeTime" v-model="formdate" :picker-options="pickerOptions0" :clearable="false"></el-date-picker>
									</el-form-item> 
								</div>
						</li>
						 <li>
								<div class="grid-content bg-purple">
									<el-form-item label="结束日期：">
										<el-date-picker type="date" placeholder="结束日期"  default-time="23:59:59" v-model="enddate"  :picker-options="pickerOptions1" :clearable="false"></el-date-picker>   
									</el-form-item> 
								</div>
						</li>
						<li>
              <div class="grid-content bg-purple">
                 <el-form-item label="统计方式:">
								 	 <el-select placeholder="请选择" v-model="form.type">
											<el-option label="按天统计" value="1"></el-option>
											<el-option label="按周统计" value="2" disabled></el-option>
											<el-option label="按月统计" value="3" disabled></el-option>
										</el-select>
                  </el-form-item>
              </div>
          </li>
					<!--<li>
              <div class="grid-content bg-purple">
                 <el-form-item label="展示方式:">
								 	 <el-select placeholder="请选择">
											<el-option label="表格" value="0"></el-option>
											<el-option label="折线图" value="1"></el-option>
											<el-option label="柱状图" value="2"></el-option>
										</el-select>
                  </el-form-item>
              </div>
          </li>-->
          <li>
             <el-button type="success" @click="data(2)">查询</el-button>
          </li>
					<li>
             <el-button type="success" @click="open">导出</el-button>
          </li>
      </ul>  
     
  </el-form>
		<div class="table" style="height:500px;">
			<table id="table" cellspacing="0" cellpadding="0" width="100%">
				<thead>
					<tr><td>机构</td><td>平台</td><td v-for='(item,index) in ed' :key='index'>{{item}}</td></tr>
				</thead>
			</table>
				<!--<table cellspacing="0" cellpadding="0" width="100%">
				<thead>
					<tr>
							<th v-for="(item,index) in dates" :key="index" v-if="item == 'date'">日期</th>
							<th v-for="(item,index) in dates" :key="index" v-if="item == 'name'">名称</th>
							<th v-for="(item,index) in dates" :key="index" v-if="item == 'platform'">平台</th>
							<th v-for="(item,index) in dates" :key="index" v-if="item == 'total'">总数</th>
							<th v-for="(item,index) in dates" :key="index" v-if="item == 'call_count'">接通数</th>
							<th v-for="(item,index) in dates" :key="index" v-if="item != 'name'&&item != 'date'&&item != 'total'&&item != 'platform'&&item != 'call_count'">{{item}}</th>
					</tr>
				</thead>
			 	<tbody>	
					<tr v-for="(item,index) in dest" :key="index">				
							<td v-for="(item1,index) in item.data" :key="index">{{item1.call_count}}</td>
					</tr>
				</tbody>	 
				</table> -->
		</div> 
	 </div>
		<div class="block" style="margin-left:400px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
			:current-page.sync="form.page"
      :page-sizes="[15, 20, 25, 30]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
   
   
  </section>

</template>

<script>
import {axiosRequest} from '@/assets/js/Yt.js'
import {formatDate} from '@/assets/js/Yt.js'
import {getDates} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				 currentPage: 1,
				 total:"",
				 pickerOptions0: {
            disabledDate: (time) => {                 
                   return time.getTime() > Date.now()
                }
            },
            pickerOptions1: {
              disabledDate:(time) => {
                if(this.formdate != ""){
                  let currentTime = this.formdate;
                  return time.getTime() <  currentTime || time.getTime() > new Date(currentTime).getTime() + 10*60*60*1000*24;
                }else{
                  return time.getTime() >  Date.now()
                }
                }
              } , 
				form: {
					page:1,
					page_size:15,
					plat_form:"",    //平台
					action:"",
					type:"1",
					start_time:"",
					end_time:""
				},
				platformData:[],   //平台下来列表数据
				formdate:new Date(new Date().setHours(0, 0, 0, 0)-24*60*60*1000*10),
				enddate:new Date(new Date().setHours(0, 0, 0, 0)),
				ed:[],	   //表头日期
				info:[],	
				dest:[],
			}
		},
    beforeMount() {
			this.init()
      this.data(0)
    },
		methods: {
			// 初始化数据
			init(){
				const url = "/api_backend.php?r=call-statics/platform"
				const conf = {
					url,
					success:(data)=>{
						this.platformData = data.info.ai
						console.log(data)
					}
				}
				axiosRequest(conf)
			},
			// 生成表头的日期数组
				getdiffdate(stime,etime){
					var diffdate = new Array();
					var i=0;
					//开始日期小于等于结束日期,并循环
					while(stime<=etime){
							diffdate[i] = stime;
							//获取开始日期时间戳
							var stime_ts = new Date(stime).getTime();
							//增加一天时间戳后的日期
							var next_date = stime_ts + (24*60*60*1000);
							//拼接年月日，这里的月份会返回（0-11），所以要+1
							var next_dates_y = new Date(next_date).getFullYear()+'-';
							var next_dates_m = (new Date(next_date).getMonth()+1 < 10)?'0'+(new Date(next_date).getMonth()+1)+'-':(new Date(next_date).getMonth()+1)+'-';
							var next_dates_d = (new Date(next_date).getDate() < 10)?'0'+new Date(next_date).getDate():new Date(next_date).getDate();
							stime = next_dates_y+next_dates_m+next_dates_d;
							//增加数组key
							i++;
					}
					this.ed = diffdate
				},
				changeTime(val){
					console.log(val)
				},
				open(){	
						var start_time = formatDate(this.formdate,'yyyy-MM-dd')
						var end_time = formatDate(this.enddate,'yyyy-MM-dd')
					  window.open('/api_backend.php?r=call-statics/show-data&action=excel&page='+this.form.page+'&page_size='+this.form.page_size+"&start_time="+start_time+'&end_time='+end_time+'&plat_form='+this.form.plat_form+'&type='+this.form.type)
				},
				data(a){
						var str = ""	
					
					if(a == 1){
						var parent=document.getElementById("table");
						var child=document.getElementById("mDiv");
						parent.removeChild(child);
					}else if(a == 2){
						var parent=document.getElementById("table");
						var child=document.getElementById("mDiv");
						parent.removeChild(child);
						this.form.page = 1;
						this.form.page_size = 15
					}
				
					// this.info = []
					const url = "/api_backend.php?r=call-statics/show-data"
					const data = this.form
					data.start_time = formatDate(this.formdate,'yyyy-MM-dd')
					data.end_time = formatDate(this.enddate,'yyyy-MM-dd')
					const conf = {
						url,
						data:data,
						success:(data)=>{
							this.info = data.info.info
							this.total = parseInt(data.info.total_count)
							if(this.info.length > 0){
								// 处理数据
										let resultservers_company_name = {};
										let result = {};
										let array_servers=[];
										let array_company_name=[];
										var item;
									
										for(let i=0;i<this.info.length;i++){ 
											result [this.info[i].servers]=this.info[i].servers//因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
										} 
										for(item in result){ 
											array_servers.push(result[item]); 
										} 	
										var company_name={};
										result = {};
										var servers={};
										for(let i=0;i<array_servers.length;i++){
											company_name={};
											servers=array_servers[i];
											for(let m=0;m<this.info.length;m++){ 
													if(servers==this.info[m].servers)
													company_name[this.info[m].company_name]=this.info[m].company_name;
											} 
											resultservers_company_name[servers]=company_name;
										} 				
										// for(item in resultping_jigou){ 
										// 	array_jigou.push(resultping_jigou[item]); 
										// } 
										
										//console.log(array_company_name)
										// console.log(this.ed)
										var called_count={};
										var call_count={};
										var billsec_count={};
										var date_str = {}
										servers={};
										var servers_name="";
										var company_name_str="";
										for(let i=0;i<array_servers.length;i++){
											servers_name=array_servers[i];
											servers = resultservers_company_name[servers_name]
											array_company_name=[];
											for(item in servers){ //ai1里面机构们
												array_company_name.push(servers[item]); 
											}
											for(let m=0;m<array_company_name.length;m++){
											called_count={};
											call_count={};
											billsec_count={};
											company_name_str=array_company_name[m];
											for(let j=0; j<this.info.length;j++) {
													if(servers_name==this.info[j].servers && company_name_str==this.info[j].company_name){
														called_count[this.info[j].call_date]=this.info[j].called_count;
														call_count[this.info[j].call_date]=this.info[j].call_count;
														billsec_count[this.info[j].call_date]=this.info[j].billsec_count;
													}
											}
											str+="<tr><td style='border-bottom:1px solid #ddd ;border-left:1px solid #ddd; text-align: center; padding: 10px;'>"+company_name_str+"</td><td style='border-bottom:1px solid #ddd ;border-left:1px solid #ddd; text-align: center; padding: 10px;'>"+servers_name +'</td>'
											var index=0;
											var find=0;
											for(let i=0; i<this.ed.length;i++){
													date_str=this.ed[i];
													find=0;
													for(item in called_count){
														if(item == date_str){
															str+="<td style='border-bottom:1px solid #ddd ;border-left:1px solid #ddd; text-align: left; padding: 10px;'>"+"<p>接通量:"+called_count[item]+"</p><p>呼叫量: "+call_count[item]+"</p><p>通话时长: "+billsec_count[item]+"</p></td>";
															find=1;
														}
													}
													if(find==0){   //没有对应日期时，显示0
														str+="<td style='border-bottom:1px solid #ddd ;border-left:1px solid #ddd; text-align: center; padding: 10px;'>0</td>"
													}
											}
												str+="</tr>"
											}
									}
								// console.log(str)
									var body = document.getElementById("table");
									var div = document.createElement("tbody");
									div.id = "mDiv";
									div.innerHTML = str;
									body.appendChild(div);
							}else{
								str = ""
							}
						
							console.log(str)
						}
					}
					axiosRequest(conf)
					// 生成日期表头数组
					if(this.formdate&&this.enddate){						
							var x = formatDate(this.formdate,'yyyy-MM-dd')
							var y = formatDate(this.enddate,'yyyy-MM-dd')
							this.getdiffdate(x,y)
					}
			
			},
			handleSizeChange(val) {
				this.form.page_size = val
				this.data(1)
      },
      handleCurrentChange(val) {
				this.form.page = val
				this.data(1)
      }
  }
	}

</script>
<style scoped lang="scss">
 @import '../../../static/css/openEnterprise.scss'
</style>