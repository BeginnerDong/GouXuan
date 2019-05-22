<template>
	<view>

		<div class="bg1 top">
			<div class="ilblock flo-left" style="width:30px ;">
				<img src="/static/images/服务/service-icon6.png" style="width: 28px;" />
			</div>
			<div class="search flo-left">
				<div class="ilblock">
					<img src="/static/images/home-icon13.png" style="width: 16px; margin-left: 13px;margin-bottom: 4px;" />
				</div>
				<div class="ilblock color1" style="margin-left: 15px;">3541354</div>
			</div>
			<button class="color5 ilblock flo-left">搜索</button>
		</div>
		<div class="storebox bg1" v-for="item in mainData">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">等待核销</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.title}}
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.price}}</span>
					</div>
				</div>
			</div>
			<div style="line-height: 40px; float: right; margin-right: 15px;">
				<div class="ilblock color1 font14" style="margin-right: 30px;">核销码：5642</div>
				<div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;">确认核销</div>
			</div>
		</div>

	</view>
</template>

<script>
	export default {

		data() {
			return {

				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		methods: {
		

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					shop_no:uni.getStorageSync('merchant_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},

			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.top {
		width: 100%;
		height: 56px;
		padding: 15px;
	}

	.search {
		width: 230px;
		height: 30px;
		border: solid 1px #ECEBEC;
		margin-left: 24px;
		line-height: 30px;
		border-radius: 20px 0px 0px 20px;
	}

	button {
		background: #F67550;
		border-radius: 0px 20px 20px 0px;
		height: 30px;
		width: 60px;
		border: none;
	}

	.storebox {
		width: 345px;
		height: 185px;
		margin: 15px auto 0px;
		border-radius: 13px;
		box-shadow: 0px 0px 12px #E2E2E2;
		position: relative;
	}

	.storebox-top {
		width: 100%;
		height: 43px;
		line-height: 44px;
	}

	.storebox-btm {

		width: 100%;
		height: 95px;
		line-height: 40px;
	}

	.img-box {
		width: 96px;
		height: 95px;
		overflow: hidden;
		border-radius: 4px;
		margin-left: 15px;
	}

	.img-box img {
		width: 96px;
		height: 95px;
	}

	.imgname {
		height: 95px;
		width: 205px;
		margin-left: 10px;
		position: absolute;
		text-align: justify;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
