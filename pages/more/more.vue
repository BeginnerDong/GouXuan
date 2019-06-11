<template>
	<view>

		<!--<div class="index-top">
			<div class="logo ilblock">
				<img src="../../static/images/home-img1.png" /><span>购选</span>
			</div>
			<div class="logo-right">
				<div class="logo-right-span ilblock">陕西站</div>
				<span>
					<img src="../../static/images/home-icon13.png" />
				</span>
			</div>
		</div>-->
		<div class="best-box ilblock" style="margin-left: 15px;height: auto;" v-for="(item,index) in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
			<div class="best-box-top">
				<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
				<div class="best-num ilblock">
					已售{{item.false_sale_count}}
				</div>
				<div class="best-time" v-if="item.timeCount" style="line-height: 18px;padding-top: 5px;">
					距结束仅剩  <span style="width: 24px;height: 20px;display: inline-block;padding: 0;">{{item.hourCount}}</span> 
					小时: <span style="width: 24px;height: 20px;display: inline-block;padding: 0;">{{item.minCount}}</span>
					分钟: <span style="width: 24px;height: 20px;display: inline-block;padding: 0;">{{item.secCount}}</span>
				</div>
				
			</div>
			<div class="best-text">
				{{item.title}}
			</div>
			
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">{{item.price}}</span></div>
				<div class="ilblock best-moneyleft" v-if="item.skuDate.length>0&&userData.primary_scope>10">
					返佣具体以日期为准
				</div>
				
				<view class="ilblock" style="margint: 0 5%;width: 77%;" v-if="item.skuDate.length==0&&userData.primary_scope>10">
					<div class="ilblock best-money1">
						<view class="span1 ilblock bg3">店返</view>
						<view class="span2 ilblock color8">￥{{item.shop_reward}}</view>
					</div>
					<div class="ilblock best-money2">
						<view class="span1 ilblock bg4">团返</view>
						<view class="span2 ilblock" style="color: #F14667;">￥{{item.group_reward}}</view>
					</div>
				</view>
			</div>
		</div>





		<div style="width: 100%; height: 65px;"></div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf:this,
				endTimeList: [],
				countDownList:[],
				mainData: [],
				userData:{},
				searchItem: {
					thirdapp_id: 2,
					province_id: uni.getStorageSync('siteData').id,
					onShelf:1
				},
				order: {
					listorder: 'desc'
				},
				now:'',
				isLoadAll:false,
				primary_scope:''
			}
		},
		onLoad(options){
			const self = this;
			console.log(options)
			self.timestampNow = (new Date()).getTime();
			console.log('onLoad',self.timestampNow);
			self.primary_scope  = uni.getStorageSync('user_info').primary_scope;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			var optionsTwo = self.$Utils.getHashParameters();
			if (optionsTwo[0].category_id) {
				self.searchItem.category_id = optionsTwo[0].category_id
			};
			if (optionsTwo[0].city_id) {
				self.searchItem.city_id = optionsTwo[0].city_id
			};
			if (options.title) {
				self.searchItem.title = ['LIKE', ['%' + options.title + '%']]
			};
			if (optionsTwo[0].noSite && optionsTwo[0].noSite == 'true') {
				delete self.searchItem.province_id
			};
			if (optionsTwo[0].order && optionsTwo[0].order == 'sale_count') {
				self.order = {
					false_sale_count: 'desc'
				}
			};
			self.$Utils.loadAll(['getMainData','getUserData'], self);

		},
		onShow() {
			const self = this;
			console.log('onShow',self.timestampNow)
			self.countDown();
		},
		
		onReachBottom() {
		
			const self = this;
			if (!self.isLoadAll&&uni.getStorageSync('canClick')) {
				console.log('11',self.paginate.currentPage);
				self.paginate.currentPage++;
				console.log('22',self.paginate.currentPage);
				self.getMainData()
			};
		},
		
		onHide () {
			const self = this;
			console.log('onHide',self.timeInterval)
		    clearTimeout(self.timeInterval);  
		},
		onUnload () {
			const self = this;
			console.log('unLoad')
		    clearTimeout(self.timeInterval);  
		},
		onBackPress() {
			const self = this;
			console.log('onBackPress')
		    clearTimeout(self.timeInterval);  
		},


		methods: {
			
			getUserData() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000&&res.info.data[0]) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserData');
					
				};
				self.$apis.userGet(postData, callback);
			},
			
			
			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.mainData = [];
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.order = self.$Utils.cloneForm(self.order);
				postData.getAfter = {
					skuDate: {
						tableName: 'SkuDate',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					self.$Utils.finishFunc('getMainData');
					if (res.info.data.length > 0) {
						
						for (var i = 0; i < res.info.data.length; i++) {
							if(res.info.data[i].start_time<self.timestampNow&&res.info.data[i].end_time>self.timestampNow&&res.info.data[i].end_time-self.timestampNow<24*60*60*1000){
								res.info.data[i].timeCount = true;
								let time = (res.info.data[i].end_time - self.timestampNow) / 1000;
								// 获取天、时、分、秒
								//let day = parseInt(time / (60 * 60 * 24));
								res.info.data[i].hourCount = parseInt(time/(60 * 60));
								res.info.data[i].minCount = parseInt(time % (60 * 60)/60);
								res.info.data[i].secCount = parseInt(time % 60 );
								console.log('res.info.data[i].timeCount',res.info.data[i])	
							};
						};
						self.mainData.push.apply(self.mainData, res.info.data);
						console.log('self.mainData',self.mainData)
						self.$Utils.finishFunc('getMainData');
					}else{
						self.isLoadAll = true;
						self.$Utils.finishFunc('getMainData');
						uni.showToast({
						    title: '没有更多了',
						    icon: 'fail',
						    duration: 2000,
						    mask:true
						});
					};
					console.log('self.mainData', self.mainData)
				};
				self.$apis.productGet(postData, callback);
			},

			

			countDown() { //倒计时函数
				// 获取当前时间，同时得到活动结束时间数组
				const self = this;
				self.countDownList = [];
				let newTime = Date.parse(new Date());
				let time = (newTime - self.timestampNow) / 1000;
				// 获取天、时、分、秒
				let hou = parseInt(time/(60 * 60));
				let min = parseInt(time % (60 * 60)/60);
				let sec = parseInt(time % 60 );
				for (var i = 0; i < self.mainData.length; i++) {
					if(self.mainData[i].timeCount){
						self.mainData[i].secCount = self.mainData[i].secCount-sec;
						self.mainData[i].minCount = self.mainData[i].minCount-min;
						self.mainData[i].hourCount = self.mainData[i].hourCount-hou;
						if(self.mainData[i].secCount<0){
							self.mainData[i].secCount = self.mainData[i].secCount+60;
							self.mainData[i].minCount = self.mainData[i].minCount-1;
						};
						if(self.mainData[i].minCount<0){
							self.mainData[i].minCount = self.mainData[i].minCount+60;
							self.mainData[i].hourCount = self.mainData[i].hourCount-1;
						};
						if(self.mainData[i].hourCount<0){
							self.mainData[i].hourCount = 0;
							self.mainData[i].timeCount = true;
						};
					};
				};	
				self.timestampNow = newTime;
				
				self.timeInterval = setTimeout(function(){
					self.countDown()
				},1000)
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/more.css";
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
