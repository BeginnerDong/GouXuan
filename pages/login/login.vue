<template>
	<view class="body">
		<div class="top">
			<div class="home color5">
				<span onclick="backk()">
					<img src="images/微信图片_20190429164230.png" />
				</span>
				商家登录
			</div>
			<div class="top-img">
				<img src="images/达人/img3.png" style="width: 105px;position: relative; top: 36px; left: 125px;"/>
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
					<img class="flo-right" src="images/服务/service-img1.png" style="width: 80px; position: relative; top: 20px;"/>
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
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.body {
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
</style>
