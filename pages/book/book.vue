<template>
	<view>

		<div >
			<div style="color: #818181; font-size: 15px; padding: 10px 15px; background: #F2F2F2;">
				预约日历
			</div>
			<div class="wahct-top">
				<div class="color3 ilblock wahct-topleft" @click="goLastMonth" style="margin: 0;width: 33%;text-align: center;">
					<image src="../../static/images/wximg6.png"></image>
					<view class="ilblock wahct-top-text">上月</view>
				</div>
				<div class="color2 ilblock wahct-topleft" style="font-size: 16px;margin: 0;width: 33%;text-align: center;">
					{{curYear}}*{{curMonth+1}}
				</div>
				<div class="ilblock wahct-topright" @click="goNextMonth" style="margin: 0;width: 33%;text-align: center;">
					<view class="ilblock wahct-top-text">下月</view>
					<image src="../../static/images/wximg5.png"></image>
				</div>
			</div>
			<div class="week">
				<div class="week-item ilblock">
					一
				</div>
				<div class="week-item ilblock">
					二
				</div>
				<div class="week-item ilblock">
					三
				</div>
				<div class="week-item ilblock">
					四
				</div>
				<div class="week-item ilblock">
					五
				</div>
				<div class="week-item ilblock">
					六
				</div>
				<div class="week-item ilblock">
					日
				</div>
			</div>
			<view class="bg1" style="padding:0upx 0upx 70upx;">
				<block v-for="item in dateData">
					<div class="day-item ilblock day-star" style="vertical-align: top;" :style="item.sDay==currentDay?'height:70px;color:red':'height:70px;'"
					 @click="dateChoose(item)">
						<div>{{item.sDay}}</div>
						<div style="width:100%;height:30px;">
							<div  v-if="item.qrDate&&item.qrDate.price!='0.00'">补￥{{item.qrDate.price}}</div>
							<div style="color:#71C3CB; margin-top: 8upx;" v-if="item.hasItem>0">{{item.qrDate.stock&&item.qrDate.stock>0?'剩余'+item.qrDate.stock:'已约满'}}</div>
						</div>
					</div>
				</block>

			</view>
		</div>
		<button style="color:white;width: 150px;height: 30px;margin-top: 20px;line-height: 30px;background-color: #ffaa31;" @click="submit">点击预约</button>
		<view style="font-size: 14px;text-align: center;margin: 10px;padding: 10px;">备注：每天18：00前可预约1天后的日期，18：00以后可以预约2天后的日期</view>
	</view>
</template>

