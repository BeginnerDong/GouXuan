<template>
	<view>
	
		<div class="bg1 top">
			<div class="ilblock flo-left" style="width: 50%;"  @click="changeMenu('0')">
				<div class="ilblock top-left" :style="num==0?'background: #FF824F;color:#fff':''">总榜({{mainData.length}}人)</div>
			</div>
			<div class="ilblock flo-left" style="width: 50%;" @click="changeMenu('1')">
				<div class="ilblock top-right"  :style="num==1?'background: #FF824F;color:#fff':''">月榜</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		
		<div class="list-item bg1" style="margin-top: 15px;" v-for="(item,index) in mainData">
			<div class="cup ilblock flo-left">
				<img src="../../static/images/达人/icon5.png"  v-if="index==0"/>
				<img src="../../static/images/达人/icon6.png"  v-if="index==1"/>
				<img src="../../static/images/达人/icon7.png"  v-if="index==2"/>
			</div>
			<div class="heard ilblock flo-left">
				<div class="heard-img radiu50">
					<img :src="item.userInfo.headImgUrl" />
				</div>
				<div class="heard-name color2 font14">{{item.userInfo.nickname}}</div>
			</div>
			<div class="text-rigt ilblock flo-left">
				<div style="width:100%; margin-top: 22px; ">
					<div class="ilblock" style="width: 50%;">
						总返佣：{{item.total}}
					</div>
					<div class="color1 ilblock">订单数:{{item.order_num}}</div>
				</div>
				<div class="color1" style="line-height: 24px; height: 24px;">营业额：￥{{item.turnover}}</div>
				<div class="color1" style="line-height: 24px; height: 24px;">手机号：{{item.userInfo.info.phone}}</div>
				<div class="color1" style="line-height: 24px; height: 24px;">ID:{{item.userInfo.user_no}}</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				num:0,
				mainData:[],
				data:{
					type:1
				},
				isLoadAll:false
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self)

		},
		
		onReachBottom(){
			console.log('onReachBottom')
			const self = this;
			if(!self.isLoadAll&&uni.getStorageSync('loadAllArray')){
				self.paginate.currentPage++;
				self.getMainData()
			};	
		},
		
		
		methods: {
		
			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.mainData = []
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.data = self.$Utils.cloneForm(self.data);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}else{
						self.isLoadAll = true
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.teamRank(postData, callback);
			},
			
			changeMenu(num){
				const self = this;
				if(num==self.num){
					return
				}else{
					self.num = num;
					if(num==0){
						self.data.type=1
					}else if(num==1){
						self.data.type=2
					}
				}
				self.getMainData(true)
			},

			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.top {
		width: 100%;
		height: 52px;
		padding: 10px;
	}

	.top-left {
		width: 70%;
		background: #fff;
		color: rgb(34, 34, 34);
		font-size: 15px;
		height: 30px;
		float: right;
		text-align: center;
		line-height: 30px;
		border-radius: 20px 0px 0px 20px;
		border: solid 1px #FF824F;
	}

	.top-right {
		width: 70%;
		background: #fff;
		color: rgb(34, 34, 34);
		font-size: 15px;
		height: 30px;
		float: left;
		text-align: center;
		line-height: 30px;
		border-radius: 0px 20px 20px 0px;
		border: solid 1px #FF824F;
	}

	.list-item {
		height: 133px;
		width: 100%;
		border: solid 1px #F8F8F8;
	}

	.cup {
		height: 100%;
		padding: 40px 15px;
	}

	.cup img {
		width: 30px;
	}

	.heard {
		padding: 18px 10px 0px 0px;
		height: 100%;
	}

	.heard-img {
		width: 67px;
		margin-bottom: 8px;
		overflow: hidden;
	}

	.heard-img img {
		width: 100%;

	}

	.heard-name {
		text-align: center;
	}

	.text-rigt {
		height: 100%;
		width: 60%;
	}
</style>
