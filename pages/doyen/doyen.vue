<template>
	<view>
		<div class="top" style="overflow: hidden;">
			<div class="top-img ilblock">
				<img src="../../static/images/达人/Talent-show-img.png" width="61px" />
			</div>
			<div class="ilblock" style="width:180px;height: 100%;margin-left: 100px;">
				<div class="top-name color5 font15" style="margin-top: 20px;">购选</div>
				<div class="top-id color5 font13 " style="line-height: 30px">ID:29948955</div>
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/register/register?parent_no='+user_no}})">分享达人</div>
				<a href="regular.html">
					<div class="ilblock color5 font14" style="margin-left: 10px;width: 80px; 
					background: url(../../static/images/jiantouyou.png) no-repeat 65px center;
					background-size: 9%;
				">
						升级规则</div>
				</a>
			</div>
			<div class="ilblock flo-right" style="width: 90px;height: 100%; ">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/install/install'}})">
					<img src="../../static/images/达人/icon.png" style="width: 16px;margin-left: 62px;margin-top: 10px; " />
				</div>
				<div class="radiu20 font13" style="background: #FCB192;width:80px;height: 23px; text-align: center; 
					line-height: 23px; position: relative; top: 50px;left: 20px; "
				 @click="webSelf.$Router.navigateTo({route:{path:'/pages/course/course'}})">
					<div class="color5">使用教程</div>
				</div>
			</div>
		</div>
		<div class="bg1" style="padding: 26px 15px;">
			<div class="ilblock" style="height: 30px; widows: 100px;"></div>
			<div class="flo-right" style="width: 260px; height: 30px;">
				<div class="color2 ilblock font20 " style="height: 40px;width: 35px;background: url(../../static/images/达人/icon0.png) no-repeat;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative; top: 10px;
				 ">{{monthShopCount}}</div>
			</div>
			<div style="width: 100%; height: 30px;line-height: 30px;margin-bottom: 15px; ">
				<div class="color2 ilblock">近30店返</div>
				<div class="ilblock radiu20 flo-right" style=" margin-top: 10px; background:rgb(226,226,226);width: 20px;height: 10px;" ></div>
			</div>

			<div class="ilblock" style="height: 30px; widows: 100px;"></div>
			<div class="flo-right" style="width: 260px; height: 30px;">
				<div class="color2 ilblock font20 " style="height: 40px;width: 35px;background: url(../../static/images/达人/icon0.png) no-repeat;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative;top: 10px;
				 ">{{monthGroupCount}}</div>
			</div>
			<div style="width: 100%; height: 30px;line-height: 30px;">
				<div class="color2 ilblock">近30天团返</div>
				<div class="ilblock radiu20 flo-right" style=" margin-top: 10px; background:rgb(226,226,226);width: 243px;height: 10px;" :style="'width:'+monthGroupCountWidth+'px'"></div>
			</div>
			<div style="width: 100%; margin-top: 30px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人店返
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{shopCount}}</div>
			</div>
			<div style="width: 100%; margin-top: 10px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人粉丝总人数
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{distriDataLength}}</div>
			</div>
		</div>
		<div class="bg1" style="margin-top: 10px;width: 100%;">
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/return-first/return-first'}})">
				<div class="flo-left color2 font14" style="background: #fff;height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 50%;">达人返佣记录</div>
					<div class="ilblock color1 font14 flo-right list" style="width: 40%; background: url(../../static/images/home-icon9.png) no-repeat 85% center;
					 background-size: 4%;
					 ">{{totalCount}}总返佣</div>
				</div>
			</div>
			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/order/order'}})" class="color2">
				<div class="flo-left color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;background: #fff;">
					<div class="ilblock color2 font14" style="width:50%;">达人订单记录</div>
					<div class="ilblock color1 font14 flo-right list" style="width:40%; background: url(../../static/images/home-icon9.png) no-repeat 85% center;
					 background-size:4%;
					 ">共{{orderTotal}}单</div>
				</div>
			</div>
		</div>
		<div class="bg1" >
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/code-all/code-all'}})">
				<div class="flo-left color2 font14" style="background: #fff;height: 52px;width: 100%; line-height: 52px;text-indent: 15px;margin-top: 10px; margin-bottom: 70px">
					<div class="ilblock color2 font14" style="width:50%;">达人海报</div>
					<div class="ilblock color1 font14 flo-right list" style="width:40%; background: url(../../static/images/home-icon9.png) no-repeat 85% center;
					 background-size: 4%;">
						<div class="ilblock red"></div>
						查看所有
					</div>
				</div>
			</div>
		</div>



		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show1-a.png"></image>
					</view>
					<view  class="color8">达人</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/team/team'}})">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show2.png"></image>
					</view>
					<view>达人团队</view>
				</view>
				<view class="navbar-item ilblock"  @click="webSelf.$Router.redirectTo({route:{path:'/pages/return/return'}})">
					<view class="navbar-img">
						<image src="../../static/images/达人/Talent%20show3.png"></image>
					</view>
					<view>返佣</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				mainData: [],
				type: 2,
				totalCount: '0.00',
				shopCount:'0.00',
				monthShopCount:'0.00',
				monthShopCountWidth:20,
				monthGroupCount:'0.00',
				monthGroupCountWidth:20,
				distriData: [],
				distriDataLength:0,
				searchItem: {
					type: 2
				},
				orderData: [],
				orderTotal:0,
				user_no:''
			}
		},
		onLoad(options) {
			const self = this;
			self.user_no = uni.getStorageSync('user_info').user_no
			self.$Utils.loadAll(['getMonthGroupCount','getMonthShopCount','getShopCount','getTotalCount','getDistriDataLength','getOrderData'], self)
		},

		methods: {

			getMonthGroupCount() {
				const self = this;
				var now = Date.parse(new Date()) / 1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type:2,
					create_time:['between',[now-86400*30,now]]
				};
				postData.compute = {
				  GroupCount:[
					'sum',
					'count',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now',res)
						self.monthGroupCount = res.info.compute.GroupCount;
						if(self.monthGroupCount>100){
							self.monthGroupCountWidth += self.monthGroupCount/100;
						};
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMonthGroupCount');
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
			getMonthShopCount() {
				const self = this;
				var now = Date.parse(new Date()) / 1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type:2,
					create_time:['between',[now-86400*30,now]]
				};
				postData.compute = {
				  ShopCount:[
					'sum',
					'count',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now',res)
						self.monthShopCount = res.info.compute.ShopCount;
						if(self.monthShopCount>100){
							self.monthShopCountWidth += self.monthGroupCount/100;
						};
						
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMonthShopCount');
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
			
			getShopCount() {
				const self = this;
				var now = Date.parse(new Date()) / 1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type:2,
				};
				postData.compute = {
				  ShopCount:[
					'sum',
					'count',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now',res)
						self.shopCount = res.info.compute.ShopCount
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getShopCount');
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
			
			getTotalCount() {
				const self = this;
				var now = Date.parse(new Date()) / 1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type:['in',[1,2]],
				};
				postData.compute = {
				  TotalCount:[
					'sum',
					'count',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						console.log('now',res)
						self.totalCount = res.info.compute.TotalCount
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getTotalCount');
				};
				self.$apis.flowLogGet(postData, callback);
			},

			getDistriDataLength() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					parent_no: uni.getStorageSync('user_no'),
					type: 2
				};
				postData.compute = {
				  DistriDataLength:[
					'sum',
					'status',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.distriDataLength = res.info.compute.TotalCount
						};

					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getDistriDataLength');
				};
				self.$apis.distriGet(postData, callback);
			},

			getOrderData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.compute = {
				  OrderTotal:[
					'sum',
					'status',
				  ],
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.orderTotal = res.info.compute.OrderTotal
						};
					};
					self.$Utils.finishFunc('getOrderData');
				};
				self.$apis.orderGet(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/doyen.css";
	@import "../../assets/style/basic.css";
</style>
