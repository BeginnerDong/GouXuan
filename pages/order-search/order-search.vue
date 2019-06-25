<template>
	<view>

		<div class="bg1" style="width: 100%; padding:15px 15px 0px;">
			<!-- <div class="ilblock list-btm" style="width: 41%;">
				按产品统计<image src="../../static/images/20190523150314.png" style="width: 10px;height: 6px;"></image>

			</div> -->
			<div class="ilblock list-btm" style="width: 35%;" @click="showSinglePicker">
				{{pickerText}}
				<image src="../../static/images/20190523150314.png" style="width: 10px;height: 6px;"></image>
			</div>
			<div class="ilblock" style="float: right;" @click="search">
				<button>搜索</button>
			</div>
			<div style="clear: both;"></div>
		</div>
		<view class="list-box bg1" v-for="item in mainData" v-if="mainData.length>0">
			<view class="storebox-top">
				<view class="font12 color1">
					<text style="margin-right: 10px;">{{item.UserInfo.name}}</text>
					交易时间：{{item.create_time}}
				</view>
			</view>
			<view class="storebox-btm">
				<view class="ilblock img-box">
					<image style="width:100%;height:100%" :src="item.snap_product&&item.snap_product.product&&item.snap_product.product.mainImg?item.snap_product.product.mainImg[0].url:''"></image>
				</view>
				<view class="ilblock imgname">
					<view class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.snap_product&&item.snap_product.product?item.snap_product.product.title:''}}
					</view>
					<view style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.price}}</span>
					</view>
				</view>
			</view>
		</view>
		<div class="color1 font13" style="width: 100%; text-align: center; margin-top: 50px;" v-else>~~没有更多数据了~~</div>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},

		data() {
			return {

				mainData:[],
				pickerSingleArray: [{
						label: '全部',
						value: 1
					},
					{
						label: '本月',
						value: 2
					},
					{
						label: '上个月',
						value: 3
					},
					{
						label: '前三个月',
						value: 4
					},
					{
						label: '前半年',
						value: 5
					}
				],


				themeColor: '#F98A48',
				pickerText: '全部',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				MonthFirst:'',
				searchItem:{
					pay_status:1
				}

			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			var today = new Date();

			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);
			console.log('today', today);
			var oneday = 1000 * 60 * 60 * 24;
			// 上个月1号
			var lastMonthFirst = new Date(today - oneday * today.getDate());
			self.lastMonthFirst = new Date(lastMonthFirst - oneday * (lastMonthFirst.getDate() - 1)).getTime();
			console.log('lastMonthFirst', lastMonthFirst);
			//前三个月1号
			var lastThreeMonthFirst = new Date(today - oneday * 4 * today.getDate());
			self.lastThreeMonthFirst = new Date(lastThreeMonthFirst - oneday * (lastThreeMonthFirst.getDate() - 1)).getTime();
			console.log('lastThreeMonthFirst', lastThreeMonthFirst);
			//前半年1号
			var lastSixMonthFirst = new Date(today - oneday * 7 * today.getDate());
			self.lastSixMonthFirst = new Date(lastSixMonthFirst - oneday * (lastSixMonthFirst.getDate() - 1)).getTime();
			console.log('lastSixMonthFirst', lastSixMonthFirst);
			// 本月1号
			today.setDate(1);
			self.MonthFirst = today.getTime();
			
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMainData'], self)
			};
			

		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		onPullDownRefresh() {
			console.log('refresh');
			uni.startPullDownRefresh();
			delete self.searchItem.create_time;
			self.getMainData(true);
		},
		
		methods: {

			onConfirm(e) {
				const self = this;
				var now = Date.parse(new Date());
				self.searchItem = {};
				self.pickerText = e.label;
				if (e.value == 1) {

				} else if (e.value == 2) {
					self.searchItem.create_time = ['between', [self.MonthFirst / 1000, now / 1000]]
				} else if (e.value == 3) {
					self.searchItem.create_time = ['between', [self.lastMonthFirst / 1000, now / 1000]]
				} else if (e.value == 4) {
					self.searchItem.create_time = ['between', [self.lastThreeMonthFirst / 1000, now / 1000]]
				} else if (e.value == 5) {
					self.searchItem.create_time = ['between', [self.lastSixMonthFirst / 1000, now / 1000]]
				}
				console.log(e.value[0])
			},
			
			search(){
				const self = this;
				self.getMainData(true)
			},

			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},



			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 5,
						is_page: true,
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.isLoadAll = true
					}
					setTimeout(function()
					{
					  uni.stopPullDownRefresh()
					},300);
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.teamOrder(postData, callback);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.list-btm {
		width: 100px;
		color: #8C8C8C;
		font-size: 13px;
		height: 32px;
		position: relative;
		top: -5px;
	}

	.list-btm image {
		margin-left: 10px;
	}

	button {
		display: inline-block;
		background: #2AA561;
		height: 30px;
		width: 100%;
		line-height: 30px;
		border-radius: 8px;
		color: #D1E9DB;
		border: none;
		font-size: 14px
	}

	.list-box {
		width: 92%;
		margin: 15px 4% 0px;
		border-radius: 13px;
		box-shadow: 0px 0px 12px #E2E2E2;
		box-sizing: border-box;
		padding: 15px;
		position: relative;
	}

	.storebox-top {
		width: 100%;
		margin-bottom: 10px;
	}

	.storebox-btm {
		width: 100%;
		height: 95px;
		line-height: 40px;
	}

	.img-box {
		width: 30%;
		height: 95px;
		overflow: hidden;
		border-radius: 4px;
	}

	.img-box img {
		width: 100%;
		height: 100%;
	}

	.imgname {
		height: 95px;
		margin-left: 10px;
		position: absolute;
		text-align: justify;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
