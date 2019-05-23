<template>
	<view>
		<view class="buy-box bg1">
			<view class="list bg1">
				<view class="ilblock" style="line-height: 40rpx;">
					<view class="color2 font13">提现</view>
					<view class="color3 font12">2019-08-09</view>
				</view>
				<view class="font14 ilblock flo-right" style="margin-left: 40rpx;color: #FA9567;">-￥56.00</view>
			</view>
		</view>
		<view class="buy-box bg1">
			<view class="list bg1">
				<view class="ilblock" style="line-height: 40rpx;">
					<view class="color2 font13">提现</view>
					<view class="color3 font12">2019-08-09</view>
				</view>
				<view class="font14 ilblock flo-right" style="margin-left: 40rpx;color: #FA9567;">-￥56.00</view>
			</view>
		</view>
		<view class="buy-box bg1">
			<view class="list bg1">
				<view class="ilblock" style="line-height: 40rpx;">
					<view class="color2 font13">提现</view>
					<view class="color3 font12">2019-08-09</view>
				</view>
				<view class="font14 ilblock flo-right" style="margin-left: 40rpx;color: #FA9567;">-￥56.00</view>
			</view>
		</view>
		
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
	
	page{
		background: #F2F2F2;
	}
	.buy-box{
		width: 100%;
	}
	.list{
		border-bottom: solid 1rpx #F2F2F2;
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
		padding:10px ;
	}
	.list .flo-right{
		margin-top: 12px;
	}
	
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
	
</style>
