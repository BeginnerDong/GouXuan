<template>
	<view>
	
		<div class="nav-top" style="line-height: 40px;">
			<div class="ilblock font15 top-list " @click="tab('0')" :class="currentId == 0?'top-list-star':''">
				<div  :class="currentId == 0?'color6':'color1'">全部</div>
			</div>
			<div class="ilblock font15 top-list"  @click="tab('1')" :class="currentId == 1?'top-list-star':''">
				<div  :class="currentId == 1?'color6':'color1'">待发货</div>
			</div>
			<div class="ilblock font15 top-list"  @click="tab('2')" :class="currentId == 2?'top-list-star':''">
				<div :class="currentId == 2?'color6':'color1'">发货中</div>
			</div>
			<div class="ilblock font15 top-list"  @click="tab('3')" :class="currentId == 3?'top-list-star':''">
				<div  :class="currentId == 3?'color6':'color1'">已发货</div>
			</div>
			<div class="ilblock font15 top-list"  @click="tab('4')" :class="currentId == 4?'top-list-star':''">
				<div :class="currentId == 4?'color6':'color1'">其他</div>
			</div>
		</div>
		<div class="storebox bg1" v-for="item in mainData">
			<div class="storebox-top">
				<div class="font12 color1 ilblock" style="margin-left: 15px;">
					交易时间：{{item.create_time}}
				</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">等待发货</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">发货中</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">发货中</div>
				<div class="ilblock font12 flo-right" style=" color:rgb(225,54,78);margin-right: 15px;">已发货</div>
			</div>
			<div class="storebox-btm">
				<div class="ilblock img-box">
					<img :src="item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.mainImg&&item.products[0].snap_product.mainImg[0]?item.products[0].snap_product.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font15 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.products[0]&&item.products[0].snap_product?item.products[0].snap_product.title:''}}
					</div>
					<div style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.price}}</span> </div>
				</div>
			</div>
		</div>
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px; margin-left: 140px;">
				<img src="/static/images/达人/img3.png" style="width: 90px;"/>
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">你还没有这个订单状态</div>
		</div>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				currentId: 0,
				mainData: [],
				searchItem:{}
			}
		},
		onLoad(options) {
			const self = this;
			if(options.num){
				self.tab(options.num)
			}else{
				self.$Utils.loadAll(['getMainData'], self)
			}
		},
		methods: {
			getMainData() {
				const self = this;			
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no= uni.getStorageSync('user_no');
				postData.searchItem.type= 1;
				postData.order = {
					create_time: 'desc'
				};

				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);
						} else {
							self.$Utils.showToast('没有更多了');
						};
					
					} else {
						self.$Utils.showToast('网络故障')
					};
					
					self.$Utils.finishFunc('getMainData');
					console.log('getMainData', self.mainData)
				};
				self.$apis.orderGet(postData, callback);
			},
					
					
					
			tab(currentId) {
				const self = this;
				self.currentId = currentId;
				self.searchItem = {};
				if (currentId == '0') {
					
				} else if (currentId == '1') {
					
				} else if (currentId == '2') {
					
				} else if (currentId == '3') {
					
				} else if (currentId == '4') {
					
				} 
				self.mainData = [];
				self.getMainData();
			
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/store.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
