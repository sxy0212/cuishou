<template>
	<section>
		<el-breadcrumb separator-class="el-icon-arrow-right" style="height:30px;font-size:14px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p class="title">客户数量
            <span class="badge fr">喵点</span>
          </p>
          <div class="card-body card-list">
						<p>
							<span class="card-list-title">客户总量:</span>
							<span>3000</span>
						</p>
						<p>
							<span class="card-list-title">成交客户:</span>
							<span>1000</span>
						</p>
						<p>
							<span class="card-list-title">呼叫中心:</span>
							<span>1000</span>
						</p>
						<p>
							<span class="card-list-title">网络电话:</span>
							<span>1000</span>
						</p>
						<p>
							<span class="card-list-title">智能语音:</span>
							<span>1000</span>
						</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p class="title">业务员数量
            <span class="badge fr">喵点</span>
          </p>
          <div class="card-body card-list">
            <p>
							<span class="card-list-title">上海:</span>
							<span>20</span>
						</p>
						 <p>
							<span class="card-list-title">合肥:</span>
							<span>20</span>
						</p>
						 <p>
							<span class="card-list-title">北京:</span>
							<span>10</span>
						</p>
						 <p>
							<span class="card-list-title">广州:</span>
							<span>10</span>
						</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p class="title">设备数量
            <span class="badge fr">喵点</span>
          </p>
          <div class="card-body card-list">
            <p>
							<span class="card-list-title">智能语音平台:</span>
							<span>40</span>
						</p>
						 <p>
							<span class="card-list-title">呼叫中心:</span>
							<span>200</span>
						</p>
						 <p>
							<span class="card-list-title">语音识别平台:</span>
							<span>60</span>
						</p>
						<p>
							<span class="card-list-title">金融催收:</span>
							<span>100</span>
						</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p class="title">本周新增客户
            <span class="badge fr">喵点</span>
          </p>
          <div class="card-body card-list">
            <p>
							<span class="card-list-title">成交:</span>
							<span>0</span>
						</p>
						 <p>
							<span class="card-list-title">意向:</span>
							<span>0</span>
						</p>
          </div>
        </div>
      </el-col>
</el-row>
<el-row class="row-two">
	<el-col :span="6">
		<div class="grid-content bg-purple">
			<div class="fl two-left">
					<i class="fa fa-address-card-o icon"></i>
			</div>
			<a href="/#/information">
			<div class="fl two-right" >
				<p class="two-title">客户录入</p>
				<p class="two-content">客户签约</p>
			</div>  </a>
  	</div>
	</el-col>
  
 <el-col :span="6">
		<div class="grid-content bg-purple">
			<div class="fl two-left">
					<i class="fa fa-rmb icon"></i>
			</div>
			<div class="fl two-right" >
				<p class="two-title">我的收款</p>
				<p class="two-content">查看收支账单</p>
			</div>  
  	</div>
	</el-col>
	<el-col :span="6">
		<div class="grid-content bg-purple">
			<div class="fl two-left">
					<i class="fa fa-address-card-o icon"></i>
			</div>
			<div class="fl two-right" >
				<p class="two-title">我的客户</p>
				<p class="two-content">浏览客户</p>
			</div>  
  	</div>
	</el-col>
	<el-col :span="6">
		<div class="grid-content bg-purple">
			<div class="fl two-left">
					<i class="fa fa-address-card-o icon"></i>
			</div>
			<div class="fl two-right" >
				<p class="two-title">账号开通</p>
				<p class="two-content">提交账号开通申请</p>
			</div>  
  	</div>
	</el-col>
</el-row>
<el-row class="row-three">
  <el-col :span="8">
		<div class="grid-content bg-purple">
			<p class="title">审核统计
      </p>
			<div class="content">
					111
			</div>
		</div>
	</el-col>
  <el-col :span="16">
		<div class="grid-content bg-purple-light">
			<p class="title">消息中心</p>
			<div class="content">
					222
			</div>
		</div>
	</el-col>
</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				

			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}

</script>

<style scoped lang="scss">
 @import '../../static/css/index.scss'
</style>