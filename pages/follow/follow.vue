<template>
	<view>
		<div class="follow-box" v-if="userInfoData.length==0">
			<div class="follow-logo">
				<img src="/static/images/达人/Talent%20show-img.png" />
			</div>
			<div class="follow-logobotm">
				<div class="color2">
					你可设置你的关注内容
				</div>
				<div class="color1">
					这里暂时没有相关内容
				</div>
				<button class="buttonB" @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow-content/follow-content'}})">设置关注</button>
			</div>
		</div>
		<div class="top" v-else>
			<div class="top-left ilblock">
				<div class="ilblock">
					<span class="color2" style="margin-left: 10px;">全部</span>
				</div>
				<div class="ilblock" style="text-align: center;width:25%">
					<span class="color1" style="margin-left: 10px;">酒店</span>
				</div>
			</div>

			<div class="top-right ilblock"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow-content/follow-content'}})">
				<img src="/static/images/focus%20on-icon1.png" style="width:20%; margin: 8px 6px;" />
				<div class="ilblock" style="color: rgb(249,138,72); font-size: 13px; position: relative; top: -16px;">关注管理</div>
			</div>
		</div>
		
		<div class="best-box ilblock" style="margin-left: 15px;" v-for="item in mainData">
			<div class="best-box-top">
				<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
				<div class="best-num ilblock">
					美食
				</div>
			</div>
			<div class="best-text color2">
				{{item.title}}
			</div>
			<view>
				<div class="ilblock best-money1">
					<view class="span1 ilblock" style="background: #F98A48;">店反</view>
					<view class="span2 ilblock" style="color: #F98A48;">￥{{item.shop_reward}}</view>
				</div>
				<div class="ilblock best-money2">
					<view class="span1 ilblock" style="background: #F14667;">团反</view>
					<view class="span2 ilblock" style="color: #F14667;">￥{{item.group_reward}}</view>
				</div>
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72); margin-left: 15px; margin-top: 8px;">￥
					<span style="font-size: 20px;">{{item.price}}</span>
				</div>
			</view>
		</div>

		

		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock" @click="webSelf.$Router.navigateTo({route:{path:'/pages/index/index'}})">
					<view class="navbar-img">
						<image src="/static/images/navbar1.png"></image>
					</view>
					<view>首页</view>
				</view>
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="/static/images/navbar2-a.png"></image>
					</view>
					<view  class="color8">关注</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.navigateTo({route:{path:'/pages/user/user'}})">
					<view class="navbar-img">
						<image src="/static/images/navbar3.png"></image>
					</view>
					<view>我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				userInfoData: [],
				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getUserData'], self)
		},

		methods: {


			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userInfoData = res.info.data[0]
					};
					self.getMainData()
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					category_id: ['in', self.userInfoData.follow]
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.productGet(postData, callback);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/follow.css";
	@import "../../assets/style/cusseed.css";

	.buttonB {
		text-align: center;
		width: 60%;
		margin: 50px auto;
		border-radius: 20px;
		height: 40px;
		color: #fff;
		background: linear-gradient(to right, #FF9B5C, #FF6160) !important;
		font-size: 14px;
		line-height: 40px;
	}


	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
