<template>
  <section>
		<div style="margin-bottom:10px;">
      批次名称:
      <el-select v-model="batch_id" placeholder="请选择" @change="changeBatch">
        <el-option v-for="(item,index) in option" :label="item.batch_name" :value="item.id" :key="index"></el-option>
      </el-select>
    </div>
		<div style="padding-bottom:10px;font-size:20px;display:flex;justify-content: space-between;">
      <div>
        案件总量<span style="color:red">{{tip.all}}</span>; 
        接通总量 <span style="color:red">{{tip.conn}}</span> ;接通率<span style="color:red">{{tip.per_conn}}</span>
      </div>
      <div>
      	<el-button type="primary" @click="exportData" :disabled="batch_id == ''">导出数据</el-button>
      </div>
    </div>
		<div id="container" v-loading="loading"></div>
	</section>
</template>
<script>
import Highcharts from 'highcharts';
import {axiosRequest,message} from '@/assets/js/Yt.js'
	export default {
		data() {
			return {
				option:[],
				batch_id:"",
        loading:true,
        dates:[{
                name: "",
                data: []
              }, {
                name: '',
                data: []
              }],
        x: [],  //x轴数据
        tip:{
          all:"",
          conn:"",
          per_conn:""
        }
			}
		},
		activated() {
			this.initBatch()
			this.init()   //页面数据初始化 
    },
		methods: {
			initBatch(){
				const url = "/api_backend.php?r=call-stat/batch-list"
				const conf = {
					url,
					success:(data)=>{
            this.option = data.info
          }
				}
				axiosRequest(conf)
			},
      changeBatch(val){
        this.batch_id = val
        this.init()
      },
      init(){
        const url = "/api_backend.php?r=call-stat/data-show"
        const batch_id = this.batch_id
        const conf = {
          url,
          data:{batch_id},
          success:(data)=>{
            this.tip.all = data.info.data.all;
            this.tip.conn = data.info.data.conn;
            this.tip.per_conn = data.info.data.per_conn
            this.x = data.info.chart.map( item=>item.time)
            this.dates[0].name = "拨打电话量"
            this.dates[0].data =  data.info.chart.map( item=>Number(item.num))
            this.dates[1].name = "接通电话量"
            this.dates[1].data =  data.info.chart.map( item=>Number(item.connect))
            this.loading = false
            this.loadchart(this.x,this.dates)
            message(data)
          }
        }
        axiosRequest(conf)
      },
      exportData(){
        window.open("/api_backend.php?r=call-stat/export&batch_id="+this.batch_id)
      },
		  // 生成图表
      loadchart(num1,num2){
              var chart = Highcharts.chart('container', {
                title: {
                  text: '通话量统计'
                },
                subtitle: {
                },
                yAxis: {
                  title: {
                    text: '通话量'
                  }
                },
                legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'middle'
                },
                xAxis: {
                  categories:num1,
                  labels: {
                      autoRotationLimit: 80,
                      autoRotation: [-30]
                  }
                },
                series:num2,
                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                      }
                    }
                  }]
                }
              });
            }
		}
	}

</script>
<style scoped >
</style>