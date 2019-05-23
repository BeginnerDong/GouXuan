<template>
	<view >
		<div class="nav-top">
			<div class="ilblock color2" @click="menuChange('0')">产<span :class="num==0?'active':''">品详</span>情</div>
			<div class="ilblock color2" @click="menuChange('1')">使<span :class="num==1?'active':''">用说</span>明</div>
		</div>
		<c-swiper :list="swiperData">
			<div class="best-num">分享海报</div>
		</c-swiper>
		<!-- <div class="top-imgbox">
			<img src="/static/images/服务/service-img2.png" />
			
		</div> -->
		<div class="img-btm">
			限时抢购
		</div>
		<div style="width: 100%; background: #fff;padding: 15px;">
			<div class="color2" style="font-size: 15px; text-align: justify;">
				{{mainData.title}}
			</div>
			<div>
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72); margin-top:5px;">￥<span style="font-size: 20px;">{{mainData.price}}</span></div>
				<div class="ilblock best-money1" style="left: -10px;">
					<span class="span1">店反</span>
					<span class="span2">￥{{mainData.shop_reward}}</span>
				</div>
				<div class="ilblock best-money2" style="left: -10px;">
					<span class="span1">团反</span>
					<span class="span2">￥{{mainData.group_reward}}</span>
				</div>
			</div>
			<div style="margin-top: 5px;">
				<span class="color1" style="float: left; font-size: 13px;">已售：{{mainData.false_sale_count}}</span>
				<span class="color1" style="float: right; font-size: 13px;">库存：{{mainData.stock}}</span>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="address color2">
			<div class="ilblock" style="width: 10%;">
				<img src="../../static/images/details-icon1.png" style="width: 12px; height: 14px;margin-left: 15px; position: relative; top: -10px;" />
			</div>
			<div class="ilblock" style="width: 80%;margin-top: 10px;">{{mainData.address}}</div>
			<div class="ilblock">
				<img src="../../static/images/home-icon9.png" style="height: 13px; margin-left: 5px;margin-bottom: 20px;" />
			</div>
		</div>
		<div class="choice">
			<div class="ilblock" style="color: #787878; font-size: 13px; width: 20%; height: 100%; text-align: center;position: relative; top: -30px;">规格选择</div>
			<div class="ilblock">
				<div class="color2" style="margin-top: 10px;">{{choosed_skuData.title}}:</div>
				<div class="chioce-item ilblock">
					{{choosed_skuData.price}}元{{num}}
				</div>
			</div>
		</div>

		<div style="color: #818181; font-size: 15px; padding: 10px 15px; background: #F2F2F2;" >
			日历
		</div>
		<div class="wahct-top">
			<div class="color3 ilblock wahct-topleft">
				<image src="../../static/images/微信图片_20190520155420.png"></image>
				上月
				
			</div>
			<div class="color2 ilblock wahct-topleft" style="font-size: 16px;">
				2019年1月
			</div>
			<div class="ilblock wahct-topright">
				下月
				<image src="../../static/images/微信图片_20190520155409.png"></image>
			</div>
		</div>
		<div class="week">
			<div class="week-item ilblock">
				日
			</div>
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
		</div>
		<view class="bg1" style="padding: 20upx 0upx 70upx;">
			<div class="day-item ilblock">
				0
			</div><div class="day-item ilblock">
				1
			</div>
			<div class="day-item ilblock">
				2
			</div>
			<div class="day-item ilblock">
				3
			</div>
			<div class="day-item ilblock">
				4
			</div>
			<div class="day-item ilblock">
				5
			</div>
			<div class="day-item ilblock">
				6
			</div>
			<div class="day-item ilblock">
				7
			</div>
			<div class="day-item ilblock">
				8
			</div>
			<div class="day-item ilblock">
				9
			</div>
			<div class="day-item ilblock">
				10
			</div>
			<div class="day-item ilblock">
				11
			</div>
			<div class="day-item ilblock">
				12
			</div>
			<div class="day-item ilblock">
				13
			</div>
			<div class="day-item ilblock">
				14
			</div>
			<div class="day-item ilblock">
				15
			</div>
			<div class="day-item ilblock">
				16
			</div>
			<div class="day-item ilblock">
				17
			</div>
			<div class="day-item ilblock">
				18
			</div>
			<div class="day-item ilblock">
				19
			</div>
			<div class="day-item ilblock">
				20
			</div>
			<div class="day-item ilblock">
				21
			</div>
			<div class="day-item ilblock">
				22
			</div>
			<div class="day-item ilblock">
				23
			</div>
			<div class="day-item ilblock">
				24
			</div>
			<div class="day-item ilblock">
				25
			</div>
			<div class="day-item ilblock">
				26
			</div>
			<div class="day-item ilblock">
				27
			</div>
			<div class="day-item ilblock day-star">
				<div>28</div>
				<div>￥138</div>
				<div style="color:#72B784;">返8</div>
				<div style="color:#71C3CB; margin-top: 8upx;">充足</div>
			</div>
			<div class="day-item ilblock day-star">
				<div>29</div>
				<div>￥138</div>
				<div style="color:#72B784;">返9</div>
				<div style="color:#71C3CB; margin-top: 8upx;">充足</div>
			</div>
			<div class="day-item ilblock">
				30
			</div>
			<div class="day-item ilblock">
				31
			</div>
			
		</view>
		<div class="foter2">
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">产品</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">{{mainData.information}}</div>
			</div>
			<div class="foter2-boxa"  v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">规格</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">
					178元
				</div>
			</div>
			<div class="foter2-boxa"  v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">温馨提示</div>
				<div>
					{{mainData.tips}}
				</div>
			</div>
			<div style="height:55px"></div>
			<div class="foter-fixd">
				<div class="index ilblock" style="border-right: solid 1px #E9E9E9;"  @click="webSelf.$Router.redirectTo({route:{path:'/pages/index/index?'}})">
					
						<img src="/static/images/details-icon2.png" />
						<div>首页</div>
					
				</div>
				<div class="index ilblock" >
					
					<img src="/static/images/details-icon3.png" />
					<div>客服</div>
					
				</div>
				<div class="ilblock panic"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/pay/pay?id='+choosed_skuData.id}})">
					<div style="color: #FEE4D1;">
						立即抢购
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue"
	import cTabbar from "@/components/tabbar/tabbar.vue"
	export default {
		components: {
			cSwiper,
			cTabbar
		},
		
		
		
		data() {
			return {
				swiperData:[],
				labelData:[],
				mainData:[],
				webSelf: this,
				choosed_skuData:[],
				num:0
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self)
			
		},
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id:self.id 
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
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.swiperData = res.info.data[0].bannerImg;
						for (var key in self.mainData.label) {
							if (self.mainData.sku_array.indexOf(parseInt(key)) != -1) {
								self.labelData.push(self.mainData.label[key])
							};
						};
						self.choosed_skuData = self.$Utils.cloneForm(self.mainData.sku[0]);	
					} 
					self.$Utils.finishFunc('getMainData');
					console.log('self.choosed_skuData', self.choosed_skuData)
				};
				self.$apis.productGet(postData, callback);
			},
			
			menuChange(num){
				const self = this;
				self.num  = num;
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/remommend.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
