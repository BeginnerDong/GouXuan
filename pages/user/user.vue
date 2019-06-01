<template>
	<view>
		<div class="top">
			<div class="top-box">
				<div class="tou-img"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/serve/serve'}})">
					<img :src="userData.headImgUrl" />
				</div>
				<div class="color2 user-name" >{{userData.nickname}}</div>
			</div>
		</div>
		<div class="status bg1">
			<div class="status-item ilblock">
				<div  @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=1'}})">
					<div class="status-img">
						<img src="../../static/images/about-icon1.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						待发货
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=2'}})">
					<div class="status-img">
						<img src="../../static/images/about-icon2.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						发货中
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=3'}})">
					<div class="status-img">
						<img src="../../static/images/about-icon3.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						已发货
					</div>
				</div>
			</div>
			<div class="status-item ilblock">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all?num=4'}})">
					<div class="status-img">
						<img src="../../static/images/about-icon4.png" style="width: 40px;" />
					</div>
					<div class="status-text color2">
						其他
					</div>
				</div>
			</div>
			<div class="status-item ilblock" style="margin-right: 0px;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all'}})">
					<div class="status-img">
						<img src="../../static/images/about-icon5.png" style="width: 22px; margin-left: 5px;height: 25px;margin-top: 15px; position: relative;top: -5px; " />
					</div>
					<div class="status-text color2">
						我的订单
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="list bg1" style="margin-bottom: 20px;">
			<ul>
				<div @click="toDaRen" class="color2" style="position: relative;" v-if="userData.primary_scope>10">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="../../static/images/about-icon6.png" style="width: 14px;" />
					</div>
					<li>达人后台
						<div class="ilblock flo-right" style=" width: 6px; height: 6px; border: solid 1px #FF7263;
						 margin-top: 20px; margin-right: 32px;
						 background: #FF7263;border-radius: 50%;"></div>
					</li>
				</div>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/coupon/coupon'}})" class="color2" style="position: relative;" v-if="userData.primary_scope>10">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="../../static/images/about-icon7.png" style="width: 14px;" />
					</div>
					<li>
						我的优惠券
					</li>
				</div>
			<!-- 	<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/code/code'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="../../static/images/about-icon8.png" style="width: 14px;" />
					</div>
					<li>
						店铺二维码
					</li>
				</div> -->
				<div class="color2" @click="webSelf.$Router.navigateTo({route:{path:'/pages/course/course'}})" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="../../static/images/about-icon9.png" style="width: 14px;" />
					</div>
					<li>
						使用教程
					</li>
				</div>
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/address/address'}})" class="color2" style="position: relative;">
					<div class="ilblock" style="position: absolute;top: 12px;left: 17px;">
						<img src="../../static/images/about-icon10.png" style="width: 14px;" />
					</div>
					<li>
						地址管理
					</li>
				</div>
			</ul>
		</div>





		<!-- ------------footer----------------- -->
		<div style="width: 100%; height: 65px;"></div>
		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock" @click="webSelf.$Router.reLaunch({route:{path:'/pages/index/index?site_id='+site_id}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar1.png"></image>
					</view>
					<view>首页</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.reLaunch({route:{path:'/pages/follow/follow'}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar2.png"></image>
					</view>
					<view>关注</view>
				</view>
				<view class="navbar-item ilblock" >
					<view class="navbar-img">
						<image src="../../static/images/navbar3-a.png"></image>
					</view>
					<view class="color8">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf:this,
				site_id:'',
				primary_scope:'',
				userData:[],
			}
		},
		onLoad(options) {
			const self = this;
			self.primary_scope  = uni.getStorageSync('user_info').primary_scope;
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */
			self.headImgUrl = uni.getStorageSync('user_info').headImgUrl;
			self.nickName = uni.getStorageSync('user_info').nickname;
			self.site_id = uni.getStorageSync('siteData').id;
			self.$Utils.loadAll(['getUserData'], self)
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
			
			toDaRen() {
				const self = this;
				if(self.userData.primary_scope>=30){
					self.$Router.navigateTo({route:{path:'/pages/doyen/doyen'}})
				}else{
					uni.showToast({
					    title: '您还不是达人',
					    icon: 'fail',
					    duration: 1000,
					    mask:true
					});
				};
			},

			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/user.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
