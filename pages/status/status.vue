<template>
	<view class="body">

		<div class="big-box">
			<div class="list">
				身份验证
			</div>
			<div class="list">
				手机号：
			</div>
			<input class="color1 font10" style="border: solid 1px #FFF0EA; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #FFF0EA; border-radius: 3px;" placeholder="购买时等级的手机号" v-model="submitData.phone">
				
			</input>
			<div class="list">
				图形验证码
			</div>
			<input class="color1 font10" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 90%; "
			 placeholder="输入右边字符" v-model="submitData.imgcode">
			<div style="text-align: center;" @click="refresh()">
				<imgCode ref="imgcode"></imgCode>
				<text>看不清？点击图片刷新</text>
			</div>
			</input>

			<div class="list">
				短信验证
			</div>
			<input class="color1 font10" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 90%; "
			 placeholder="6位短信验证">
			<div class="font10 color2 bg2 ilblock flo-right" style="height: 30px; line-height: 30px;position: relative; top: -30px;width: 80px;text-align: center; border: solid 1px #EBEBEB; ">获取验证码</div>
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
				submitData:{
					phone: '',
					imgcode: ''
				}
				
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
			submit() {
				const self = this;
				if (self.$Utils.checkComplete(self.submitData)) {
					if(self.submitData.phone==''){
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
					uni.navigateTo({
						url:'/pages/ElectronicCode/ElectronicCode?phone='+self.submitData.phone
					})
				} else {
					self.$Utils.showToast('请补全信息', 'none')
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
