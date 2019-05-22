<template>
	<view>
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
				<img src="/static/images/details-icon1.png" style="width: 12px; height: 14px;margin-left: 15px; position: relative; top: -10px;" />
			</div>
			<div class="ilblock" style="width: 80%;margin-top: 10px;">{{mainData.address}}</div>
			<div class="ilblock">
				<img src="/static/images/home-icon9.png" style="height: 13px; margin-left: 5px;margin-bottom: 20px;" />
			</div>
		</div>
		<div class="choice">
			<div class="ilblock" style="color: #787878; font-size: 13px; width: 20%; height: 100%; text-align: center;position: relative; top: -30px;">规格选择</div>

			<div class="ilblock" v-for="item in labelData">
				<div class="color2" style="margin-top: 10px;">{{item.title}}:</div>

				<div class="chioce-item ilblock" v-for="c_item in item.child" :style="webSelf.$Utils.inArray(c_item.id,merge_can_choose_sku_item)==-1?'color:gray':(webSelf.$Utils.inArray(c_item.id,choosed_sku_item)!=-1?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':'color:black')"
				 @click="webSelf.$Utils.inArray(c_item.id,merge_can_choose_sku_item)!=-1?'chooseSku(c_item.id)':''">
					{{c_item.title}}元
				</div>
			</div>
		</div>
		<div v-if="mainData.type==2">
			<div style="color: #818181; font-size: 15px; padding: 10px 15px; background: #F2F2F2;">
				日历
			</div>
			<div class="wahct-top">
				<div class="color3 ilblock wahct-topleft" @click="goLastMonth">
					<image src="../../static/images/微信图片_20190520155420.png"></image>
					上月

				</div>
				<div class="color2 ilblock wahct-topleft" style="font-size: 16px;">
					{{dateData.date}}
				</div>
				<div class="ilblock wahct-topright" @click="goNextMonth">
					下月
					<image src="../../static/images/微信图片_20190520155409.png"></image>
				</div>
			</div>
			<div class="week">

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
				<div class="week-item ilblock">
					日
				</div>
			</div>
			<view class="bg1" style="padding: 20upx 0upx 70upx;">


				<div class="day-item ilblock day-star" style="height:50px" v-for="item in dateData.arrInfoEx">

					<div>{{item.sDay}}</div>
					<div s v-if="item.hasItem>0">￥{{item.skuDate.price}}</div>
					<div style="color:#72B784;" v-if="item.hasItem>0">返{{item.skuDate.shop_reward}}</div>
					<div style="color:#71C3CB; margin-top: 8upx" v-if="item.hasItem>0">{{item.stock>0?'充足':'已售罄'}}</div>

				</div>


			</view>
		</div>
		<div class="foter1" style="color: #848484; font-size: 15px; padding: 10px 15px;background: #fff;margin: 10px 0;">
			图文介绍
			<div v-if="num==0">
				<view class="content ql-editor" v-html="mainData.content">
				</view>
			</div>
		</div>
		<div class="foter2">
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">产品</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">{{mainData.information}}</div>
			</div>
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">规格</div>
				<div style="color:#818181;text-indent: 10px; text-align: justify;">
					178元
				</div>
			</div>
			<div class="foter2-boxa" v-if="num==1">
				<div class="color2" style="font-weight: bolder; margin-bottom: 5px;">温馨提示</div>
				<div>
					{{mainData.tips}}
				</div>
			</div>
			<div style="height:55px"></div>
			<div class="foter-fixd">
				<div class="index ilblock" style="border-right: solid 1px #E9E9E9;" @click="goBuy">

					<img src="/static/images/details-icon2.png" />
					<div>首页</div>

				</div>
				<div class="index ilblock">

					<img src="/static/images/details-icon3.png" />
					<div>客服</div>

				</div>
				<div class="ilblock panic" @click="goBuy">
					<div style="color: #FEE4D1;">
						立即抢购
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		CalendarConverter,
		GetDayCount
	} from '../../common/calendar-converter.js'
	import cSwiper from "@/components/swiper/swiper.vue"
	import cTabbar from "@/components/tabbar/tabbar.vue"
	var calendarConverter = new CalendarConverter();
	var getDayCount = new GetDayCount();
	export default {
		components: {
			cSwiper,
			cTabbar
		},



		data() {
			return {
				dateData: {
					date: "", //当前日期字符串
					arrInfoEx: [], //农历节假日等扩展信息
				},
				swiperData: [],
				labelData: [],
				mainData: [],
				webSelf: this,
				choosed_skuData: [],
				sku_item: [],
				choose_sku_item: [],
				merge_can_choose_sku_item: [],
				num: 0
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			var todayDate = new Date();
			self.todayMonth = todayDate.getMonth();
			self.todayYear = todayDate.getFullYear();
			self.todayDay = todayDate.getDate();
			console.log('self.todayYear', self.todayYear)
			self.$Utils.loadAll(['calenderInit'], self)

		},
		methods: {

			calenderInit() {
				const self = this;
				var curDate = new Date();
				self.curMonth = curDate.getMonth();
				self.curYear = curDate.getFullYear();
				self.curDay = curDate.getDate();
				console.log('calenderInit');
				self.refreshPageData(self.curYear, self.curMonth, self.curDay);
			},

			//刷新全部数据
			refreshPageData(year, month, day) {
				const self = this;
				console.log('self.todayYear', self.todayYear)
				self.mainData = [];
				self.signData = [];
				console.log('refreshPageData', calendarConverter);
				console.log('getDayCount', getDayCount);

				self.curMonth = month;
				self.curYear = year;
				self.curDay = day;
				self.getOffset(self.curYear, self.curMonth);
				self.dateData = {
					date: "",
					arrInfoEx: [],
				};
				self.dateData.date = self.curYear + '年' + (self.curMonth + 1) + '月';
				self.monthArray = [new Date(self.curYear, self.curMonth, 1).getTime(), new Date(self.curYear, self.curMonth + 1, 1)
					.getTime()
				]
				var offset = self.getOffset(self.curYear, self.curMonth);
				console.log('offset', offset);
				for (var i = 0; i < offset; ++i) {
					self.dateData.arrInfoEx[i] = {
						isEmpty: true
					};
				};
				var dayCount = getDayCount(self.curYear, self.curMonth);
				console.log('dayCount', dayCount)
				for (var i = offset; i < dayCount + offset; ++i) {
					var d = new Date(year, month, i - offset + 1);
					var dEx = calendarConverter.solar2lunar(d);
					self.dateData.arrInfoEx[i] = dEx;
					self.dateData.arrInfoEx[i].hasItem = 0;
					if (self.dateData.arrInfoEx[i].sYear == self.todayYear && self.dateData.arrInfoEx[i].sMonth == self.todayMonth + 1 &&
						self.dateData.arrInfoEx[i].sDay == self.todayDay) {
						self.dateData.arrInfoEx[i].isToday = true;
						console.log('self.todayYear', self.todayYear)
					};


				};
				self.getMainData()
				console.log('self.dateData', self.dateData);
			},

			//获取此月第一天相对视图显示的偏移
			getOffset(curYear, curMonth) {
				const self = this;
				var offset = new Date(curYear, curMonth, 1).getDay();
				offset = offset == 0 ? 6 : offset - 1;
				//注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
				console.log('offset', offset)
				return offset;
			},

			goLastMonth(e) {
				const self = this;
				if (0 == self.curMonth) {
					self.curMonth = 11;
					--self.curYear
				} else {
					--self.curMonth;
				}
				self.refreshPageData(self.curYear, self.curMonth, 1);

			},

			goNextMonth(e) {
				const self = this;
				if (11 == self.curMonth) {
					self.curMonth = 0;
					++self.curYear
				} else {
					++self.curMonth;
				}
				self.refreshPageData(self.curYear, self.curMonth, 1);

			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id: self.id
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
					skuDate: {
						tableName: 'SkuDate',
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
						self.choosed_skuData = self.$Utils.cloneForm(self.mainData.sku[0]);
						self.swiperData = res.info.data[0].bannerImg;
						for (var key in self.mainData.label) {
							if (self.mainData.sku_array.indexOf(parseInt(key)) != -1) {
								self.labelData.push(self.mainData.label[key])
							};
						};
						console.log('self.labelData', self.labelData)
						for (var i = 0; i < self.mainData.sku.length; i++) {
							if (self.mainData.sku[i].id == self.id) {
								self.choosed_sku_item = self.$Utils.cloneForm(self.mainData.sku[i].sku_item);
								var skuRes = self.$Utils.skuChoose(self.mainData.sku, self.choosed_sku_item);
								self.can_choose_sku_item = skuRes.can_choose_sku_item;
								for (var j = 0; j < self.choosed_sku_item.length; j++) {
									var finalRes = self.$Utils.skuChoose(self.mainData.sku, [self.choosed_sku_item[j]]);
									self.merge_can_choose_sku_item.push.apply(self.merge_can_choose_sku_item, finalRes.can_choose_sku_item);
								};

								if (self.labelData.length == 1) {
									for (var k = 0; k < self.labelData.length; k++) {
										self.merge_can_choose_sku_item = [];
										for (var m = 0; m < self.labelData[k].child.length; m++) {
											self.merge_can_choose_sku_item.push(self.labelData[k].child[m].id);
										};
									};
								};
								console.log('self.merge_can_choose_sku_item', self.merge_can_choose_sku_item)
							};
						}
						//判断哪一天有skuDate存在，把skuDate数据存到那一天的日历数据中
						for (var o = 0; o < self.mainData.skuDate.length; o++) {
							for (var p = 0; p < self.dateData.arrInfoEx.length; p++) {
								if (self.mainData.skuDate[o].title ==
									self.dateData.arrInfoEx[p].sYear + '年' + self.dateData.arrInfoEx[p].sMonth + '月' + self.dateData.arrInfoEx[p]
									.sDay + '日') {
									self.dateData.arrInfoEx[p].hasItem++;
									self.dateData.arrInfoEx[p].skuDate = self.mainData.skuDate[o]
								}
							}
						}
					}
					self.$Utils.finishFunc('calenderInit');
					console.log('self.dateData.arrInfoEx', self.dateData.arrInfoEx)
				};
				self.$apis.productGet(postData, callback);
			},

			chooseSku(id) {
				const self = this;
				console.log('self.labelData', self.labelData)

				var id = id;
				if (self.merge_can_choose_sku_item.indexOf(id) == -1) {
					//self.choosed_sku_item = [];
					return;
				};

				var index = self.choosed_sku_item.indexOf(id);
				console.log('index', index)
				if (index == -1) {
					var newSkuRes = self.$Utils.skuChoose(self.mainData.sku, [id]);
					var newchoosed_sku_item = self.$Utils.cloneForm(self.choosed_sku_item);
					self.choosed_sku_item = [];

					for (var i = 0; i < newchoosed_sku_item.length; i++) {
						if (newSkuRes.can_choose_sku_item.indexOf(newchoosed_sku_item[i]) != -1) {
							self.choosed_sku_item.push(newchoosed_sku_item[i]);
						};
					};
					console.log('newSkuRes.can_choose_sku_item', newSkuRes.can_choose_sku_item)


					self.choosed_sku_item.push(id);
				} else {
					self.choosed_sku_item.splice(index, 1);
				};
				var skuRes = self.$Utils.skuChoose(self.mainData.sku, self.choosed_sku_item);
				self.choosed_skuData = skuRes.choosed_skuData;
				self.can_choose_sku_item = skuRes.can_choose_sku_item;
				self.merge_can_choose_sku_item = [];
				if (self.choosed_sku_item.length > 0) {
					for (var i = 0; i < self.choosed_sku_item.length; i++) {
						var finalRes = self.$Utils.skuChoose(self.mainData.sku, [self.choosed_sku_item[i]]);
						self.merge_can_choose_sku_item.push.apply(self.merge_can_choose_sku_item, finalRes.can_choose_sku_item);
					};
				} else {
					self.merge_can_choose_sku_item = self.can_choose_sku_item;
				};
				if (self.labelData.length > 1) {
					for (var i = 0; i < self.labelData.length; i++) {

						var hasone = false;
						for (var j = 0; j < self.labelData[i].child.length; j++) {

							if (self.choosed_sku_item.indexOf(self.labelData[i].child[j].id) != -1) {
								console.log('self.labelData[i].child[j].id', self.labelData[i].child[j].id)
								hasone = true
							};
						};
						console.log('hasone', hasone)
						if (!hasone) {
							console.log(self.labelData[i]);
							for (var j = 0; j < self.labelData[i].child.length; j++) {
								var finalRes = self.$Utils.skuChoose(self.mainData.sku, [self.labelData[i].child[j].id]);
								var finalIndex = finalRes.can_choose_sku_item.indexOf(self.labelData[i].child[j].id);
								finalRes.can_choose_sku_item.splice(finalIndex, 1);
								self.merge_can_choose_sku_item.push.apply(self.merge_can_choose_sku_item, finalRes.can_choose_sku_item);
							};
						};
					};
				} else {
					for (var i = 0; i < self.labelData.length; i++) {
						self.merge_can_choose_sku_item = [];
						for (var j = 0; j < self.labelData[i].child.length; j++) {
							self.merge_can_choose_sku_item.push(self.labelData[i].child[j].id);
						};
					};
				};


				
				

				console.log('self.mainData.sku', self.mainData.sku);
				console.log('self.choosed_sku_item', self.choosed_sku_item);
				console.log('self.can_choose_sku_item', self.can_choose_sku_item);
				console.log('self.choosed_skuData', self.choosed_skuData);
			

			},

			menuChange(num) {
				const self = this;
				self.num = num;
			},
			
			goBuy(){
				const self = this;
				console.log('self.choosed_skuDateData',self.choosed_skuDateData)
				if(self.mainData.type==2){
					if(self.mainData.skuDate.length>0){
						if(JSON.stringify(self.choosed_skuDateData) == '{}'){
							self.$Utils.showToast('请选择预约日期','none')
						}else{
							uni.navigateTo({
								url: '/pages/pay/pay?type='+self.mainData.type+'&id='+self.choosed_skuDateData.id,
							});
						}
					}
				}else if(self.mainData.type==1){
					if(JSON.stringify(self.choosed_skuData) == '{}'){
						self.$Utils.showToast('商品信息错误','none')
					}else{
						uni.navigateTo({
							url: '/pages/pay/pay?type='+self.mainData.type+'&id='+self.choosed_skuData.id,
						});
					}	
				}				
			}
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/remommend.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
