<template>
	<view>

		<!--<div class="index-top">
			<div class="logo ilblock">
				<img src="../../static/images/home-img1.png" /><span>购选</span>
			</div>
			<div class="logo-right">
				<div class="logo-right-span ilblock">陕西站</div>
				<span>
					<img src="../../static/images/home-icon13.png" />
				</span>
			</div>
		</div>-->
		<div class="best-box ilblock" style="margin-left: 15px;" v-for="(item,index) in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
			<div class="best-box-top">
				<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
				<div class="best-num ilblock">
					已售{{item.false_sale_count}}
				</div>
				<div class="best-time" v-if="item.start_time<now&&countDownList[index].day=='00'">
					距结束仅剩 <span>{{countDownList[index].day}}</span> 天 <span>{{countDownList[index].hou}}</span> : <span>{{countDownList[index].min}}</span>
					: <span>{{countDownList[index].sec}}</span>
				</div>
				<div class="best-time best-time2" v-if="item.start_time>now">
					【即将开售】
				</div>
			</div>
			<div class="best-text">
				{{item.title}}
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">{{item.price}}</span></div>
				<div class="ilblock best-moneyleft" v-if="item.skuDate.length>0">
					返佣具体以日期为准
				</div>
				<div class="ilblock best-money1" v-if="item.skuDate.length==0">
					<span class="span1">店返</span>
					<span class="span2">￥{{item.shop_reward}}</span>
				</div>
				<div class="ilblock best-money2" v-if="item.skuDate.length==0">
					<span class="span1">团返</span>
					<span class="span2">￥{{item.group_reward}}</span>
				</div>
			</div>
		</div>





		<div style="width: 100%; height: 65px;"></div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				
				endTimeList: [],
				countDownList:[],
				mainData: [],
				searchItem: {
					thirdapp_id: 2,
					province_id: uni.getStorageSync('siteData').id
				},
				order: {
					listorder: 'desc'
				},
				now:'',
				isLoadAll:false
			}
		},
		onLoad() {
			console.log(this.$Router)
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.now = new Date().getTime();
			var options = self.$Utils.getHashParameters();
			console.log('options', options)
			if (options[0].category_id) {
				self.searchItem.category_id = options[0].category_id
			};
			if (options[0].city_id) {
				self.searchItem.city_id = options[0].city_id
			};
			if (options[0].title) {
				self.searchItem.title = ['LIKE', ['%' + options[0].title + '%']]
			};
			if (options[0].noSite && options[0].noSite == 'true') {
				delete self.searchItem.province_id
			};

			if (options[0].order && options[0].order == 'sale_count') {
				self.order = {
					false_sale_count: 'desc'
				}
			};
			self.now = Date.parse(new Date());
			self.$Utils.loadAll(['getMainData'], self)

		},
		
		
		onReachBottom() {
		
			const self = this;
			if (!self.isLoadAll) {
				console.log('11',self.paginate.currentPage);
				self.paginate.currentPage++;
				console.log('22',self.paginate.currentPage);
				self.getMainData()
			};
		},
		
		

		methods: {

			
			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.mainData = [];
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.order = self.$Utils.cloneForm(self.order);
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
						for (var i = 0; i < self.mainData.length; i++) {
							self.endTimeList.push({
								actEndTime: self.$Utils.timeto(self.mainData[i].end_time, "ymd-hms")
							});
							self.mainData[i].endTimeList = [];
						}
						self.countDown();
					}else{
						self.isLoadAll = true;
						self.$Utils.showToast('没有更多了','none');
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},

			timeFormat(param) { //小于10的格式化函数
				const self = this;
				return param < 10 ? '0' + param : param;
			},

			countDown() { //倒计时函数
				// 获取当前时间，同时得到活动结束时间数组
				const self = this;
				self.countDownList = [];
				let newTime = Date.parse(new Date());
				let endTimeList = self.endTimeList;

				// 对结束时间进行处理渲染到页面
				for (var i = 0; i < self.endTimeList.length; i++) {
					let endTime = new Date(self.endTimeList[i].actEndTime).getTime();
					console.log('endTime',endTime)
					console.log('newTime',newTime)
					let obj = null;
					// 如果活动未结束，对时间进行处理
					console.log(endTime - newTime)
					if (endTime - newTime > 0) {
						let time = (endTime - newTime) / 1000;
						// 获取天、时、分、秒
						console.log('time',time)

						let day = parseInt(time / (60 * 60 * 24));
						let hou = parseInt(time % (60 * 60 * 24) / 3600);
						let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
						let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
						if (day > 0) {
							hou = hou + day * 24
						}
						console.log('day',day)
						obj = {
							day: self.timeFormat(day),
							hou: self.timeFormat(hou),
							min: self.timeFormat(min),
							sec: self.timeFormat(sec)
						}
					} else { //活动已结束，全部设置为'00'
						obj = {
							day: '00',
							hou: '00',
							min: '00',
							sec: '00'
						}
					}

					self.countDownList.push(obj);
					console.log('self.countDownList',self.countDownList)
				}
				setTimeout(this.countDown, 1000);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/more.css";
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
