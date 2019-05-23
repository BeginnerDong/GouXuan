<template>
	<view class="body">
		<div class="top">

			<div class="top-img">
				<img src="/static/images/达人/img3.png" style="width: 105px;position: relative; top: 36px; left: 125px;" />
			</div>
		</div>
		<div style="padding-left: 15px; padding-right: 15px;">
			<div class="color2">
				<div class="ilblock">
					用户名：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入用户名或者手机号" v-model="submitData.login_name"/>
				</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证码：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入验证码" v-model="submitData.password"/>
					<div class="flo-left ilblock flo-right">获取验证码</div>
				</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证符：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入验证符" v-model="imgcode"/>	
				</div>
			</div>
			<div style="text-align: center;" @click="refresh()">
				<imgCode ref="imgcode"></imgCode>
				<text >看不清？点击图片刷新</text>
			</div>
			<button class=" radiu20 color5" style="width: 80%; margin: 50px auto;height: 40px; line-height: 40px; background: #F8835B;" @click="submit">登录</button>
		</div>
	</view>
</template>

<script>
	import imgCode from '@/components/imgCode/imgCode.vue';
	export default {

		data() {
			return {
				submitData:{
					login_name:'',
					password:''
				},
				imgcode:''
			}
		},
		components:{imgCode},
		onLoad(options) {
			const self = this;
			self.show();
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */
			if(uni.getStorageSync('merchant_token')){
				uni.redirectTo({
					url:'/pages/store/store'
				})
			};
		},
		methods: {
			
			
			refresh:function(){
				this.$refs.imgcode.refresh();
			},
			show:function(){
				var _self=this;
				setTimeout(function(){
					_self.refresh();
				},500);
			},
		

			submit() {
				const self = this;
				
				const postData = {
					login_name: self.submitData.login_name,
					password: self.submitData.password,
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					if(self.imgcode==''){
						self.$Utils.showToast('请输入验证符', 'none');
						return
					}else{
						if(self.imgcode!=uni.getStorageSync('imgcode')){
							self.$Utils.showToast('验证符错误', 'none');
							return
						}
					};
					const callback = (res) => {
						if (res.solely_code == 100000) {
							console.log(res);
							uni.setStorageSync('merchant_token', res.token);
							uni.setStorageSync('merchant_no', res.info.user_no);	
							uni.redirectTo({
								url:'/pages/store/store'
							})
						} else {
							self.$Utils.showToast(res.msg)
						}
					}
					self.$apis.login(postData, callback);
				} else {
					self.$Utils.showToast('请输入账号密码', 'none')
				};
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	page {
		background: #fff;
	}

	.home {
		background: none;
	}

	.top {
		width: 100%;
		height: 240px;
		background: url(/static/images/服务/service-icon1.png) no-repeat;
		background-size: 100%;
		margin-bottom: 30px;
	}

	.top-img {
		border-top: solid 2px #F19C7F;
	}


	.top-list {
		border-bottom: solid 1px #F0F0F0;
		height: 60px;
		width: 80%;
		line-height: 66px;
	}

	.top-list input {
		position: relative;
		top: 6px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
