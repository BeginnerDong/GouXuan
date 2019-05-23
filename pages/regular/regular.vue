<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="../../static/images/home-icon14.png" />
			</span>
			达人规则和权益
		</div>
		<div class="top" style="border-top: solid 1px #E8E8E8; border-bottom: solid 1px #E8E8E8;">
			<img src="../../static/images/达人/img4.png" style="width: 345px; margin:15px 15px 30px;" />
		</div>
		<div class="text ilblock color1 font15 bg2">当前权益</div>
		<div class="text-box bg1 color1">
			<ul>
				<li>
					[团反]您的指数团队成员的店铺所产生的订单，您可得到返佣
				</li>
				<li>[团反]您的指数团队成员的店铺所产生的订单，您可得到返佣</li>
				<li>[团反]您的指数团队成员的店铺所产生的订单，您可得到返佣</li>
				<li>[团反]您的指数团队成员的店铺所产生的订单，您可得到返佣</li>
			</ul>
		</div>
		<button class="color5" style="background: #FB8448;width:320px;height: 35px;border-radius: 20px; margin: 30px auto 20px;">
			邀请好友
		</button>
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

	.text {
		width: 150px;
		height: 25px;
		text-align: center;
		margin-left: 120px;
		position: relative;
		top: -13px;

	}

	.text-box {
		width: 345px;
		height: 260px;
		padding: 15px;
		text-align: justify;
		margin-left: 15px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px #E6E6E6;
	}

	li {
		margin-top: 10px;

	}
</style>
