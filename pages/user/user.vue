<template>
	<view>
		<div class="top">
			<div class="top-box">
				<div class="tou-img">
					<img src="/static/images/about-img1.png" />
				</div>
				<div class="color2 user-name">名称名称名称</div>
			</div>
		</div>
		<div class="status bg1">
			<div class="status-item ilblock">
				<div  @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=1'}})">
					<div class="status-img">
						<img src="/static/images/about-icon1.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						待发货
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=2'}})">
					<div class="status-img">
						<img src="/static/images/about-icon2.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						发货中
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=3'}})">
					<div class="status-img">
						<img src="/static/images/about-icon3.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						已发货
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=4'}})">
					<div class="status-img">
						<img src="/static/images/about-icon4.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						其他
					</div>
				</div>
			</div>
			<div class="status-item ilblock" style="margin-right: 0px;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all'}})">
					<div class="status-img">
						<img src="/static/images/about-icon5.png" style="width: 22px; margin-left: 5px;height: 25px;margin-top: 15px; position: relative;top: -5px; " />
					</div>
					<div class="status-text color2">
						我的订单
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="list bg1" style="margin-bottom: 20px;">
			<ul>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/doyen/doyen'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="/static/images/about-icon6.png" style="width: 14px;" />
					</div>
					<li>达人后台
						<div class="ilblock flo-right" style=" width: 6px; height: 6px; border: solid 1px #FF7263;
						 margin-top: 20px; margin-right: 32px;
						 background: #FF7263;border-radius: 50%;"></div>
					</li>
				</div>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/coupon/coupon'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="/static/images/about-icon7.png" style="width: 14px;" />
					</div>
					<li>
						我的优惠券
					</li>
				</div>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/code/code'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="/static/images/about-icon8.png" style="width: 14px;" />
					</div>
					<li>
						店铺二维码
					</li>
				</div>
				<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/course/course'}})" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="/static/images/about-icon9.png" style="width: 14px;" />
					</div>
					<li>
						使用教程
					</li>
				</div>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/address/address'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="/static/images/about-icon10.png" style="width: 14px;" />
					</div>
					<li>
						地址管理
					</li>
				</div>

			</ul>
		</div>





		<!-- ------------footer----------------- -->
		<div style="width: 100%; height: 65px;"></div>
		<!-- <view class="navbar-brand">
			<ul>
				<li @click="webSelf.$Router.navigateTo({route:{path:'/pages/index/index'}})">
					<view class="navbar-img"><img src="/static/images/navbar1.png" /></view>
					<view >首页</view>
				</li>
				<li @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow/follow'}})">
					<view class="navbar-img"><img src="/static/images/navbar2.png" /> </view>
					<view>关注</view>
				</li>
				<li >
					<view class="navbar-img"><img src="/static/images/navbar3-a.png" /></view>
					<view style="color: #FC7C5D;">我的</view>
				</li>
			</ul>
		</view> -->
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
	@import "../../assets/style/user.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
