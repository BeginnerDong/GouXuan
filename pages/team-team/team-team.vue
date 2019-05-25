<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="../../static/images/home-icon14.png" />
			</span>
			达人团队
		</div>
		<div class="bg1 top">
			<div class="ilblock flo-left" style="width: 50%;">
				<div class="ilblock top-left">总榜(5人)</div>
			</div>
			<div class="ilblock flo-left" style="width: 50%;">
				<div class="ilblock top-right">月榜</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="list-item bg1" style="margin-top: 15px;">
			<div class="cup ilblock flo-left">
				<img src="../../static/images/达人/icon5.png" />
			</div>
			<div class="heard ilblock flo-left">
				<div class="heard-img radiu50">
					<img src="../../static/images/about-img1.png" />
				</div>
				<div class="heard-name color2 font14">李四</div>
			</div>
			<div class="text-rigt ilblock flo-left">
				<div style="width:100%; margin-top: 22px; ">
					<div class="ilblock" style="width: 50%;">
						总返佣：0
					</div>
					<div class="color1 ilblock">订单数:5</div>
				</div>
				<div class="color1" style="line-height: 24px; height: 24px;">营业额：￥566.22</div>
				<div class="color1" style="line-height: 24px; height: 24px;">手机号：15698563300</div>
				<div class="color1" style="line-height: 24px; height: 24px;">ID:235623562</div>
			</div>
		</div>
		<div class="list-item bg1">
			<div class="cup ilblock flo-left">
				<img src="../../static/images/达人/icon6.png" />
			</div>
			<div class="heard ilblock flo-left">
				<div class="heard-img radiu50">
					<img src="../../static/images/about-img1.png" />
				</div>
				<div class="heard-name color2 font14">李四</div>
			</div>
			<div class="text-rigt ilblock flo-left">
				<div style="width:100%; margin-top: 22px; ">
					<div class="ilblock" style="width: 50%;">
						总返佣：0
					</div>
					<div class="color1 ilblock">订单数:5</div>
				</div>
				<div class="color1" style="line-height: 24px; height: 24px;">营业额：￥566.22</div>
				<div class="color1" style="line-height: 24px; height: 24px;">手机号：15698563300</div>
				<div class="color1" style="line-height: 24px; height: 24px;">ID:235623562</div>
			</div>
		</div>
		<div class="list-item bg1">
			<div class="cup ilblock flo-left">
				<img src="../../static/images/达人/icon7.png" />
			</div>
			<div class="heard ilblock flo-left">
				<div class="heard-img radiu50">
					<img src="../../static/images/about-img1.png" />
				</div>
				<div class="heard-name color2 font14">李四</div>
			</div>
			<div class="text-rigt ilblock flo-left">
				<div style="width:100%; margin-top: 22px; ">
					<div class="ilblock" style="width: 50%;">
						总返佣：0
					</div>
					<div class="color1 ilblock">订单数:5</div>
				</div>
				<div class="color1" style="line-height: 24px; height: 24px;">营业额：￥566.22</div>
				<div class="color1" style="line-height: 24px; height: 24px;">手机号：15698563300</div>
				<div class="color1" style="line-height: 24px; height: 24px;">ID:235623562</div>
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

	.top {
		width: 100%;
		height: 52px;
		padding: 10px;
	}

	.top-left {
		width: 70%;
		background: #FF824F;
		color: #FFF1ED;
		font-size: 15px;
		height: 30px;
		float: right;
		text-align: center;
		line-height: 30px;
		border-radius: 20px 0px 0px 20px;
		border: solid 1px #FF824F;
	}

	.top-right {
		width: 70%;
		background: #fff;
		color: rgb(34, 34, 34);
		font-size: 15px;
		height: 30px;
		float: left;
		text-align: center;
		line-height: 30px;
		border-radius: 0px 20px 20px 0px;
		border: solid 1px #FF824F;
	}

	.list-item {
		height: 133px;
		width: 100%;
		border: solid 1px #F8F8F8;
	}

	.cup {
		height: 100%;
		padding: 40px 15px;
	}

	.cup img {
		width: 30px;
	}

	.heard {
		padding: 18px 10px 0px 0px;
		height: 100%;
	}

	.heard-img {
		width: 67px;
		margin-bottom: 8px;
		overflow: hidden;
	}

	.heard-img img {
		width: 100%;

	}

	.heard-name {
		text-align: center;
	}

	.text-rigt {
		height: 100%;
		width: 60%;
	}
</style>
