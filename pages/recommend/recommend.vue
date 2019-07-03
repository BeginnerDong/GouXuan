<template>
	<view>
		<div id="poster" style="z-index:-999;position: absolute;">
			<div class="img">
				<img class="img-one" crossOrigin="anonymous" :src="mainData.posterImg&&mainData.posterImg[0]?mainData.posterImg[0].url+'?'+new Date().getTime():''"
				 style="width:100%;height:100%" />
				<!-- <img class="img-one" src="../../static/images/达人/img2.png" /> -->
			</div>
			<div class="ilblock imgb">
				<img :src="QrData&&QrData.url?QrData.url+'?'+new Date().getTime():''" crossOrigin="anonymous" />
				<!-- <img src="../../static/images/达人/img8.png" /> -->
			</div>
		</div>

		<div style="width:100%;height:100%;position:fixed;top:0;background:black;opacity:0.6;z-index:666" v-if="showPoster"></div>
		<div style="z-index:999;width:80%;height:80%;position: fixed;top: 10%;left:10%" v-if="showPoster">
			<img :src="url" style="width:100%;height:100%" />
			 <img src="../../static/images/icon3.png"  style="position: absolute;position: absolute;right: 43%;top: 102%;" @click="ifShowPoster" />
		</div>
		
		<c-swiper :list="mainData['bannerImg']">
		</c-swiper>
		<!-- <div class="top-imgbox">
			<img src="../../static/images/服务/service-img2.png" />	
		</div> -->
		<div class="best-num" @click="url==''?getQrData():ifShowPoster()">分享海报</div>

		<div class="img-btm" style="display: flex;text-indent:0" v-if="mainData.timeCount&&mainData.hourCount<24">
			<view style="margin-left: 5%;">限时抢购</view>
			<view style="display: flex;margin-left:25%;align-items: center;">
				<view style="width:50%;font-size:13px">距结束仅剩</view>
				<view  style="text-align: center;margin:0 1%;font-size:13px;width:25px;background: #fff;height:20px;line-height:20px;border-radius:5px;display:flex;align-item:center;justify-content:center">{{mainData.hourCount}}</view>时
				<view  style="text-align: center;margin:0 1%;font-size:13px;width:25px;background: #fff;height:20px;line-height:20px;border-radius:5px;display:flex;align-item:center;justify-content:center">{{mainData.minCount}}</view>分
				<view  style="text-align: center;margin:0 1%;font-size:13px;width:25px;background: #fff;height:20px;line-height:20px;border-radius:5px;display:flex;align-item:center;justify-content:center">{{mainData.secCount}}</view>秒
			</view>
		</div>
		<div style="width: 100%; background: #fff;padding: 15px;">
			<div class="color2" style="font-size: 15px; text-align: justify;">
				{{mainData.title}}
			</div>
			<div>
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72); margin-top:5px;">￥<span style="font-size: 20px;">{{cuurentPrice}}</span></div>

				<div class="ilblock best-money1" v-if="userData.primary_scope>10">
					<view class="span1 ilblock bg3">店返</view>
					<view class="span2 ilblock color8">￥{{currentShopReward}}</view>
				</div>
				<div class="ilblock best-money2" v-if="userData.primary_scope>10">
					<view class="span1 ilblock bg4">团返</view>
					<view class="span2 ilblock" style="color: #F14667;">￥{{currentGroupReward}}</view>
				</div>

				<!-- <div class="ilblock best-money1" style="left: -10px;">
					<span class="span1">店反</span>
					<span class="span2">￥{{mainData.shop_reward}}</span>
				</div>
				<div class="ilblock best-money2" style="left: -10px;">
					<span class="span1">团反</span>
					<span class="span2">￥{{mainData.group_reward}}</span>
				</div> -->
			</div>
			<div style="margin-top: 5px;">
				<span class="color1" style="float: left; font-size: 13px;">已售：{{mainData.false_sale_count}}</span>
				<span class="color1" style="float: right; font-size: 13px;">库存：{{mainData.false_stock}}</span>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div style="height:2px;width: 100%;background: #f2f2f2;"></div>
		<div class="address color2" @click="openMap" style=" position: relative;">
			<div class="ilblock" style="width: 10%;height: 100%;line-height: 48px;text-align: center;">
				<img src="../../static/images/details-icon1.png" style="width: 12px; height: 14px;" />
			</div>
			<div class="ilblock" style="width: 80%;height: 100%;line-height: 48px;">{{mainData.address}}</div>
			<div class="ilblock" style="position: absolute;right: 15px; top: 16px;">
				<img src="../../static/images/home-icon9.png" style="height: 12px;" />
			</div>
		</div>
		<div style="height:2px;width: 100%;background: #f2f2f2;"></div>

		<div class="choice">
			<div style="color: #787878; font-size: 13px; height: 100%; text-align: center;position: relative;margin-top: 10px;">规格选择</div>
			<div>
				<div class="ilblock">
					<div class="chioce-item ilblock" v-for="(c_item,index) in webSelf.mainData.sku" :style="webSelf.choosed_sku_id==c_item.id?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':'color:black'"
					 @click="chooseSku(index)">
						{{c_item.title}}
					</div>
				</div>
			</div>
			<!--<div class="ilblock" v-for="item in skuLabelData">
				<div class="color2" style="margin-top: 10px;">{{item.title}}:</div>
				<div class="chioce-item ilblock" v-for="c_item in item.child" :style="webSelf.$Utils.inArray(c_item.id,can_choose_sku_item)==-1?'color:gray':(webSelf.$Utils.inArray(c_item.id,choosed_sku_item)!=-1?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':'color:black')"
				 @click="chooseSku(c_item.id)">
					{{c_item.title}}
				</div>
			</div>-->


		</div>
		<div v-if="mainData&&mainData.skuDateAll&&mainData.skuDateAll.length>0">
			<div style="color: #818181; font-size: 15px; padding: 10px 15px; background: #F2F2F2;">
				日历
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
					<div class="day-item ilblock day-star" :style="item.skuDate&&item.skuDate.id==currentSkuDateId?'height:50px;color:red':'height:50px;'"
					 @click="dateChoose(item)">
						<div>{{item.sDay}}</div>
						<div style="position: absolute;top:12px;text-align: center;left: 46%;transform: translateX(-50%);">
							<div s v-if="item.hasItem>0">￥{{item.skuDate.price}}</div>
							<div style="color:#72B784;" v-if="item.hasItem>0&&userData.primary_scope>10">返{{item.skuDate.shop_reward}}</div>
							<div style="color:#71C3CB; margin-top: 8upx" v-if="item.hasItem>0">{{item.skuDate.stock&&item.skuDate.stock>0?'充足':'已售罄'}}</div>
						</div>
					</div>
				</block>

			</view>
		</div>
		
		<div id="country" style="height:10px;width: 100%;background: #f2f2f2;"></div>
		<div class="nav-top" style="border-bottom: 1px solid #f2f2f2;">
			<div class="ilblock color2" @click="menuChange('0')">产<span :class="num==0?'active':''">品详</span>情</div>
			<div class="ilblock color2" @click="menuChange('1')">使<span :class="num==1?'active':''">用说</span>明</div>
		</div>
		<div class="foter1" style="color: #848484; font-size: 15px; padding: 10px 8px;background: #fff;min-height:195px" v-if="num==0">
			<div style="overflow: hidden;" id="test">
				<view class="content ql-editor" style="padding: 12px 0;" v-html="mainData.content">
				</view>
			</div>
		</div>

		<div class="foter2">
			<div style="height:10px;width: 100%;background: #f2f2f2;"></div>
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">产品</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">
					<view class="content ql-editor" v-html="mainData.information">
					</view>
				</div>
			</div>
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">规格</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">
					{{mainData.standards}}
				</div>
			</div>
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">温馨提示</div>
				<div>
					{{mainData.tips}}
				</div>
			</div>
			<div class="foter2-boxa" v-if="mainData.productOne&&mainData.productOne.length>0||mainData.productTwo&&mainData.productTwo.length>0">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">相关商品</div>
				<div style="display: flex;">
					<div class="best-box" style="margin-left:0;width:48%" v-if="mainData.productOne.length>0" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+mainData.productOne[0].id}})">
						<div class="best-box-top">
							<img :src="mainData.productOne[0].mainImg&&mainData.productOne[0].mainImg[0]?mainData.productOne[0].mainImg[0].url:''" />
						</div>
						<div class="best-text color2">
							{{mainData.productOne[0].title}}
						</div>
						<view>
							<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72); margin-left: 15px; margin-top: 8px;">￥
								<span style="font-size: 20px;">{{mainData.productOne[0].price}}</span>
							</div>
							<div v-if="userData.primary_scope>10">
								<div class="ilblock best-money1" style="width:42%;">
									<view class="span1 ilblock bg3">店返</view>
									<view class="span2 ilblock color8">￥{{mainData.productOne[0].shop_reward}}</view>
								</div>
								<div class="ilblock best-money2" style=" width:42%;line-height: inherit;">
									<view class="span1 ilblock bg4">团返</view>
									<view class="span2 ilblock color9">￥{{mainData.productOne[0].group_reward}}</view>
								</div>
							</div>
						</view>
					</div>
					<div class="best-box" style="margin-left:4%;width:48%" v-if="mainData.productTwo.length>0" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+mainData.productTwo[0].id}})">
						<div class="best-box-top">
							<img :src="mainData.productTwo[0].mainImg&&mainData.productTwo[0].mainImg[0]?mainData.productTwo[0].mainImg[0].url:''" />
						</div>
						<div class="best-text color2">
							{{mainData.productTwo[0].title}}
						</div>
						<view>
							<div style="font-size: 12px; color: rgb(249,138,72); margin-left: 15px; margin-top: 8px;">￥
								<span style="font-size: 20px;">{{mainData.productTwo[0].price}}</span>
							</div>
							<div v-if="userData.primary_scope>10">
								<div class="ilblock best-money1" style="width:42%;">
									<view class="span1 ilblock bg3">店返</view>
									<view class="span2 ilblock color8">￥{{mainData.productTwo[0].shop_reward}}</view>
								</div>
								<div class="ilblock best-money2" style=" width:42%;line-height: inherit;">
									<view class="span1 ilblock bg4">团返</view>
									<view class="span2 ilblock color9">￥{{mainData.productTwo[0].group_reward}}</view>
								</div>
							</div>
						</view>
					</div>
				</div>
			</div>


			<div style="height:55px"></div>
			<div class="foter-fixd">
				<div class="index ilblock" style="border-right: solid 1px #E9E9E9;" @click="webSelf.$Router.redirectTo({route:{path:'/pages/index/index'}})">

					<img src="../../static/images/details-icon2.png" />
					<div>首页</div>

				</div>
				<a class="index ilblock" href="https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1MeqO5o&scene=SCE00004749">

					<img src="../../static/images/details-icon3.png" />
					<div style="color:#000 ;">客服</div>

				</a>
				<div v-if="buyStatus=='canBuy'" class="ilblock panic" @click="goBuy">
					<div style="color: #FEE4D1;">
						立即抢购
					</div>
				</div>
				<div v-if="buyStatus=='noStock'" class="ilblock panic" style="background: gray;">
					<div style="color: #FEE4D1;">
						已售完
					</div>
				</div>
			</div>
		</div>
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
				skuDateData: [],
				choosed_sku_item: [],
				can_choose_sku_item: [],
				skuLabelData: [],
				skuIdArray: [],
				cuurentPrice: 0,
				currentSkuDateId: 0,
				currentShopReward: 0,
				currentGroupReward: 0,
				showPoster: false,
				url: '',
				choosed_sku_id: 0,
				buyStatus: 'canBuy',
				skuType: 'sku'
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
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
			console.log('onShow', self.timestampNow)
			self.countDown();
		},
		onUnload() {
			const self = this;
			console.log('onUnload')
			clearTimeout(self.timeInterval);
		},

		onHide() {
			const self = this;
			console.log('onHide')
			clearTimeout(self.timeInterval);
		},


		methods: {

			countDown() { //倒计时函数
				// 获取当前时间，同时得到活动结束时间数组
				const self = this;
				self.countDownList = [];
				let newTime = Date.parse(new Date());
				let time = (newTime - self.timestampNow) / 1000;
				// 获取天、时、分、秒
				let hou = parseInt(time / (60 * 60));
				let min = parseInt(time % (60 * 60) / 60);
				let sec = parseInt(time % 60);

				if (self.mainData.timeCount) {
					self.mainData.secCount = self.mainData.secCount - sec;
					self.mainData.minCount = self.mainData.minCount - min;
					self.mainData.hourCount = self.mainData.hourCount - hou;
					if (self.mainData.secCount < 0) {
						self.mainData.secCount = self.mainData.secCount + 60;
						self.mainData.minCount = self.mainData.minCount - 1;
					};
					if (self.mainData.minCount < 0) {
						self.mainData.minCount = self.mainData.minCount + 60;
						self.mainData.hourCount = self.mainData.hourCount - 1;
					};
					if (self.mainData.hourCount < 0) {
						self.mainData.hourCount = 0;
						self.mainData.timeCount = true;
					};
				};

				self.timestampNow = newTime;
				console.log('countDown');
				self.timeInterval = setTimeout(function() {
					self.countDown()
				}, 1000)
			},

			ifShowPoster() {
				const self = this;
				self.showPoster = !self.showPoster
			},

			getQrData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.param = 'https://www.local-scanner.com/wx/?parent_no=' + uni.getStorageSync(
						'user_no') + '&id=' + self.mainData.id + '#/pages/recommend/recommend',
					postData.ext = 'png';
				const callback = (res) => {
					console.log(res);
					self.QrData = res.info;
					console.log(9990, self.QrData)
					html2canvas(document.getElementById("poster"), {
						width: 375,
						height: 665,
						useCORS: true,
						allowTaint: false,
						taintTest: true,
					}).then(function(canvas) {
						var imgUrl = canvas.toDataURL();
						self.url = imgUrl;
						console.log('self.url', self.url)


					});
					self.showPoster = true

				};
				self.$apis.getQrCommonCode(postData, callback);
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

			openMap() {
				const self = this;
				if ((parseFloat(self.mainData.latitude) > -90 || parseFloat(self.mainData.latitude) < 90) && (parseFloat(self.mainData
						.longitude) > -180 || parseFloat(self.mainData.longitude) < 180)) {
					wx.openLocation({
						latitude: parseFloat(self.mainData.latitude), // 纬度，浮点数，范围为90 ~ -90
						longitude: parseFloat(self.mainData.longitude), // 经度，浮点数，范围为180 ~ -180。
						name: '', // 位置名
						address: self.mainData.address, // 地址详情说明
						scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
						infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
					});
				} else {
					self.$Utils.showToast('经纬度设置错误', 'none')
				}

			},

			dateMerge() {

				const self = this;
				console.log('dateMerge-self.dateData', self.dateData)
				if (self.skuDateData.length > 0) {
					for (var o = 0; o < self.skuDateData.length; o++) {
						for (var p = 0; p < self.dateData.length; p++) {
							if (self.dateData[p].sDay == new Date(self.skuDateData[o].time).getDate()) {
								var newValue = {
									hasItem: 1,
									skuDate: self.skuDateData[o],
									sDay: self.dateData[p].sDay
								};
								self.dateData.splice(p, 1, newValue)
							};
						};
					};
				};

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
				console.log('item', item);
				if (self.mainData.end_time < (new Date()).getTime()) {
					return;
				};
				if (item.hasItem > 0) {
					if (self.choosed_skuData.skuDate) {
						delete self.choosed_skuData.skuDate;
						self.currentSkuDateId = 0;
						self.buyStatus = 'canBuy'
					} else {
						self.choosed_skuData.skuDate = item.skuDate;
						self.currentSkuDateId = item.skuDate.id;
						if (self.choosed_skuData.skuDate.stock > 0) {
							self.buyStatus = 'canBuy';
						} else {
							self.buyStatus = 'noStock';
						};
					};
					self.computePrice();
				};

				console.log('self.choosed_skuData', self.choosed_skuData)
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
				self.refreshPageData(self.curYear, self.curMonth, 1);
				self.getSkuDateData();

			},

			goNextMonth(e) {
				const self = this;
				if (self.curMonth == 11) {
					self.curMonth = 0;
					self.curYear++
				} else {
					self.curMonth++;
				}
				self.refreshPageData(self.curYear, self.curMonth, 1);

				self.getSkuDateData();
			},

			getSkuDateData() {
				const self = this;
				if (!self.choosed_skuData.sku_no) {
					self.skuDateData = [];
					self.currentSkuDateId = 0;
					self.dateMerge();
					return;
				};
				const postData = {};
				postData.searchItem = {
					time: ['between', self.monthArray],
					sku_no: self.choosed_skuData.sku_no
				};
				const callback = (res) => {
					console.log(res);
					if (res.info.data.length > 0) {
						self.skuDateData = self.$Utils.cloneForm(res.info.data);
					} else {
						self.skuDateData = [];
					};
					self.$Utils.finishFunc('getSkuDateData')
					self.dateMerge();
				};
				self.$apis.SkuDateGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id: self.id
				};

				postData.getAfter = {
					sku: {
						tableName: 'Sku',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					},
					skuDateAll: {
						tableName: 'SkuDate',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1,
						}
					},
					skuDate: {
						tableName: 'SkuDate',
						middleKey: ['sku', 0, 'sku_no'],
						key: 'sku_no',
						condition: '=',
						searchItem: {
							status: 1,
							time: ['between', self.monthArray],
						}
					},
					productOne: {
						tableName: 'Product',
						middleKey: 'relation_one',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1,
						}
					},
					productTwo: {
						tableName: 'Product',
						middleKey: 'relation_two',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1,
						}
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {

						if (res.info.data[0].start_time < self.timestampNow && res.info.data[0].end_time > self.timestampNow && res.info
							.data[0].end_time - self.timestampNow < 24 * 60 * 60 * 1000) {
							res.info.data[0].timeCount = true;
							let time = (res.info.data[0].end_time - self.timestampNow) / 1000;
							// 获取天、时、分、秒
							//let day = parseInt(time / (60 * 60 * 24));
							res.info.data[0].hourCount = parseInt(time / (60 * 60));
							res.info.data[0].minCount = parseInt(time % (60 * 60) / 60);
							res.info.data[0].secCount = parseInt(time % 60);
							console.log('res.info.data[0].timeCount', res.info.data[0])
						};

						self.mainData = res.info.data[0];
						if (self.mainData.skuDateAll.length > 0) {
							self.skuType = 'skuDate';
						};
						if (self.mainData.latitude && self.mainData.longitude) {
							var finalG = self.bd09togcj02(self.mainData.longitude, self.mainData.latitude);
							self.mainData.longitude = finalG[0];
							self.mainData.latitude = finalG[1];
						};
						for (var key in self.mainData.label) {
							if (self.mainData.sku_array.indexOf(parseInt(key)) != -1) {
								self.skuLabelData.push(self.mainData.label[key])
							};
						};
						for (var i = 0; i < self.mainData.sku.length; i++) {
							if (i == 0) {
								self.choosed_skuData = self.$Utils.cloneForm(self.mainData.sku[0]);
								self.choosed_sku_id = self.mainData.sku[0].id;
								//self.choosed_sku_item = self.$Utils.cloneForm(self.mainData.sku[0].sku_item);
								//var skuRes = self.$Utils.skuChoose(self.mainData.sku, self.choosed_sku_item);
								//self.can_choose_sku_item = skuRes.can_choose_sku_item;
							};
							self.skuIdArray.push(self.mainData.sku[i].id); //为了抓所有Sku的评论
						};
						if (self.mainData.end_time < (new Date()).getTime()) {
							self.buyStatus = 'noStock'
						};
						if (self.mainData.onShelf == -1) {
							self.buyStatus = 'noStock'
						};
						if (self.skuType == 'sku' && self.choosed_skuData.stock <= 0) {
							self.buyStatus = 'noStock'
						};

						if (self.mainData.skuDate) {
							self.skuDateData = self.$Utils.cloneForm(self.mainData.skuDate);
							//判断哪一天有skuDate存在，把skuDate数据存到那一天的日历数据中	
						};
						/* self.getBase64Image(self.mainData.posterImg[0].url); */
						self.dateMerge();
						console.log('self.dateData', self.dateData)
					};
					self.wxJsSdk();
					self.computePrice();

				};
				self.$apis.productGet(postData, callback);
			},


			bd09togcj02(bd_lon, bd_lat) {
				var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
				var x = bd_lon - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
				var gg_lng = z * Math.cos(theta);
				var gg_lat = z * Math.sin(theta);
				return [gg_lng, gg_lat]
			},

			chooseSku(index) {
				const self = this;
				if (self.mainData.end_time < (new Date()).getTime()) {
					return;
				};
				if (self.mainData.onShelf == -1) {
					return;
				};
				if (self.choosed_sku_id == self.mainData.sku[index].id) {
					return;
				} else {
					self.choosed_sku_id = self.mainData.sku[index].id;
					self.choosed_skuData = self.mainData.sku[index];
					self.computePrice();
					if (self.skuType == 'skuDate') {
						self.refreshPageData(self.curYear, self.curMonth, 1);
						self.getSkuDateData();
					} else {
						if (self.choosed_skuData.stock > 0) {
							self.buyStatus = 'canBuy';
						} else {
							self.buyStatus = 'noStock';
						};
					};
				};


				/* if (self.can_choose_sku_item.indexOf(id) == -1) {
					return;
				};
				var index = self.choosed_sku_item.indexOf(id);
				if (index == -1) {
					self.choosed_sku_item.push(id);
					var skuResFirst = self.$Utils.skuChoose(self.mainData.sku, [id]);
					for (var i = 0; i < self.choosed_sku_item.length; i++) {
						if (skuResFirst.can_choosed_sku_item.indexOf(self.choosed_sku_item[i]) == -1) {
							self.choosed_sku_item.splice(i, 1);
						};
					};
				} else {
					self.choosed_sku_item.splice(index, 1);
				};
				var skuRes = self.$Utils.skuChoose(self.mainData.sku, self.choosed_sku_item);
				self.choosed_skuData = skuRes.choosed_skuData;
				self.can_choose_sku_item = skuRes.can_choose_sku_item;
				self.computePrice();
				if (self.mainData.type == 2) {
					self.refreshPageData(self.curYear, self.curMonth, 1);
					self.getSkuDateData();
				}; */
			},

			menuChange(num) {
				const self = this;
				document.documentElement.scrollTop = document.getElementById('country').offsetTop + 50;
				self.num = num;
			},

			goBuy() {
				const self = this;
				console.log('self.choosed_skuDateData', self.choosed_skuDateData)
				if (self.mainData.skuDateAll.length > 0) {
					if (!self.choosed_skuData.skuDate || JSON.stringify(self.choosed_skuData.skuDate) == '{}') {
						self.$Utils.showToast('请选择预约日期', 'none')
					} else {
						uni.navigateTo({
							url: '/pages/pay/pay?type=date' + '&skuDate_id=' + self.choosed_skuData.skuDate.id + '&title=' + self.choosed_skuData
								.title,
						});
					};
				} else if (self.mainData.skuDateAll.length == 0) {
					if (JSON.stringify(self.choosed_skuData) == '{}') {
						self.$Utils.showToast('商品信息错误', 'none')
					} else {
						uni.navigateTo({
							url: '/pages/pay/pay?type=sku' + '&sku_id=' + self.choosed_skuData.id + '&title=' + self.choosed_skuData.title + '&sku_no=' + self.choosed_skuData.sku_no,
						});
					};
				};
			}
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
