<template>
	<view>
		<view class="index-top">
			<view class="logo ilblock">
				<img src="/static/images/home-img1.png" /><span>购选</span>
			</view>
			<view class="logo-right">
				<view class="logo-right-span ilblock" @click="showCity">{{currentSiteData.title}}</view>
				<span>
					<img src="/static/images/home-icon13.png" />
				</span>
			</view>
		</view>
		<view style="width: 100%;background: #F8F8F8;">
			<view class="commodity">
				<img src="/static/images/home-banner.png" />
			</view>
			<view class="radionav">
				<view class="radionav-box ilblock" style="width:100%">
					<view class="radionav-item" style="margin-left: 0px;" v-for="(item,index) in labelData" v-if="index<5" :data-id="item.id"
					 @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id='+$event.currentTarget.dataset.id}})">
						<view>
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
							<view class="color2">{{item.title}}</view>
						</view>
					</view>

					<view class="radionav-item" v-for="(item,index) in cityData" v-if="index<5" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?city_id='+$event.currentTarget.dataset.id}})">
						<view>
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
							<view class="color2">{{item.title}}</view>
						</view>
					</view>

				</view>
			</view>
			<view class="recommend">
				<view class="recommend-top">
					<span>更多推荐</span>
					<img src="/static/images/home-icon11.png" style="margin-left: 50px;" />
					<img src="/static/images/home-icon12.png" style="margin-left: 140px;" />
				</view>
				<view class="recommend-middle">
					<view class="recommend-box" style="width: 84px;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=22'}})">
						<view class="color2" style="font-weight: bold;">省内酒店</view>
						<view class="color1">省内精选</view>
					</view>
					<view class="recommend-box" style="width: 90px;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=22&noSite=true'}})">
						<view class="color2" style="font-weight: bold;">全国酒店</view>
						<view class="color1">全国精选</view>
					</view>
					<view class="recommend-box" style="width: 106px;">
						<view class="color2" style="font-weight: bold;">长隆度假区</view>
						<view class="color1">长隆</view>
					</view>
					<view class="recommend-box" style="width: 80px;">
						<view class="color2" style="font-weight: bold;">港澳酒店</view>
						<view class="color1">动感之都</view>
					</view>
				</view>
				<view class="recommend-middle">
					<view class="recommend-box" style="width: 120px;">
						<view class="color2" style="font-weight: bold;">全球购</view>
						<view class="color1">全球热卖好货</view>
					</view>
					<view class="recommend-box" style="width: 120px;">
						<view class="color2" style="font-weight: bold;">果蔬百货</view>
						<view class="color1">果蔬百货</view>
					</view>
					<view class="recommend-box" style="width: 120px;">
						<view class="color2" style="font-weight: bold;">一日游</view>
						<view class="color1">周边精选</view>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 15px;"></view>
		</view>
		<view style="width: 100%; height: 10px;"></view>
		<view style="width: 100%; background: #F8F8F8; overflow: hidden; 
		overflow: hidden;white-space: nowrap;">
			<view class="best-top">
				<view class="color2 ilblock" style="margin-left: 15px;font-size:14px">最火热买</view>
				<view class="color1 ilblock besttext" style="font-size:14px"
				@click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?order=sale_count'}})">
				查看更多</view>
			</view>
			<scroll-view scroll-x="true">
				<view class="best-box ilblock" style="margin-left: 15px;" v-for="item in hotData">
					<view class="best-box-top">
						<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
						<view class="best-num ilblock">
							已售{{item.false_sale_count }}
						</view>
					</view>
					<view class="best-text">
						[西安.牛脊梁]{{item.title}}
					</view>
					<view style="margint: 0 4%;">
						<view class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">{{item.price}}</span></view>
						<div class="ilblock best-money1">
							<view class="span1 ilblock bg3">店反</view>
							<view class="span2 ilblock color8">￥{{item.shop_reward}}</view>
						</div>
						<div class="ilblock best-money2">
							<view class="span1 ilblock bg4">团反</view>
							<view class="span2 ilblock color9">￥{{item.group_reward}}</view>
						</div>
					</view>
				</view>
			</scroll-view>
			<view style="width: 100%; height: 15px;"></view>
		</view>
		<view style="width: 100%; height: 10px;"></view>
		<view style="width: 100%; background: #F8F8F8; overflow: hidden; margin-bottom: 50px;">
			<view class="best-top">
				<view class="color2 ilblock" style="margin-left: 15px;font-size:14px">全部商品</view>
				<view class="color1 ilblock besttext" style="font-size:14px" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more'}})">查看更多</view>
			</view>
			<view class="all-store" v-for="item in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
				<view class="all-store-img ilblock">
					<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
					<view class="store-num ilblock">
						已售{{item.false_sale_count }}
					</view>
				</view>
				<view class=" ilblock" style="width: 67%;position: absolute; top: 0px;right: 0px;">
					<!-- <view class="best-botred" v-if="item.start_time<now">【即将开售】</view> -->
					<view class="color1 font12 time" v-if="item.start_time<now">距结束仅剩
						<view class="bg3">00</view>天<view class="bg3">13</view>:<view class="bg3">34</view>:<view class="bg3">30</view>
					</view>
					<view class="ilblock color2 all-store-text">
						[{{item.city}}]{{item.title}}
					</view>
					<view class="ilblock" style="padding: 0px 5px;width: 100%;">
						<view class="ilblock" style="font-size: 12px; color: rgb(249,138,72);margin-bottom: 10pz;">￥<span style="font-size: 20px;">{{item.price}}</span></view>

						<view class="ilblock" style="flex-wrap: nowrap;width: 64%;">
							<div class="ilblock best-money1" style="width:42%;" v-if="item.skuDate.length==0">
								<view class="span1 ilblock bg3">店反</view>
								<view class="span2 ilblock color8">￥{{item.shop_reward}}</view>
							</div>
							<div class="ilblock best-money2" style=" width:42%;" v-if="item.skuDate.length==0">
								<view class="span1 ilblock bg4">团反</view>
								<view class="span2 ilblock color9">￥{{item.group_reward}}</view>
							</div>
						</view>

						<view class="ilblock best-topred" style="position: absolute; bottom: 5px; left: 32%;" v-if="item.skuDate.length>0">
							返佣具体以日期为准
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 15px; background: #F8F8F8;"></view>
			<view class="zhan" v-if="show_city">
				<view class="zhan-item ilblock" v-for="item in siteData" :style="item.id==currentSiteData.id?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':''"
				 @click="changeSite(item.id)">
					{{item.title}}
				</view>
				<view style="width: 100%; height: 20px;"></view>
			</view>
		</view>
		
		<view style="position: fixed; top: 0px; z-index: 50;display: none;">

			<view style="width: 100%; height: 200px; background: rgba(0,0,0,0.5);"></view>
			<view class="bg1" style="width: 100%; padding: 15px;">
				<view class="color1 font13 flo-right">跳过</view>
				<view class="color2" style="text-align: center; line-height: 50px;">选择感兴趣的内容(2/2)</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					黑龙江站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
				<view class="zhan-item ilblock">
					辽宁站
				</view>
			</view>
			<view class="bg1" style="width: 100%; height: 100px;">
				<button class="color5 radiu20" type="button" style="width: 90%; height: 40px; margin: 0px auto; background: #F67550;">确定</button>
			</view>
		</view>

		<view style="width: 100%; height: 20px;"></view>
		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="/static/images/navbar1-a.png"></image>
					</view>
					<view class="color8">首页</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/follow/follow'}})">
					<view class="navbar-img">
						<image src="/static/images/navbar2.png"></image>
					</view>
					<view>关注</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/user/user'}})">
					<view class="navbar-img">
						<image src="/static/images/navbar3.png"></image>
					</view>
					<view>我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				siteDataId: [],
				hotData:[],
				siteData: [],
				mainData: [],
				labelData: [],
				cityData: [],
				currentSiteData: [],
				swiperData: [],
				webSelf: this,
				now: '',
				show_city: false
			}
		},
		onLoad() {
			console.log(this.$Router)
			const self = this;
			var options = self.$Utils.getHashParameters();
			console.log('options', options)
			/* 	if(options.site_id){
					self.site_id = options.site_id
				}; */
			self.now = Date.parse(new Date());
			self.$Utils.loadAll(['getMainData', 'getSiteData', 'getSliderData', 'tokenGet', 'getLabelData','getHotData'], self)

		},
		methods: {

			tokenGet() {
				const self = this;
				const postData = {
					searchItem: {
						user_no: 'U123456'
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('user_token', res.token);
						uni.setStorageSync('user_no', res.info.user_no);
						uni.setStorageSync('user_info', res.info);
					}
					console.log('res', res)
					self.$Utils.finishFunc('tokenGet');
				};
				self.$apis.tokenGet(postData, callback);
			},

			changeSite(site_id) {
				const self = this;
				for (var i = 0; i < self.siteData.length; i++) {
					if (site_id == self.siteData[i].id) {
						uni.setStorageSync('siteData', self.siteData[i]);
						self.currentSiteData = uni.getStorageSync('siteData');
					}
				};
				self.show_city = false;
				self.$Utils.loadAll(['getMainData', 'getCityData','getHotData'], self)
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
				};
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
				postData.order ={
					listorder:'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			getHotData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
				};
				postData.order = {
					false_sale_count:'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.hotData.push.apply(self.hotData, res.info.data);
					};
					console.log('self.hotData', self.hotData)
					self.$Utils.finishFunc('getHotData');
				};
				self.$apis.productGet(postData, callback);
			},


			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					city: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['商品类别']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					listorder: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data);
					};
					console.log('self.labelData', self.labelData)
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},


			getSiteData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type:9
				};
				postData.order = {
					listorder: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.siteData.push.apply(self.siteData, res.info.data);
						for (var i = 0; i < self.siteData.length; i++) {
							self.siteDataId.push(self.siteData[i].id)
						};
						if (self.site_id) {
							for (var i = 0; i < self.siteData.length; i++) {
								if (self.site_id == self.siteData[i].id) {
									uni.setStorageSync('siteData', self.siteData[i]);
									self.currentSiteData = uni.getStorageSync('siteData');
								}
							}
						} else {
							uni.setStorageSync('siteData', self.siteData[0]);
							self.currentSiteData = uni.getStorageSync('siteData');
						}
						self.getCityData()
					};
					console.log('self.siteData', self.siteData)

				};
				self.$apis.labelGet(postData, callback);
			},

			getCityData() {
				const self = this;
				const postData = {};
				self.cityData = [];
				postData.searchItem = {
					parentid: self.currentSiteData.id,
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.order = {
					listorder: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.cityData.push.apply(self.cityData, res.info.data);
					};
					console.log('self.cityData', self.cityData)
					self.$Utils.finishFunc('getSiteData');
					self.$Utils.finishFunc('getCityData');
				};
				self.$apis.labelGet(postData, callback);
			},

			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					city: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['城市分站']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.swiperData.push.apply(self.swiperData);
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
			},

			showCity() {
				const self = this;
				self.show_city = !self.show_city
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
