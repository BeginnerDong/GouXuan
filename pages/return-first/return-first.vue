<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="images/home-icon14.png" />
			</span>
			达人后台
		</div>
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
		<div class="color1 font15" style="margin-left: 15px;">
			订单详情
		</div>
		<div class="retun-btm bg1">
			<div class="color2">
				订单号：19022323152
			</div>
			<div class="color1 font14 " style="border-bottom: solid 1px #EDEDED;text-align: justify; margin: 10px 0px ; padding-bottom: 7px;">
				[西安.牛背梁]国家级深林公园，世界生物圈保护！仅298元=2大人1小抢牛背梁套票~含双持阿玛和发明和1晚+嗯拍哦！
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				姓名:<span>张三</span>
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				联系电话:<span>15632023530</span>
			</div>
			<div class="font14" style="color: rgb(251,132,72);margin-top: 16px;">
				佣金:<span>￥8</span>
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				当前状态:已完成
			</div>
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

	.retun-top {
		width: 375px;
		height: 152px;
		background: #FF844D;
	}

	.retun-middle {
		width: 345px;
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

	.retun-btm {
		width: 345px;
		height: 281px;
		margin: 15px auto;
		border-radius: 7px;
		box-shadow: 0px 0px 10px #D5D5D5;
		padding: 15px;
	}
</style>
