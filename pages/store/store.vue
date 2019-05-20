<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="images/home-icon14.png" />
			</span>
			商家核销
		</div>
		<div class="bg1 top">
			<div class="ilblock flo-left" style="width:30px ;">
				<img src="images/服务/service-icon6.png" style="width: 28px;" />
			</div>
			<div class="search flo-left">
				<div class="ilblock">
					<img src="images/home-icon13.png" style="width: 16px; margin-left: 13px;margin-bottom: 4px;" />
				</div>
				<div class="ilblock color1" style="margin-left: 15px;">3541354</div>
			</div>
			<button class="color5 ilblock flo-left">搜索</button>
		</div>
		<div class="storebox bg1">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：2018-08-30
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">等待核销</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img src="images/服务/service-img2.png" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						标题标题标题标题标题标题标题标题标题标题
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">298</span>
					</div>
				</div>
			</div>
			<div style="line-height: 40px; float: right; margin-right: 15px;">
				<div class="ilblock color1 font14" style="margin-right: 30px;">核销码：5642</div>
				<div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;">确认核销</div>
			</div>
		</div>
		<div class="storebox bg1" style="height: 152px;">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：2018-08-30
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">已经核销</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img src="images/服务/service-img2.png" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						标题标题标题标题标题标题标题标题标题标题
					</div>
					<div class="ilblock" style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">298</span>
					</div>
					<div class="ilblock color1 font14 flo-right" style="margin-top: 18px;">核销码：5642</div>
				</div>
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
		height: 56px;
		padding: 15px;
	}

	.search {
		width: 230px;
		height: 30px;
		border: solid 1px #ECEBEC;
		margin-left: 24px;
		line-height: 30px;
		border-radius: 20px 0px 0px 20px;
	}

	button {
		background: #F67550;
		border-radius: 0px 20px 20px 0px;
		height: 30px;
		width: 60px;
		border: none;
	}

	.storebox {
		width: 345px;
		height: 185px;
		margin: 15px auto 0px;
		border-radius: 13px;
		box-shadow: 0px 0px 12px #E2E2E2;
		position: relative;
	}

	.storebox-top {
		width: 100%;
		height: 43px;
		line-height: 44px;
	}

	.storebox-btm {

		width: 100%;
		height: 95px;
		line-height: 40px;
	}

	.img-box {
		width: 96px;
		height: 95px;
		overflow: hidden;
		border-radius: 4px;
		margin-left: 15px;
	}

	.img-box img {
		width: 96px;
		height: 95px;
	}

	.imgname {
		height: 95px;
		width: 205px;
		margin-left: 10px;
		position: absolute;
		text-align: justify;
	}
</style>
