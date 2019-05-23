<template>
	<view>
		<view class="bg1" style="width: 100%; padding: 15px;">
			<view style="width: 100%;">
				<view class="font13 color1 ilblock flo-left" style="width: 40%;">2019年04月</view>
				<view class="font15 color2 ilblock flo-left" style="width: 60%;">全部状态
				<image src="../../static/images/20190523150314.png" style="width: 10px;height:6px; margin-left: 10px;"></image> </view>
			</view>
			<view style="clear: both; width: 100%; height: 10px;"></view>
			<view class="list" style="width: 100%;">
				<input class="color1 ilblock" placeholder="请输入姓名/手机/产品名称" />
				<button class="color5 ilblock search">搜索</button>
			</view>
		</view>
			<view class="list-box bg1">
				<view class="storebox-top">
					<view class="font12 color1">
						<text style="margin-right: 10px;">张三</text>
						交易时间：2018-08-30
					</view>
				</view>
				<view class="storebox-btm">
					<view class="ilblock img-box">
						<image src="../../static/images/focus%20on-img%20.png"></image>
					</view>
					<view class="ilblock imgname">
						<view class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
							标题标题标题标题标题标题标题
						</view>
						<view style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">59.00</span> </view>
					</view>
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
	
	.list input {
		display: inline-block;
		color: #C7C7C7;
		border: solid 1px #FBFBFB;
		height: 30px;
		width: 78%;
		line-height: 40px;
		text-indent: 15px;
		box-sizing: border-box;
		padding: 0rpx 10px;
	}
	
	.search{
		background: #2AA561;
		height: 30px;
		width: 16%;
		line-height: 30px;
		border-radius: 8px;
		color: #D1E9DB;
		border: none;
		padding: 0;
		margin: 0;
		font-size:14px
	}
	.list-box{
		width: 92%;
		margin:15px 4% 0px;
		border-radius: 13px;
		box-shadow: 0px 0px 12px #E2E2E2;
		box-sizing: border-box;
		padding: 15px;
		position: relative;
	}
	.storebox-top{
		width: 100%;
		margin-bottom: 10px;
	}
	.storebox-btm{
		width: 100%;
		height: 95px;
		line-height: 40px;
	}
	.img-box{
		width:30%;
		height: 95px;
		overflow: hidden;
		border-radius: 4px;
	}
	.img-box img{
		width:100% ;
		height: 100%;
	}
	.imgname{
		height: 95px;
		margin-left: 10px;
		position: absolute;
		text-align: justify;
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
	
</style>
