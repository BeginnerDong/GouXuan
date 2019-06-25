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
			{{phone}}
		</view>
		
		<view class="text  color3" v-for="item in mainData">
			<view class="font13" style="border-bottom: 1px solid #f2f2f2;width:100%;padding: 10px 0;">{{item.products[0].snap_product&&item.products[0].snap_product.product?item.products[0].snap_product.product.title:''}}</view>
			<!-- <view class="color2 font15" style="margin-left: 5px;">
				<view class="color3 font15 flo-right ilblock" style="padding: 2rpx 16rpx; background: #E5C4B4; margin-top: 5px;" >未预约</view>
			</view> -->
			<view style="clear: both;margin-top: 20rpx;line-height: 25px;">
				<view v-for="(c_item,index) in item.qr">
					<view  class="color2 font15" v-if="index==0">姓名：{{item.name}}</view>
					<view class="color2 font15"><text v-if="c_item.message">{{c_item.message}}：</text>{{c_item.check_code}}</view>
				</view>
				
				<!-- <view>
					【{{item.products[0].snap_product&&item.products[0].snap_product.product?item.products[0].snap_product.product.title:''}}】尊敬的{{item.name}}，您1份核销二维码链接
					为{{item.qr&&item.qr[0]?item.qr[0].url:''}}。
				</view> -->
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
				phone:'',
				isLoadAll:false
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			var options = self.$Utils.getHashParameters();
			if(options[0]&&options[0].phone){
				self.phone = options[0].phone
			}
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMainData'], self)
			};
			
		},
		
		onReachBottom(){
			console.log('onReachBottom')
			const self = this;
			if(!self.isLoadAll&&uni.getStorageSync('loadAllArray')){
				self.paginate.currentPage++;
				self.getMainData()
			};	
		},
		
		
		methods: {
			
		
	
			
			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 5,
						is_page: true,
					}
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type:2,
					phone:self.phone
				};
				postData.order = {
					create_time: 'desc'
				};
				postData.getAfter = {
					qr:{
						tableName:'Qrcode',
						middleKey:'order_no',
						key:'order_no',
						condition:'=',
						searchItem:{
							status:1
						}
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						
					}else{
						self.isLoadAll = true;
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		}
	}
</script>

<style>
	page {
		background-color: #ffffff;
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
		
		box-shadow: #f2f2f2 0px 0px 30px 5px;
		box-sizing: border-box;
		width: 96%;
		margin: 15rpx auto;
		padding:8rpx 4%;
		text-align: justify;
		line-height: 40rpx;
		border-radius:8px
	}
	


</style>
