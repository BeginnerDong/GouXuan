<template>
	<view class="body">
		<div class="top" style="text-align: center;">


			<img src="../../static/images/logo1.png" style="width:190px;margin-top: 55px;" />

		</div>
		<div style="padding-left: 15px; padding-right: 15px;">
			<div class="color2">
				<div class="ilblock">
					用户名：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入用户名或者手机号" v-model="submitData.login_name" />
				</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证码：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入验证码" type="password" v-model="submitData.code" />
					<div class="flo-left ilblock flo-right" @click="webSelf.$Utils.stopMultiClick(getCode)">{{text}}</div>
				</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证符：
				</div>
				<div class="color1 ilblock top-list">
					<input class="color1 ilblock" placeholder="请输入验证符" v-model="imgcode" />
				</div>
			</div>
			<div style="text-align: center;" @click="refresh()">
				<imgCode ref="imgcode"></imgCode>
				<text>看不清？点击图片刷新</text>
			</div>
			<button class=" radiu20 color5" style="width: 80%; margin: 50px auto;height: 40px; line-height: 40px; background: #F8835B;"
			 @click="submit">登录</button>
		</div>
	</view>
</template>

<script>
	import imgCode from '@/components/imgCode/imgCode.vue';
	export default {

		data() {
			return {
				webSelf:this,
				submitData: {
					login_name: '',
					code: '',			
				},
				imgcode: '',
				currentTime:61,
				text:'获取验证码',
	
			}
		},
		components: {
			imgCode
		},
		onLoad(options) {
			const self = this;
			uni.setStorageSync('canClick', true);
			self.show();
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */
			if (uni.getStorageSync('merchant_token')) {
				uni.redirectTo({
					url: '/pages/store/store'
				})
			};
		},
		methods: {


			refresh: function() {
				this.$refs.imgcode.refresh();
			},
			show: function() {
				var _self = this;
				setTimeout(function() {
					_self.refresh();
				}, 500);
			},


			getCode() {
				var self = this;
				console.log('getCode')
				var phone = self.submitData.login_name;
				var currentTime = self.currentTime //把手机号跟倒计时值变例成js值
				if (self.submitData.login_name == '') {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('手机号码不能为空', 'none');
					return
				} else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('手机号格式不正确', 'none');
					return
				} else {
					//当手机号正确的时候提示用户短信验证码已经发送
					const postData = {
						tokenFuncName: 'getProjectToken',
						params: {
							PhoneNumbers:self.submitData.login_name,
							SignName:"本地捕手",
							TemplateCode:"SMS_164735200"
						}
					};
					const callback = (res) => {
						if (res.solely_code == 100000) {

							self.$Utils.showToast('验证码已发送', 'none');
							//设置一分钟的倒计时
							var interval = setInterval(function() {
								currentTime--; //每执行一次让倒计时秒数减一
								self.text = currentTime + 's'
								//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
								if (currentTime <= 0) {
									uni.setStorageSync('canClick', true);
									clearInterval(interval)
									self.text = '重新发送'
								};
							}, 1000);
						} else {
							self.$Utils.showToast(res.msg, 'none');
						};
						uni.setStorageSync('canClick', true);
					};
					console.log('submitcode')
					self.$apis.codeGet(postData, callback)
				};
			},


			submit() {
				const self = this;

				const postData = {
					phone: self.submitData.login_name,
					smsAuth:{
					   phone: self.submitData.login_name,
					   code:self.submitData.code
					}
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					if (self.imgcode == '') {
						self.$Utils.showToast('请输入验证符', 'none');
						return
					} else {
						if (self.imgcode != uni.getStorageSync('imgcode')) {
							self.$Utils.showToast('验证符错误', 'none');
							return
						}
					};
					const callback = (res) => {
						if (res.solely_code == 100000) {
							console.log(res);
							uni.setStorageSync('merchant_token', res.token);
							uni.setStorageSync('merchant_no', res.info.user_no);
							uni.setStorageSync('merchant_info', res.info);
							uni.redirectTo({
								url: '/pages/store/store'
							})
						} else {
							self.$Utils.showToast(res.msg)
						}
					}
					self.$apis.shopLogin(postData, callback);
				} else {
					self.$Utils.showToast('请补全登录信息', 'none')
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
		background: url(/static/images/service-icon1.png) no-repeat;
		background-size: 100%;
		margin-bottom: 30px;
	}

	.top-img {
		border-top: solid 2px #F19C7F;
	}


	.top-list {
		border-bottom: solid 1px #F0F0F0;
		height: 60px;
		width: 100%;
		line-height: 66px;
	}

	.top-list input {
		position: relative;
		top: 6px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