<script>
	import html2canvas from '@/common/html2canvas.js'
	import cSwiper from "@/components/swiperTwo/swiperTwo.vue"
	import cTabbar from "@/components/tabbar/tabbar.vue"
	export default {
		components: {
			cSwiper,
			cTabbar
		},



		data() {
			return {
				dateData: [],
				arrInfoEx: [],
				swiperData: [],
				labelData: [],
				QrData: [],
				userData: {},
				mainData: [],
				webSelf: this,
				num: 0,
				choosed_skuData: {},
				qrDateData: [],
				choosed_sku_item: [],
				can_choose_sku_item: [],
				skuLabelData: [],
				skuIdArray: [],
				cuurentPrice: 0,
				currentDay: 0,
				currentShopReward: 0,
				currentGroupReward: 0,
				showPoster: false,
				url: '',
				choosed_sku_id: 0,
				buyStatus: 'canBuy',
				skuType: 'sku',
				item:{}
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			self.qr_no = options[0].qr_no;
			self.id = options[0].id;
			self.timestampNow = (new Date()).getTime();
			var todayDate = new Date();
			self.todayMonth = todayDate.getMonth();
			self.todayYear = todayDate.getFullYear();
			self.todayDay = todayDate.getDate();
			console.log('self.todayYear', self.todayYear)
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['calenderInit', 'getUserData'], self)
			});
			if(res){
				self.$Utils.loadAll(['calenderInit', 'getUserData'], self)
			};
			
		},

		onShow() {
			const self = this;

		},
		onUnload() {
			const self = this;

		},

		onHide() {
			const self = this;

		},


		methods: {

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					id:self.id,
					status:1,
					isreserve:1
				};
				postData.getAfter = {
					qrDate: {
						tableName: 'QrDate',
						middleKey: 'qr_no',
						key: 'qr_no',
						condition: '=',
						searchItem: {
							status: 1,
							time: ['between', self.monthArray],
						}
					},
				};
				const callback = (res) => {
					if(res.info.data.length>0){
						self.mainData = res.info.data[0];
						self.qrDateData = self.mainData.qrDate;
						self.dateMerge()
					};
					self.$Utils.finishFunc('calenderInit');
				};
				self.$apis.qrCodeGet(postData, callback);
			},
			
			dateMerge() {
			
				const self = this;
				console.log('dateMerge-self.dateData', self.dateData)
				console.log('dateMerge-self.qrDateData', self.qrDateData)
				if (self.qrDateData.length > 0) {
					for (var o = 0; o < self.qrDateData.length; o++) {
						for (var p = 0; p < self.dateData.length; p++) {
							if (self.dateData[p].sDay == new Date(self.qrDateData[o].time).getDate()) {
								var newValue = {
									hasItem: 1,
									qrDate: self.qrDateData[o],
									sDay: self.dateData[p].sDay
								};
								self.dateData.splice(p, 1, newValue)
							};
						};
					};
				};
			
			},	


			getUserData() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserData');

				};
				self.$apis.userGet(postData, callback);
			},

			wxJsSdk() {
				const self = this;
				const postData = {
					thirdapp_id: 2,
					url: window.location.href
				};
				const callback = (res) => {
					console.log('maindata', self.mainData)
					self.$jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.appId, // 必填，公众号的唯一标识
						timestamp: res.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.nonceStr, // 必填，生成签名的随机串
						signature: res.signature, // 必填，签名
						jsApiList: ['openLocation', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用		
						console.log('maindata-ready', self.mainData)
						if (self.mainData.mainImg[0]) {
							var shareImg = self.mainData.mainImg[0].url;
						} else {
							var shareImg = 'empty';
						};
						console.log('shareImg', shareImg)
						self.$jweixin.updateAppMessageShareData({
							title: self.mainData.title, // 分享标题
							desc: self.mainData.description, // 分享描述
							link: 'https://www.local-scanner.com/wx/#/pages/recommend/recommend?parent_no=' + uni.getStorageSync(
								'user_no') + '&id=' + self.mainData.id,
							imgUrl: shareImg, // 分享图标
							success: function() {
								// 设置成功
								console.log('updateAppMessageShareData-ok')
							}
						})
					});
					self.$jweixin.error(function(res) {
						console.log('error', res)
					});
					self.$Utils.finishFunc('calenderInit');
				};
				self.$apis.WxJssdk(postData, callback);
			},

			computePrice() {
				const self = this;
				if (self.choosed_skuData.skuDate) {
					self.cuurentPrice = self.choosed_skuData.skuDate.price;
					self.currentShopReward = self.choosed_skuData.skuDate.shop_reward;
					self.currentGroupReward = self.choosed_skuData.skuDate.group_reward;
				} else if (self.choosed_skuData.price) {
					self.cuurentPrice = self.choosed_skuData.price;
					self.currentShopReward = self.choosed_skuData.shop_reward;
					self.currentGroupReward = self.choosed_skuData.group_reward;
				} else {
					self.cuurentPrice = self.mainData.price;
					self.currentShopReward = self.mainData.shop_reward;
					self.currentGroupReward = self.mainData.group_reward;
				};
			},

			dateChoose(item) {
				const self = this;
				
				if(self.qr_no&&self.qr_no!='undefined'&&(!item.qrDate||!item.qrDate.stock>0)){
					return;
				};
				
				if(self.todayYear<self.curYear){
					return;
				};
				if(self.todayYear==self.curYear&&self.todayMonth<self.curMonth){
					return;
				};
				if(self.todayMonth==self.curMonth&&self.todayDay>item.sDay-1){
					return;
				};
				console.log(9999);
				var nowTime = new Date().getTime();
				var sixTime = new Date(new Date(new Date().toLocaleDateString()).getTime()+18*60*60*1000);
				if(self.todayDay==item.sDay-1&&nowTime>sixTime){
					return;
				};
				console.log(6666);
				if(self.currentDay==item.sDay){
					self.currentDay = '';
					self.item = {};
				}else{
					self.currentDay =  item.sDay;
					self.item = item;
				};
				
				
			},
			submit(){
				const self = this;
				if(self.mainData.book_time){
					self.$Utils.showToast('您已经预约过', 'none')
					return;
				};
				if(JSON.stringify(self.item)=="{}"){
					self.$Utils.showToast('请选择预约日期', 'none')
					return;
				};
				if(self.item.qrDate&&self.item.qrDate.price!='0.00'){
					var content = '预约需加价￥'+self.item.qrDate.price+'元,提交预约后，除不可抗力因素外不可更改和取消';
				}else{
					var content = '我同意提交预约后，除不可抗力因素外不可更改和取消';
				};
				uni.showModal({
					title: '提示',
					content: content,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							self.submitF()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			submitF(){
				const self = this;
				var item = self.item;
				if(item.qrDate&&item.qrDate.price!='0.00'){
					console.log('self.choosed_skuData', self.choosed_skuData)
					const postData = {};
					postData.pay = {
						wxPay:{
							price:item.qrDate.price,
						},
						wxPayStatus:0
					};
					postData.tokenFuncName = 'getProjectToken';
					postData.data = {
					   price: item.qrDate.price
					};
					postData.data.payAfter = [
					   {
							tableName: 'Qrcode',
							FuncName: 'update',
							searchItem:{
								id:self.id,
								status:1
							},
							data: {
								book_time:self.curYear+'-'+(self.curMonth+1)+'-'+item.sDay,
								date_no:item.qrDate.date_no,
								reserve_time:item.qrDate.time,
								reserved:2
							},
					   }
					];
					const callback = (res) => {
						if (res.solely_code == 100000) {
							if (res.info) {
								const payCallback = (payData) => {
									console.log('payData', payData)
									if (payData == 1) {
										uni.showToast({
											title: '支付成功',
											duration: 2000,
											success: function() {
												self.$Router.reLaunch({
													route: {
														path: '/pages/user/user'
													}
												})
											}
										});
									} else {
										uni.setStorageSync('canClick', true);
										uni.showToast({
											title: '支付失败',
											duration: 2000
										});
									};
								};
								self.$Utils.realPay(res.info, payCallback);
							} else {
								uni.setStorageSync('canClick', true);
								uni.showToast({
									title: '支付完成',
									duration: 2000
								});
							};
						} else {
							uni.setStorageSync('canClick', true);
							uni.showToast({
								title: '支付参数有误',
								duration: 2000
							});
						};
					};
					self.$apis.addVirtualOrder(postData, callback);
				}else{
					
					if(item.qrDate){
						
						var postData = {
							tokenFuncName:'getProjectToken',
							searchItem:{
								id:self.id,
							},
							data:{
								book_time:self.curYear+'-'+(self.curMonth+1)+'-'+item.sDay,
								date_no:item.qrDate.date_no,
								reserve_time:item.qrDate.time,
								reserved:2
							}
						};
						
					}else{
						
						var postData = {
							tokenFuncName:'getProjectToken',
							searchItem:{
								id:self.id,
							},
							data:{
								book_time:self.curYear+'-'+(self.curMonth+1)+'-'+item.sDay,
								reserve_time:(new Date()).getTime(),
								reserved:2
							}
						};
					};
					
					const callback = (res) => {
						if (res.solely_code==100000) {
							self.$Utils.showToast('预约成功','none');
							self.$Router.reLaunch({
								route: {
									path: '/pages/user/user'
								}
							})
						}else{
							self.$Utils.showToast(res.msg,'none');
						};
						self.getMainData(true);
					};
					self.$apis.qrCodeUpdate(postData, callback);
				};
				
				
			},

			calenderInit() {
				const self = this;
				var curDate = new Date();
				self.curMonth = curDate.getMonth();
				self.curYear = curDate.getFullYear();
				self.curDay = curDate.getDate();
				self.refreshPageData(self.curYear, self.curMonth, self.curDay);
				self.getMainData();
			},

			//刷新全部数据
			refreshPageData(year, month, day) {
				const self = this;

				self.signData = [];
				self.dateData = [];
				self.getOffset(self.curYear, self.curMonth);
				self.monthArray = [new Date(self.curYear, self.curMonth, 1).getTime(), new Date(self.curYear, self.curMonth + 1, 1)
					.getTime()
				];

				var offset = self.getOffset(self.curYear, self.curMonth);
				for (var i = 0; i < offset; ++i) {
					self.dateData.push({
						isEmpty: true
					});
				};
				var dayCount = self.getDayCount(self.curYear, self.curMonth);
				for (var i = 0; i < dayCount; ++i) {
					if (self.todayDay == i + 1) {
						self.dateData.push({
							sDay: i + 1,
							isToday: true
						});
					} else {
						self.dateData.push({
							sDay: i + 1
						});
					};
				};
				console.log('self.dateData', self.dateData)

			},

			//获取此月第一天相对视图显示的偏移
			getOffset(curYear, curMonth) {
				const self = this;
				var offset = new Date(curYear, curMonth, 1).getDay();
				offset = offset == 0 ? 6 : offset - 1;
				//注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
				console.log('offset', offset)
				return offset;
			},
			isLeapYear(year) {
				if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
					return 1
				else
					return 0
			},

			getDayCount(year, month) {
				var DAY_OF_MONTH = [
					[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
				];
				return DAY_OF_MONTH[this.isLeapYear(year)][month];
			},

			goLastMonth(e) {
				const self = this;
				if (0 == self.curMonth) {
					self.curMonth = 11;
					self.curYear--;
				} else {
					self.curMonth--;
				};
				self.currentDay = '';
				self.item = {};
				self.refreshPageData(self.curYear, self.curMonth, 1);
				self.getQrDateData();

			},

			goNextMonth(e) {
				const self = this;
				if (self.curMonth == 11) {
					self.curMonth = 0;
					self.curYear++
				} else {
					self.curMonth++;
				};
				self.currentDay = '';
				self.item = {};
				self.refreshPageData(self.curYear, self.curMonth, 1);
				self.getQrDateData();
			},

			getQrDateData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					time: ['between', self.monthArray],
					qr_no: self.qr_no
				};
				const callback = (res) => {
					console.log(res);
					if (res.info.data.length > 0) {
						self.qrDateData = self.$Utils.cloneForm(res.info.data);
					} else {
						self.qrDateData = [];
					};
					self.$Utils.finishFunc('getQrDateData')
					self.dateMerge();
				};
				self.$apis.qrDateGet(postData, callback);
			},


			
		}
	}
</script>

<style>
	@import "../../assets/style/follow.css";
	@import "../../assets/style/cusseed.css";
	@import "../../assets/style/remommend.css";
	@import "../../assets/style/code-first.css";
	a {text-decoration:none;out-line: none}
	#test img {
		width: 100%;
	}

	@import "../../assets/style/basic.css";
</style>
