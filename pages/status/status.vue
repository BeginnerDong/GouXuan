<template>
	<view class="body">
		
		<div class="big-box">
			<div class="list">
				身份验证
			</div>
			<div class="list">
				手机号：
			</div>
			<div class="color1 font10" style="border: solid 1px #FFF0EA; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #FFF0EA; border-radius: 3px;">
				购买时等级的手机号
			</div>
			<div class="list">
				图形验证码
			</div>
			<input class="color1 font10" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 90%; "
			 placeholder="输入右边字符">
			<img src="/static/images/service-img1.png" style="height: 30px; float: right; position: relative; top: -30px;" />
			</input>
			<div class="list">
				短信验证
			</div>
			<input class="color1 font10" style="border: solid 1px #EBEBEB; height: 30px; line-height: 30px; padding: 0px 15px;
			 box-shadow: 0px 0px 6px #EBEBEB; border-radius: 3px;width: 90%; "
			 placeholder="6位短信验证">
			<div class="font10 color2 bg2 ilblock flo-right" style="height: 30px; line-height: 30px;position: relative; top: -30px;width: 80px;text-align: center; border: solid 1px #EBEBEB; ">获取验证码</div>
			</input>
			<button class="color5 font13" style="width: 88%;height: 30px; background: #F67550; margin: 20px auto;">进入系统</button>
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
	page {
		background: #fff;
	}
	
	.big-box {
		width: 345px;
		height: 490px;
	
		border: solid 2px #E8E8E8;
		margin: 30px auto;
		border-radius: 8px;
		box-shadow: 0px 0px 12px #E8E8E8;
		padding: 45px 15px;
	}
	
	.list {
		height: 50px;
		border-bottom: solid 1px #F6F6F6;
		line-height: 52px;
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	
</style>
