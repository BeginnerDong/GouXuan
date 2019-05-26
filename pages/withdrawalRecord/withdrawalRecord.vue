<template>
	<view>
		<view class="buy-box bg1" v-for="item in mainData" v-if="mainData.length>0">
			<view class="list bg1">
				<view class="ilblock" style="line-height: 40rpx;">
					<view class="color2 font13">{{item.trade_info}}</view>
					<view class="color3 font12">{{item.create_time}}</view>
				</view>
				<view class="font14 ilblock flo-right" style="margin-left: 40rpx;color: #FA9567;">-￥{{item.count}}</view>
			</view>
		</view>
		
		<div class="color1" style="text-align: center; padding: 60px;" v-else>没有数据~~~</div>
		
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isLoadAll:false,
				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self)

		},
		
		onReachBottom() {
		
			const self = this;
			if (!self.isLoadAll) {
				console.log('11',self.paginate.currentPage);
				self.paginate.currentPage++;
				console.log('22',self.paginate.currentPage);
				self.getMainData()
			};
		},
		
		
		methods: {
			

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: self.$Config.thirdapp_id,
					count:['<',0],
					type:2
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						
					}else{
						self.isLoadAll = true
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);
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
