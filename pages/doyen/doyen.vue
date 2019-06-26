<template>
	<view>
		<div class="top" style="overflow: hidden;">
			<div class="top-img ilblock">
				<img :src="userData.headImgUrl" style="width: 60px;heigh:60px;border-radius:50%;" />
			</div>
			<div class="ilblock" style="width:180px;height: 100%;margin-left: 100px;">
				<div class="top-name color5 font15" style="margin-top: 20px;">{{userData.nickName}}</div>
				<!--<div class="top-id color5 font13 " style="line-height: 30px">ID:{{userData.user_no}}</div>-->
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;" v-if="userData.info&&userData.info.level==1">
					会员
				</div>
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;" v-if="userData.info&&userData.info.level==2">
					超级会员
				</div>
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;" v-if="userData.info&&userData.info.level==3">
					导师
				</div>
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;" v-if="userData.info&&userData.info.level==4">
					超级总监
				</div>
				<div class="ilblock color5 font14" @click="webSelf.$Router.navigateTo({route:{path:'/pages/regular/regular'}})">
					<div class="ilblock color5 font14" style="margin-left: 10px;width: 80px; 
					background: url(../../static/images/jiantouyou.png) no-repeat 65px center;
					background-size: 9%;
				">
						升级规则</div>
				</div>
			</div>
			<div class="ilblock flo-right" style="width: 90px;height: 100%; ">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/install/install'}})">
					<img src="../../static/images/icon.png" style="width: 16px;margin-left: 62px;margin-top: 10px; " />
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
			<!-- <div class="flo-right" style="width: 260px; height: 30px;">
				<div class="color2 ilblock font20 jt_bg" style="height: 25px;width: 35px;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative; top: 10px;left: 0%;color: #fff;
				 ">{{monthShopCount}}</div>
			</div> -->
			<div style="width: 100%; height: 30px;line-height: 30px;margin-bottom: 15px; ">
				<div class="color2 ilblock" style="width: 27%;">近30天店返</div>
				<div calss="ilblock txt_bg_p0" style="background:rgb(226,226,226);height: 10px;display: inline-block;margin-left: 4px;position: relative;width: 71%;border-radius:4px ;">
					<div class="color2 ilblock font20 jt_bg" style="height: 21px;width: 46px;border-radius: 15%;
					 background-size: 100%;text-align: center; line-height: 20px;position: absolute; top: -25px;left: -10px;color: #fff;
					 ">{{monthShopCount}}</div>
					<div class="ilblock radiu20 " style="background:rgb(255,133,78);height: 10px;position: absolute;top:0;left: 0;" :style="'width:'+monthShopCountWidth+'px'"></div>
					</div>
			</div>

			<div class="ilblock" style="height: 30px; widows: 100px;"></div>
			<!-- <div class="flo-right" style="width: 260px; height: 30px;">
				<div class="color2 ilblock font20 jt_bg" style="height: 25px;width: 35px;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative;top: 10px;left: 0%;color: #fff;
				 ">{{monthGroupCount}}</div>
			</div> -->
			<div style="width: 100%; height: 30px;line-height: 30px;">
				<div class="color2 ilblock" style="width: 27%;">近30天团返</div>
				<div calss="ilblock text-bg" style="background:rgb(226,226,226);height: 10px;display: inline-block;margin-left: 4px;position: relative;width: 71%;border-radius:4px ;">
					<div class="color2 ilblock font20 jt_bg" style="height: 21px;width: 46px;border-radius: 15%;
					 background-size: 100%;text-align: center; line-height: 20px;position: absolute;top: -25px;left: -10px;color: #fff;
					 ">{{monthGroupCount}}</div>
				<div class="ilblock radiu20 " style="background:rgb(255,133,78);height: 10px;position: absolute;top:0;left: 0;" :style="'width:'+monthGroupCountWidth+'px'"></div>
				</div>
			</div>
			<div style="width: 100%; margin-top: 30px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					会员店返
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{shopCount}}</div>
			</div>
			<div style="width: 100%; margin-top: 10px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					会员粉丝总人数
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{distriDataLength}}</div>
			</div>
		</div>
		<div class="bg1" style="margin-top: 10px;width: 100%;">
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/return-first/return-first'}})">
				<div class="flo-left color2 font14 btm-list" style="background: #fff;height: 52px;width: 100%; line-height: 52px;;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 50%;">会员返佣记录</div>
					<div class="ilblock color1 font14 flo-right list" style="width: 40%">总返佣{{totalCount}}
						<image src="../../static/images/home-icon9.png"></image>
					</div>
				</div>
			</div>
			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/darenOrder/darenOrder'}})" class="color2">
				<div class="flo-left color2 font14 btm-list" style="height: 52px;width: 100%; line-height: 52px;;background: #fff;">
					<div class="ilblock color2 font14" style="width:50%;">店铺订单记录</div>
					<div class="ilblock color1 font14 flo-right list">共{{orderTotal}}单
						<image src="../../static/images/home-icon9.png"></image>
					</div>
				</div>
			</div>
		</div>
		<div class="bg1" >
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/code-all/code-all'}})">
				<div class="flo-left color2 font14 btm-list " style="background: #fff;height: 52px;width: 100%; line-height: 52px;;margin-top: 10px; margin-bottom: 70px">
					<div class="ilblock color2 font14" style="width:50%;">锁粉海报</div>
					<div class="ilblock color1 font14 flo-right list">
						<div class="ilblock red"></div>
						查看所有<image src="../../static/images/home-icon9.png"></image>
					</div>
				</div>
			</div>
		</div>



		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show1-a.png"></image>
					</view>
					<view  class="color8">会员</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/team/team'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show2.png"></image>
					</view>
					<view>会员团队</view>
				</view>
				<view class="navbar-item ilblock"  @click="webSelf.$Router.redirectTo({route:{path:'/pages/return/return'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show3.png"></image>
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
				userData:[],
				orderTotal:0,
		
			}
		},
		onLoad(options) {
			const self = this;
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMonthGroupCount','getMonthShopCount','getShopCount','getTotalCount','getDistriDataLength','getOrderData','getUserData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMonthGroupCount','getMonthShopCount','getShopCount','getTotalCount','getDistriDataLength','getOrderData','getUserData'], self)
			};
			
		},

		methods: {
			
			getUserData() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
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

			getMonthGroupCount() {
				const self = this;
				var now = Date.parse(new Date()) / 1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type:2,
					behavior :2,
					count:['>',0],
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
						self.monthGroupCount = parseFloat(res.info.compute.GroupCount).toFixed(2);
						if(self.monthGroupCount>100){
							self.monthGroupCountWidth += parseFloat(self.monthGroupCount/100).toFixed(2);
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
					
					behavior :1,
					type:2,
					count:['>',0],
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
						self.monthShopCount = parseFloat(res.info.compute.ShopCount).toFixed(2);
						if(self.monthShopCount>100){
							self.monthShopCountWidth += parseFloat(self.monthGroupCount/100).toFixed(2);
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
					behavior :1,
					type:2,
					count:['>',0],
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
						self.shopCount =  parseFloat(res.info.compute.ShopCount).toFixed(2);
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
				/* postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate); */
				postData.searchItem = {
					behavior :['in',[1,2]],
					type:2,
					count:['>',0],
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
						self.totalCount =  parseFloat(res.info.compute.TotalCount).toFixed(2);
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
							self.distriDataLength = res.info.compute.DistriDataLength
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
				postData.searchItem = {
					pay_status:1,
					user_no:uni.getStorageSync('user_info').user_no
				};
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
	.jt_bg{
		background: url(../../static/images/icon0.png);
	}
</style>
