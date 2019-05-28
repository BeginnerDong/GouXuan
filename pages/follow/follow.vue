<template>
	<view>
		<div class="follow-box" v-if="userInfoData.length==0">
			<div class="follow-logo">
				<img src="../../static/images/Talent-show-img.png" />
			</div>
			<div class="follow-logobotm">
				<div class="color2">
					你可设置你的关注内容
				</div>
				<div class="color1">
					这里暂时没有相关内容
				</div>
				<button class="buttonB" @click="webSelf.$Router.navigateTo({route:{path:'../../pages/follow-content/follow-content'}})">设置关注</button>
			</div>
		</div>
		<div class="top" v-else>
			<div class="top-left ilblock">
				<div class="ilblock" style="text-align: center;width:25%;float: left;" @click="changeMenu('0')">
					<span :class="all?'color8':'color2'">全部</span>
				</div>
				<scroll-view scroll-x="true" class="ilblock" style="width:70%">
					<view style="height:40px;width:100%;white-space: nowrap;">
						<view class="ilblock" style="text-align: center;margin-left: 10px;" v-for="item in labelData" @click="changeMenu(item.id)">
							<span :class="searchItem.category_id==item.id?'color8':'color1'">{{item.title}}</span>
						</view>
					</view>
				</scroll-view>
			</div>

			<div class="top-right ilblock" @click="webSelf.$Router.navigateTo({route:{path:'../../pages/follow-content/follow-content'}})">
				<img src="../../static/images/focus-on-icon1.png" style="width:20%; margin: 11px 6px;vertical-align: middle;" />
				<div class="ilblock" style="color: rgb(249,138,72); font-size: 13px; position: relative; ">关注管理</div>
			</div>
		</div>

		<div class="best-box ilblock" style="margin-left: 15px;" v-for="item in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
			<div class="best-box-top">
				<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
				<div class="best-num ilblock">
					{{item.label&&item.label[0]?item.label[0].title:''}}
				</div>
			</div>
			<div class="best-text color2">
				{{item.title}}
			</div>
			<view>
				<div class="ilblock best-money1" style="width:42%;">
					<view class="span1 ilblock bg3">店返</view>
					<view class="span2 ilblock color8">￥{{item.shop_reward}}</view>
				</div>
				<div class="ilblock best-money2" style=" width:42%;">
					<view class="span1 ilblock bg4">团返</view>
					<view class="span2 ilblock color9">￥{{item.group_reward}}</view>
				</div>
				<!-- 
				<div class="ilblock best-money1">
					<view class="span1 ilblock" style="background: #F98A48;">店反</view>
					<view class="span2 ilblock" style="color: #F98A48;">￥{{item.shop_reward}}</view>
				</div>
				<div class="ilblock best-money2">
					<view class="span1 ilblock" style="background: #F14667;">团反</view>
					<view class="span2 ilblock" style="color: #F14667;">￥{{item.group_reward}}</view>
				</div> -->
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72); margin-left: 15px; margin-top: 8px;">￥
					<span style="font-size: 20px;">{{item.price}}</span>
				</div>
			</view>
		</div>


		<view style="width: 100%; height: 60px;"></view>
		<view class="navbar-brand">
			<view class="color1" style="margin-top: 10px;">
				<view class="navbar-item ilblock" @click="webSelf.$Router.reLaunch({route:{path:'/pages/index/index'}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar1.png"></image>
					</view>
					<view>首页</view>
				</view>
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/navbar2-a.png"></image>
					</view>
					<view class="color8">关注</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.reLaunch({route:{path:'/pages/user/user'}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar3.png"></image>
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
				mainData: [],
				labelData: [],
				isLoadAll:false,
				searchItem: {
					thirdapp_id: 2
				},
				all: true
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData'], self)
		},

		onReachBottom() {

			const self = this;
			if (!self.isLoadAll) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		methods: {


			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userInfoData = res.info.data[0];
					};
					self.searchItem.category_id = ['in', self.userInfoData.follow]
					self.getLabelData()
				};
				self.$apis.userInfoGet(postData, callback);
			},

			getLabelData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					id: ['in', self.userInfoData.follow]
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data);
					};
					console.log('self.labelData', self.labelData)
					self.getMainData();
				};
				self.$apis.labelGet(postData, callback);
			},



			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = []
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.getAfter = {
					label:{
						tableName:'Label',
						middleKey:'category_id',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'='
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}else{
						self.isLoadAll = true;
						self.$Utils.showToast('没有更多了','none');
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.productGet(postData, callback);
			},

			changeMenu(id) {
				const self = this;
				self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				if (id == 0) {
					self.all = true;
					self.searchItem.category_id = ['in', self.userInfoData.follow]
				} else {
					self.all = false;
					if (id == self.searchItem.category_id) {
						return
					} else {
						self.searchItem.category_id = id
					}
				};
				self.getMainData(true)
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
	.best-box{
		width: 44%;
	}


	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
