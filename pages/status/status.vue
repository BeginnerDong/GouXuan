<template>
	<view class="body">

		<div class="big-box">
			<div class="list">
				身份验证
			</div>
			<div class="list">
				手机号：
			</div>
			<input class="color1 font14" style="border: solid 1px #FFF0EA; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #FFF0EA; border-radius: 3px;"
			 placeholder="购买时登记的手机号" v-model="submitData.phone">

			</input>
			<div class="list">
				图形验证码
			</div>
			<input class="color1 font14" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 90%; "
			 placeholder="输入下方验证符" v-model="submitData.imgcode">
			<div style="text-align: center;" @click="refresh()">
				<imgCode ref="imgcode"></imgCode>
				<text>看不清？点击图片刷新</text>
			</div>
			</input>

			<div class="list">
				短信验证
			</div>
			<input class="color1 font14" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 64%; "
			 placeholder="6位短信验证" v-model="submitData.code">
			<div class="font14 color2 bg2 ilblock flo-right" style="height: 32px; line-height: 30px;position: relative; top: -32px;width: 80px;text-align: center; border: solid 1px #EBEBEB;" @click="webSelf.$Utils.stopMultiClick(getCode)">{{text}}</div>
			</input>
			<button class="color5 font13" style="width: 88%;height: 30px; background: #F67550; margin: 20px auto;" @click="submit">进入系统</button>
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
					phone: '',
					imgcode: '',
					code:''
				},
				currentTime:61,
				text:'获取验证码',
			}
		},

		components: {
			imgCode
		},
		onLoad(options) {
			const self = this;
			self.show();
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */

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

				var phone = self.submitData.phone;
				var currentTime = self.currentTime //把手机号跟倒计时值变例成js值
				if (self.submitData.phone == '') {

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
							PhoneNumbers: self.submitData.phone,
							SignName: "本地捕手",
							TemplateCode: "SMS_164735201"
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
								}

							}, 1000);
						} else {
							uni.setStorageSync('canClick', true);

							self.$Utils.showToast(res.msg, 'none')
						}
					};
					self.$apis.codeGet(postData, callback)
				};
			},

			submit() {
				const self = this;
				if (self.$Utils.checkComplete(self.submitData)) {
					if (self.submitData.phone == '') {
						self.$Utils.showToast('请输入手机号', 'none');
						return
					}
					if (self.submitData.imgCode == '') {
						self.$Utils.showToast('请输入验证符', 'none');
						return
					} else {
						if (self.submitData.imgcode != uni.getStorageSync('imgcode')) {
							self.$Utils.showToast('验证符错误', 'none');
							return
						}
					};
					self.getUserData()
				} else {
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			

			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.smsAuth={
				   code:self.submitData.code,
				   phone:self.submitData.phone
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						uni.navigateTo({
							url: '/pages/ElectronicCode/ElectronicCode?phone=' + self.submitData.phone
						})
					} 
				};
				self.$apis.userGet(postData, callback);
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

	.big-box {
		width: 345px;
		height: 490px;

		border: solid 2px #E8E8E8;
		margin: 30px auto;
		border-radius: 8px;
		box-shadow: 0px 0px 12px #E8E8E8;
		padding: 45px 15px;
	}

	.list {
		height: 50px;
		border-bottom: solid 1px #F6F6F6;
		line-height: 52px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
