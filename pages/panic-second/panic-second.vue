<template>
	<view>
		<div class="bg1" style="padding: 15px; border-bottom: solid 1px #F4F4F4;">
			<div class="color2" style="font-size: 18px;">[预约]{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.product?mainData.products[0].snap_product.product.title:''}}</div>
		
			<div class="color1 font13" style="margin-top: 10px;">消费地址:
			{{mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.product?mainData.products[0].snap_product.product.address:''}}</div>
		</div>
		<div class="bg1" style="padding: 15px; border-bottom: solid 1px #F4F4F4;">
			<div style="height:50px; text-align: center; line-height: 50px;">
				<div class="ilblock" style="width: 49%;" @click="changeMenu('0')"><span :class="num==0?'color77':'color22'">产品详情</span></div>
				<div class="ilblock" style="width: 49%;"  @click="changeMenu('1')"><span :class="num==1?'color77':'color22'">日历预约</span></div>
			</div>
		</div>
		<div class="middle bg2" v-if="num==0" >
			<div class="color2 font15">
				<div style="overflow: hidden;">
					<view class="content ql-editor" v-html="mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.product?mainData.products[0].snap_product.product.content:''">
					</view>
				</div>
			</div>
		</div>
		<div v-if="num==1">
			<div v-if="mainData.passage1==''&&mainData.products[0].date_id==0">
				<div class="wahct-top">
					<div class="color3 ilblock wahct-topleft" @click="goLastMonth">
						<image src="../../static/images/wximg6.png"></image>
						<view class="ilblock wahct-top-text">上月</view>
					</div>
					<div class="color2 ilblock wahct-topleft" style="font-size: 16px;">
						{{curYear}}*{{curMonth+1}}
					</div>
					<div class="ilblock wahct-topright" @click="goNextMonth">
						<view class="ilblock wahct-top-text">下月</view>
						<image src="../../static/images/wximg5.png"></image>
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
				<view class="bg1" style="padding:0upx 0upx 70upx;">
					<block v-for="item in dateData">
						<div class="day-item ilblock day-star" style="top:0;line-height: 50px;" :style="chooseDay==item?'color:#FF895A':''" @click="dateChoose(item)">
							<div>{{item.sDay}}</div>
						</div>
					</block>

				</view>
				<button @click="submit" style="border-radius:0;font-size: 14px;color: #fff;line-height: 40px;height:40px">选择</button>
			</div>
			<div class="color1" style="text-align: center; padding: 60px;" v-if="mainData.passage1!=''">您已预约过</div>
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
				dateData: [],
				arrInfoEx: [],
				mainData: [],
				webSelf: this,
				num:0,
				chooseDay:'',
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			if (options[0] && options[0].id) {
				self.id = options[0].id
			};
			self.$Utils.loadAll(['getMainData', 'calenderInit'], self)
		},
		methods: {
			
			
			
	
			
			dateChoose(day){
				const self = this;
				if(day==self.chooseDay){
					self.chooseDay = ''
				}else{
					self.chooseDay = day
				}
			},
			
			changeMenu(num){
				const self = this;
				console.log(num)
				if(num==self.num){
					return
				}else{
					if(num==0){
						self.num=0
					}else if(num==1){
						self.num=1
					}
				}
			},

			calenderInit() {
				const self = this;
				var curDate = new Date();
				self.curMonth = curDate.getMonth();
				self.curYear = curDate.getFullYear();
				self.curDay = curDate.getDate();
				self.refreshPageData(self.curYear, self.curMonth, self.curDay);

			},

			//刷新全部数据
			refreshPageData(year, month, day) {
				const self = this;

				self.signData = [];
				self.dateData = [];
				self.getOffset(self.curYear, self.curMonth);
				self.monthArray = [new Date(self.curYear, self.curMonth, 1).getTime(), new Date(self.curYear, self.curMonth + 1, 1)
					.getTime()
				];

				var offset = self.getOffset(self.curYear, self.curMonth);
				for (var i = 0; i < offset; ++i) {
					self.dateData.push({
						isEmpty: true
					});
				};
				var dayCount = self.getDayCount(self.curYear, self.curMonth);
				for (var i = 0; i < dayCount; ++i) {
					if (self.todayDay == i + 1) {
						self.dateData.push({
							sDay: i + 1,
							isToday: true
						});
					} else {
						self.dateData.push({
							sDay: i + 1
						});
					};
				};
				console.log('self.dateData', self.dateData)
				self.$Utils.finishFunc('calenderInit');
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
			isLeapYear(year) {
				if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
					return 1
				else
					return 0
			},

			getDayCount(year, month) {
				var DAY_OF_MONTH = [
					[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
				];
				return DAY_OF_MONTH[this.isLeapYear(year)][month];
			},

			goLastMonth(e) {
				const self = this;
				if (0 == self.curMonth) {
					self.curMonth = 11;
					self.curYear--;
				} else {
					self.curMonth--;
				};
				self.refreshPageData(self.curYear, self.curMonth, 1);


			},

			goNextMonth(e) {
				const self = this;
				if (self.curMonth == 11) {
					self.curMonth = 0;
					self.curYear++
				} else {
					self.curMonth++;
				}
				self.refreshPageData(self.curYear, self.curMonth, 1);
			},
			
			submit(){
				const self = this;
				if(self.chooseDay==''){
					self.$Utils.showToast('请选择预约日期','none');
					return
				};
				const postData = {
					tokenFuncName:'getProjectToken',
					searchItem:{
						id:self.mainData.id
					},
					data:{
						passage1:self.curYear+'-'+self.curMonth+'='+self.chooseDay
					}
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.$Utils.showToast('选择成功','none');
						setTimeout(function(){
						   self.getMainData();
						},2000);
						
					}else{
						self.$Utils.showToast(res.msg,'none');
					}
				};
				self.$apis.orderUpdate(postData, callback);		
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 2,
					id: self.id
				};
				postData.getAfter = {
					shop:{
						tableName:'UserInfo',
						middleKey:'shop_no',
						key:'user_no',
						condition:'=',
						searchItem:{
							status:1
						},
						info:['address']
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData=res.info.data[0]
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/remommend.css";

	page {
		background: #fff;
	}

	.home {
		border-bottom: solid 1px #EDEDED;
	}

	.search {
		width: 90%;
		height: 30px;
		margin: 15px auto;
	}

	.list-text {
		width: 100%;
		height: 70px;
		background: #fff;
		border-bottom: solid 1px #EDEDED;
		padding: 8px 15px;
		line-height: 26px;
	}

	button {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0px;
		background: #F67550;
	}

	.color77 {
		color: #FF895A;
		border-bottom: solid 2px #FF895A;
		padding-bottom: 7px;
	}

	.color22 {
		color: rgb(34, 34, 34);
		border-bottom: solid 2px #fff;
		padding-bottom: 7px;
	}

	.middle {
		width: 92%;
		margin: 5px auto;
		padding: 10px;
		border-radius: 8px;
		text-align: justify;
		line-height: 25px;
	}

	.color8 {
		color: #3C3C3C;
	}

	ol {
		margin-left: 15px;
	}

	ul {
		margin-left: 20px;
		list-style-type: disc;
	}

	.img-time {
		border: solid 1px red;
		width: 81px;
		height: 60px;
		background: url(/static/images/wximg4.png) no-repeat;
		background-size: 100%;
		margin-left: 2px;
		margin-top: 3px;

	}

	@import "../../assets/style/index.css";
</style>
