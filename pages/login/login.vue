<template>
	<view class="body">
		<div class="top">
			
			<div class="top-img">
				<img src="/static/images/达人/img3.png" style="width: 105px;position: relative; top: 36px; left: 125px;"/>
			</div>
		</div>
		<div style="padding-left: 15px; padding-right: 15px;">
			<div class="color2">
				<div class="ilblock">
					用户名：
				</div>
				<div class="color1 ilblock top-list">请输入用户名或者手机号</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证码：
				</div>
				<div class="color1 ilblock top-list">
					<div class="flo-left ilblock flo-right">获取验证码</div>
				</div>
			</div>
			<div class="color2">
				<div class="ilblock">
					验证符：
				</div>
				<div class="color1 ilblock top-list">
					<img class="flo-right" src="/static/images/服务/service-img1.png" style="width: 80px; position: relative; top: 20px;"/>
				</div>
			</div>
			<button class=" radiu20" style="width: 80%; margin: 50px auto;height: 40px; line-height: 40px; background: #F8835B;"><a class="color5" href="store.html">登录</a></button>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {


			}
		},
		onLoad(options) {
			const self = this;
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */

		},
		methods: {
	
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
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	
</style>
