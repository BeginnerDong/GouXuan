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
				<div class="ilblock" style="width: 49%;" @click="changeMenu('1')"><span :class="num==1?'color77':'color22'">日历预约</span></div>
			</div>
		</div>
		<div class="middle bg2" v-if="num==0">
			<div class="color2 font15">
				<div style="overflow: hidden;">
					<view class="content ql-editor" v-html="mainData.products&&mainData.products[0]&&mainData.products[0].snap_product&&mainData.products[0].snap_product.product?mainData.products[0].snap_product.product.content:''">
					</view>
				</div>
			</div>
		</div>
		<div v-if="num==1">
			<div v-for="(item,index) in mainData.qrData" style="display: flex;width: 100%;height:120px">
				<div style="width: 35%;text-align: center;" @click="tapZoom(item.url)">
					<image :src="item.url" style="width: 100px;height: 100px;"></image>
					<div style="color: red;">点击放大</div>
				</div>
				<div>
					<div style="height: 26px;line-height: 26px;">{{item.message}}</div>
					<div>核销码：{{item.check_code}}</div>
					<div style="height: 26px;" v-if="item.book_time&&mainData.products&&mainData.products[0]&&mainData.products[0].snap_product.product.isreserve==1">
						<div style="height: 26px;">您预约的时间</div>
						<div style="height: 26px;">{{item.book_time}}</div>
					</div>
					<div style="display: flex;height: 26px;" v-if="!item.book_time&&mainData.products&&mainData.products[0]&&mainData.products[0].snap_product.product.isreserve==1">
						<div style="height: 26px;margin-right: 5px;">请选时间</div>
						<div style="height: 26px;">
							<ruiDatePicker fields="day" start="2010-00-00" end="2030-12-30" :otherData="{'index':index}" :value="item.book_time"
							 @change="bindChange" @cancel="bindCancel"></ruiDatePicker>
						</div>

					</div>
					<div v-if="!item.book_time&&mainData.products&&mainData.products[0]&&mainData.products[0].snap_product.product.isreserve==1"
					 :data-index="index" @click="book($event.currentTarget.dataset.index)" style="width: 57px;line-height: 16px;height: 18px;font-size: 12px;text-align: -webkit-center;border-radius: 15%;color: white;background: #FF895A;">
						立即预约
					</div>
				</div>
			</div>
		</div>
		<view class="fixd" v-if="tapShow">
			<view class="fixd-box">
				<image :src="tapUrl" mode=""></image>
			</view>
			<view style="text-align: center;" @click="closeTap">
				<image src="../../static/images/icon3.png" style="width: 40rpx;height: 40rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue"
	import cTabbar from "@/components/tabbar/tabbar.vue"
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		components: {
			cSwiper,
			cTabbar,
			ruiDatePicker
		},

		data() {

			return {
				tapShow: false,
				dateData: [],
				arrInfoEx: [],
				mainData: [],
				webSelf: this,
				num: 0,
				chooseDay: '',
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			if (options[0] && options[0].id) {
				self.id = options[0].id
			};
			self.$Utils.loadAll(['getMainData'], self)
		},
		methods: {
			tapZoom(url) {
				const self = this;
				self.tapShow = true;
				self.tapUrl = url;
				console.log('tapZoom')
			},
			closeTap() {
				const self = this;
				self.tapShow = false;
				self.tapUrl = '';
				console.log('closeTap')
			},

			book(index) {
				const self = this;
				if (self.mainData.qrData[index].book_time) {
					return;
				};
				if (self.mainData.qrData[index].newBookTime == '') {
					self.$Utils.showToast('请选择预约日期', 'none');
					return;
				};
				uni.showModal({
					title: '确认时间',
					content: '您选择的预约时间为' + self.mainData.qrData[index].newBookTime + '请确认',
					success: function(res) {
						if (res.confirm) {
							const postData = {
								tokenFuncName: 'getProjectToken',
								searchItem: {
									id: self.mainData.qrData[index].id
								},
								data: {
									book_time: self.mainData.qrData[index].newBookTime
								}
							};
							const callback = (res) => {
								if (res.solely_code == 100000) {
									self.$Utils.showToast('选择成功', 'none');
									self.mainData.qrData[index].book_time = self.mainData.qrData[index].newBookTime;
								} else {
									self.$Utils.showToast(res.msg, 'none');
								};
							};
							self.$apis.qrCodeUpdate(postData, callback);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			bindChange(e) {
				const self = this;
				self.mainData.qrData[e[1].index].newBookTime = e[0];
				console.log('bindChange', e)
			},

			bindCancel(e) {
				console.log('bindCancel', e)
			},



			changeMenu(num) {
				const self = this;
				console.log(num)
				if (num == self.num) {
					return
				} else {
					if (num == 0) {
						self.num = 0
					} else if (num == 1) {
						self.num = 1
					}
				}
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
					shop: {
						tableName: 'UserInfo',
						middleKey: 'shop_no',
						key: 'user_no',
						condition: '=',
						searchItem: {
							status: 1
						},
						info: ['address']
					},
					qrData: {
						tableName: 'Qrcode',
						middleKey: 'order_no',
						key: 'order_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};

				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if (self.mainData.products[0].date_id != 0) {
							var time = new Date(self.mainData.products[0].snap_product.time);
							self.mainData.products[0].dateFormat = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
						};
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/store.css";
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
