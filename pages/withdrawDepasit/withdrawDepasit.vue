<template>
	<view>
		<view class="box bg1">
			<view class="bank bg1 flex" v-if="userData.info&&userData.info.ali_account">
				<view class="font24 color2 ilblock" style="width: 30%; margin-left: 15rpx;">支付宝账号</view>
				<view class="font24 color2 ilblock" style="width: 50%;">{{userData.info&&userData.info.ali_account}}</view>
			</view>
			<view class="bank bg1 flex" >
				<view v-if="userData.info&&!userData.info.ali_account" class="font24 color2 ilblock" style=" margin-left: 15rpx;"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/depositld/depositld'}})">请完善提现账户信息</view>
				<view class="font12  ilblock" style=" margin-left: 15rpx;" >
					<view class="content ql-editor" style="padding: 12px 0;" v-html="content">
					</view>
				</view>
				
			</view>
			<view class="cash">
				<view class="case_box">
					<view class="cash_tlt color2 font32 bg1">
						提现金额
					</view>
					<view class="cash_input flexRowBetween bg1">
						<view class="input_masks color2 ilblock">¥</view>
						<input class="ilblock num" placeholder="请输入提现金额" v-model="submitData.count"></input>
					</view>
					<view class="cash_can font12 color3 bg1 flex ilblock">
						本次可提现<text>¥{{userData.info?userData.info.balance:''}},</text>
						<view class="font28 color2 ilblock" @click="all">全部提现</view>
					</view>
					<view class="cash_cont bg1" style="padding-top:70rpx;padding-bottom:30rpx;">
						<button v-if="userData.info&&userData.info.ali_account" class="submit_info color5 font15" @click="webSelf.$Utils.stopMultiClick(submit)">提现</button>
						<button v-else class="submit_info color5 font15" style="background: gray;">提现</button>
						<!-- bindtap="{{web_buttonCanClick?'submit':''}}" -->
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf:this,
				userData:{},
			
			
				searchItem:{
					type:2
				},
				submitData:{
					count:''
				},
				content:''

			}
		},
		onLoad(options) {
			const self = this;
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['userGet','getArticleData'], self)
			});
			if(res){
				self.$Utils.loadAll(['userGet','getArticleData'], self)
			};
		},
		methods: {

			userGet() {
				const self = this;
				const postData = {
					tokenFuncName: 'getProjectToken',
					thirdapp_id: 2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToat('数据错误')
					}
					self.$Utils.finishFunc('userGet');
				}
				self.$apis.userGet(postData, callback);
			},
			
			getArticleData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					title:'提现说明'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.content = res.info.data[0].content
					};
					self.$Utils.finishFunc('getArticleData');
				};
				self.$apis.articleGet(postData, callback);
			},	

			flowLogAdd() {
				const self = this

				const postData = {
					data: {
						count: -self.submitData.count,
						trade_info: '提现',
						status: 0,
						type: 2,
						thirdapp_id: 2,
						behavior:3
					},
					tokenFuncName: 'getProjectToken'
				};


				const callback = (res) => {

					if (res.solely_code == 100000) {
						self.$Utils.showToast('申请成功', 'none');
						setTimeout(function(){
						   uni.navigateBack({
						   	delta: 1
						   });
						},1000);
						
					};
					self.$Utils.finishFunc('submit');
				};
				self.$apis.flowLogAdd(postData, callback)
			},

			submit() {
				const self = this;

				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass)
				console.log('parseFloat(self.submitData.count)', parseFloat(self.submitData.count))
				console.log('parseFloat(self.userData.info.balance)', parseFloat(self.userData.info.balance))
				if (pass) {
					if (parseFloat(self.submitData.count) <= parseFloat(self.userData.info.balance)&&parseFloat(self.submitData.count)>0) {
						self.flowLogAdd()
					} else {
						self.$Utils.showToast('佣金不足', 'none');
						self.$Utils.finishFunc('submit');
					}
					
				} else {
					self.$Utils.showToast('请输入提现金额', 'none');
					self.$Utils.finishFunc('submit');
				};
			},

			all() {
				const self = this;
				self.submitData.count = self.userData.info.balance
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	page {
		background: #f2f2f2;
		overflow: hidden;
	}

	.box {
		width: 92%;
		margin: 50px auto;
		box-sizing: border-box;
		padding: 50rpx 0rpx 30rpx;
		border-radius: 10px;
	}

	.bank {
		box-sizing: border-box;
		padding: 10rpx 30rpx 40rpx;
	}

	.num {
		position: relative;
		top: 10px;
	}

	.cash_bank {
		width: 87%;
		padding: 0 6.5%;
		background: #fcfcfc;
		padding-bottom: 60rpx;
	}

	.cash_bank input {
		border: solid 1px #e0e0e0;
		height: 80rpx;
		line-height: 80rpx;
		width: 92%;
		padding: 0 4%;
	}

	.cash_bank text {
		margin-right: 80rpx;
	}

	.cash_cont {
		width: 87%;
		padding: 0 6.5%;
		margin: 0 auto;
	}

	.cash_tlt {
		margin: 0 auto;
		width: 87%;
		height: 140rpx;
		box-sizing: border-box;
		line-height: 140rpx;
	}

	.input_masks {
		width: 10%;
		font-size: 60rpx;
	}

	.cash_input {
		width: 87%;
		margin: 0rpx 6.5%;
		border-bottom: solid 1px #f0f0f0;
		height: 94rpx;
	}

	.cash_input input {
		width: 90%;
		height: 80rpx;
	}

	.cash_can {
		width: 87%;
		padding: 0 6.5%;
		height: 72rpx;
		line-height: 72rpx;
	}

	.submit_info {
		width: 100%;
		border-radius: 0;
		margin: 0 auto;
		background: #F98A48;
		height: 80rpx;
	}

	.bind_bank {
		height: 110rpx;
		line-height: 140rpx;
	}

	.cash_can>view {
		margin-left: 40rpx;
	}

	.case_box {}

	.case_box {
		border-radius: 20rpx;
	}



	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
