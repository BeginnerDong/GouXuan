<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="../../static/images/home-icon14.png" />
			</span>
			吃喝玩乐推荐
		</div>
		<div class="nav-top" style="line-height: 40px;">
			<div class="ilblock font15 top-list">
				<a href="store-all.html" class="color1">全部</a>
			</div>
			<div class="ilblock font15 top-list ">
				<a href="store-waie.html" class="color1">待发货</a>
			</div>
			<div class="ilblock font15 top-list ">
				<a class="color1" href="store-ing.html">发货中</a>
			</div>
			<div class="ilblock font15 top-list top-list-star">
				<a href="store-ed.html" class="color6">已发货</a>
			</div>
			<div class="ilblock font15 top-list">
				<a href="other.html" class="color1">其他</a>
			</div>
		</div>
		<div class="storebox bg1">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：2018-08-30
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">已经发货</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img src="../../static/images/服务/service-img2.png" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						标题标题标题标题标题标题标题标题标题标题
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">298</span>
					</div>
				</div>
			</div>
		</div>
		<div class="storebox bg1">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：2018-08-30
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">已经发货</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img src="../../static/images/服务/service-img2.png" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						标题标题标题标题标题标题标题标题标题标题
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">298</span>
					</div>
				</div>
			</div>
		</div>
		<div class="storebox bg1">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：2018-08-30
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">已经发货</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img src="../../static/images/服务/service-img2.png" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						标题标题标题标题标题标题标题标题标题标题
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">298</span>
					</div>
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
</style>
