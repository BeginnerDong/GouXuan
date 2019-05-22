<template>
	<view>
		<div class="bg1 color2 font15" style="width: 100%; height: 50px;font-weight: bolder; line-height: 50px; padding-left: 15px;">
			自助服务
		</div>
		<div class="bg1" style="background: #fff; width: 100%;">
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/status/status'}})">
					<div class="img">
						<img src="/static/images/服务/service-icon2.png" />
					</div>
					<div class="color2">找回电子码需求</div>
				</div>
			</div>
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/panic/panic'}})">
					<div class="img">
						<img src="/static/images/服务/service-icon3.png" />
					</div>
					<div class="color2">预约使用</div>
				</div>
			</div>
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all'}})">
					<div class="img">
						<img src="/static/images/服务/service-icon4.png" />
					</div>
					<div class="color2">查看订单</div>
				</div>
			</div>
			<div class="ilblock list-img" style="border: none;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/login/login'}})">
					<div class="img">
						<img src="/static/images/微信图片_20190429164219.png" />
					</div>
					<div class="color2">商家入口</div>
				</div>
			</div>
			<div class="ilblock list-img" style="border: none;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow/follow'}})">
					<div class="img">
						<img src="/static/images/服务/service-icon5.png" />
					</div>
					<div class="color2">客服</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="bg1 color2 font15" style="border-bottom: solid 1px #EFEFEF;width: 100%; height: 50px;font-weight: bolder; line-height: 50px; padding-left: 15px;">
			常见问题
		</div>
		<div class="bg1">
			<div class="testlist">
				短信丢了/电子吗丢如何找回<img src="/static/images/home-icon10.png" />
			</div>
			<div class="testlist">
				短信丢了/电子吗丢如何找回<img src="/static/images/home-icon10.png" />
			</div>
			<div class="testlist-on">
				短信丢了/电子吗丢如何找回<img src="/static/images/微信图片_20190429170142.png" />
				<div class="color2" style="line-height: 20px;">点击：<span style="color: #F78D70;">找电子码</span>，随时随地都可以查到哦，输入够吗是的手机号，验证一下就可以查到电子短信了</div>
			</div>
		</div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf:this

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
	page{
		background: #fff;
	}
	.list-img {
		border-top: solid 1px #EFEFEF;
		width: 125px;
		float: left;
		text-align: center;
		height: 110px;
		background: #fff;
	}

	.img {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		overflow: hidden;
		margin: 25px auto 15px;
	}

	.img img {
		width: 46px;
		height: 46px;
	}

	.testlist {
		border-bottom: solid 1px #EFEFEF;
		font-size: 13px;
		color: rgb(102, 102, 102);
		height: 44px;
		line-height: 44px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.testlist img {
		width: 14px;
		float: right;
		margin-top: 15px;
	}

	.testlist-on {
		border-bottom: solid 1px #EFEFEF;
		font-size: 13px;
		color: rgb(102, 102, 102);
		height: 98px;
		line-height: 44px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.testlist-on img {
		width: 14px;
		float: right;
		margin-top: 15px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
