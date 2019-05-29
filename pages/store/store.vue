<template>
	<view>

		<div class="bg1 top">
			<div class="ilblock flo-left" style="width:30px ;" @click="scan">
				<img src="../../static/images/service-icon6.png" style="width: 28px;" />
			</div>
			<div class="search flo-left">
				<div class="ilblock">
					<img src="../../static/images/home-icon13.png" style="width: 16px; margin-left: 13px;margin-bottom: 4px;" />
				</div>
				<input class="ilblock color1" style="margin-left: 15px;height:30px;line-height: 30px;" placeholder="请输入核销码搜索"
				 v-model="check_code"></input>
			</div>
			<button class="color5 ilblock flo-left" @click="search">搜索</button>
		</div>
		<div class="storebox bg1" v-for="item in mainData">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==1">等待核销</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==2">已核销</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img :src="item.order&&item.order[0].products&&item.order[0].products[0]&&item.order[0].products[0].snap_product&&item.order[0].products[0].snap_product.product&&
					item.order[0].products[0].snap_product.product.mainImg&&item.order[0].products[0].snap_product.product.mainImg[0]?
					item.order[0].products[0].snap_product.product.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.order&&item.order[0].products&&item.order[0].products[0]&&item.order[0].products[0].snap_product&&item.order[0].products[0].snap_product.product?
					item.order[0].products[0].snap_product.product.title:''}}
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.order[0].price}}</span>
					</div>
				</div>
			</div>
			<div style="line-height: 40px; float: right; margin-right: 15px;" v-if="item.behavior==1">
				<div class="ilblock color1 font14" style="margin-right: 30px;">核销码：{{item.check_code}}</div>
				<div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;"
				 @click="qrCodeUpdate(item.id)">确认核销</div>
			</div>
		</div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				isLoadAll: false,
				check_code: '',
				mainData: [],
				searchItem: {
					thirdapp_id: 2,
					shop_no: uni.getStorageSync('merchant_no'),
				}
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['wxJsSdk', 'getMainData'], self)
		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		onPullDownRefresh() {
			console.log('refresh');
			uni.startPullDownRefresh();
			delete self.searchItem.check_code;
			self.getMainData(true);
		},
		


		methods: {

			scan() {
				const self = this;
				self.$jweixin.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						console.log('result', result)

						self.searchItem.check_code = result;
						self.getMainData(true)
					}
				});
			},

			wxJsSdk() {
				const self = this;
				const postData = {
					thirdapp_id: 2,
					url: window.location.href
				};
				const callback = (res) => {

					self.$jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.appId, // 必填，公众号的唯一标识
						timestamp: res.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.nonceStr, // 必填，生成签名的随机串
						signature: res.signature, // 必填，签名
						jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用
					});
					self.$jweixin.error(function(res) {
						console.log('error', res)
					});
					self.$Utils.finishFunc('wxJsSdk');
				};
				self.$apis.WxJssdk(postData, callback);
			},



			search() {
				const self = this;
				if (self.check_code != '') {
					self.searchItem.check_code = self.check_code;
					self.getMainData(true)
				} else {
					self.$Utils.showToast('无效输入', 'none')
				}
			},

			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 5,
						is_page: true,
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getMerchantToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.getAfter = {
					order: {
						tableName: 'Order',
						middleKey: 'order_no',
						key: 'order_no',
						searchItem: {
							status: 1,

						},
						condition: '='
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('未找到订单', 'none')
						self.isLoadAll = true;
					}
					setTimeout(function()
					{
					  uni.stopPullDownRefresh()
					},300);
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.qrCodeGet(postData, callback);
			},

			qrCodeUpdate(id) {
				const self = this;
				console.log(id)
				const postData = {};
				postData.tokenFuncName = 'getMerchantToken';
				postData.data = {
					behavior: 2,
				}
				postData.searchItem = {};
				postData.searchItem.id = id;
				const callback = res => {
					self.$Utils.showToast('已核销', 'none')
					self.mainData = [];
					self.getMainData(true);
				};
				self.$apis.qrCodeUpdate(postData, callback);
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
		padding: 0;
		margin: 0;
		line-height: 30px;
		font-size: 14px;
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


	@import "../../assets/style/basic.css";
</style>
