<template>
	<section>
		<div class="header">
			<div class="title"> <router-link to="/charts" style="color:#fff">言通言小信AI贷后管理软件</router-link></div>
			<div class="drop">
			<span> 账户话费余额：<em class="red" style="font-weight: 800 ">{{money}}</em>元</span>
			<span @click="shuaxin" style="margin-right:20px;cursor:pointer;margin-left:10px;">刷新</span>
     	<span v-show="info.sys_login == 1"> <a href="/sysadmin.php" style="display:inline-block;color:#fff;margin-right:20px;cursor:pointer;"> 切回管理</a></span>
			<el-dropdown trigger="hover" >
				<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" />{{info.company_name}}</span>
				<el-dropdown-menu slot="dropdown" style="cursor: pointer;">
					<el-dropdown-item>公司代号:{{info.prefix}}</el-dropdown-item>
					<!--<el-dropdown-item>设置</el-dropdown-item>-->
					<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		</div>
	</section>
</template>

<script type="text/ecmascript-6">
import {axiosRequest,delCookie,setCookie} from '@/assets/js/Yt.js'
import store from '@/vuex/store.js'
  	export default {
		inject:['reload'],
		data() {
			return {
				collapsed:false,
				info:{
					true_name:"",
					company_id:"",
					company_name:""
				},
				money:"",
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
			}
		},
		beforeMount() {
			const  conf = {
				url:"/api/api_backend.php?r=user/index",
				success:(data)=>{
					this.info = data
				}
			}
			axiosRequest(conf)
			this.moneySafe()
		},
		methods: {
			onSubmit() {
				console.log('submit!')
			},
			moneySafe(){
				const url = "/api/api_backend.php?r=asrcall-bill/balance-info"
				const conf = {
					url,
					success:(data)=>{
						this.money = data.money
						console.log(data)
					}
				}
				axiosRequest(conf)
			},
			handleopen() {
				//console.log('handleopen')
			},
			handleclose() {
				//console.log('handleclose')
			},
			handleselect() {
			},
			shuaxin(){
				this.reload()
			},
			logout() {//退出登录
				this.$confirm('确认退出吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const url = "/api/api_backend.php?r=login/logout"
					const conf = {
						url,
						success:(data)=>{
							if(data.statusCode == 1){
								store.commit('clearOptions')
								this.$router.push({path:'/login'})
								setCookie('user',"")
							}else{
								this.$alert(data.message)
							}
						}
					}
					axiosRequest(conf)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					})         
				})
			},
		},
		mounted() {
			var user = sessionStorage.getItem('user')
			if (user) {
				user = JSON.parse(user)
				this.sysUserName = user.name || ''
				this.sysUserAvatar = user.avatar || ''
			}
		}
	}

</script>

<style lang="scss" scoped >	
	#app .title{
		color:#fff;
	}
	.title{
		font-size:18px;
		height:60px;
		line-height:60px;
		float:left;
		padding-left:20px;
	}
	.header{
		overflow: hidden;
		width: 100%;
		background: #23262E;
		height:60px;
	}
	.drop{
		float:right;
		cursor:pointer;
		color:#fff;
		.el-dropdown{
			padding-right:10px;
			color:#fff;
			height:60px;
			line-height:60px;
			font-size:18px;
		}
	}

</style>