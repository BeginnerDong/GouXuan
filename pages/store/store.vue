<template>
	<view>

		<div class="bg1 top">
			<div class="ilblock flo-left" style="width:10% ;" @click="scan">
				<img src="../../static/images/service-icon6.png" style="width: 28px;" />
			</div>

			<div class="search flo-left">
				<input class="ilblock color1" style="margin-left: 15px;height:30px;line-height: 30px;" v-model="check_code"></input>
			</div>
			<button class="color5 ilblock flo-left" @click="search">搜索</button>

			<div class="ilblock flo-left" style="width:100%;font-size: 9px;text-align: center;margin-top: 3px;">

				<div class="flo-left" style="padding:2px;border-radius:20%;background: #F67550;color:white" @click="bindWechat">
					{{userData.openid!=''?'已绑定':'绑定'}}
				</div>
				<div class="flo-left" style="padding:2px;border-radius:20%;background: #F67550;color:white;margin-left:5px" @click="loginOut">
					退出
				</div>
				<!-- <div class="flo-left" style="margin-left: 25px;">
					关联微信昵称为
				</div> -->
			</div>
		</div>


		<div class="storebox bg1" v-for="item in mainData" v-if="item.order.length>0">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==1&&item.order[0].order_step==0">等待核销</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==2&&item.order[0].order_step==0">已核销</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.order_step==2">已退单</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img :src="item.order&&item.order[0].products&&item.order[0].products[0]&&item.order[0].products[0].snap_product&&item.order[0].products[0].snap_product.product&&
					item.order[0].products[0].snap_product.product.mainImg&&item.order[0].products[0].snap_product.product.mainImg[0]?
					item.order[0].products[0].snap_product.product.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 25px;">
						{{item.order&&item.order[0].products&&item.order[0].products[0]&&item.order[0].products[0].snap_product&&item.order[0].products[0].snap_product.product?
					item.order[0].products[0].snap_product.product.title:''}}
					</div>
					<div class="font12 color1 overflow2" style="line-height: 20px; height: 20px;" v-if="item.behavior==2">
						核销时间:{{item.update_time?item.update_time:''}}
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.order[0].price}}<text style="font-size: 15px" class="color2" v-if="item.message">({{item.message}})</text></span>
					</div>
				</div>
			</div>
			<div style="line-height: 40px; margin-left: 15px;" >
				<div class="ilblock color1 font14" style="margin-right: 30px;">核销码：{{item.check_code}}</div>
				<div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;"
				 @click="qrCodeUpdate(item.id)" v-if="item.behavior==1">确认核销</div>
				  <div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;"
				  v-if="item.behavior==2">已核销</div>
			</div>
		</div>

		<div class="storebox bg1" v-for="item in mainData" v-else>
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==1">等待核销</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;" v-if="item.behavior==2">已核销</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img :src="item.product&&item.product[0]&&item.product[0].mainImg&&item.product[0].mainImg[0]?item.product[0].mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 25px;">
						{{item.product&&item.product[0]?item.product[0].title:''}}
					</div>
					<div class="font15 color2 overflow2" style="line-height: 20px; height: 20px;" v-if="item.behavior==2">
						核销时间:{{item.update_time?item.update_time:''}}
					</div>

					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.product&&item.product[0]?item.product[0].price:''}}<text style="font-size: 15px" class="color2" v-if="item.message">({{item.message}})</text></span>
					</div>
				</div>
			</div>
			<div style="line-height: 40px; margin-left: 15px;">
				<div class="ilblock color1 font14" style="margin-right: 30px;">核销码：{{item.check_code}}</div>
				<div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;"
				 @click="qrCodeUpdate(item.id)" v-if="item.behavior==1">确认核销</div>
				 <div class="ilblock radiu20 font13" style="border: solid 1px #F98A48; height: 28px; line-height: 28px; width: 75px; text-align: center;"
				  v-if="item.behavior==2">已核销</div>
			</div>
		</div>
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px;text-align: center;">
				<img src="../../static/images/logo1.png" style="width: 195px;"/>
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">未搜索到数据</div>
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
				userData: [],
				searchItem: {
					thirdapp_id: 2,
					shop_no: uni.getStorageSync('merchant_no'),
					type: ['in', [1, 2]],
					behavior:2
				}
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['wxJsSdk', 'getUserData','getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['wxJsSdk', 'getUserData','getMainData'], self)
			};
			
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
			const self = this;
			console.log('refresh');
			uni.startPullDownRefresh();
			/* delete self.searchItem.check_code;
			self.searchItem.behavior = 2; */
			
			self.searchItem = {
				thirdapp_id: 2,
				shop_no: uni.getStorageSync('merchant_no'),
				type: ['in', [1, 2]],
				behavior:2
			};
			self.mainData = [];
			
			self.getMainData(true);
			
		},



		methods: {
			
			
			loginOut(){
				const self = this;
				wx.removeStorageSync('merchant_token');
				self.$Router.reLaunch({
					route: {
						path: '/pages/login/login'
					}
				})
			},


			bindWechat() {
				const self = this;
				const postData = {
					tokenFuncName: 'getProjectToken',
					data: {
						shop_no: uni.getStorageSync('merchant_no')
					}
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.$Utils.showToast('绑定成功', 'none');
						setTimeout(function(){
							self.getUserData()
						},1000);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					}
				}
				self.$apis.bindShop(postData, callback)
			},

			getUserData() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getMerchantToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.userGet(postData, callback);
			},

			scan() {
				const self = this;
				self.$jweixin.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						console.log('result', result)
						self.searchItem.check_code = result;
						self.searchItem.behavior = ['in',[1,2]];
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
					self.searchItem.behavior = ['in',[1,2]];
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
				var shops = uni.getStorageSync('merchant_info');
				console.log('shops',shops)
				var newShops = [];
				if(shops&&shops.shops.length>0){
					for(var i=0;i<shops.shops.length;i++){
						newShops.push(shops.shops[i].phone);
					};
				}else if(shops){
					console.log('merchant_info',newShops)
					newShops.push(shops.shop.phone);
				};
				if(!self.searchItem.check_code&&newShops.length>0){
					postData.searchItem.check_no = ['in',newShops];
				};
				
				postData.getAfter = {
					order: {
						tableName: 'Order',
						middleKey: 'order_no',
						key: 'order_no',
						searchItem: {
							status: 1,
							user_type: 0
						},
						condition: '='
					},
					product: {
						tableName: 'Product',
						middleKey: 'product_no',
						key: 'product_no',
						searchItem: {
							status: 1,
						},
						condition: '='
					}
				};
				
				postData.order = {
					'update_time':'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.isLoadAll = true;
					};
					const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
					const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
					for(var i=0;i<self.mainData.length;i++){
						if(self.mainData[i].isreserve==1&&(self.mainData[i].book_time<start||self.mainData[i].book_time>end)){
							self.mainData[i].canCheck  = false;
						}else{
							self.mainData[i].canCheck  = true;
						};
					};
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 300);
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.qrCodeGet(postData, callback);
			},

			qrCodeUpdate(id) {
				const self = this;
				uni.showModal({
					title: '核销确认',
					content: '确认要核销此订单吗',
					success: function (res) {
						if (res.confirm) {
							const postData = {};
							postData.tokenFuncName = 'getMerchantToken';
							postData.data = {
								behavior: 2,
								check_time:(new Date()).getTime()
							};
							postData.searchItem = {};
							postData.searchItem.id = id;
							const callback = res => {
								self.$Utils.showToast('已核销', 'none')
								self.mainData = [];
								self.getMainData(true);
							};
							self.$apis.qrCodeUpdate(postData, callback);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.top {
		width: 100%;
		height: 80px;
		padding: 15px;
	}

	.search {
		width: 60%;
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
		width: 94%;
		height: 185px;
		margin: 3% auto 0px;
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
