<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="8" style="background:#fff;margin-left:20px;">
               <div>
                    <p class="title-charts">账号状态</p>
                    <div class="content-charts" >
                        <div class="content-charts-con" >
                            <p>已使用天数</p>
                            <p>{{used_days}}</p>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                         <div class="content-charts-con">
                            <p>剩余天数</p>
                            <p>{{left_days}}</p>
                        </div> 
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con">
                            <p>授权日期</p>
                            <p>{{start_time}}~{{auth_time}}</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="15" style="background:#fff;margin-left:10px;">
                <div>
                    <p class="title-charts">账号配置</p>
                    <div class="content-charts" >
                        <div class="content-charts-con" >
                            <p>机器人数量</p>
                            <p>{{ai_count}}</p>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                         <div class="content-charts-con">
                            <p>已使用</p>
                            <p>{{used_ai_count}}</p>
                        </div> 
                         <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con">
                            <p>催收员数量</p>
                            <p>{{collection_count}}</p>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con">
                            <p>已使用</p>
                            <p>{{used_collection_count}}</p>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con">
                            <p>话术方案</p>
                            <p>{{template_count}}</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div style="font-size:16px;">数据概况</div>
                <div style="font-size:14px;color:gray;margin-bottom:10px;">
                    案件总量:<span style="color:red">{{tip.all}}</span>; 
                    接通总量:<span style="color:red">{{tip.conn}}</span>;
                    接通率:<span style="color:red">{{tip.per_conn}}</span>
                </div>
               <div id="container" ></div>
            </el-col>
            <el-col :span="24" style="background:#fff">
                  <div>
                    <p class="title-charts">快捷入口</p>
                    <div class="content-charts" >
                        <div class="content-charts-con" style="border:1px solid #d2d2d2">
                            <router-link to='/levelSetting' style="color:#333;font-size:16px;">案件等级设置</router-link>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con" style="border:1px solid #d2d2d2;width:120px;">
                            <router-link to='/templateManagement' style="color:#333;font-size:16px;">模板管理</router-link>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                         <div class="content-charts-con" style="border:1px solid #d2d2d2">
                            <router-link to='/caseConfiguration' style="color:#333;font-size:16px;">案件类型配置</router-link>
                        </div> 
                         <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con" style="border:1px solid #d2d2d2;width:120px;">
                            <router-link to='/clientConfiguration' style="color:#333;font-size:16px;">委托方配置</router-link>
                        </div>
                        <div style="width:2px;background:#f2f2f2;margin-top:5px;"></div>
                        <div class="content-charts-con" style="border:1px solid #d2d2d2">
                            <router-link to='/regionalConfiguration' style="color:#333;font-size:16px;">催收区域配置</router-link>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import echarts from 'echarts'
import Highcharts from 'highcharts';
import {axiosRequest} from '@/assets/js/Yt.js'
export default {
    data() {
        return {
            ai_count:"",
            auth_time:"",
            collection_count:"",
            left_days: "",
            start_time: "",
            template_count:"",
            used_collection_count: "",
            used_days: "",
            used_ai_count:"",
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
        this.init()
        this.initData()
    },
    methods: {
        initData(){
            const url = "/api/api_backend.php?r=index/index"
            const conf = {
                url,
                success:(data)=>{
                    this.ai_count = data.info.ai_count
                    this.auth_time = data.info.auth_time
                    this.collection_count = data.info.collection_count
                    this.left_days = data.info.left_days
                    this.start_time = data.info.start_time
                    this.template_count = data.info.template_count
                    this.used_collection_count = data.info.used_collection_count
                    this.used_days = data.info.used_days
                    this.used_ai_count = data.info.used_ai_count
                }
            }
            axiosRequest(conf)
        },
        init(){
            const url = "/api/api_backend.php?r=index/data-show"
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
                }
            }
            axiosRequest(conf)
        },
        // 生成图表
        loadchart(num1,num2){
            var chart = Highcharts.chart('container', {
                title: {
                    text: ''
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
        },
    }
</script>

<style scoped>
    .chart-container {width: 100%;float: left;}
    .el-col {padding: 20px 20px;}
    .content-charts{display:flex;justify-content: space-around;}
    .content-charts-con{display:flex;flex-direction: column;align-items: center;padding:10px;color:gray;}
    .content-charts-con p:nth-of-type(1){margin-bottom:10px;}
    .title-charts{border-bottom:1px solid #f2f2f2;font-size:16px;margin-bottom:20px;padding-bottom:10px;}
</style>
