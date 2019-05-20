<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="images/home-icon14.png" />
			</span>
			吃喝玩乐推荐
		</div>
		<div class="index-top">
			<div class="logo ilblock">
				<img src="images/home-img1.png" /><span>购选</span>
			</div>
			<div class="logo-right">
				<div class="logo-right-span ilblock">陕西站</div>
				<span>
					<img src="images/home-icon13.png" />
				</span>
			</div>
		</div>
		<div class="best-box ilblock" style="margin-left: 15px;">
			<div class="best-box-top">
				<img src="images/home-img2.png"/>
				<div class="best-num ilblock">
					已售1235
				</div>
			</div>
			<div class="best-text">
				[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></div>
				<div class="ilblock best-money1" >
					<span class="span1">店反</span>
					<span class="span2">￥23</span>
				</div>	
				<div class="ilblock best-money2" >
					<span class="span1">团反</span>
					<span class="span2">￥23</span>
				</div>	
			</div>
		</div>
		
		<div class="best-box ilblock" style="margin-left: 15px;">
			<div class="best-box-top">
				<img src="images/home-img2.png"/>
				<div class="best-num ilblock">
					已售1235
				</div>
				<div class="best-time">
					距结束仅剩 <span>0 0</span> 天 <span>1 3</span> : <span>3 4</span> : <span>3 0</span>
				</div>
			</div>
			<div class="best-text">
				[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></div>
				<div class="ilblock best-money1" >
					<span class="span1">店反</span>
					<span class="span2">￥23</span>
				</div>	
				<div class="ilblock best-money2" >
					<span class="span1">团反</span>
					<span class="span2">￥23</span>
				</div>	
			</div>
		</div>
		<div class="best-box ilblock" style="margin-left: 15px;">
			<div class="best-box-top">
				<img src="images/home-img2.png"/>
				<div class="best-num ilblock">
					已售1235
				</div>
				<div class="best-time best-time2">
					【即将开售】
				</div>
			</div>
			<div class="best-text">
				[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></div>
				<div class="ilblock best-money1" >
					<span class="span1">店反</span>
					<span class="span2">￥23</span>
				</div>	
				<div class="ilblock best-money2" >
					<span class="span1">团反</span>
					<span class="span2">￥23</span>
				</div>	
			</div>
		</div>
		<div class="best-box ilblock" style="margin-left: 15px;">
			<div class="best-box-top">
				<img src="images/home-img2.png"/>
				<div class="best-num ilblock">
					已售1235
				</div>
			</div>
			<div class="best-text">
				[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></div>
				<div class="ilblock best-moneyleft" >
					返佣具体以日期为准
				</div>	
			</div>
		</div>
		
		
		<div style="width: 100%; height: 65px;"></div>
		<div class="navbar-brand">
			<ul>
				<li><a href="index.html">
				<div class="navbar-img"><img src="images/navbar1-a.png"/></div>
				<div style="color: rgb(153,153,153);">首页</div>
				</a></li>
				<li><a href="follow.html">
				<div class="navbar-img"><img src="images/navbar2.png" /> </div>
				<div>关注</div>
				</a></li>
				<li><a href="user.html">
				<div class="navbar-img"><img src="images/navbar3.png" /></div>
				<div>我的</div>
				</a></li>
			</ul>
		</div>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
			

			}
		},
		onLoad(options) {
			const self = this;
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */

		},
		methods: {
			test($event) {
				var testres = this.getCaseData()
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['推荐阅读']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						if (self.mainData.length > 2) {
							self.mainData = self.mainData.slice(0, 2)
						}
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getLabelData(isNew) {
				var self = this;
				if (isNew) {
					self.$Utils.clearPageIndex(self)
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 1,
					thirdapp_id: 21,
					parentid: 2
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data)
					}
					for (var i = 0; i < res.info.data.length; i++) {
						self.menu_array.push(res.info.data[i].id)
					};
					self.$Utils.finishFunc('getLabelData');
					//self.getCaseData();
				};
				console.log('self.$apis', self.$apis)
				self.$apis.labelGet(postData, callback);
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
			getCaseData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: getApp().globalData.solely_thirdapp_id
				}
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							parentid: ['in', [146]]
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				var callback = (res) => {
					console.log('self.caseData.res', res);
					if (res.info.data.length > 0) {
						self.caseData.push.apply(self.caseData, res.info.data)
						if (res.info.data.length > 4) {
							self.caseData = self.caseData.slice(0, 4)
						}
					};
					self.$Utils.finishFunc('getCaseData');
				};


				self.$apis.articleGet(postData, callback);
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
