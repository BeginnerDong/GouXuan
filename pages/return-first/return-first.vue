<template>
	<view>
		<div class="retun-top">
			<div class="color5" style="font-size: 35px;text-align: center; position: relative;top: 20px;">￥{{totalCount}}</div>
			<div class="color5 font14" style="text-align: center; position: relative;top: 25px;">我在购选平台总收益</div>
		</div>
		<div class="retun-middle bg1">
			<div class="ilblock retun-item">
				<div class="color2">￥{{userInfoData.balance}}</div>
				<div>可提现</div>
			</div>
			<div class="ilblock retun-item" style="border-right: solid 1px #ECECEC;">
				<div class="color2">￥{{hasWithdraw}}</div>
				<div>已提现</div>
			</div>
			<div class="ilblock retun-item">
				<div class="color2">￥{{shopCount}}</div>
				<div>直接受益</div>
			</div>
			<div class="ilblock retun-item">
				<div class="color2">￥{{groupCount}}</div>
				<div>组建团队收益</div>
			</div>
		</div>
		<div class="color1 font15" style="margin-left: 15px;">
			订单详情
		</div>
		<div class="retun-btm bg1" v-for="item in mainData">
			<div class="color2">
				订单号：{{item.order&&item.order[0]?item.order[0].order_no:''}}
			</div>
			<div class="color1 font14 " style="border-bottom: solid 1px #EDEDED;text-align: justify; margin: 10px 0px ; padding-bottom: 7px;">
				{{item.order&&item.order[0].products[0]?item.order[0].products[0].snap_product.product.title:''}}
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				姓名:<span>{{item.order&&item.order[0]?item.order[0].name:''}}</span>
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				联系电话:<span>{{item.order&&item.order[0]?item.order[0].phone:''}}</span>
			</div>
			<div class="font14" style="color: rgb(251,132,72);margin-top: 16px;">
				佣金:<span>￥{{item.count}}</span>
			</div>
			<div class="color2 font14" style="margin-top: 16px;">
				当前状态:已完成
			</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				mainData: [],
				type: 2,
				hasWithdraw:0,
				shopCount:0,
				groupCount:0,
				userInfoData:[],
				searchItem: {
					type: 2
				},
				totalCount:''
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData', 'getUserInfoData'], self)
		},

		methods: {
			
			getUserInfoData() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userInfoData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},

			getMainData() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = uni.getStorageSync('user_no');
				postData.order = {
					create_time: 'desc'
				};
				postData.getAfter = {
					order:{
						tableName:'Order',
						middleKey:'order_no',
						key:'order_no',
						searchItem:{
							status:1
						},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);	
						}
						for (var i = 0; i < self.mainData.length; i++) {
							if(self.mainData[i].count<0){
								self.hasWithdraw += (self.mainData[i].count)
							};
							if(self.mainData[i].behavior==1){
								self.shopCpunt += (self.mainData[i].count)
							};
							if(self.mainData[i].behavior==2){
								self.groupCount += (self.mainData[i].count)
							}
						}
						console.log(parseInt(self.hasWithdraw));
						console.log(parseInt(self.userInfoData.balance));
						self.totalCount = parseInt(self.hasWithdraw+self.userInfoData.balance)
						console.log(self.totalCount);
					} else {
						self.$Utils.showToast(res.msg, 'none')
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
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.retun-top {
		width: 100%;
		height: 152px;
		background: #FF844D;
	}

	.retun-middle {
		width: 88%;
		height: 83px;
		margin: -32px auto 30px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #D5D5D5;
	}

	.retun-item {
		float: left;
		width: 25%;
		text-align: center;
		height: 100%;
	}

	.retun-item div {
		margin-top: 8px;
		font-size: 13px;
		color: rgb(102, 102, 102);
	}

	.retun-item .color2 {
		margin-top: 15px;
		color: rgb(34, 34, 34);
	}

	.retun-btm {
		width: 92%;
		margin: 15px auto;
		border-radius: 7px;
		box-shadow: 0px 0px 10px #D5D5D5;
		padding: 15px;
		box-sizing: border-box;
	}
</style>
