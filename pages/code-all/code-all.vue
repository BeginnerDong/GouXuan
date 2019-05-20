<template>
	<view class="body">
		<div class="home color2">
			<span onclick="backk()">
				<img src="/static/images/home-icon14.png" />
			</span>
			达人二维码
		</div>
		<div class="color2 font14 top bg1" style="margin: 15px 0px 20px;">
			<div style="padding-left: 6%;">
				<ol style="list-style-type:decimal;">
					<li>选择海报后，长按海报</li>
					<li>发送还给微信好友或保存海报分享到朋友圈</li>
					<li>内容内容内容内容内容内容内容内容</li>
				</ol>
			</div>
			<div style="color: #FE986F; text-align: center;">
				<div class="ilblock flo-left font10" style="width: 50%;">识别海报二维码</div>
				<div class="ilblock flo-left font10" style="width: 50%;">成为您的客户</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="bg1" style="width: 100%; padding: 20px 0px; border-radius: 8px;">
			<a href="code-first.html">
				<img class="img-one" src="/static/images/达人/img1.png" />
			</a>
			<a href="code-second.html">
				<img class="img-one" src="/static/images/达人/img2.png" style="margin-left: 10px;" />
			</a>
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
	@import "../../assets/style/code.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.body {
		padding: 0px 15px 15px;
	}

	.home {
		border-bottom: solid 1px #EEEEEE;
	}

	.top {
		border-radius: 8px;
		width: 100%;
		text-align: justify;
		padding: 15px 10px;

	}

	.img-one {
		width: 165px;
		height: 235x;
	}
</style>
