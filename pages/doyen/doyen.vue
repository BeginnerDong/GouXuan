<template>
	<view>

		<div class="top" style="overflow: hidden;">
			<div class="top-img ilblock">
				<img src="/static/images/达人/Talent%20show-img.png" width="61px" />
			</div>
			<div class="ilblock" style="width:180px;height: 100%;margin-left: 100px;">
				<div class="top-name color5 font15" style="margin-top: 20px;">购选</div>
				<div class="top-id color5 font13 " style="line-height: 30px">ID:29948955</div>
				<div class="bg1 ilblock radiu20 font14" style="color: #FF8954; padding: 3px 10px; margin-top: 5px;">分享达人</div>
				<a href="regular.html">
					<div class="ilblock color5 font14" style="margin-left: 10px;width: 80px; 
					background: url(/static/images/jiantouyou.png) no-repeat 65px center;
					background-size: 9%;
				">
						升级规则</div>
				</a>
			</div>
			<div class="ilblock flo-right" style="width: 90px;height: 100%; ">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/install/install'}})">
					<img src="/static/images/达人/icon.png" style="width: 16px;margin-left: 62px;margin-top: 10px; " />
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
				<div class="color5 ilblock font10 " style="height: 40px;width: 35px;background: url(/static/images/达人/icon0.png) no-repeat;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative; top: 10px;
				 ">0.00</div>
			</div>
			<div style="width: 100%; height: 30px;line-height: 30px;margin-bottom: 15px; ">
				<div class="color2 ilblock">近30天营业额</div>
				<div class="ilblock radiu20 flo-right" style=" margin-top: 10px; background:rgb(226,226,226);width: 243px;height: 10px;"></div>
			</div>

			<div class="ilblock" style="height: 30px; widows: 100px;"></div>
			<div class="flo-right" style="width: 260px; height: 30px;">
				<div class="color5 ilblock font10 " style="height: 40px;width: 35px;background: url(/static/images/达人/icon0.png) no-repeat;
				 background-size: 100%;text-align: center; line-height: 20px;position: relative;top: 10px;
				 ">{{monthCount}}</div>
			</div>
			<div style="width: 100%; height: 30px;line-height: 30px;">
				<div class="color2 ilblock">近30天返佣</div>
				<div class="ilblock radiu20 flo-right" style=" margin-top: 10px; background:rgb(226,226,226);width: 243px;height: 10px;"></div>
			</div>
			<div style="width: 100%; margin-top: 30px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人营业额
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">0.00</div>
			</div>
			<div style="width: 100%; margin-top: 10px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人粉丝总人数
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{distriData.length}}</div>
			</div>
		</div>
		<div class="bg1" style="margin-top: 10px;width: 100%;">
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/return-first/return-first'}})">
				<div class="flo-left color2 font14" style="background: #fff;height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 201px;">达人返佣记录</div>
					<div class="ilblock color1 font14" style="width: 150px; background: url(/static/images/home-icon9.png) no-repeat 120px 18.5px;
					 background-size: 4%;
					 ">累计总返佣{{totalCount}}</div>
				</div>
			</div>
			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/order/order'}})" class="color2">
				<div class="flo-left color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;background: #fff;">
					<div class="ilblock color2 font14" style="width: 251px;">达人订单记录</div>
					<div class="ilblock color1 font14" style="width: 100px; background: url(/static/images/home-icon9.png) no-repeat 70px 18.5px;
					 background-size: 5.6%;
					 ">共{{orderData.length}}单</div>
				</div>
			</div>
		</div>
		<div class="bg1" style="margin-top: 10px; margin-bottom: 70px;">
			<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/code-all/code-all'}})">
				<div class="flo-left color2 font14" style="background: #fff;height: 52px;width: 100%; line-height: 52px;text-indent: 15px;">
					<div class="ilblock color2 font14" style="width: 221px;">达人海报</div>
					<div class="ilblock color1 font14" style="width: 110px; background: url(/static/images/home-icon9.png) no-repeat 100px 19.5px;
					 background-size: 5%;">
						<div class="ilblock flo-left" style=" width: 6px; height: 6px; border: solid 1px red;
					  margin-top: 25px; 
					  background: red;border-radius: 50%;"></div>
						查看所有
					</div>
				</div>
			</div>
		</div>





		<div class="navbar-brand">
			<ul>
				<li>
					<a href="doyen.html">
						<div class="navbar-img"><img src="/static/images/达人/Talent%20show1-a.png" /></div>
						<div style="color: #FC7C5D;">达人</div>
					</a>
				</li>
				<li>
					<a href="team.html">
						<div class="navbar-img"><img src="/static/images/达人/Talent%20show2.png" /> </div>
						<div>达人团队</div>
					</a>
				</li>
				<li><a href="return.html">
						<div class="navbar-img"><img src="/static/images/达人/Talent%20show3.png" /></div>
						<div>返佣</div>
					</a></li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				mainData:[],
				type:2,
				totalCount:'0.00',
				monthCount:'0.00',
				distriData:[],
				searchItem:{
					type:2
				},
				orderData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData', 'getDistriData'], self)
		},
		
		methods: {

			getMainData() {
				const self = this;
				var now  = Date.parse(new Date())/1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no= uni.getStorageSync('user_no');
				postData.order = {
					create_time: 'desc'
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);
							for (var i = 0; i < self.mainData.length; i++) {
								self.totalCount += self.mainData[i].count.toFixed(2)
							}
							if(self.mainData[i].create_time<now&&self.mainData[i].create_time<now-2592000){
								self.monthCount += self.mainData[i].count.toFixed(2)
							}
								
						} 
						
					} else {
						self.$Utils.showToast(res.msg,'none')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
			getDistriData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					parent_no:uni.getStorageSync('user_no'),
					type:2
				};				
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.distriData.push.apply(self.distriData, res.info.data);
						} 
						
					} else {
						self.$Utils.showToast(res.msg,'none')
					};
					self.$Utils.finishFunc('getDistriData');
				};
				self.$apis.distriGet(postData, callback);
			},
			
			getOrderData() {
				const self = this;			
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem.user_no= uni.getStorageSync('user_no');
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.orderData.push.apply(self.orderData, res.info.data);
						} 
					} 	
					self.$Utils.finishFunc('getOrderData');
				};
				self.$apis.orderGet(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/doyen.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
