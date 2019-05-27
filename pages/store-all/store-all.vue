<template>
	<view>
	
		<div class="nav-top" style="line-height: 40px;font-size: 11px;">
			<div class="ilblock top-list " @click="tab('0')" :class="currentId == 0?'top-list-star':''">
				<div  :class="currentId == 0?'color6':'color1'">全部</div>
			</div>
			<div class="ilblock top-list"  @click="tab('1')" :class="currentId == 1?'top-list-star':''">
				<div  :class="currentId == 1?'color6':'color1'">待使用/待发货</div>
			</div>
			<div class="ilblock top-list"  @click="tab('2')" :class="currentId == 2?'top-list-star':''">
				<div :class="currentId == 2?'color6':'color1'">已发货</div>
			</div>
			<div class="ilblock top-list"  @click="tab('3')" :class="currentId == 3?'top-list-star':''">
				<div  :class="currentId == 3?'color6':'color1'">已完结/已核销</div>
			</div>
		</div>
		<div class="storebox bg1" style="height: auto;" v-for="item in mainData">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>	
			</div>
			<div class="storebox-btm " >
				<div class="ilblock img-box">
					<img :src="item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.product.mainImg[0]?item.products[0].snap_product.product.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.products[0]&&item.products[0].snap_product?item.products[0].snap_product.title:''}}
					</div>
					<div class="ilblock" style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.price}}</span> </div>
				</div>
			</div>
			<div v-if="item.qrData.length>0">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					核销二维码
				</div>	
				<div style="width: 100%;border-top: 1px solid gray;margin-top: 5px;">
					 <image v-for="c_item in item.qrData" style="width: 80px;height: 80px;" :src="c_item.url" mode="" @click="tapZoom(c_item.url)"></image>
				</div>
			</div>
			<view style="clear: both;"></view>
		</div>
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px; margin-left: 140px;">
				<img src="../../static/images/达人/img3.png" style="width: 90px;"/>
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">你还没有这个订单状态</div>
		</div>
		<view class="fixd" v-if="tapShow">
			<view class="fixd-box" >
				<image :src="tapUrl"  mode=""></image>
			</view>
			<view style="text-align: center;" @click="closeTap">
				<image src="../../static/images/ttq.png" style="width: 40rpx;height: 40rpx;" ></image>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				currentId: 0,
				isLoadAll:false,
				mainData: [],
				searchItem:{
					pay_status:1
				},
				tapShow:false,
				tapUrl:''
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			if(options.num){
				self.tab(options.num)
			}else{
				self.$Utils.loadAll(['getMainData'], self)
			}
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
			
			tapZoom(url){
				const self = this;
				self.tapShow = true;
				self.tapUrl = url;
				console.log('tapZoom')	
			},	
			closeTap(){
				const self = this;
				self.tapShow = false;
				self.tapUrl = '';
				console.log('closeTap')	
			},
			getMainData() {
				const self = this;			
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no= uni.getStorageSync('user_no');
				
				postData.order = {
					create_time: 'desc'
				};
				
				postData.getAfter = {
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
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);
						} else {
							self.isLoadAll = true;
							self.$Utils.showToast('没有更多了','none');
						};
					} else {
						self.$Utils.showToast('网络故障','none')
					};
					self.$Utils.finishFunc('getMainData');
					console.log('getMainData', self.mainData)
				};
				self.$apis.orderGet(postData, callback);
			},
					
					
					
			tab(currentId) {
				const self = this;
				self.currentId = currentId;
				
				if (currentId == '0') {
					self.searchItem = {
						pay_status:1
					};
				} else if (currentId == '1') {
					self.searchItem = {
						pay_status:1,
						transport_status:0
					};
				} else if (currentId == '2') {
					self.searchItem = {
						pay_status:1,
						type:1,
						transport_status:1
					};
				} else if (currentId == '3') {
					self.searchItem = {
						pay_status:1,
						transport_status:2
					};
				};
				self.mainData = [];
				self.getMainData();
			
			},
		}
	}
</script>

<style>
	@import "../../assets/style/store.css";
	@import "../../assets/style/basic.css";
</style>
