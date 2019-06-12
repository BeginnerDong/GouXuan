<template>
	<view>

		<div class="retun-top">
			<div class="color5" style="font-size: 35px;text-align: center; position: relative;top: 20px;">￥{{totalCount}}</div>
			<div class="color5 font14" style="text-align: center; position: relative;top: 25px;">我在本地捕手平台总收益</div>
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


		<div class="bg1" style="margin-top: 10px;width: 100%;">

			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/return-first/return-first'}})" class="color2 font14"
			 style="height: 52px;width: 100%; line-height: 52px;border-bottom: solid 1px #E9E9E9;">
				<div class="ilblock color2 font14 btm-list">我的返佣</div>
				<div class="ilblock color1 font14 list">
					<image src="../../static/images/home-icon9.png"></image>
				</div>
			</div>


			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/depositld/depositld'}})" class="color2 font14" style="height: 52px;width: 100%; line-height: 52px;border-bottom: solid 1px #E9E9E9;">
				<div class="ilblock color2 font14 btm-list">提现账号</div>
				<div class="ilblock color1 font14 list">{{userInfoData.ali_name==null||userInfoData.ali_name==''?'未填提现账号':''}}
					<image src="../../static/images/home-icon9.png"></image>
				</div>
			</div>


			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/withdrawalRecord/withdrawalRecord'}})" class="color2 font14"
			 style="height: 52px;width: 100%; line-height: 52px;">
				<div class="ilblock color2 font14 btm-list">提现记录</div>
				<div class="ilblock color1 font14 list">
					<image src="../../static/images/home-icon9.png"></image>
				</div>
			</div>

		</div>

		<button @click="totalCount>20?webSelf.$Router.navigateTo({route:{path:'/pages/withdrawDepasit/withdrawDepasit'}}):''"
		 class="color5" :style="totalCount>20?'background:#F98A48':''" style="font-size:14px;background: #FBB091;width:70%;height: 35px;line-height: 35px;border-radius: 20px; margin: 30px auto 100px;">
			申请提现{{totalCount>20?'':'(不足20元不可提现)'}}
		</button>





		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/doyen/doyen'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show1.png"></image>
					</view>
					<view>达人</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/team/team'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show2.png"></image>
					</view>
					<view>达人团队</view>
				</view>
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show3-a.png"></image>
					</view>
					<view class="color8">返佣</view>
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
				mainData: [],
				type: 2,
				hasWithdraw: '0.00',
				shopCount: '0.00',
				groupCount: '0.00',
				userInfoData: [],
	
				totalCount: '0.00'
			}
		},
		onLoad(options) {
			const self = this;

			self.$Utils.loadAll(['getUserInfoData'], self)
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
					self.gethasWithdraw();
					
				};
				self.$apis.userInfoGet(postData, callback);
			},

			gethasWithdraw() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 2,
					count: ['<', 0],
					status:['in',[0,1]]
				};
				postData.compute = {
					TotalCount: [
						'sum',
						'count',
					],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now', res)
						self.hasWithdraw = parseFloat(res.info.compute.TotalCount).toFixed(2); 
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.getshopCount()
				
				};
				self.$apis.flowLogGet(postData, callback);
			},

			getshopCount() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 2,
					behavior: 1,
					
				};
				postData.compute = {
					TotalCount: [
						'sum',
						'count',
					],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now', res)
						self.shopCount = parseFloat(res.info.compute.TotalCount).toFixed(2); 
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.getgroupCount()
						
				};
				self.$apis.flowLogGet(postData, callback);
			},

			getgroupCount() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 2,
					behavior: 2,
					
				};
				postData.compute = {
					TotalCount: [
						'sum',
						'count',
					],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
					
						self.groupCount =  parseFloat(res.info.compute.TotalCount).toFixed(2);
						console.log(self.shopCount)
						console.log(self.groupCount)
						self.totalCount = (parseFloat(self.shopCount) + parseFloat(self.groupCount)).toFixed(2);
						console.log(self.totalCount)
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.flowLogGet(postData, callback);
			},



		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.retun-top {
		width: 100%;
		height: 152px;
		background: #FF844D;
	}

	.retun-middle {
		width: 90%;
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

	.btm-list {
		box-sizing: border-box;
		padding: 0px 15px;
	}

	.list image {
		width: 5px;
		height: 11px;
		margin-left: 10px;
	}

	.list {
		float: right;
		margin-right: 15px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
