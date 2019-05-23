<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="../../static/images/home-icon14.png" />
			</span>
			达人后台
		</div>
		<div class="bg1 top">
			<img src="../../static/images/达人/Talent-show-img.png" style="width: 86px; margin-left: 140px;margin-top: 13px;" />
		</div>
		<div class="ist-item bg1" style="margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				分销ID
			</div>
			<div class="ilblock flo-right color1 font15">
				26552332
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				分销者名称
			</div>
			<div class="ilblock flo-right color1 font15">
				张三
			</div>
		</div>
		<div class="ist-item bg1" style="border-bottom: none;">
			<div class="ilblock flo-left color2 font15">
				所在地区
			</div>
			<div class="ilblock flo-right color1 font15">
				西安<img src="../../static/images/home-icon9.png" style="width: 6px; margin-left: 15px;" />
			</div>
		</div>
		<div class="ist-item bg1" style="border-bottom: none; margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				产品上架通知
			</div>
			<div class="ilblock flo-right color1 font15">
				共一个<img src="../../static/images/home-icon9.png" style="width: 6px; margin-left: 15px;" />
			</div>
		</div>
		<div class="ist-item bg1" style="margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				达人新订单通知
			</div>
			<div class="ilblock flo-right color1 font15">
				<img src="../../static/images/达人/icon1.png" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				达人退单通知
			</div>
			<div class="ilblock flo-right color1 font15">
				<img src="../../static/images/达人/icon1.png" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				团队新订单通知
			</div>
			<div class="ilblock flo-right color1 font15">
				<img src="../../static/images/达人/icon1.png" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				团队退单通知
			</div>
			<div class="ilblock flo-right color1 font15">
				<img src="../../static/images/达人/icon1.png" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				海报显示购选LOGO
			</div>
			<div class="ilblock flo-right color1 font15">
				<img src="../../static/images/达人/icon1.png" style="width: 26px;" />
			</div>
		</div>
		<button class="color5" style="background: #FB8448;width:320px;height: 35px;border-radius: 20px; margin: 30px auto 20px;">
			保存修改
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

	.top {
		width: 100%;
		height: 100px;
	}

	.ist-item {
		width: 100%;
		height: 42px;
		line-height: 42px;
		padding: 0px 15px;
		border-bottom: solid 1px #F6F6F6;
	}
</style>
