<template>
	<view>

		<div class="retun-top">
			<div class="color5" style="font-size: 35px;text-align: center; position: relative;top: 20px;">￥8</div>
			<div class="color5 font14" style="text-align: center; position: relative;top: 25px;">我在购选平台总收益</div>
		</div>
		<div class="retun-middle bg1">
			<div class="ilblock retun-item">
				<div class="color2">￥8</div>
				<div>可提现</div>
			</div>
			<div class="ilblock retun-item" style="border-right: solid 1px #ECECEC;">
				<div class="color2">￥0</div>
				<div>已提现</div>
			</div>
			<div class="ilblock retun-item">
				<div class="color2">￥0</div>
				<div>直接受益</div>
			</div>
			<div class="ilblock retun-item">
				<div class="color2">￥0</div>
				<div>组建团队收益</div>
			</div>
		</div>


		<div class="bg1" style="margin-top: 10px;width: 100%;">
			
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/return-first/return-first'}})" class="color2 font14"  style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 304px;">我的返佣</div>
					<div class="ilblock color1 font14" style="width: 45px;"><img src="../../static/images/home-icon9.png" style="width: 6px;" />
					</div>
				</div>
			
			
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/depositId/depositId'}})" class="color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 201px;">体现账号</div>
					<div class="ilblock color1 font14" style="width: 150px; background: url(../../static/images/home-icon9.png) no-repeat 118px 18.5px;
					 background-size: 4.2%;
					 ">未填提现账号</div>
				</div>
			
			
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/deposit/deposit'}})" class="color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;">
					<div class="ilblock color2 font14" style="width: 304px;">提现记录</div>
					<div class="ilblock color1 font14" style="width: 45px;"><img src="../../static/images/home-icon9.png" style="width: 6px;" />
					</div>
				</div>
			
		</div>

		<button  class="color5" style="font-size:14px;background: #FBB091;width:320px;height: 35px;line-height: 35px;border-radius: 20px; margin: 30px auto 100px;">
			申请提现(不足20元不可提现)
		</button>





		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/doyen/doyen'}})">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show1.png"></image>
					</view>
					<view>达人</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.navigateTo({route:{path:'/pages/team/team'}})">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show2.png"></image>
					</view>
					<view >达人团队</view>
				</view>
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show3-a.png"></image>
					</view>
					<view  class="color8">返佣</view>
				</view>
			</view>
		</view>
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
			test($event) {
				var testres = this.getCaseData()
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['推荐阅读']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						if (self.mainData.length > 2) {
							self.mainData = self.mainData.slice(0, 2)
						}
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getLabelData(isNew) {
				var self = this;
				if (isNew) {
					self.$Utils.clearPageIndex(self)
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 1,
					thirdapp_id: 21,
					parentid: 2
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data)
					}
					for (var i = 0; i < res.info.data.length; i++) {
						self.menu_array.push(res.info.data[i].id)
					};
					self.$Utils.finishFunc('getLabelData');
					//self.getCaseData();
				};
				console.log('self.$apis', self.$apis)
				self.$apis.labelGet(postData, callback);
			},


			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '首页轮播',
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.swiperData = res.info.data[0]['mainImg'];
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
			},
			getCaseData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: getApp().globalData.solely_thirdapp_id
				}
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							parentid: ['in', [146]]
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				var callback = (res) => {
					console.log('self.caseData.res', res);
					if (res.info.data.length > 0) {
						self.caseData.push.apply(self.caseData, res.info.data)
						if (res.info.data.length > 4) {
							self.caseData = self.caseData.slice(0, 4)
						}
					};
					self.$Utils.finishFunc('getCaseData');
				};


				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	.retun-top {
		width: 100%;
		height: 152px;
		background: #FF844D;
	}
	
	.retun-middle {
		width: 90%;
		height: 83px;
		margin: -32px auto 30px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #D5D5D5;
	}
	
	.retun-item {
		float: left;
		width: 86px;
		text-align: center;
		height: 100%;
	}
	
	.retun-item div {
		margin-top: 8px;
		font-size: 13px;
		color: rgb(102, 102, 102);
	}
	
	.retun-item .color2 {
		margin-top: 15px;
		color: rgb(34, 34, 34);
	}
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	
</style>
