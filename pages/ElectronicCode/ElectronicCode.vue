<template>
	<view>
		<view class="color2 font15 top-box" >
			电子码查询系统
		</view>
		<!-- <view class="list font12 color3">
			<view>查询</view>
			<view>说明</view>
			<view>退出</view>
		</view> -->
		<view class="info color2 font13">
			<image src="../../static/images/20190523145822.png"></image>
			15986457896
		</view>
		
		<view class="text font13 color3">
			<view class="color2 font15" style="font-weight: bolder;">【电话预约】西安高新二路店青都日料套餐</view>
			<view class="color2 font15" style="margin-left: 5px;">(118抢购)
				<view class="color3 font15 flo-right ilblock" style="padding: 2rpx 16rpx; background: #E5C4B4; margin-top: 5px;" >未预约</view>
			</view>
			<view style="clear: both; margin-top: 50rpx;">
				<view>
					姓名：张三<text style="margin-left: 30rpx;">电子码：12545687654</text>
				</view>
				<view>
					说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				mainData:[],
				openArray:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		
		
		
		methods: {
			
		
			
			show(id){
				const self = this;
				var position = self.openArray.indexOf(id);
				if (position >= 0) {
					self.openArray.splice(position, 1)
				} else {
					self.openArray.push(id)
				};
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					question: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['常见问题']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					listorder: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";

	page {
		background: #fff;
	}
	.top-box{
		width: 100%;
		height: 50px;
		line-height: 50px;
		box-sizing:border-box;
		padding: 0px 15px;
		border-bottom: solid 1rpx #F2F2F2;
	}
	.top-box image{
		width: 60rpx;
		height: 44rpx;
		border: solid 1rpx;
		float: right;
		margin-top: 26rpx;
	}
	.list{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 30rpx 10rpx;
		background: #F8F8F8;
	}
	.list view{
		margin-bottom: 30rpx;
	}
	.info{
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 30rpx;
	}
	.info image{
		width: 38rpx;
		height:36rpx;
		position: relative;
		top:12rpx;
	}
	
	.text{
		margin-top: 30rpx;
		border-left: solid 6rpx #F5B79A;
		box-sizing: border-box;
		width: 96%;
		margin-left: 4%;
		padding:0rpx 4%;
		text-align: justify;
		line-height: 40rpx;
	}
	

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
