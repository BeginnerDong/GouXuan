<template>
	<view>
		<view class="index-top">
			<view class="logo ilblock">
				<img src="/static/images/home-img1.png" /><span>购选</span>
			</view>
			<view class="logo-right">
				<view class="logo-right-span ilblock" onclick="show()">陕西站</view>
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
				<view class="radionav-box ilblock">
					<view class="radionav-item" style="margin-left: 0px;">
						<a href="more.html">
							<img src="/static/images/home-icon.png" />
							<view class="color2">美食</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon1.png" />
							<view class="color2">亲子乐园</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon2.png" />
							<view class="color2">门票</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon3.png" />
							<view class="color2">生活服务</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon4.png" />
							<view class="color2">9块9专区</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon5.png" />
							<view class="color2">西安</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon6.png" />
							<view class="color2">咸阳</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon7.png" />
							<view class="color2">宝鸡</view>
						</a>
					</view>
					<view class="radionav-item">
						<a href="more.html">
							<img src="/static/images/home-icon8.png" />
							<view class="color2">渭南</view>
						</a>
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
					<view class="recommend-box" style="width: 84px;">
						<view class="color2">省内酒店</view>
						<view class="color1">省内精选</view>
					</view>
					<view class="recommend-box" style="width: 90px;">
						<view class="color2">全国酒店</view>
						<view class="color1">全国精选</view>
					</view>
					<view class="recommend-box" style="width: 106px;">
						<view class="color2">长隆度假区</view>
						<view class="color1">长隆</view>
					</view>
					<view class="recommend-box" style="width: 80px;">
						<view class="color2">港澳酒店</view>
						<view class="color1">动感之都</view>
					</view>
				</view>
				<view class="recommend-middle">
					<view class="recommend-box" style="width: 120px;">
						<view class="color2">全球购</view>
						<view class="color1">全球热卖好货</view>
					</view>
					<view class="recommend-box" style="width: 120px;">
						<view class="color2">果蔬百货</view>
						<view class="color1">果蔬百货</view>
					</view>
					<view class="recommend-box" style="width: 120px;">
						<view class="color2">一日游</view>
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
				<view class="color1 ilblock besttext"><a class="color1" style="width: 100%; height: 100%;font-size:14px" href="more.html">
						查看更多</a></view>
			</view>
			<view class="best-box ilblock" style="margin-left: 15px;">
				<view class="best-box-top">
					<img src="/static/images/home-img2.png" />
					<view class="best-num ilblock">
						已售1235
					</view>
				</view>
				<view class="best-text">
					[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
				</view>
				<view style="margin-left: 15px;">
					<view class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></view>
					<view class="ilblock best-money1">
						<span class="span1">店反</span>
						<span class="span2">￥23</span>
					</view>
					<view class="ilblock best-money2">
						<span class="span1">团反</span>
						<span class="span2">￥23</span>
					</view>
				</view>
			</view>

			<view class="best-box ilblock" style="margin-left: 15px;">
				<view class="best-box-top">
					<img src="/static/images/home-img2.png" />
					<view class="best-num ilblock">
						已售1235
					</view>
				</view>
				<view class="best-text">
					[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
				</view>
				<view style="margin-left: 15px;">
					<view class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></view>
					<view class="ilblock best-money1">
						<span class="span1">店反</span>
						<span class="span2">￥23</span>
					</view>
					<view class="ilblock best-money2">
						<span class="span1">团反</span>
						<span class="span2">￥23</span>
					</view>
				</view>
			</view>

			<view style="width: 100%; height: 15px;"></view>
		</view>
		<view style="width: 100%; height: 10px;"></view>
		<view style="width: 100%; background: #F8F8F8; overflow: hidden; margin-bottom: 50px;">
			<view class="best-top">
				<view class="color2 ilblock" style="margin-left: 15px;font-size:14px">全部商品</view>
				<view class="color1 ilblock besttext" style="font-size:14px">查看更多</view>
			</view>
			<view class="all-store" v-for="item in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
				<view class="all-store-img ilblock">
					<img src="/static/images/home-img3.png" />
					<view class="store-num ilblock" v-if="item.start_time>now">
						已售{{item.false_sale_count }}
					</view>
				</view>
				<view class="best-botred ilblock" v-if="item.start_time<now">【即将开售】</view>
				<view class="ilblock color2 all-store-text">
					[{{item.city}}]{{item.title}}
				</view>
				<view class="ilblock" style="margin-left: 15px; float: right; clear: both;margin-top: -40px;">
					<view class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">{{item.price}}</span></view>
					<view class="ilblock best-money1" style="left: -10px;" v-if="item.skuDate.length==0">
						<span class="span1">店反</span>
						<span class="span2">￥{{item.shop_reward}}</span>
					</view>
					<view class="ilblock best-money2" style="left: -10px;" v-if="item.skuDate.length==0">
						<span class="span1">团反</span>
						<span class="span2">￥{{item.group_reward}}</span>
					</view>
					<view class="ilblock best-topred" style="left: -10px;" v-if="item.skuDate.length>0">
						返佣具体以日期为准
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 15px; background: #F8F8F8;"></view>
			<view class="zhan" style="display: none;">
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
			<ul>
				<li>
					<view class="navbar-img"><img src="/static/images/navbar1-a.png" /></view>
					<view style="color: #FC7C5D;">首页</view>
				</li>
				<li @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow/follow'}})">
					<view class="navbar-img"><img src="/static/images/navbar2.png" /> </view>
					<view>关注</view>
				</li>
				<li @click="webSelf.$Router.navigateTo({route:{path:'/pages/user/user'}})">
					<view class="navbar-img"><img src="/static/images/navbar3.png" /></view>
					<view>我的</view>
				</li>
			</ul>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {

				mainData: [],
				webSelf: this,
				now:'',
			}
		},
		onLoad(options) {
			console.log(this.$Router)
			const self = this;
			self.now = Date.parse(new Date());
			self.$Utils.loadAll(['getMainData', 'tokenGet'], self)
				
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

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
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




			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '首页轮播',
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.swiperData = res.info.data[0]['mainImg'];
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
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
